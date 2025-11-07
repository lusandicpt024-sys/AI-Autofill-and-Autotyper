/**
 * AutoType Chrome Extension - Content Script
 * This script runs on web pages to detect text and simulate typing
 */

class AutoTypeContent {
    constructor() {
        this.textSelectors = [
            // MonkeyType specific selectors
            '#words',               // MonkeyType words container
            '.words',              // MonkeyType words container (alternative)
            '#wordsWrapper .words', // MonkeyType nested structure
            
            // High priority - clean text containers (less likely to have duplication)
            'textarea[readonly]',   // Display-only textareas
            'pre',                  // Preformatted text
            'div.text-to-type',
            'div.typing-text', 
            'div.test-text',
            'div#text',
            '.quote',
            '.typing-quote',
            'div[data-testid="text"]',
            
            // Medium priority - styled containers
            'div[style*="border"]:not(:has(span))', // Styled divs without word spans
            'p.text',
            'div[class*="text"]:not(:has(span))',   // Text divs without spans
            'p[class*="text"]',
            
            // Lower priority - containers that might have word spans
            '.typing-area .text',
            '#typing-test-text',
            'div.words:not(:has(span))', // Only if no word spans inside
            'main p',
            'article p',
            '.content p',
            
            // Last resort - word-based selectors (most likely to cause duplication)
            'div[style*="border"]', // All styled divs
            'div > div[style]',     // Nested styled divs
            'span.word',            // Individual words
            'div.word',
            '.words > span',
            '.words > div',
            'div.words',            // Container with words
            
            // Final fallback
            'div:not([class]):not([id])'
        ];
        
        this.inputSelectors = [
            // MonkeyType specific selectors
            '#wordsInput',          // MonkeyType main input
            '.inputField',          // MonkeyType input field
            'input[style*="opacity: 0"]', // MonkeyType hidden input
            
            // Common typing test selectors
            '#typing-input',        // Common ID
            '.typing-input',        // Common class
            'input[placeholder*="type"]', // Input with "type" in placeholder
            'input[placeholder*="Type"]', // Input with "Type" in placeholder
            'textarea[placeholder*="type"]', // Textarea with "type" in placeholder
            'input[class*="test"]', // Input with "test" in class name
            'textarea[class*="test"]', // Textarea with "test" in class name
            
            'input[type="text"]',
            'textarea',
            'div[contenteditable="true"]',
            'input.typing-input',
            'input#typing-input',
            '.typing-area input',
            '[data-testid="typing-input"]',
            'input[class*="typing"]',
            'textarea[class*="typing"]',
            
            // Fallback selectors
            'input:not([type="hidden"]):not([type="submit"]):not([type="button"])',
            'textarea:not([readonly])',
            '[contenteditable="true"]',
            '[contenteditable=""]'
        ];
        
        this.init();
    }
    
    // AI Question Detection Methods
    detectQuestionsOnPage() {
        console.log('AutoType AI: Starting question detection...');
        
        const questions = [];
        const questionPatterns = [
            /\?[^a-z]*$/,                          // Ends with question mark
            /^(what|how|why|when|where|which|who)\s/i,  // Question words
            /^(explain|describe|define|compare|analyze)\s/i, // Command words
            /^(calculate|solve|find|determine)\s/i,     // Math/problem words
            /(true or false|t\/f)/i,                   // True/false questions
            /^(select|choose|pick)\s/i,                 // Multiple choice
            /fill\s+(in|out)\s+the/i,                  // Fill-in-the-blank
            /complete\s+the\s+following/i,              // Completion questions
        ];
        
        // Find all text nodes that might contain questions
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.trim().length > 10) { // Skip very short text
                textNodes.push(node);
            }
        }
        
        console.log(`Found ${textNodes.length} text nodes to analyze`);
        
        // Analyze each text node for questions
        textNodes.forEach((textNode, index) => {
            const text = textNode.textContent.trim();
            const isQuestion = questionPatterns.some(pattern => pattern.test(text));
            
            if (isQuestion) {
                const parentElement = textNode.parentElement;
                const inputField = this.findNearbyInputField(parentElement);
                
                if (inputField) {
                    const context = this.extractQuestionContext(parentElement);
                    
                    questions.push({
                        id: `q_${index}`,
                        text: text,
                        inputField: this.getElementSelector(inputField),
                        context: context,
                        element: parentElement,
                        input: inputField
                    });
                    
                    console.log(`Found question: "${text.substring(0, 50)}..."`);
                }
            }
        });
        
        console.log(`AutoType AI: Detected ${questions.length} questions with input fields`);
        return questions;
    }
    
    findNearbyInputField(questionElement) {
        // Strategy 1: Look for input fields within the same container
        const container = questionElement.closest('div, form, section, li, tr');
        if (container) {
            const inputs = container.querySelectorAll('input[type="text"], textarea, [contenteditable="true"], select');
            if (inputs.length > 0) {
                return inputs[0]; // Return first found input
            }
        }
        
        // Strategy 2: Look for input fields immediately following the question
        let nextElement = questionElement.nextElementSibling;
        for (let i = 0; i < 5 && nextElement; i++) { // Check up to 5 siblings
            const input = nextElement.querySelector('input[type="text"], textarea, [contenteditable="true"], select');
            if (input) return input;
            
            if (nextElement.matches('input[type="text"], textarea, [contenteditable="true"], select')) {
                return nextElement;
            }
            
            nextElement = nextElement.nextElementSibling;
        }
        
        // Strategy 3: Look by proximity (within 200px)
        const questionRect = questionElement.getBoundingClientRect();
        const allInputs = document.querySelectorAll('input[type="text"], textarea, [contenteditable="true"], select');
        
        let closestInput = null;
        let minDistance = 200; // Max 200px away
        
        allInputs.forEach(input => {
            const inputRect = input.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(questionRect.bottom - inputRect.top, 2) +
                Math.pow(questionRect.left - inputRect.left, 2)
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                closestInput = input;
            }
        });
        
        return closestInput;
    }
    
    extractQuestionContext(questionElement) {
        // Get context from surrounding elements
        const context = [];
        
        // Get parent container context
        const container = questionElement.closest('div, section, form, article');
        if (container) {
            const heading = container.querySelector('h1, h2, h3, h4, h5, h6');
            if (heading) {
                context.push(`Section: ${heading.textContent.trim()}`);
            }
        }
        
        // Get previous sibling context (might be instructions)
        let prev = questionElement.previousElementSibling;
        for (let i = 0; i < 3 && prev; i++) {
            const prevText = prev.textContent.trim();
            if (prevText.length > 20 && prevText.length < 500) {
                context.push(`Context: ${prevText}`);
                break;
            }
            prev = prev.previousElementSibling;
        }
        
        // Get page title
        if (document.title) {
            context.push(`Page: ${document.title}`);
        }
        
        return context.join(' | ');
    }
    
    getElementSelector(element) {
        // Generate a unique selector for the element
        if (element.id) {
            return `#${element.id}`;
        }
        
        if (element.className && typeof element.className === 'string') {
            const classes = element.className.split(' ').filter(c => c).join('.');
            if(classes) {
                return `${element.tagName.toLowerCase()}.${classes}`;
            }
        }
        
        // Generate path-based selector as fallback
        let selector = element.tagName.toLowerCase();
        let parent = element.parentElement;
        
        while (parent && parent !== document.body) {
            const siblings = Array.from(parent.children);
            const index = siblings.indexOf(element) + 1;
            selector = `${parent.tagName.toLowerCase()}:nth-child(${index}) > ${selector}`;
            element = parent;
            parent = parent.parentElement;
        }
        
        return selector;
    }
    
    async queryOpenAIAPI(question, context, apiKey) {
        const prompt = `Context: ${context}\n\nQuestion: ${question}\n\nProvide a direct, concise answer suitable for typing into a form field. Keep it under 500 characters unless it's clearly an essay question.`;
        
        try {
            console.log('AutoType AI: Using OpenAI API');
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('OpenAI API Error Response:', errorText);
                throw new Error(`OpenAI API request failed: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            const answer = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
            
            if (!answer) {
                throw new Error('No answer received from OpenAI API');
            }
            
            return answer.trim();
        } catch (error) {
            console.error('OpenAI API Error:', error);
            throw error;
        }
    }
    
    async typeAIAnswer(inputSelector, answer, speed = 60) {
        const inputField = document.querySelector(inputSelector);
        if (!inputField) {
            throw new Error('Input field not found');
        }
        
        // Focus the input field
        inputField.focus();
        
        // Clear existing content
        if (inputField.tagName === 'INPUT' || inputField.tagName === 'TEXTAREA') {
            inputField.value = '';
        } else if (inputField.contentEditable === 'true') {
            inputField.textContent = '';
        }
        
        // Calculate typing delays based on speed (reuse existing logic)
        const charDelay = Math.round(60000 / (speed * 5)); // Convert WPM to char delay
        const wordDelay = charDelay * 2;
        
        console.log(`AutoType AI: Typing answer at ${speed} WPM (${charDelay}ms per char)`);
        
        // Type the answer character by character
        for (let i = 0; i < answer.length; i++) {
            const char = answer[i];
            
            this.typeCharacter(char, inputField);
            
            // Add delay between characters
            const delay = char === ' ' ? wordDelay : charDelay;
            await this.sleep(delay + (Math.random() * 20)); // Add slight randomness
        }
        
        console.log('AutoType AI: Answer typing completed');
    }
    
    init() {
        // Listen for messages from popup
        browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.handleMessage(message, sendResponse);
            return true; // Will respond asynchronously
        });
    }
    
    async handleMessage(message, sendResponse) {
        try {
            switch (message.action) {
                case 'detectText':
                    const detectedText = this.detectTextToType();
                    sendResponse({text: detectedText});
                    break;
                    
                case 'startTyping':
                    await this.startTyping(message.text, message.settings);
                    sendResponse({success: true});
                    break;
                    
                case 'debugDetection':
                    const debugResult = this.debugTextDetection();
                    sendResponse(debugResult);
                    break;
                    
                case 'detectQuestions':
                    const questions = this.detectQuestionsOnPage();
                    sendResponse({questions: questions});
                    break;
                    
                case 'answerQuestion':
                    try {
                        const answer = await this.queryOpenAIAPI(
                            message.question.text,
                            message.question.context,
                            message.apiKey
                        );
                        sendResponse({answer: answer});
                    } catch (error) {
                        sendResponse({error: error.message});
                    }
                    break;
                    
                case 'typeAIAnswer':
                    try {
                        await this.typeAIAnswer(
                            message.inputSelector,
                            message.answer,
                            message.speed
                        );
                        sendResponse({success: true});
                    } catch (error) {
                        sendResponse({error: error.message});
                    }
                    break;
                    
                default:
                    sendResponse({error: 'Unknown action'});
            }
        } catch (error) {
            console.error('AutoType error:', error);
            sendResponse({error: error.message});
        }
    }
    
    detectTextToType() {
        console.log('AutoType: Starting text detection...');
        
        // Method 1: Try specific typing test selectors
        for (const selector of this.textSelectors) {
            try {
                const elements = document.querySelectorAll(selector);
                
                for (const element of elements) {
                    let text = this.extractTextFromElement(element);
                    
                    // Final cleanup - remove any remaining duplicates
                    text = this.removeDuplicateWords(text);
                    
                    if (this.isValidTypingText(text)) {
                        console.log(`AutoType: Found text using selector "${selector}": ${text.substring(0, 50)}...`);
                        return text;
                    }
                }
            } catch (error) {
                continue;
            }
        }
        
        // Method 2: Look for elements that look like typing test content
        const potentialElements = this.findTypingTestElements();
        for (const element of potentialElements) {
            const text = this.extractTextFromElement(element);
            if (this.isValidTypingText(text)) {
                console.log(`AutoType: Found text using heuristic detection: ${text.substring(0, 50)}...`);
                return text;
            }
        }
        
        // Method 3: Fallback to largest meaningful text block
        const fallbackText = this.findLargestTextBlock();
        if (fallbackText) {
            console.log(`AutoType: Using fallback text: ${fallbackText.substring(0, 50)}...`);
        }
        
        return fallbackText;
    }
    
    findTypingTestElements() {
        const candidates = [];
        
        // Look for elements that might contain typing test text
        const allDivs = document.querySelectorAll('div, p, span, pre, textarea');
        
        for (const element of allDivs) {
            // Skip if element is too small or hidden
            const rect = element.getBoundingClientRect();
            if (rect.width < 100 || rect.height < 20) continue;
            
            const style = window.getComputedStyle(element);
            if (style.display === 'none' || style.visibility === 'hidden') continue;
            
            // Look for elements with borders, backgrounds, or specific styling
            const hasBorder = style.border !== 'none' && style.border !== '';
            const hasBackground = style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent';
            const hasTypingStyle = element.className.toLowerCase().includes('typ') || 
                                 element.className.toLowerCase().includes('text') ||
                                 element.id.toLowerCase().includes('typ') ||
                                 element.id.toLowerCase().includes('text');
            
            // Check if element contains substantial text
            const text = (element.textContent || '').trim();
            const wordCount = text.split(/\s+/).length;
            
            if ((hasBorder || hasBackground || hasTypingStyle) && wordCount >= 10) {
                candidates.push({
                    element: element,
                    score: wordCount + (hasTypingStyle ? 50 : 0) + (hasBorder ? 20 : 0) + (hasBackground ? 10 : 0)
                });
            }
        }
        
        // Sort by score and return elements
        return candidates
            .sort((a, b) => b.score - a.score)
            .slice(0, 5) // Top 5 candidates
            .map(c => c.element);
    }
    
    extractTextFromElement(element) {
        // Handle different types of elements
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            return element.value || element.placeholder;
        }
        
        // Strategy 1: Try to get clean text directly first
        let directText = element.textContent || element.innerText || '';
        directText = this.cleanText(directText);
        
        // If direct text looks good and has proper spacing, use it
        if (directText.length > 20 && directText.includes(' ') && !this.hasWordDuplication(directText)) {
            return directText;
        }
        
        // Strategy 2: Try to extract from word elements if direct text failed
        let text = '';
        const wordElements = element.querySelectorAll('span, div, p');
        
        if (wordElements.length > 0) {
            // Only extract from immediate children to avoid nested duplication
            const immediateWords = [];
            
            for (const wordEl of wordElements) {
                // Skip if this element is nested inside another word element
                if (wordEl.parentElement !== element && 
                    wordEl.parentElement.matches && 
                    wordEl.parentElement.matches('span, div, p') &&
                    element.contains(wordEl.parentElement)) {
                    continue;
                }
                
                const wordText = (wordEl.textContent || wordEl.innerText || '').trim();
                if (wordText && wordText.length > 0 && wordText.length <= 20) { // Reasonable word length
                    immediateWords.push(wordText);
                }
            }
            
            if (immediateWords.length > 0) {
                text = immediateWords.join(' ');
                text = this.cleanText(text);
                
                // Check if this method produced better results
                if (!this.hasWordDuplication(text) && text.length > 20) {
                    return text;
                }
            }
        }
        
        // Strategy 3: Fallback - use direct text even if imperfect
        if (directText.length > 20) {
            // Try to fix duplication in the direct text
            return this.removeDuplicateWords(directText);
        }
        
        // Strategy 4: Last resort - try space insertion if no spaces
        if (directText.length > 50 && !directText.includes(' ')) {
            return this.attemptSpaceInsertion(directText);
        }
        
        return directText;
    }
    
    cleanText(text) {
        return text
            .replace(/\n/g, ' ')           // Replace newlines with spaces
            .replace(/\t/g, ' ')           // Replace tabs with spaces  
            .replace(/\s{2,}/g, ' ')       // Replace multiple spaces with single space
            .trim();
    }
    
    hasWordDuplication(text) {
        const words = text.toLowerCase().split(/\s+/);
        if (words.length < 4) return false;
        
        // Check for immediate word repetition (word word)
        for (let i = 0; i < words.length - 1; i++) {
            if (words[i] === words[i + 1] && words[i].length > 2) {
                return true;
            }
        }
        
        return false;
    }
    
    removeDuplicateWords(text) {
        const words = text.split(/\s+/);
        const cleanWords = [];
        
        for (let i = 0; i < words.length; i++) {
            const currentWord = words[i];
            const prevWord = words[i - 1];
            
            // Skip if this word is identical to the previous word
            if (currentWord.toLowerCase() !== (prevWord || '').toLowerCase()) {
                cleanWords.push(currentWord);
            }
        }
        
        return cleanWords.join(' ');
    }
    
    attemptSpaceInsertion(text) {
        // This method tries to add spaces to text that was extracted without proper spacing
        // It's a heuristic approach for cases like "Theoldoaktreehadstood..."
        
        // Common English word patterns and endings
        const commonWords = [
            'the', 'and', 'of', 'to', 'a', 'in', 'that', 'have', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
            'this', 'but', 'his', 'by', 'from', 'they', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their',
            'had', 'stood', 'tree', 'oak', 'old', 'edge', 'meadow', 'longer', 'anyone', 'could', 'remember', 'massive', 'branches',
            'stretched', 'skyward', 'shelter', 'birds', 'squirrels'
        ];
        
        let result = text.toLowerCase();
        
        // Try to identify word boundaries using common words
        for (const word of commonWords.sort((a, b) => b.length - a.length)) { // Longer words first
            const regex = new RegExp(word + '(?=[a-z])', 'gi');
            result = result.replace(regex, word + ' ');
        }
        
        // Clean up multiple spaces
        result = result.replace(/\s{2,}/g, ' ').trim();
        
        // If we managed to add some spaces, return the result
        if (result.includes(' ') && result.split(' ').length >= 3) {
            // Restore original casing for the first character
            if (text.charAt(0) === text.charAt(0).toUpperCase()) {
                result = result.charAt(0).toUpperCase() + result.slice(1);
            }
            return result;
        }
        
        // If heuristic failed, return original text
        return text;
    }
    
    isValidTypingText(text) {
        if (!text || text.length < 20) return false;
        
        // Check if it's likely typing test text
        const words = text.split(/\s+/);
        const wordCount = words.length;
        
        if (wordCount < 5) return false;
        
        // Avoid navigation text, headers, etc.
        const lowercaseText = text.toLowerCase();
        const skipPhrases = [
            'click here', 'sign up', 'log in', 'menu', 'navigation',
            'copyright', '©', 'privacy', 'terms', 'cookie', 'admin',
            'login', 'register', 'home', 'about', 'contact'
        ];
        
        for (const phrase of skipPhrases) {
            if (lowercaseText.includes(phrase)) return false;
        }
        
        // Check if text looks like typing practice content
        const hasProperSentences = /[.!?]/.test(text);
        const hasReasonableLength = text.length >= 50 && text.length <= 2000;
        const hasGoodWordLength = words.every(word => word.length <= 15); // Avoid URLs or long technical terms
        
        // Positive indicators for typing test content
        const typingIndicators = [
            /the\s+\w+/i,      // Common English patterns
            /and\s+\w+/i,
            /\w+\s+of\s+\w+/i,
            /\w+\s+to\s+\w+/i,
            /\w+ing\s/i,       // Words ending in -ing
        ];
        
        const hasTypingPatterns = typingIndicators.some(pattern => pattern.test(text));
        
        // Check for obvious word duplication that indicates extraction errors
        const hasDuplication = this.hasWordDuplication(text);
        if (hasDuplication) {
            console.log(`AutoType: Rejecting text due to word duplication: ${text.substring(0, 50)}...`);
            return false;
        }
        
        // Text should be substantial, have proper structure, and contain common English patterns
        return hasReasonableLength && hasGoodWordLength && (hasProperSentences || hasTypingPatterns || wordCount >= 15);
    }
    
    findLargestTextBlock() {
        const textElements = document.querySelectorAll('p, div, span, article, main');
        let largestText = '';
        
        for (const element of textElements) {
            const text = this.extractTextFromElement(element);
            
            if (this.isValidTypingText(text) && text.length > largestText.length) {
                largestText = text;
            }
        }
        
        return largestText;
    }
    
    findInputField() {
        console.log('AutoType: Looking for input field...');
        
        // Try specific input selectors first
        for (const selector of this.inputSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                console.log(`Found element with selector "${selector}":`, element);
                if (this.isValidInput(element)) {
                    console.log('✓ Valid input found:', element);
                    return element;
                } else {
                    console.log('✗ Input not valid (hidden/disabled):', element);
                }
            }
        }
        
        // Fallback: find any visible input/textarea
        console.log('Trying fallback input detection...');
        const inputs = document.querySelectorAll('input, textarea, [contenteditable="true"]');
        console.log(`Found ${inputs.length} potential input elements`);
        
        for (const input of inputs) {
            console.log('Checking input:', input, 'Valid:', this.isValidInput(input));
            if (this.isValidInput(input)) {
                console.log('✓ Valid fallback input found:', input);
                return input;
            }
        }
        
        // Last resort: try to find ANY input that might work (less strict)
        console.log('Trying less strict input detection...');
        const allInputs = document.querySelectorAll('input, textarea, [contenteditable="true"], [contenteditable=""]');
        for (const input of allInputs) {
            const style = window.getComputedStyle(input);
            if (style.display !== 'none' && !input.disabled) {
                console.log('✓ Less strict input found:', input);
                return input;
            }
        }
        
        console.log('✗ No input field found');
        return null;
    }
    
    isValidInput(element) {
        if (!element) return false;
        
        // Check if element is visible and interactable
        const style = window.getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden') {
            return false;
        }
        
        // Check if it's not disabled (but allow readonly for some typing tests)
        if (element.disabled) {
            return false;
        }
        
        // For contenteditable, check if it's actually editable
        if (element.contentEditable === 'true' || element.contentEditable === '') {
            return true;
        }
        
        // For input/textarea, allow even if readonly (some typing tests use readonly)
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            return true;
        }
        
        return false;
    }
    
    async startTyping(text, settings) {
        const inputField = this.findInputField();
        
        if (!inputField) {
            throw new Error('No suitable input field found');
        }
        
        // Focus the input field
        inputField.focus();
        inputField.click();
        
        // Clear existing content if it's an input/textarea
        if (inputField.tagName === 'INPUT' || inputField.tagName === 'TEXTAREA') {
            inputField.value = '';
        } else if (inputField.contentEditable === 'true') {
            inputField.textContent = '';
        }
        
        // Type the text character by character
        await this.typeText(text, inputField, settings);
    }
    
    async typeText(text, inputField, settings) {
        const words = text.split(' ');
        
        // Calculate actual typing speed for this session
        const sessionStartTime = Date.now();
        let totalCharsTyped = 0;
        let lastProgressUpdate = sessionStartTime;
        
        console.log(`AutoType: Starting typing session. Target: ${settings.targetWpm} WPM, Char delay: ${settings.charDelay}ms, Word delay: ${settings.wordDelay}ms`);
        

        
        for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
            const word = words[wordIndex];
            
            console.log(`AutoType: Processing word ${wordIndex + 1}/${words.length}: "${word}"`);
            
            // Type each character of the word
            for (let charIndex = 0; charIndex < word.length; charIndex++) {
                const char = word[charIndex];
                
                // Simulate typing the character
                this.typeCharacter(char, inputField);
                totalCharsTyped++;
                
                // Calculate delay with optional randomness
                let charDelay = settings.charDelay;
                
                if (settings.addRandomness) {
                    // Add ±30% randomness to make typing more human-like
                    const randomFactor = 0.7 + (Math.random() * 0.6); // 0.7 to 1.3
                    charDelay = Math.round(charDelay * randomFactor);
                }
                
                // Occasionally add longer pauses (like thinking or hesitation)
                if (settings.addRandomness && Math.random() < 0.05) { // 5% chance
                    charDelay += Math.random() * 200; // Add up to 200ms pause
                }
                
                await this.sleep(charDelay);
                
                // Report progress every 2 seconds
                const now = Date.now();
                if (now - lastProgressUpdate > 2000) {
                    const currentDuration = (now - sessionStartTime) / 1000;
                    const currentWpm = Math.round((totalCharsTyped / 5) / (currentDuration / 60));
                    const progress = Math.round((totalCharsTyped / text.length) * 100);
                    
                    console.log(`AutoType Progress: ${totalCharsTyped} chars, ${currentDuration.toFixed(1)}s, Current WPM: ${currentWpm}`);
                    
                    lastProgressUpdate = now;
                }
            }
            
            // Add space after word (except for the last word)
            if (wordIndex < words.length - 1) {
                this.typeCharacter(' ', inputField);
                totalCharsTyped++;
                
                let wordDelay = settings.wordDelay;
                
                if (settings.addRandomness) {
                    const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2
                    wordDelay = Math.round(wordDelay * randomFactor);
                }
                
                await this.sleep(wordDelay);
            }
        }
        
        // Log final typing statistics
        const sessionDuration = (Date.now() - sessionStartTime) / 1000; // seconds
        const actualWpm = Math.round((totalCharsTyped / 5) / (sessionDuration / 60));
        const averageCharDelay = sessionDuration * 1000 / totalCharsTyped;
        const efficiency = (actualWpm / settings.targetWpm * 100);
        
        console.log(`AutoType Session Complete:
        ═══════════════════════════════════════
        Target WPM: ${settings.targetWpm}
        Actual WPM: ${actualWpm}
        Efficiency: ${efficiency.toFixed(1)}%
        
        Timing Details:
        - Total characters: ${totalCharsTyped}
        - Duration: ${sessionDuration.toFixed(1)}s
        - Avg char delay: ${averageCharDelay.toFixed(1)}ms
        - Set char delay: ${settings.charDelay}ms
        - Set word delay: ${settings.wordDelay}ms
        - Randomness: ${settings.addRandomness ? 'ON' : 'OFF'}
        - Speed adjustment: ${settings.speedAdjustment || 1.0}x
        ═══════════════════════════════════════`);
    }
    
    typeCharacter(char, inputField) {
        // Create and dispatch input events
        const inputEvent = new InputEvent('input', {
            bubbles: true,
            cancelable: true,
            inputType: 'insertText',
            data: char
        });
        
        const keydownEvent = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: char,
            code: this.getKeyCode(char)
        });
        
        const keyupEvent = new KeyboardEvent('keyup', {
            bubbles: true,
            cancelable: true,
            key: char,
            code: this.getKeyCode(char)
        });
        
        // Dispatch events
        inputField.dispatchEvent(keydownEvent);
        
        // Add the character to the input
        if (inputField.tagName === 'INPUT' || inputField.tagName === 'TEXTAREA') {
            inputField.value += char;
        } else if (inputField.contentEditable === 'true') {
            inputField.textContent += char;
        }
        
        inputField.dispatchEvent(inputEvent);
        inputField.dispatchEvent(keyupEvent);
        
        // Trigger change event periodically
        if (Math.random() < 0.1) {
            inputField.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
    
    getKeyCode(char) {
        // Simple key code mapping
        if (char === ' ') return 'Space';
        if (char >= 'a' && char <= 'z') return `Key${char.toUpperCase()}`;
        if (char >= 'A' && char <= 'Z') return `Key${char}`;
        if (char >= '0' && char <= '9') return `Digit${char}`;
        
        // Special characters
        const specialKeys = {
            '.': 'Period',
            ',': 'Comma',
            '!': 'Digit1',
            '?': 'Slash',
            ':': 'Semicolon',
            ';': 'Semicolon',
            "'": 'Quote',
            '"': 'Quote',
            '-': 'Minus',
            '_': 'Minus'
        };
        
        return specialKeys[char] || 'Unidentified';
    }
    
    debugTextDetection() {
        const debugInfo = {
            elementsFound: 0,
            bestCandidate: null,
            rawText: '',
            allCandidates: []
        };
        
        // Test all selectors and log results
        for (const selector of this.textSelectors) {
            try {
                const elements = document.querySelectorAll(selector);
                debugInfo.elementsFound += elements.length;
                
                for (let i = 0; i < elements.length; i++) {
                    const element = elements[i];
                    const text = this.extractTextFromElement(element);
                    const isValid = this.isValidTypingText(text);
                    
                    debugInfo.allCandidates.push({
                        selector: selector,
                        index: i,
                        textPreview: text.substring(0, 50) + '...',
                        textLength: text.length,
                        wordCount: text.split(/\s+/).length,
                        hasDuplication: this.hasWordDuplication(text),
                        isValid: isValid,
                        element: element.tagName + (element.className ? '.' + element.className : '') + (element.id ? '#' + element.id : ''),
                        hasWordSpans: element.querySelectorAll('span, div').length > 0
                    });
                    
                    if (isValid && !debugInfo.bestCandidate) {
                        debugInfo.bestCandidate = `${selector} (${i})`;
                        debugInfo.rawText = text;
                    }
                }
            } catch (error) {
                debugInfo.allCandidates.push({
                    selector: selector,
                    error: error.message
                });
            }
        }
        
        console.log('AutoType Debug Detection:', debugInfo);
        
        // Also try the main detection method
        const detectedText = this.detectTextToType();
        
        return {
            text: detectedText,
            debug: debugInfo
        };
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize content script
new AutoTypeContent();

