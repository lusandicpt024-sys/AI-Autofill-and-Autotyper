#!/bin/bash

# Test script for the AutoType Opera Extension
echo "🧪 AutoType Opera Extension Test"
echo "=================================="
echo ""

# Check if Opera is installed
if command -v opera >/dev/null 2>&1; then
    echo "✅ Opera found: $(opera --version 2>/dev/null || echo 'version detection not available')"
elif command -v opera-developer >/dev/null 2>&1; then
    echo "✅ Opera Developer found"
elif command -v opera-beta >/dev/null 2>&1; then
    echo "✅ Opera Beta found"
else
    echo "⚠️  Opera not found in PATH, but this is OK for testing"
    echo "   Extension can still be installed manually in Opera"
fi

# Check if extension files exist
echo ""
echo "📁 Checking extension files..."

required_files=(
    "manifest.json"
    "popup.html"
    "popup.js"
    "content.js"
    "background.js"
    "icons/icon-16.png"
    "icons/icon-32.png"
    "icons/icon-48.png"
    "icons/icon-128.png"
)

all_files_exist=true

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
        all_files_exist=false
    fi
done

if [ "$all_files_exist" = false ]; then
    echo ""
    echo "❌ Some required files are missing. Please make sure all extension files are present."
    exit 1
fi

echo ""
echo "✅ All extension files are present!"

# Validate manifest.json
echo ""
echo "📋 Validating manifest.json..."

if python3 -c "import json; json.load(open('manifest.json'))" 2>/dev/null; then
    echo "✅ manifest.json is valid JSON"
    
    # Check for Manifest V3 and Opera-specific fields
    manifest_version=$(python3 -c "import json; print(json.load(open('manifest.json')).get('manifest_version', 'N/A'))")
    author=$(python3 -c "import json; print(json.load(open('manifest.json')).get('author', 'N/A'))")
    homepage=$(python3 -c "import json; print(json.load(open('manifest.json')).get('homepage_url', 'N/A'))")
    
    echo "   - Manifest Version: $manifest_version"
    echo "   - Author: $author"
    echo "   - Homepage: $homepage"
    
    if [ "$manifest_version" = "3" ]; then
        echo "✅ Using Manifest V3 (Opera compatible)"
    else
        echo "⚠️  Warning: Not using Manifest V3"
    fi
else
    echo "❌ manifest.json has invalid JSON syntax"
    exit 1
fi

# Check for Chrome API usage (Opera uses Chrome APIs)
echo ""
echo "🔍 Checking API compatibility..."

chrome_api_count=$(grep -h "chrome\." popup.js content.js background.js 2>/dev/null | wc -l)
browser_api_count=$(grep -h "browser\." popup.js content.js background.js 2>/dev/null | wc -l)

echo "   - chrome.* API calls: $chrome_api_count"
echo "   - browser.* API calls: $browser_api_count"

if [ "$chrome_api_count" -gt 0 ]; then
    echo "✅ Using chrome.* API (Opera compatible)"
else
    echo "⚠️  Warning: No chrome.* API calls detected"
fi

if [ "$browser_api_count" -gt 0 ]; then
    echo "⚠️  Warning: browser.* API detected (may not work in Opera)"
fi

# Check extension size
extension_size=$(du -sh . | cut -f1)
echo ""
echo "📦 Extension size: $extension_size"

echo ""
echo "🎉 Extension validation complete!"
echo ""
echo "🚀 To install and test in Opera:"
echo "1. Open Opera browser"
echo "2. Go to opera://extensions"
echo "3. Enable 'Developer mode' (toggle in top right)"
echo "4. Click 'Load unpacked'"
echo "5. Select this directory (opera-extension/)"
echo "6. Visit a typing test website"
echo "7. Click the AutoType extension icon"
echo "8. Choose between Typing Test Mode or AI Answer Mode"
echo ""
echo "🎭 Opera-Specific Features:"
echo "   • Works with Opera's built-in VPN"
echo "   • Compatible with Opera Turbo mode"
echo "   • Works alongside Opera's ad blocker"
echo "   • Fully compatible with Opera GX gaming browser"
echo ""
echo "💡 Quick WPM Guide (Typing Test Mode):"
echo "   • 30 WPM: Slow/Learning"
echo "   • 60 WPM: Average typing speed"
echo "   • 90 WPM: Fast typing"
echo "   • 120+ WPM: Professional level"
echo ""
echo "🤖 AI Answer Mode:"
echo "   • Get your Gemini API key from Google AI Studio"
echo "   • Switch to AI Answer Mode in the extension"
echo "   • Configure your API key"
echo "   • Detect and answer questions on any webpage"
echo ""
echo "🔬 Test websites to try:"
echo "   • https://monkeytype.com"
echo "   • https://10fastfingers.com/typing-test/english"
echo "   • https://www.typingtest.com/"
echo "   • https://www.keybr.com/"
