# AutoType - AI-Powered Browser Extensions

Powerful browser extensions for Firefox, Edge/Chrome, and Opera that provide dual-mode functionality: typing practice automation and AI-powered question answering. Built for educational purposes to learn about browser automation, DOM manipulation, and AI integration.

## 🚀 Features

### 🎯 **Dual-Mode Architecture**
- **Typing Test Mode**: Practice typing with WPM-based speed control (10-200 WPM)
- **AI Answer Mode**: Detect questions on webpages and auto-generate intelligent answers

### 🤖 **AI-Powered Question Detection**
- Automatically detects 8+ question patterns on any webpage
- Smart proximity-based input field pairing
- Context-aware answer generation using Vertex AI
- Support for multiple input types (text, textarea, contenteditable)

### ⚡ **Advanced Auto-Typing**
- Human-like typing simulation with realistic delays
- Configurable WPM speed control for both modes
- Emergency stop functionality and safety controls
- Batch processing for multiple questions

## ⚠️ Educational Use Only

This extension is designed for educational purposes to learn about:
- Browser extension development and WebExtension APIs
- DOM manipulation and element detection algorithms  
- AI API integration and prompt engineering
- Keyboard event simulation and timing control
- Cross-origin requests and security considerations

**Use responsibly and only on your own systems or with proper authorization.**

## 📁 Project Structure

```
firefox-extension/          # Firefox extension (Manifest V2)
├── manifest.json          # Extension configuration (Manifest V2)
├── popup.html             # Dual-mode user interface
├── popup.js               # UI logic and mode management  
├── content.js             # Core functionality and AI integration
├── background.js          # Background processes
├── icons/                 # Extension icons
└── README.md              # Firefox-specific documentation

edge-extension/             # Edge/Chrome extension (Manifest V3)
├── manifest.json          # Extension configuration (Manifest V3)
├── popup.html             # Dual-mode user interface
├── popup.js               # UI logic with Chrome API
├── content.js             # Core functionality with Chrome API
├── background.js          # Service Worker background script
├── icons/                 # Extension icons
└── README.md              # Edge/Chrome-specific documentation

opera-extension/            # Opera extension (Manifest V3)
├── manifest.json          # Extension configuration (Manifest V3, Opera-optimized)
├── popup.html             # Dual-mode user interface
├── popup.js               # UI logic with Chrome API
├── content.js             # Core functionality with Chrome API
├── background.js          # Service Worker background script
├── icons/                 # Extension icons
└── README.md              # Opera-specific documentation
```

## 🔧 Installation

### **For Firefox**
1. Clone or download this repository
2. Navigate to the `firefox-extension/` folder
3. Open Firefox and go to `about:debugging`
4. Click "This Firefox" in the sidebar
5. Click "Load Temporary Add-on..."
6. Select `manifest.json` from the `firefox-extension/` folder
7. The AutoType extension icon will appear in your toolbar

### **For Edge/Chrome/Chromium Browsers**
1. Clone or download this repository
2. Navigate to the `edge-extension/` folder
3. Open your browser:
   - **Edge**: Navigate to `edge://extensions`
   - **Chrome**: Navigate to `chrome://extensions`
4. Enable "Developer mode" (toggle in the top right)
5. Click "Load unpacked"
6. Select the `edge-extension/` folder
7. The AutoType extension icon will appear in your toolbar

### **For Opera**
1. Clone or download this repository
2. Navigate to the `opera-extension/` folder
3. Open Opera and go to `opera://extensions`
4. Enable "Developer mode" (toggle in the top right)
5. Click "Load unpacked"
6. Select the `opera-extension/` folder
7. The AutoType extension icon will appear in your toolbar

### **Step 4: Get API Key (For AI Features)**
- **Option A**: [Google AI Studio](https://makersuite.google.com/app/apikey) (Gemini API)
- **Option B**: [Vertex AI Studio](https://console.cloud.google.com/vertex-ai/studio) (Google Cloud)

## 🎯 Usage

### **Typing Test Mode** 
1. Navigate to any typing test website
2. Select text you want to practice with
3. Click the AutoType extension icon
4. Set your target WPM (10-200)
5. Click "Start Auto-typing"

### **AI Answer Mode**
1. Navigate to a page with questions or forms
2. Click the AutoType extension icon  
3. Switch to "AI Answer" mode
4. Enter your API key (first time only)
5. Click "Detect Questions" to scan the page
6. Review detected questions and click "Answer All"

## 🔄 Browser Extensions Comparison

All extensions provide identical functionality but use different APIs:

| Feature | Firefox Extension | Edge/Chrome Extension | Opera Extension |
|---------|------------------|----------------------|-----------------|
| Manifest Version | V2 | V3 | V3 |
| API | `browser.*` (WebExtensions) | `chrome.*` (Chrome Extensions) | `chrome.*` (Chrome Extensions) |
| Background Script | Background page/script | Service Worker | Service Worker |
| Compatible Browsers | Firefox 88+ | Edge 88+, Chrome 88+, Brave | Opera 74+, Opera GX 74+ |
| Installation Method | `about:debugging` | `edge://extensions` or `chrome://extensions` | `opera://extensions` |

**Choose the extension based on your browser:**
- Use `firefox-extension/` for Firefox
- Use `edge-extension/` for Edge, Chrome, Brave, or other Chromium-based browsers
- Use `opera-extension/` for Opera and Opera GX (optimized for Opera-specific features)

## 🛡️ Safety Features

- **Manual triggers only**: No automatic actions
- **Emergency stop**: Move mouse to corner or press Ctrl+C
- **Review mode**: Preview AI answers before typing
- **Speed control**: Adjustable WPM for realistic typing
- **Secure storage**: API keys encrypted in browser

## 🔍 Supported Question Types

- Multiple choice questions
- Short answer fields  
- Essay prompts
- Form inputs with labels
- Survey questions
- Quiz questions
- Technical Q&A

## 📚 Documentation

For detailed setup and usage instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

---

This project is for educational purposes. Use responsibly and in compliance with applicable laws and terms of service.

## How It Works

### Desktop Version
1. **Text Detection**: Monitors clipboard changes when you copy selected text
2. **Timing**: Provides a 3-second countdown to position your cursor
3. **Typing Simulation**: Uses `pyautogui` to simulate realistic keystrokes
4. **Safety**: Includes multiple safety mechanisms to prevent runaway automation

### Web Version
1. **Browser Control**: Uses Selenium WebDriver to control Chrome browser
2. **Text Extraction**: Automatically finds text content on typing test websites
3. **Input Detection**: Locates typing input fields using common selectors
4. **Human-like Typing**: Simulates natural typing patterns with variable delays

## Common Selectors for Typing Tests

The web version looks for these common elements:
- Text containers: `.text-to-type`, `.typing-text`, `#text`, `.words`
- Input fields: `input[type='text']`, `textarea`, `[contenteditable='true']`
- Test-specific: `[data-testid='typing-input']`, `.typing-area input`

## Customization

### Adjusting Typing Speed
```python
# In autotype.py
autotyper = AutoTyper(typing_delay=0.03, word_delay=0.08)  # Faster

# In web_autotype.py  
autotyper = WebAutoTyper(typing_delay_range=(0.02, 0.08))  # Faster range
```

### Adding New Website Support
To support a new typing test website, modify the selectors in `web_autotype.py`:

```python
selectors = [
    "your-site-specific-selector",
    "div.text-to-type",
    # ... existing selectors
]
```

## Troubleshooting

### Desktop Version Issues
- **Permission errors**: Run as administrator on Windows, or check accessibility permissions on macOS
- **Typing not working**: Ensure the target application accepts simulated input
- **Can't stop**: Move mouse to top-left corner quickly

### Web Version Issues
- **ChromeDriver errors**: Make sure Chrome and ChromeDriver versions match
- **Can't find text**: The website might use different selectors - check browser dev tools
- **Typing too fast**: Increase the delay ranges in the configuration

### General Issues
- **Import errors**: Make sure all dependencies are installed with `pip install -r requirements.txt`
- **Permission denied**: Some applications block automated input for security

## Learning Objectives

This project demonstrates:

1. **GUI Automation Concepts**
   - Keyboard simulation
   - Mouse control
   - Clipboard interaction

2. **Web Automation**
   - Browser control with Selenium
   - DOM element selection
   - Cross-site compatibility

3. **Safety and Ethics**
   - Implementing safety mechanisms
   - Responsible automation practices
   - User consent and control

4. **Cross-platform Programming**
   - Operating system differences
   - Library compatibility
   - Error handling

## Ethical Considerations

- Only use on your own systems or with explicit permission
- Respect website terms of service
- Don't use for cheating or unfair advantages
- Consider the impact on others (e.g., online competitions)
- Use for learning and personal improvement only

## Contributing

This is an educational project. Feel free to:
- Add support for more typing test websites
- Improve the text detection algorithms
- Enhance the human-like typing simulation
- Add more safety features
- Improve cross-platform compatibility

## License

This project is for educational purposes. Use responsibly and in compliance with applicable laws and terms of service.