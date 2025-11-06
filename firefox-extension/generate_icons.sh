#!/bin/bash

# Icon Generation Script for AutoType Firefox Extension
# This script creates PNG icons from SVG or provides placeholder instructions

echo "🎨 AutoType Firefox Extension Icon Setup"
echo "========================================"

# Check if ImageMagick/convert is available
if command -v convert >/dev/null 2>&1; then
    echo "✅ ImageMagick found, generating PNG icons..."
    
    # Create a simple colored square as base icon since we have SVG
    # Generate different sizes
    convert -size 16x16 xc:"#4CAF50" -fill white -gravity center -pointsize 10 -annotate +0+0 "AT" icons/icon-16.png
    convert -size 32x32 xc:"#4CAF50" -fill white -gravity center -pointsize 20 -annotate +0+0 "AT" icons/icon-32.png
    convert -size 48x48 xc:"#4CAF50" -fill white -gravity center -pointsize 30 -annotate +0+0 "AT" icons/icon-48.png
    convert -size 128x128 xc:"#4CAF50" -fill white -gravity center -pointsize 80 -annotate +0+0 "AT" icons/icon-128.png
    
    echo "✅ PNG icons generated successfully!"
    
else
    echo "⚠️  ImageMagick not found. Creating placeholder icons..."
    
    # Create simple placeholder PNG files (1x1 pixel, will be scaled by browser)
    echo -e '\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\tpHYs\x00\x00\x0b\x13\x00\x00\x0b\x13\x01\x00\x9a\x9c\x18\x00\x00\x00\x12IDATx\x9cc\xf8\x00\x00\x00\x00\x00\x01\x00\x01\x00\x00\x00\x00\x07\n\xdb\xa8\x00\x00\x00\x00IEND\xaeB`\x82' > icons/icon-16.png
    cp icons/icon-16.png icons/icon-32.png
    cp icons/icon-16.png icons/icon-48.png
    cp icons/icon-16.png icons/icon-128.png
    
    echo "✅ Placeholder icons created!"
    echo "   Note: You can replace these with proper icons later."
fi

echo ""
echo "📋 Icon files created:"
ls -la icons/

echo ""
echo "🚀 Next steps:"
echo "1. Load the extension in Firefox (see README for instructions)"
echo "2. Optionally replace icons with custom designs"
echo "3. Test the extension on typing websites"