# AutoType Extension Setup Guide

## 🚀 Installation

### For Firefox
1. **Load Extension in Firefox**:
   - Open Firefox and navigate to `about:debugging`
   - Click "This Firefox" tab
   - Click "Load Temporary Add-on..."
   - Select `manifest.json` from the `firefox-extension` folder
2. **Extension Icon**: Look for the AutoType icon in your Firefox toolbar

### For Edge/Chrome
1. **Load Extension**:
   - Open Edge (`edge://extensions`) or Chrome (`chrome://extensions`)
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `edge-extension` folder
2. **Extension Icon**: Look for the AutoType icon in your browser toolbar

### For Opera
1. **Load Extension**:
   - Open Opera and navigate to `opera://extensions`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `opera-extension` folder
2. **Extension Icon**: Look for the AutoType icon in your Opera toolbar

### For Brave
1. **Load Extension**:
   - Open Brave and navigate to `brave://extensions`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `brave-extension` folder
2. **Extension Icon**: Look for the AutoType icon in your Brave toolbar

## 🔧 First-Time Setup

When you first open the extension, you'll see an onboarding modal:

### Option 1: Enable AI Features
1. Click "Setup AI Features"
2. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. Paste your API key and click "Validate & Save"
4. Once validated, you're ready to use both modes!

### Option 2: Skip AI Setup
1. Click "Skip for Now" 
2. You can use Typing Test Mode immediately
3. Enable AI features later from the settings

## 🎯 Usage Modes

### Typing Test Mode (Original)
- **Purpose**: Practice typing with speed control
- **Setup**: Select text on any typing test page
- **Controls**: 
  - Set target WPM (10-200)
  - Click "Start Auto-typing"
  - Use "Stop" to halt mid-session

### AI Answer Mode (New)
- **Purpose**: Detect questions and auto-generate answers
- **Requirements**: Valid Gemini API key
- **Workflow**:
  1. Navigate to a page with questions/forms
  2. Switch to "AI Answer" mode
  3. Click "Detect Questions" to scan the page
  4. Review detected questions and previews
  5. Click "Answer All" or answer individually
  6. Optionally enable "Review before typing"

## 🧠 AI Question Detection

The extension automatically detects:
- Multiple choice questions
- Text input fields near question text
- Essay prompts and long-form responses
- Form fields with associated labels
- Survey questions
- Quiz questions

**Detection Algorithm**:
- Scans for question patterns (What, How, Why, etc.)
- Finds nearby input fields within 200px
- Extracts context from surrounding elements
- Prioritizes based on proximity and relevance

## ⚙️ Settings & Configuration

### API Key Management
- **View Status**: Check if API key is configured
- **Update Key**: Change or reset your API key
- **Validation**: Automatic testing with Gemini API

### AI Settings
- **Typing Speed**: 30-120 WPM for AI responses
- **Review Mode**: Preview answers before typing
- **Batch Processing**: Answer all questions at once

### Safety Features
- **Manual Triggers**: No automatic actions
- **Emergency Stop**: Halt typing immediately
- **User Confirmation**: Required for batch operations

## 🛡️ Privacy & Security

- **API Key Storage**: Securely stored in Firefox's encrypted storage
- **No Data Collection**: Questions and answers not logged
- **Local Processing**: All detection happens in your browser
- **Optional AI**: Can be used without AI features

## 🔧 Troubleshooting

### Common Issues

**Extension Not Loading**:
- Check Firefox version (requires modern Firefox)
- Ensure manifest.json is selected during installation
- Check browser console for errors

**API Key Issues**:
- Verify key is valid at Google AI Studio
- Check internet connection
- Ensure Gemini API is enabled for your account

**Question Detection Problems**:
- Try refreshing the page
- Check if questions are in standard HTML elements
- Some dynamically loaded content may not be detected

**Typing Not Working**:
- Ensure input field is clickable and focused
- Check if page has JavaScript that interferes
- Try clicking the input field manually first

### Debug Information
- Open browser console (F12) for detailed logs
- Extension logs all major operations
- API responses and errors are logged

## 📝 Usage Tips

1. **Best Results**: Works best on standard forms and quiz pages
2. **Speed Control**: Lower WPM for complex answers, higher for simple ones
3. **Review Mode**: Enable when accuracy is critical
4. **Page Loading**: Wait for page to fully load before detecting questions
5. **Input Focus**: Click input fields to ensure they're active

## 🚀 Advanced Usage

### Custom Question Types
The extension can detect various question formats:
- "What is..." / "How do..." / "Why does..."
- "Choose the correct..." / "Select all..."
- "Explain..." / "Describe..." / "Define..."
- "List..." / "Compare..." / "Analyze..."

### API Optimization
- Responses optimized for form length
- Context awareness for better accuracy
- Automatic length adjustment based on input type

### Integration Tips
- Works with most LMS platforms
- Compatible with standard HTML forms
- Supports both modern and legacy web designs

---

## 🤝 Support

For issues or suggestions:
1. Check browser console for error messages
2. Verify all setup steps completed
3. Test with different websites
4. Consider browser/site-specific restrictions

The extension is designed to be helpful while maintaining full user control over all actions.