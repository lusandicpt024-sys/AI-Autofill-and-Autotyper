# AutoType Chrome Extension

A Google Chrome extension version of the AutoType educational tool for learning web automation concepts. This extension can automatically detect text on typing test websites and simulate human-like typing, as well as use AI to answer questions on webpages.

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

1. **Open Google Chrome** and navigate to `chrome://extensions`

2. **Enable "Developer mode"** using the toggle in the top right corner

3. **Click "Load unpacked"** button

4. **Navigate to** the `chrome-extension/` folder in this repository

5. **Select the folder** and click "Select Folder"

6. **The extension is now loaded!** Look for the AutoType icon in your browser toolbar

### Method 2: Install as Packaged Extension

1. **Package the extension:**
   ```bash
   cd chrome-extension/
   zip -r autotype-chrome-extension.zip . -x "*.git*" "README.md"
   ```

2. **Install the .zip file** through Chrome's extension manager

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

6. **Click "👁️ Preview Answers"** to see AI-generated answers (optional)

7. **Click "🤖 Answer All Questions"** to automatically fill in the answers

The extension will intelligently pair detected questions with nearby input fields and generate contextually appropriate answers!

## How It Works

### Text Detection Algorithm
The extension uses a sophisticated selector hierarchy to find text on typing test websites:
1. Checks for specialized typing test elements (highest priority)
2. Searches for clean text containers like `<pre>` and `<textarea readonly>`
3. Looks for styled divs and paragraphs
4. Falls back to generic text containers
5. Uses deduplication to ensure clean text extraction

### Typing Simulation
The extension simulates human-like typing using Chrome's native event system:
- **Accurate WPM calculation**: Converts your target WPM to precise character delays
- **System overhead compensation**: Adjusts for browser processing time
- **Natural variations**: Optional randomness for more realistic typing patterns
- **Word boundaries**: Intelligent pausing between words
- **Event chain**: Proper sequence of keydown → keypress → input → keyup events

### AI Question Detection
The AI mode scans webpages for common question patterns:
- Question marks and interrogative words (what, how, why, etc.)
- Command words (explain, describe, define)
- Math/problem solving keywords (calculate, solve)
- Multiple choice indicators
- Fill-in-the-blank patterns
- Proximity-based input field pairing

## WPM Calibration

If the website shows a different WPM than your target:
1. Use the **Speed Adjustment** dropdown to fine-tune
2. Options range from "Much Slower" (0.7x) to "Super Fast" (1.5x)
3. The extension recalculates delays in real-time
4. Find your perfect speed multiplier through experimentation

## Supported Typing Test Websites

The extension works on most typing test sites, including:
- MonkeyType
- 10FastFingers
- TypeRacer
- Keybr
- Typing.com
- And many more!

## Troubleshooting

### Text Detection Issues
- Click "🐛 Debug Detection" to see detailed element information
- Try refreshing the page and detecting again
- Manually paste text into the "Manual Input" field as a fallback

### Typing Not Working
- Ensure you click in the typing input field during the countdown
- Check that the website accepts simulated keyboard events
- Try adjusting the speed settings if typing is too fast/slow

### WPM Mismatch
- Use the Speed Adjustment calibration feature
- Some websites have their own WPM calculation methods
- The extension shows you the actual delays being used

### AI Mode Issues
- Ensure your API key is valid and has quota available
- Check browser console for detailed error messages
- Verify the webpage has detectable questions and input fields

## Browser Compatibility

This extension is specifically optimized for **Google Chrome** and uses:
- **Manifest V3** - Chrome's latest extension platform
- **Service Workers** - Modern background script architecture
- **Chrome Extension APIs** - `chrome.storage`, `chrome.tabs`, `chrome.runtime`
- **Chrome-optimized event handling** - For reliable typing simulation

Also compatible with other Chromium-based browsers like:
- Brave Browser
- Vivaldi
- Microsoft Edge
- Opera (see opera-extension for Opera-specific optimizations)

## API Key Security

- API keys are stored in **Chrome's secure sync storage**
- Keys are encrypted and never transmitted except to official Google AI endpoints
- Only the extension can access stored credentials
- You can clear keys anytime by clicking "Update" in AI mode

## Privacy

This extension:
- ✅ Only runs when you explicitly click it
- ✅ Does not collect or transmit user data
- ✅ Stores settings locally in your browser
- ✅ Only sends data to Google AI APIs when you use AI features
- ✅ Open source - inspect the code yourself!

## Technical Details

### Manifest V3
This extension uses Chrome's Manifest V3, which provides:
- Enhanced security through service workers
- Better performance and resource management
- Modern permission model with host_permissions
- Content Security Policy enforcement

### Architecture
- **popup.html/js**: User interface and settings management
- **content.js**: Page interaction, text detection, typing simulation
- **background.js**: Service worker for message passing
- **manifest.json**: Extension configuration and permissions

### Permissions
- `activeTab`: Interact with the current webpage
- `storage`: Save settings and API keys
- `clipboardRead/Write`: Copy detected text
- `<all_urls>`: Detect text on any website (only when activated)
- AI API endpoints: Send questions to Google's Gemini AI

## Development

To modify or extend this extension:

1. **Make changes** to the source files in `chrome-extension/`
2. **Reload the extension** in Chrome (`chrome://extensions` → click reload icon)
3. **Test your changes** on various websites
4. **Check the console** for any errors or debugging information

## Limitations

- Some websites may block automated input for security
- Typing tests with anti-cheat measures may detect automation
- AI responses depend on Gemini API availability and quota
- Complex question formats may not be detected accurately

## Contributing

Contributions are welcome! Some ideas:
- Add support for more typing test websites
- Improve text detection algorithms
- Enhance AI question detection patterns
- Add more language support
- Optimize typing simulation accuracy

## License

This project is for educational purposes only. Use responsibly and in compliance with applicable laws and terms of service.

---

**Made for Chrome** • **Manifest V3** • **Educational Tool** • **Open Source**
