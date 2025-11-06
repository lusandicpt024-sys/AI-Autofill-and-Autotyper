#!/bin/bash

# Test script for the AutoType Firefox Extension
echo "🧪 AutoType Firefox Extension Test"
echo "=================================="
echo ""

# Check if Firefox is installed
if command -v firefox >/dev/null 2>&1; then
    echo "✅ Firefox found: $(firefox --version)"
else
    echo "❌ Firefox not found. Please install Firefox to use this extension."
    exit 1
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
else
    echo "❌ manifest.json has invalid JSON syntax"
    exit 1
fi

# Check extension size
extension_size=$(du -sh . | cut -f1)
echo "📦 Extension size: $extension_size"

echo ""
echo "🎉 Extension validation complete!"
echo ""
echo "🚀 To install and test:"
echo "1. Open Firefox"
echo "2. Go to about:debugging"
echo "3. Click 'This Firefox'"
echo "4. Click 'Load Temporary Add-on...'"
echo "5. Select manifest.json from this directory"
echo "6. Visit a typing test website"
echo "7. Click the AutoType extension icon"
echo "8. Set your desired WPM and start typing!"
echo ""
echo "💡 Quick WPM Guide:"
echo "   • 30 WPM: Slow/Learning"
echo "   • 60 WPM: Average typing speed"
echo "   • 90 WPM: Fast typing"
echo "   • 120+ WPM: Professional level"
echo ""
echo "🔬 Test websites to try:"
echo "   • https://10fastfingers.com/typing-test/english"
echo "   • https://www.typingtest.com/"
echo "   • https://www.keybr.com/"
echo "   • Local: ../typing_test.html"