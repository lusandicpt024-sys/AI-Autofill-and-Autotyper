# AutoType Firefox Extension

A Firefox extension version of the AutoType educational tool for learning web automation concepts. This extension can automatically detect text on typing test websites and simulate human-like typing.

## ⚠️ Educational Use Only

This extension is designed for educational purposes to learn about:
- Browser extension development
- Web automation techniques
- DOM manipulation and text detection
- Event simulation and user interaction
- Responsible automation practices

**Use responsibly and only for learning purposes. Respect website terms of service.**

## Features

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

### Method 1: Load as Temporary Extension (Recommended for Development)

1. **Open Firefox** and navigate to `about:debugging`

2. **Click "This Firefox"** in the left sidebar

3. **Click "Load Temporary Add-on..."**

4. **Navigate to** `/home/lusandicpt024/Work/WebDev/autotype/firefox-extension/`

5. **Select** `manifest.json` and click "Open"

6. **The extension is now loaded!** Look for the AutoType icon in your browser toolbar

### Method 2: Install as Packaged Extension

1. **Package the extension:**
   ```bash
   cd /home/lusandicpt024/Work/WebDev/autotype/firefox-extension/
   zip -r autotype-extension.zip . -x "*.git*" "README.md" "generate_icons.sh"
   ```

2. **Install the .zip file** through Firefox's add-on manager (requires developer mode)

## Usage

### Basic Usage

1. **Navigate to a typing test website** (e.g., https://somewheretypingtest.com/test)

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

### Manual Text Input

1. **Open the extension popup**

2. **Enter text** in the "Manual Input" textarea

3. **Click "Type Manual Text"** to type your custom text

### Settings Configuration

Adjust these settings in the extension popup:

- **Target WPM**: Set your desired typing speed (10-200 WPM)
- **Speed Adjustment**: Fine-tune with multipliers (Much Slower 0.7x to Super Fast 1.5x)
- **Randomness**: Add human-like variation to typing patterns
- **Start Delay**: Countdown before typing starts (default: 3 seconds)

**Quick Presets Available:**
- **Slow (30 WPM)** - Learning/practice mode
- **Normal (60 WPM)** - Average typing speed  
- **Fast (90 WPM)** - Above average performance
- **Pro (120 WPM)** - Professional level

## Supported Websites

The extension works with many typing test websites by detecting common selectors:

### Tested Compatible Sites
- Most typing test websites using standard HTML structures
- Sites with `.text-to-type`, `.typing-text`, or similar classes
- Sites with `input[type="text"]`, `textarea`, or `contenteditable` inputs

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

### Browser Extension Architecture

- **Popup Script** (`popup.js`): Handles user interface, WPM calculations, and settings
- **Content Script** (`content.js`): Runs on web pages to detect text and simulate realistic typing
- **Background Script** (`background.js`): Manages extension lifecycle and storage  
- **Manifest** (`manifest.json`): Defines permissions and extension structure

### Key Features Implementation

- **WPM Calculation**: Automatically converts target WPM to appropriate character/word delays
- **Speed Adjustment**: Multiplier system for fine-tuning actual vs target WPM discrepancies  
- **Text Detection**: Multi-layered approach with fallbacks for different website structures
- **Typing Simulation**: Realistic event generation with optional randomness and pauses
- **Debug Logging**: Comprehensive console output for troubleshooting and analysis

## Current Extension Interface

The extension popup provides a clean, focused interface:

### Main Controls
- **Target WPM Input** - Set your desired typing speed (10-200)
- **Speed Adjustment Dropdown** - Fine-tune with multipliers (0.7x to 1.5x)
- **Randomness Checkbox** - Toggle human-like typing variations
- **Quick Preset Buttons** - Slow(30)/Normal(60)/Fast(90)/Pro(120) WPM

### Action Buttons
- **🔍 Detect Text on Page** - Automatically find text to type
- **⌨️ Start Auto-Typing** - Begin typing detected text
- **🐛 Debug Detection** - Troubleshoot text detection issues
- **Type Manual Text** - Use custom text input

### Status Display
- Real-time status messages and feedback
- Detected text preview area (when applicable)
- Clear error messages and guidance

### Removed Features (Previously Available)
- ~~Live statistics panel~~ - Removed for improved stability
- ~~Real-time WPM display~~ - Use browser console for detailed logs
- ~~Progress tracking display~~ - Check console for comprehensive progress data

## Development

### File Structure
```
firefox-extension/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup interface
├── popup.js              # Popup logic and UI handling
├── content.js            # Page content detection and typing
├── background.js         # Extension background processes
├── icons/                # Extension icons (16, 32, 48, 128px)
├── generate_icons.sh     # Icon generation script
└── README.md             # This file
```

### Adding Support for New Websites

To add support for a new typing test website:

1. **Inspect the website's HTML structure** using browser dev tools

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
- Check Firefox console (F12) for error messages
- Verify manifest.json syntax is correct

### Text Detection Issues
- Some websites use unique selectors not covered by the extension
- Use the "🐛 Debug Detection" button to see what text is detected
- Check browser console for detection attempts and detailed logs
- Add new selectors to `content.js` as needed

### WPM Discrepancy Issues
- If website results don't match your target WPM, use the Speed Adjustment dropdown
- Run `./wpm_diagnostic.sh` for comprehensive troubleshooting guide
- Check console logs for detailed timing and calculation information
- Turn off randomness for consistent speed testing

### Typing Not Working
- Ensure the website allows programmatic input events
- Some sites may block automated typing for security
- Try different typing speeds and speed adjustment multipliers
- Check browser console (F12) for detailed debug logs
- Use "🐛 Debug Detection" button to verify text detection

### Permission Issues
- The extension requires `activeTab` and `storage` permissions
- Some sites may have Content Security Policy restrictions

## Security and Ethics

### Built-in Safety Features
- ✅ No automatic execution without user interaction
- ✅ Clear countdown before typing starts
- ✅ Configurable delays to prevent system overload
- ✅ Local storage only (no data sent to external servers)
- ✅ Open source code for transparency

### Responsible Use Guidelines
- 🎓 Use only for educational and learning purposes
- 🏠 Test only on your own systems or with permission
- 📖 Respect website terms of service
- 🤝 Don't use for unfair advantages in competitions
- ⚖️ Consider the impact on others and online communities

### Privacy
- All settings stored locally in browser
- No telemetry or data collection
- No network requests made by the extension
- No user data transmitted anywhere

## Educational Value

This extension demonstrates:

1. **Browser Extension Development**
   - Manifest configuration
   - Content script injection
   - Cross-context messaging
   - Extension APIs usage

2. **Web Automation Techniques**
   - DOM traversal and element selection
   - Event simulation and dispatch
   - Text processing and validation
   - Cross-site compatibility

3. **User Interface Design**
   - Extension popup creation
   - Settings management
   - User feedback and status display
   - Responsive design principles

4. **Ethical Programming Practices**
   - User consent and control
   - Transparent functionality
   - Safety mechanisms
   - Responsible disclosure

## Contributing

Feel free to enhance this educational extension:

- Add support for more typing test websites
- Improve text detection algorithms
- Enhance typing realism with advanced patterns
- Add more configuration options
- Improve error handling and user feedback

## License

This project is for educational purposes. Use responsibly and in compliance with applicable laws and website terms of service.

---

**Remember**: This extension is a learning tool. Always use it responsibly and ethically!