# AutoType Safari Extension

An Apple Safari extension version of the AutoType educational tool for learning web automation concepts. This extension can automatically detect text on typing test websites and simulate human-like typing, as well as use AI to answer questions on webpages.

## ⚠️ Educational Use Only

This extension is designed for educational purposes to learn about:
- Browser extension development for Safari
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

### Prerequisites

Before installing the extension, you need:
- **macOS 10.14.4 (Mojave) or later**
- **Safari 14 or later** (Safari 16+ recommended for best compatibility)
- **Xcode** or **Xcode Command Line Tools** (for converting the extension)

### Method 1: Using Safari Web Extension Converter (Recommended)

Safari requires web extensions to be converted into Safari App Extensions. Here's how to do it:

1. **Install Xcode** (if not already installed):
   - Download from the Mac App Store
   - Or install Command Line Tools: `xcode-select --install`

2. **Navigate to the safari-extension folder:**
   ```bash
   cd safari-extension/
   ```

3. **Use the Safari Web Extension Converter:**
   ```bash
   xcrun safari-web-extension-converter --app-name "AutoType" .
   ```
   
   This will create a new Xcode project and macOS app containing your Safari extension.

4. **Open the created project in Xcode:**
   - Navigate to the newly created `AutoType` folder
   - Open `AutoType.xcodeproj`

5. **Build and run the app:**
   - Select your Mac as the build destination
   - Click the Run button (▶️) or press Cmd+R
   - This will build and launch the app containing your Safari extension

6. **Enable the extension in Safari:**
   - Open Safari
   - Go to **Safari > Settings > Extensions**
   - Find "AutoType Educational Tool" in the list
   - Check the box to enable it
   - Click "Turn On" if prompted

7. **Grant necessary permissions:**
   - When first using the extension, Safari will ask for permissions
   - Click "Always Allow" for the best experience

### Method 2: Developer Mode (For Testing)

For development and testing without Xcode:

1. **Enable Safari Developer Mode:**
   - Open Safari
   - Go to **Safari > Settings > Advanced**
   - Check "Show Develop menu in menu bar"

2. **Load Unsigned Extension:**
   - Go to **Develop > Allow Unsigned Extensions**
   - Enter your Mac password when prompted

3. **Enable Extension:**
   - Go to **Safari > Settings > Extensions**
   - Enable the AutoType extension

**Note:** Unsigned extensions need to be re-enabled each time you restart Safari.

### Method 3: Distribution (For Advanced Users)

To create a distributable Safari extension:

1. **Join the Apple Developer Program** ($99/year)
2. **Create an App ID and provisioning profile**
3. **Code sign the extension** with your developer certificate
4. **Submit to the App Store** or distribute via TestFlight

## Usage

### Typing Test Mode

1. **Navigate to a typing test website** (e.g., https://monkeytype.com)

2. **Click the AutoType extension icon** in Safari's toolbar

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

## Safari-Specific Features

### Optimized for macOS
- **Native macOS integration** through Safari App Extension architecture
- **Privacy-focused**: Respects Safari's strict privacy model
- **Secure storage**: Uses Safari's secure storage for API keys
- **Performance**: Optimized for Safari's WebKit rendering engine

### Safari Permissions
Safari has a more granular permission model:
- The extension only runs on pages where you explicitly grant permission
- You can manage permissions per website in Safari Settings
- All permissions are clearly explained before granting

### Content Blocking
This extension works alongside Safari's Content Blockers:
- Does not interfere with ad blockers or privacy tools
- Respects Safari's Intelligent Tracking Prevention

## How It Works

### Text Detection Algorithm
The extension uses a sophisticated selector hierarchy to find text on typing test websites:
1. Checks for specialized typing test elements (highest priority)
2. Searches for clean text containers like `<pre>` and `<textarea readonly>`
3. Looks for styled divs and paragraphs
4. Falls back to generic text containers
5. Uses deduplication to ensure clean text extraction

### Typing Simulation
The extension simulates human-like typing using Safari's native event system:
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

### Extension Not Appearing in Safari
- Make sure you've built the app with Xcode and it's running
- Check Safari > Settings > Extensions to enable it
- Restart Safari if the extension doesn't appear

### Text Detection Issues
- Click "🐛 Debug Detection" to see detailed element information
- Try refreshing the page and detecting again
- Manually paste text into the "Manual Input" field as a fallback
- Check Safari's Web Inspector (Develop menu) for console errors

### Typing Not Working
- Ensure you click in the typing input field during the countdown
- Check that the website accepts simulated keyboard events
- Try adjusting the speed settings if typing is too fast/slow
- Some websites may block automated input - this is expected behavior

### WPM Mismatch
- Use the Speed Adjustment calibration feature
- Some websites have their own WPM calculation methods
- The extension shows you the actual delays being used

### AI Mode Issues
- Ensure your API key is valid and has quota available
- Check Safari's Web Inspector console for detailed error messages
- Verify the webpage has detectable questions and input fields
- Grant necessary permissions when Safari prompts

### Permission Errors
- Safari may ask for permissions multiple times for security
- Always choose "Always Allow" for the best experience
- You can revoke and re-grant permissions in Safari Settings

## Safari Compatibility

This extension is specifically optimized for **Apple Safari** and uses:
- **Manifest V3** - Safari's modern extension platform
- **Service Workers** - Background script architecture
- **WebExtensions API** - Cross-browser compatible API
- **Safari-optimized event handling** - For reliable typing simulation
- **WebKit compatibility** - Optimized for Safari's rendering engine

**Compatible with:**
- macOS Safari 14+ (Safari 16+ recommended)
- iPadOS Safari 15+ (with limitations on iPad)
- iOS Safari 15+ (with limitations on iPhone)

**Note:** Some features may work differently or have limitations on iOS/iPadOS due to Safari's mobile restrictions.

## API Key Security

- API keys are stored in **Safari's secure storage**
- Keys are encrypted and never transmitted except to official Google AI endpoints
- Only the extension can access stored credentials
- Safari's privacy model provides additional protection
- You can clear keys anytime by clicking "Update" in AI mode

## Privacy

This extension:
- ✅ Only runs when you explicitly click it or grant permission
- ✅ Does not collect or transmit user data
- ✅ Stores settings locally in Safari's secure storage
- ✅ Only sends data to Google AI APIs when you use AI features
- ✅ Respects Safari's Intelligent Tracking Prevention
- ✅ Open source - inspect the code yourself!

## Technical Details

### Manifest V3
This extension uses Safari's Manifest V3 implementation, which provides:
- Enhanced security through service workers
- Better performance and resource management
- Modern permission model with host_permissions
- Content Security Policy enforcement

### Architecture
- **popup.html/js**: User interface and settings management
- **content.js**: Page interaction, text detection, typing simulation
- **background.js**: Service worker for message passing
- **manifest.json**: Extension configuration and permissions

### Safari-Specific Considerations
- Uses `chrome.*` API (Safari supports this namespace for compatibility)
- Service workers run in Safari's WebKit environment
- Storage API uses Safari's secure keychain when available
- Event handling optimized for Safari's JavaScript engine

### Permissions
- `activeTab`: Interact with the current webpage
- `storage`: Save settings and API keys
- `clipboardRead/Write`: Copy detected text
- `<all_urls>`: Detect text on any website (only when activated)
- AI API endpoints: Send questions to Google's Gemini AI

## Development

To modify or extend this extension:

1. **Make changes** to the source files in `safari-extension/`

2. **If using Xcode:**
   - Rebuild the project (Cmd+B)
   - Relaunch the app (Cmd+R)

3. **If using unsigned mode:**
   - Reload the extension in Safari Settings > Extensions
   - Or use Develop > Reload Extension

4. **Test your changes** on various websites

5. **Check the Web Inspector** for any errors:
   - Enable Develop menu in Safari Settings
   - Right-click extension popup → Inspect Element
   - Check console for debugging information

## Differences from Chrome Extension

While the core functionality is identical, there are some Safari-specific differences:

1. **Installation**: Requires conversion to Safari App Extension format
2. **Distribution**: Must be distributed through Mac App Store or signed with Apple Developer certificate
3. **Permissions**: Safari's permission model is more strict and granular
4. **Performance**: Optimized for WebKit instead of Blink/Chromium
5. **APIs**: Uses WebExtensions API with Safari-specific behaviors
6. **Storage**: Can leverage Safari's keychain for secure storage

## Limitations

- Extension requires macOS 10.14.4 or later
- Some websites may block automated input for security
- Typing tests with anti-cheat measures may detect automation
- AI responses depend on Gemini API availability and quota
- Complex question formats may not be detected accurately
- Safari's security model may require additional permission grants
- iOS/iPadOS versions have mobile Safari limitations

## Contributing

Contributions are welcome! Some ideas:
- Add support for more typing test websites
- Improve text detection algorithms for Safari
- Enhance AI question detection patterns
- Add more language support
- Optimize typing simulation accuracy for WebKit
- Improve iOS/iPadOS compatibility

## License

This project is for educational purposes only. Use responsibly and in compliance with applicable laws and terms of service.

---

**Made for Safari** • **Manifest V3** • **Educational Tool** • **Open Source** • **Privacy-Focused**
