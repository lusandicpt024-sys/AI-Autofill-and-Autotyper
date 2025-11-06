#!/bin/bash

# Test script for the AutoType Brave Extension
echo "🧪 AutoType Brave Extension Test"
echo "=================================="
echo ""

# Check if Brave is installed
if command -v brave >/dev/null 2>&1; then
    echo "✅ Brave found: $(brave --version 2>/dev/null || echo 'version detection not available')"
elif command -v brave-browser >/dev/null 2>&1; then
    echo "✅ Brave Browser found: $(brave-browser --version 2>/dev/null || echo 'version detection not available')"
elif command -v brave-browser-stable >/dev/null 2>&1; then
    echo "✅ Brave Browser (Stable) found"
elif command -v brave-browser-beta >/dev/null 2>&1; then
    echo "✅ Brave Browser (Beta) found"
elif command -v brave-browser-nightly >/dev/null 2>&1; then
    echo "✅ Brave Browser (Nightly) found"
else
    echo "⚠️  Brave not found in PATH, but this is OK for testing"
    echo "   Extension can still be installed manually in Brave"
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
    
    # Check for Manifest V3 and Brave-specific fields
    manifest_version=$(python3 -c "import json; print(json.load(open('manifest.json')).get('manifest_version', 'N/A'))")
    author=$(python3 -c "import json; print(json.load(open('manifest.json')).get('author', 'N/A'))")
    homepage=$(python3 -c "import json; print(json.load(open('manifest.json')).get('homepage_url', 'N/A'))")
    description=$(python3 -c "import json; print(json.load(open('manifest.json')).get('description', 'N/A'))")
    
    echo "   - Manifest Version: $manifest_version"
    echo "   - Author: $author"
    echo "   - Homepage: $homepage"
    
    if [ "$manifest_version" = "3" ]; then
        echo "✅ Using Manifest V3 (Brave compatible)"
    else
        echo "⚠️  Warning: Not using Manifest V3"
    fi
    
    # Check if description mentions Brave
    if [[ "$description" == *"Brave"* ]]; then
        echo "✅ Description mentions Brave optimization"
    fi
else
    echo "❌ manifest.json has invalid JSON syntax"
    exit 1
fi

# Check for Chrome API usage (Brave uses Chrome APIs)
echo ""
echo "🔍 Checking API compatibility..."

chrome_api_count=$(grep -h "chrome\." popup.js content.js background.js 2>/dev/null | wc -l)
browser_api_count=$(grep -h "browser\." popup.js content.js background.js 2>/dev/null | wc -l)

echo "   - chrome.* API calls: $chrome_api_count"
echo "   - browser.* API calls: $browser_api_count"

if [ "$chrome_api_count" -gt 0 ]; then
    echo "✅ Using chrome.* API (Brave compatible)"
else
    echo "⚠️  Warning: No chrome.* API calls detected"
fi

if [ "$browser_api_count" -gt 0 ]; then
    echo "⚠️  Warning: browser.* API detected (may not work in Brave)"
fi

# Check extension size
extension_size=$(du -sh . | cut -f1)
echo ""
echo "📦 Extension size: $extension_size"

echo ""
echo "🎉 Extension validation complete!"
echo ""
echo "🚀 To install and test in Brave:"
echo "1. Open Brave browser"
echo "2. Go to brave://extensions"
echo "3. Enable 'Developer mode' (toggle in top right)"
echo "4. Click 'Load unpacked'"
echo "5. Select this directory (brave-extension/)"
echo "6. Visit a typing test website"
echo "7. Click the AutoType extension icon"
echo "8. Choose between Typing Test Mode or AI Answer Mode"
echo ""
echo "🦁 Brave-Specific Features:"
echo "   • Works seamlessly with Brave Shields"
echo "   • Compatible with built-in ad/tracker blocking"
echo "   • Lower memory usage than Chrome"
echo "   • Better battery life and performance"
echo "   • Enhanced privacy and fingerprinting protection"
echo "   • Works with Brave Rewards (BAT)"
echo "   • Compatible with private windows and Tor tabs (AI mode requires normal tabs)"
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
echo ""
echo "🛡️ Privacy Tips for Brave Users:"
echo "   • Keep Brave Shields enabled (extension works with it)"
echo "   • Use normal tabs for AI features (not Tor tabs)"
echo "   • Extension stores API keys securely in Brave's encrypted storage"
echo "   • No telemetry or tracking by the extension"
echo "   • API requests only to Google AI when you explicitly use AI mode"
