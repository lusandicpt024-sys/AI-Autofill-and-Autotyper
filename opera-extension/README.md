# AutoType Opera Extension

An Opera browser extension version of the AutoType educational tool for learning web automation concepts. This extension can automatically detect text on typing test websites and simulate human-like typing, as well as use AI to answer questions on webpages.

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

1. **Open Opera** and navigate to `opera://extensions`

2. **Enable "Developer mode"** using the toggle in the top right corner

3. **Click "Load unpacked"** button

4. **Navigate to** the `opera-extension/` folder in this repository

5. **Select the folder** and click "Select Folder"

6. **The extension is now loaded!** Look for the AutoType icon in your browser toolbar

### Method 2: Install as Packaged Extension

1. **Package the extension:**
   ```bash
   cd opera-extension/
   zip -r autotype-opera-extension.zip . -x "*.git*" "README.md"
   ```

2. **Drag and drop the .zip file** into `opera://extensions` with Developer mode enabled

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

## Opera-Specific Features

This extension is optimized for Opera browser with the following considerations:

### 🎭 **Opera Integration**
- Full compatibility with Opera's Chromium-based architecture
- Seamless integration with Opera's sidebar and extension management
- Optimized for Opera's turbo mode and ad blocker
- Compatible with Opera GX gaming browser variant

### 🚀 **Performance Optimizations**
- Efficient resource usage for Opera's memory management
- Fast loading times optimized for Opera's rendering engine
- Minimal background activity to preserve battery life
- Compatible with Opera's built-in VPN

### 🔒 **Privacy & Security**
- Works seamlessly with Opera's built-in privacy features
- Compatible with Opera's ad blocker and tracker blocker
- Respects Opera's security settings and site permissions
- Secure API key storage using Opera's encrypted storage

## Supported Websites

The extension works with many typing test websites by detecting common selectors:

### Tested Compatible Sites
- Monkeytype
- TypeRacer
- 10FastFingers
- Keybr
- Typing.com
- Most typing test websites using standard HTML structures

## How It Works

### Browser Extension Architecture

- **Popup Script** (`popup.js`): Handles user interface, WPM calculations, and settings
- **Content Script** (`content.js`): Runs on web pages to detect text, questions, and simulate typing
- **Background Script** (`background.js`): Manages extension lifecycle and storage (Service Worker in Manifest V3)
- **Manifest** (`manifest.json`): Defines permissions and extension structure (Manifest V3 format optimized for Opera)

## Key Features for Opera Users

### Manifest V3 Format
This extension uses Manifest V3, which is fully supported by Opera:
- `service_worker` for background processing
- `host_permissions` for cross-origin requests
- Modern `action` API for toolbar integration
- Enhanced security and privacy features

### Chrome/Chromium API Compatibility
Uses `chrome.*` APIs that are fully supported by Opera:
- `chrome.runtime.*`
- `chrome.storage.*`
- `chrome.tabs.*`

## Troubleshooting

### Extension Not Loading in Opera
- Make sure all files are in the `opera-extension/` directory
- Check Opera console (F12) for error messages
- Verify manifest.json syntax is correct
- Ensure Developer mode is enabled in `opera://extensions`
- Try restarting Opera browser

### Text Detection Issues
- Some websites use unique selectors not covered by the extension
- Use the "🐛 Debug Detection" button to see what text is detected
- Check browser console for detection attempts and detailed logs
- Disable Opera's ad blocker temporarily if it interferes

### WPM Discrepancy Issues
- If website results don't match your target WPM, use the Speed Adjustment dropdown
- Check console logs for detailed timing and calculation information
- Turn off randomness for consistent speed testing
- Consider Opera's performance settings and hardware acceleration

### Typing Not Working
- Ensure the website allows programmatic input events
- Try different typing speeds and speed adjustment multipliers
- Check browser console (F12) for detailed debug logs
- Disable Opera Turbo if it causes issues

### AI Features Not Working
- Verify your API key is correctly configured
- Check that you have internet connectivity (or Opera VPN is working properly)
- Ensure the page has detectable questions with input fields
- If using Opera VPN, ensure it doesn't block Google AI APIs

### Opera-Specific Issues
- **VPN Conflicts**: Disable Opera VPN if AI features don't work
- **Ad Blocker Interference**: Temporarily disable if text detection fails
- **Sidebar Issues**: Pin extension icon to toolbar for easier access
- **Opera GX**: Extension fully compatible with gaming-focused variant

## Security and Ethics

### Built-in Safety Features
- ✅ No automatic execution without user interaction
- ✅ Clear countdown before typing starts
- ✅ Configurable delays to prevent system overload
- ✅ Local storage only (no data sent to external servers except AI API)
- ✅ Open source code for transparency
- ✅ API keys stored securely in Opera's encrypted storage

### Responsible Use Guidelines
- 🎓 Use only for educational and learning purposes
- 🏠 Test only on your own systems or with permission
- 📖 Respect website terms of service
- 🤝 Don't use for unfair advantages in competitions
- ⚖️ Consider the impact on others and online communities
- 🔒 Keep your API keys secure and don't share them

### Privacy
- All settings stored locally in Opera's storage
- No telemetry or data collection by the extension
- API requests only sent to Google's Gemini AI when explicitly requested
- API keys encrypted in Opera's secure storage
- Compatible with Opera's privacy and security features

## Compatibility

### Opera Browser Versions
- **Opera**: Version 74 or higher (Manifest V3 support)
- **Opera GX**: Version 74 or higher (Gaming variant fully supported)
- **Opera Developer**: Latest version with experimental features
- **Opera Beta**: Latest beta version

### Cross-Browser Compatibility
This Opera extension is built on Chromium and shares codebase with:
- **Microsoft Edge**: Version 88 or higher
- **Google Chrome**: Version 88 or higher
- **Brave**: Version 1.19 or higher
- **Vivaldi**: Latest version
- Other Chromium-based browsers supporting Manifest V3

## Differences from Firefox Extension

The Opera extension uses the same codebase as the Edge/Chrome extension but differs from the Firefox extension:

| Feature | Firefox Extension | Opera Extension |
|---------|------------------|-----------------|
| Manifest Version | V2 | V3 |
| API | `browser.*` (WebExtensions) | `chrome.*` (Chrome Extensions) |
| Background Script | Background page/script | Service Worker |
| Installation Method | `about:debugging` | `opera://extensions` |

**Choose the right extension:**
- Use `firefox-extension/` for Firefox
- Use `edge-extension/` for Edge or Chrome
- Use `opera-extension/` for Opera (this folder)

## Support

For issues, questions, or contributions, please refer to the main repository:
- **GitHub Repository**: https://github.com/lusandicpt024-sys/AI-Autofill-and-Autotyper
- **Issue Tracker**: Report bugs or request features via GitHub Issues

---

**Remember**: This extension is a learning tool. Always use it responsibly and ethically!
