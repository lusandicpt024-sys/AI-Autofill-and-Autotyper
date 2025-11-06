# AutoType Edge Extension

A Microsoft Edge extension version of the AutoType educational tool for learning web automation concepts. This extension can automatically detect text on typing test websites and simulate human-like typing, as well as use AI to answer questions on webpages.

## ⚠️ Educational Use Only

This extension is designed for educational purposes to learn about:
- Browser extension development
- Web automation techniques
- DOM manipulation and text detection
- Event simulation and user interaction
- AI integration and API usage
- Responsible automation practices

**Use responsibly and only for learning purposes. Respect website terms of service.**

## Features

### 🎯 **Dual-Mode Architecture**
- **Typing Test Mode**: Practice typing with WPM-based speed control (10-200 WPM)
- **AI Answer Mode**: Detect questions on webpages and auto-generate intelligent answers

### 🤖 **AI-Powered Question Detection**
- Automatically detects 8+ question patterns on any webpage
- Smart proximity-based input field pairing
- Context-aware answer generation using Google's Gemini AI
- Support for multiple input types (text, textarea, contenteditable)

### ⚡ **Advanced Auto-Typing**
- 🎯 **WPM-Based Speed Control**: Simply enter your target Words Per Minute (10-200 WPM)
- ⚡ **Quick Presets**: One-click speed selection for Slow/Normal/Fast/Pro levels
- 🔍 **Automatic Text Detection**: Finds text to type on various typing test websites
- ⌨️ **Human-like Typing**: Realistic patterns with optional randomness and natural pauses
- 🧠 **Smart Input Detection**: Automatically locates typing input fields across different sites
- 🎛️ **Speed Adjustment**: Fine-tune with multipliers (0.7x to 1.5x) for perfect calibration
- 📝 **Manual Text Input**: Type custom text in addition to detected content
- 🐛 **Debug Detection**: Troubleshoot text detection with detailed logging
- 🛡️ **Safety Features**: Built-in delays, user confirmations, and speed validation

## Installation

### Method 1: Load as Unpacked Extension (Recommended for Development)

1. **Open Microsoft Edge** and navigate to `edge://extensions`

2. **Enable "Developer mode"** using the toggle in the left sidebar

3. **Click "Load unpacked"** button

4. **Navigate to** the `edge-extension/` folder in this repository

5. **Select the folder** and click "Select Folder"

6. **The extension is now loaded!** Look for the AutoType icon in your browser toolbar

### Method 2: Install as Packaged Extension

1. **Package the extension:**
   ```bash
   cd edge-extension/
   zip -r autotype-edge-extension.zip . -x "*.git*" "README.md"
   ```

2. **Install the .zip file** through Edge's extension manager

## Usage

### Typing Test Mode

1. **Navigate to a typing test website** (e.g., https://monkeytype.com)

2. **Click the AutoType extension icon** in your browser toolbar

3. **Set your target WPM** (10-200) or use quick presets:
   - **Slow (30 WPM)** - Learning/practice mode
   - **Normal (60 WPM)** - Average typing speed  
   - **Fast (90 WPM)** - Above average performance
   - **Pro (120 WPM)** - Professional level

4. **Click "🔍 Detect Text on Page"** to automatically find the text to type

5. **Click "⌨️ Start Auto-Typing"** to begin the automated typing process

6. **Position your cursor** in the typing field during the 3-second countdown

7. **Watch it type at your exact target speed** with realistic human-like patterns!

### AI Answer Mode

1. **Get Your API Key** (first time only):
   - **Option A**: [Google AI Studio](https://makersuite.google.com/app/apikey) (Gemini API - Recommended)
   - **Option B**: [Vertex AI Studio](https://console.cloud.google.com/vertex-ai/studio) (Google Cloud)

2. **Click the AutoType extension icon** and switch to "🧠 AI Answer Mode"

3. **Configure your API key** by clicking the "⚙️ Configure" button

4. **Navigate to a webpage with questions** (forms, quizzes, surveys, etc.)

5. **Click "❓ Detect Questions"** to scan the page for questions

6. **Review detected questions** in the extension popup

7. **Optional: Click "👁️ Preview Answers"** to see AI-generated answers before typing

8. **Click "🤖 Answer All Questions"** to automatically fill in the answers

### Manual Text Input

1. **Open the extension popup**

2. **Enter text** in the "Manual Input" textarea

3. **Click "Type Manual Text"** to type your custom text

### Settings Configuration

Adjust these settings in the extension popup:

#### Typing Test Mode Settings
- **Target WPM**: Set your desired typing speed (10-200 WPM)
- **Speed Adjustment**: Fine-tune with multipliers (Much Slower 0.7x to Super Fast 1.5x)
- **Randomness**: Add human-like variation to typing patterns
- **Start Delay**: Countdown before typing starts (default: 3 seconds)

#### AI Answer Mode Settings
- **Response Speed**: Adjust typing speed for AI answers (30-120 WPM)
- **Review Before Type**: Preview answers before auto-typing (recommended)

## Supported Websites

The extension works with many typing test websites by detecting common selectors:

### Tested Compatible Sites
- Monkeytype
- TypeRacer
- 10FastFingers
- Keybr
- Typing.com
- Most typing test websites using standard HTML structures

### Common Selectors Detected
- Text containers: `.text-to-type`, `.typing-text`, `#text`, `.words`
- Input fields: `input[type="text"]`, `textarea`, `[contenteditable="true"]`
- Test-specific: `[data-testid="typing-input"]`, `.typing-area input`

## How It Works

### Text Detection Algorithm

1. **Searches for common typing test selectors** first
2. **Falls back to finding the largest meaningful text block** on the page
3. **Filters out navigation, ads, and non-content text**
4. **Returns the most suitable text for typing practice**

### Typing Simulation

1. **Locates the appropriate input field** using multiple detection methods
2. **Simulates realistic key events** (keydown, input, keyup)
3. **Adds human-like delays** with slight randomization
4. **Handles different input types** (input, textarea, contenteditable)

### AI Question Detection and Answering

1. **Scans the page for question patterns** using sophisticated detection algorithms
2. **Identifies nearby input fields** using proximity and DOM structure analysis
3. **Extracts context** from surrounding elements (headings, instructions, etc.)
4. **Queries the Gemini AI API** with the question and context
5. **Types the answer** using the same human-like typing simulation

### Browser Extension Architecture

- **Popup Script** (`popup.js`): Handles user interface, WPM calculations, and settings
- **Content Script** (`content.js`): Runs on web pages to detect text, questions, and simulate typing
- **Background Script** (`background.js`): Manages extension lifecycle and storage (Service Worker in Manifest V3)
- **Manifest** (`manifest.json`): Defines permissions and extension structure (Manifest V3 format)

## Key Differences from Firefox Extension

This Edge extension is adapted from the Firefox extension with the following changes:

1. **Manifest V3 Format**: Uses the latest manifest version required by Edge/Chrome
   - `service_worker` instead of background scripts
   - `host_permissions` instead of permissions for URLs
   - Updated `action` instead of `browser_action`

2. **Chrome API**: Uses `chrome.*` APIs instead of `browser.*` APIs
   - `chrome.runtime.*`
   - `chrome.storage.*`
   - `chrome.tabs.*`

3. **Service Worker Background**: Background script runs as a service worker instead of persistent background page

## Development

### File Structure
```
edge-extension/
├── manifest.json          # Extension configuration (Manifest V3)
├── popup.html            # Extension popup interface
├── popup.js              # Popup logic and UI handling (Chrome API)
├── content.js            # Page content detection and typing (Chrome API)
├── background.js         # Extension background processes (Service Worker)
├── icons/                # Extension icons (16, 32, 48, 128px)
└── README.md             # This file
```

### Adding Support for New Websites

To add support for a new typing test website:

1. **Inspect the website's HTML structure** using browser dev tools (F12)

2. **Identify text and input selectors** unique to that site

3. **Add selectors to `content.js`:**
   ```javascript
   this.textSelectors = [
       'your-new-text-selector',
       // ... existing selectors
   ];
   
   this.inputSelectors = [
       'your-new-input-selector', 
       // ... existing selectors
   ];
   ```

### Customizing Typing Behavior

Modify the typing simulation in `content.js`:

```javascript
async typeText(text, inputField, settings) {
    // Add your custom typing logic here
    // Example: Add occasional backspaces, pauses, etc.
}
```

## Troubleshooting

### Extension Not Loading
- Make sure all files are in the correct directory
- Check Edge console (F12) for error messages
- Verify manifest.json syntax is correct
- Ensure Developer mode is enabled in edge://extensions

### Text Detection Issues
- Some websites use unique selectors not covered by the extension
- Use the "🐛 Debug Detection" button to see what text is detected
- Check browser console for detection attempts and detailed logs
- Add new selectors to `content.js` as needed

### WPM Discrepancy Issues
- If website results don't match your target WPM, use the Speed Adjustment dropdown
- Check console logs for detailed timing and calculation information
- Turn off randomness for consistent speed testing
- Try different speed adjustment multipliers (0.7x to 1.5x)

### Typing Not Working
- Ensure the website allows programmatic input events
- Some sites may block automated typing for security
- Try different typing speeds and speed adjustment multipliers
- Check browser console (F12) for detailed debug logs
- Use "🐛 Debug Detection" button to verify text detection

### AI Features Not Working
- Verify your API key is correctly configured
- Check that you have internet connectivity
- Ensure the page has detectable questions with input fields
- Check browser console for API error messages
- Try refreshing the page and detecting questions again

### Permission Issues
- The extension requires `activeTab`, `storage`, and `clipboardRead/Write` permissions
- Some sites may have Content Security Policy restrictions
- Check edge://extensions for permission warnings

## Security and Ethics

### Built-in Safety Features
- ✅ No automatic execution without user interaction
- ✅ Clear countdown before typing starts
- ✅ Configurable delays to prevent system overload
- ✅ Local storage only (no data sent to external servers except AI API)
- ✅ Open source code for transparency
- ✅ API keys stored securely in browser storage

### Responsible Use Guidelines
- 🎓 Use only for educational and learning purposes
- 🏠 Test only on your own systems or with permission
- 📖 Respect website terms of service
- 🤝 Don't use for unfair advantages in competitions
- ⚖️ Consider the impact on others and online communities
- 🔒 Keep your API keys secure and don't share them

### Privacy
- All settings stored locally in browser
- No telemetry or data collection by the extension
- API requests only sent to Google's Gemini AI when explicitly requested
- No user data transmitted anywhere except to AI API during question answering
- API keys encrypted in browser's secure storage

## Educational Value

This extension demonstrates:

1. **Browser Extension Development**
   - Manifest V3 configuration
   - Content script injection
   - Service Worker architecture
   - Cross-context messaging
   - Chrome Extension APIs usage

2. **Web Automation Techniques**
   - DOM traversal and element selection
   - Event simulation and dispatch
   - Text processing and validation
   - Cross-site compatibility
   - Question pattern recognition

3. **AI Integration**
   - API authentication and key management
   - Prompt engineering for context-aware answers
   - Streaming response handling
   - Error handling and retry logic

4. **User Interface Design**
   - Extension popup creation
   - Mode switching and state management
   - Settings management
   - User feedback and status display
   - Responsive design principles

5. **Ethical Programming Practices**
   - User consent and control
   - Transparent functionality
   - Safety mechanisms
   - Responsible disclosure
   - Privacy protection

## Contributing

Feel free to enhance this educational extension:

- Add support for more typing test websites
- Improve text detection algorithms
- Enhance typing realism with advanced patterns
- Add more configuration options
- Improve error handling and user feedback
- Add support for more AI providers

## License

This project is for educational purposes. Use responsibly and in compliance with applicable laws and website terms of service.

---

**Remember**: This extension is a learning tool. Always use it responsibly and ethically!

## Compatibility

- **Microsoft Edge**: Version 88 or higher (Manifest V3 support)
- **Google Chrome**: Version 88 or higher (compatible due to Chromium base)
- **Brave**: Version 1.19 or higher (compatible with Chromium extensions)
- **Opera**: Version 74 or higher (compatible with Chromium extensions)

## Support

For issues, questions, or contributions, please refer to the main repository documentation and issue tracker.
