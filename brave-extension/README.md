# AutoType Brave Extension

A Brave browser extension version of the AutoType educational tool for learning web automation concepts. This extension can automatically detect text on typing test websites and simulate human-like typing, as well as use AI to answer questions on webpages.

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

1. **Open Brave Browser** and navigate to `brave://extensions`

2. **Enable "Developer mode"** using the toggle in the top right corner

3. **Click "Load unpacked"** button

4. **Navigate to** the `brave-extension/` folder in this repository

5. **Select the folder** and click "Select Folder"

6. **The extension is now loaded!** Look for the AutoType icon in your browser toolbar

### Method 2: Install as Packaged Extension

1. **Package the extension:**
   ```bash
   cd brave-extension/
   zip -r autotype-brave-extension.zip . -x "*.git*" "README.md"
   ```

2. **Drag and drop the .zip file** into `brave://extensions` with Developer mode enabled

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

## Brave-Specific Features

This extension is optimized for Brave browser with the following considerations:

### 🦁 **Brave Integration**
- Full compatibility with Brave's Chromium-based architecture
- Seamless integration with Brave Shields (privacy protection)
- Optimized for Brave Rewards and BAT ecosystem
- Compatible with Brave's built-in ad blocker and tracking protection
- Works with Brave's aggressive fingerprinting protection

### 🚀 **Performance Optimizations**
- Efficient resource usage optimized for Brave's memory management
- Fast loading times leveraging Brave's rendering engine
- Minimal background activity to preserve battery life
- Compatible with Brave's built-in Tor integration
- Optimized for Brave's hardware acceleration

### 🔒 **Privacy & Security**
- Works seamlessly with Brave Shields (ad/tracker blocking)
- Compatible with Brave's fingerprinting protection
- Respects Brave's security settings and site permissions
- Secure API key storage using Brave's encrypted storage
- Works with Brave's private windows and Tor tabs
- No telemetry or tracking (aligned with Brave's privacy principles)

### 🎮 **Brave-Specific Advantages**
- Faster page loads due to Brave's built-in ad blocking
- Lower memory usage compared to Chrome
- Better battery life on laptops
- Enhanced privacy by default
- Works with Brave's IPFS integration
- Compatible with Web3 features

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
- **Manifest** (`manifest.json`): Defines permissions and extension structure (Manifest V3 format optimized for Brave)

## Key Features for Brave Users

### Manifest V3 Format
This extension uses Manifest V3, which is fully supported by Brave:
- `service_worker` for background processing
- `host_permissions` for cross-origin requests
- Modern `action` API for toolbar integration
- Enhanced security and privacy features

### Chrome/Chromium API Compatibility
Uses `chrome.*` APIs that are fully supported by Brave:
- `chrome.runtime.*`
- `chrome.storage.*`
- `chrome.tabs.*`

## Troubleshooting

### Extension Not Loading in Brave
- Make sure all files are in the `brave-extension/` directory
- Check Brave console (F12) for error messages
- Verify manifest.json syntax is correct
- Ensure Developer mode is enabled in `brave://extensions`
- Try restarting Brave browser

### Text Detection Issues
- Some websites use unique selectors not covered by the extension
- Use the "🐛 Debug Detection" button to see what text is detected
- Check browser console for detection attempts and detailed logs
- Temporarily disable Brave Shields if it interferes with detection

### WPM Discrepancy Issues
- If website results don't match your target WPM, use the Speed Adjustment dropdown
- Check console logs for detailed timing and calculation information
- Turn off randomness for consistent speed testing
- Consider Brave's performance settings and hardware acceleration

### Typing Not Working
- Ensure the website allows programmatic input events
- Try different typing speeds and speed adjustment multipliers
- Check browser console (F12) for detailed debug logs
- Disable Brave Shields temporarily if it blocks typing events

### AI Features Not Working
- Verify your API key is correctly configured
- Check that you have internet connectivity
- Ensure the page has detectable questions with input fields
- If using Brave's Tor mode, AI features may not work (exit Tor for AI mode)
- Check Brave Shields aren't blocking Google AI APIs

### Brave-Specific Issues
- **Shields Blocking**: Temporarily lower Brave Shields if text detection fails
- **Tor Tab Issues**: AI features don't work in Tor tabs (use normal tabs)
- **Fingerprinting Protection**: May interfere with typing simulation (adjust in settings)
- **Private Window**: Extension may need to be enabled for private windows separately
- **HTTPS Everywhere**: Ensure sites are accessed via HTTPS for best compatibility

## Security and Ethics

### Built-in Safety Features
- ✅ No automatic execution without user interaction
- ✅ Clear countdown before typing starts
- ✅ Configurable delays to prevent system overload
- ✅ Local storage only (no data sent to external servers except AI API)
- ✅ Open source code for transparency
- ✅ API keys stored securely in Brave's encrypted storage

### Responsible Use Guidelines
- 🎓 Use only for educational and learning purposes
- 🏠 Test only on your own systems or with permission
- 📖 Respect website terms of service
- 🤝 Don't use for unfair advantages in competitions
- ⚖️ Consider the impact on others and online communities
- 🔒 Keep your API keys secure and don't share them

### Privacy
- All settings stored locally in Brave's storage
- No telemetry or data collection by the extension
- API requests only sent to Google's Gemini AI when explicitly requested
- API keys encrypted in Brave's secure storage
- Compatible with Brave's privacy and security features
- Aligned with Brave's privacy-first philosophy

## Compatibility

### Brave Browser Versions
- **Brave**: Version 1.19 or higher (Manifest V3 support)
- **Brave Beta**: Latest beta version
- **Brave Nightly**: Latest nightly builds

### Cross-Browser Compatibility
This Brave extension is built on Chromium and shares codebase with:
- **Microsoft Edge**: Version 88 or higher
- **Google Chrome**: Version 88 or higher
- **Opera**: Version 74 or higher
- **Vivaldi**: Latest version
- Other Chromium-based browsers supporting Manifest V3

## Differences from Firefox Extension

The Brave extension uses the same codebase as the Edge/Chrome extension but differs from the Firefox extension:

| Feature | Firefox Extension | Brave Extension |
|---------|------------------|-----------------|
| Manifest Version | V2 | V3 |
| API | `browser.*` (WebExtensions) | `chrome.*` (Chrome Extensions) |
| Background Script | Background page/script | Service Worker |
| Installation Method | `about:debugging` | `brave://extensions` |
| Privacy Features | Standard Firefox | Enhanced with Brave Shields |

**Choose the right extension:**
- Use `firefox-extension/` for Firefox
- Use `edge-extension/` for Edge or Chrome
- Use `opera-extension/` for Opera
- Use `brave-extension/` for Brave (this folder)

## Why Use Brave Extension?

### Advantages Over Other Browsers
1. **Privacy by Default**: Brave Shields block ads and trackers automatically
2. **Better Performance**: Built-in ad blocking means faster page loads
3. **Battery Efficiency**: Lower resource usage extends laptop battery life
4. **Security**: Enhanced fingerprinting protection and HTTPS upgrades
5. **Rewards**: Earn BAT tokens while browsing (optional)
6. **Web3 Ready**: Built-in crypto wallet and IPFS support

### Brave vs Chrome
- Brave uses less memory and CPU
- Brave blocks ads and trackers by default
- Brave doesn't track your browsing
- Brave loads pages faster due to ad blocking
- Same extension compatibility as Chrome

## Development

### File Structure
```
brave-extension/
├── manifest.json          # Extension configuration (Manifest V3)
├── popup.html            # Extension popup interface
├── popup.js              # Popup logic and UI handling (Chrome API)
├── content.js            # Page content detection and typing (Chrome API)
├── background.js         # Extension background processes (Service Worker)
├── icons/                # Extension icons (16, 32, 48, 128px)
└── README.md             # This file
```

### Testing the Extension

Run the test script to validate the extension:

```bash
cd brave-extension/
./test_extension.sh
```

This will check:
- All required files are present
- manifest.json is valid JSON
- API compatibility (chrome.* APIs)
- Extension structure and permissions

## Support

For issues, questions, or contributions, please refer to the main repository:
- **GitHub Repository**: https://github.com/lusandicpt024-sys/AI-Autofill-and-Autotyper
- **Issue Tracker**: Report bugs or request features via GitHub Issues

---

**Remember**: This extension is a learning tool. Always use it responsibly and ethically!

## Quick Start Guide

### For First-Time Users

1. **Install the extension** from `brave://extensions`
2. **Visit a typing test site** like monkeytype.com
3. **Click the extension icon** in your toolbar
4. **Choose your mode**: Typing Test or AI Answer
5. **Start learning** about web automation!

### For AI Mode

1. **Get a free API key** from Google AI Studio
2. **Switch to AI Answer mode** in the extension
3. **Configure your key** (one-time setup)
4. **Visit any webpage with questions**
5. **Let AI help you learn** how automation works!

### Tips for Brave Users

- Keep Brave Shields enabled for privacy (extension works with it)
- Use normal tabs for AI features (not Tor tabs)
- Extension works great with Brave's ad blocking
- Lower resource usage than Chrome extensions
- Perfect for privacy-conscious learners
