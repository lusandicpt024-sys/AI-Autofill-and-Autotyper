#!/bin/bash

# Quick reload script for testing the extension fixes
echo "🔄 AutoType Extension - Quick Test"
echo "================================="
echo ""

echo "📋 Changes made to fix word duplication:"
echo "✅ Improved text extraction to avoid nested element duplication"
echo "✅ Added duplicate word detection and removal"
echo "✅ Prioritized clean text containers over word-span containers"
echo "✅ Enhanced validation to reject duplicated text"
echo "✅ Added better debug information"
echo ""

echo "🔧 To test the fixes:"
echo "1. Go to Firefox about:debugging"
echo "2. Click 'Reload' next to the AutoType extension"
echo "3. Visit the typing test website"
echo "4. Click 'Detect Text' - should now show clean text without duplicates"
echo "5. Use 'Debug Detection' if you still see issues"
echo ""

echo "🎯 Expected result:"
echo "BEFORE: 'The The old old oak oak tree tree had had...'"
echo "AFTER:  'The old oak tree had stood at the edge...'"
echo ""

echo "💡 If duplication persists:"
echo "- Use the Debug Detection button to see which selector is being used"
echo "- Check browser console for detailed logging"
echo "- The extension will now automatically clean duplicates as a fallback"