/**
 * AutoType Chrome Extension - Popup Script
 * Educational tool for learning web automation concepts
 */

class AutoTypePopup {
    constructor() {
        this.currentText = '';
        this.isTyping = false;
        this.currentMode = 'typing'; // 'typing' or 'ai'
        this.detectedQuestions = [];
        
        // AI credentials
        this.apiKey = null;
        this.projectId = null;
        this.location = null;
        
        this.settings = {
            targetWpm: 60,
            startDelay: 3,
            addRandomness: true,
            speedAdjustment: 1.0,
            // AI settings
            aiTypingSpeed: 60,
            reviewBeforeType: true,
            // Calculated values
            charDelay: 83,
            wordDelay: 200
        };
        
        this.init();
    }
    
    async init() {
        this.loadSettings();
        await this.loadCredentials();
        this.bindEvents();
        this.updateUI();
        this.showOnboardingIfNeeded();
    }
    
    bindEvents() {
        // Main action buttons
        document.getElementById('detectText').addEventListener('click', () => this.detectText());
        document.getElementById('startTyping').addEventListener('click', () => this.startTyping());
        document.getElementById('typeManual').addEventListener('click', () => this.typeManualText());
        document.getElementById('debugDetection').addEventListener('click', () => this.debugDetection());
        
        // WPM input
        document.getElementById('targetWpm').addEventListener('input', (e) => {
            this.settings.targetWpm = parseInt(e.target.value) || 60;
            this.calculateDelaysFromWpm();
            this.updatePresetButtons();
            this.saveSettings();
        });
        
        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const wpm = parseInt(e.target.dataset.wpm);
                this.setTargetWpm(wpm);
            });
        });
        
        // Other settings
        document.getElementById('startDelay').addEventListener('change', (e) => {
            this.settings.startDelay = parseInt(e.target.value);
            this.saveSettings();
        });
        
        document.getElementById('addRandomness').addEventListener('change', (e) => {
            this.settings.addRandomness = e.target.checked;
            this.saveSettings();
        });
        
        document.getElementById('speedAdjustment').addEventListener('change', (e) => {
            this.settings.speedAdjustment = parseFloat(e.target.value);
            this.calculateDelaysFromWpm(); // Recalculate with new adjustment
            this.saveSettings();
        });
        
        // Mode switcher event listeners
        document.getElementById('typingMode').addEventListener('click', () => this.switchToTypingMode());
        document.getElementById('aiMode').addEventListener('click', () => this.switchToAiMode());
        
        // AI mode event listeners
        document.getElementById('configureKey').addEventListener('click', () => this.showApiKeyModal());
        document.getElementById('detectQuestions').addEventListener('click', () => this.detectQuestions());
        document.getElementById('answerAll').addEventListener('click', () => this.answerAllQuestions());
        document.getElementById('previewAnswers').addEventListener('click', () => this.previewAnswers());
        
        // Onboarding modal event listeners
        document.getElementById('onboardingApiKey').addEventListener('input', (e) => this.checkApiKeyFormat(e.target.value));
        document.getElementById('validateKey').addEventListener('click', () => this.validateApiKey());
        document.getElementById('skipSetup').addEventListener('click', () => this.hideOnboardingModal());
    }
    
    // Mode Management
    switchToTypingMode() {
        this.currentMode = 'typing';
        document.getElementById('typingMode').classList.add('active');
        document.getElementById('aiMode').classList.remove('active');
        document.getElementById('typingTestPanel').style.display = 'block';
        document.getElementById('aiAnswerPanel').style.display = 'none';
        document.getElementById('typingModeInfo').style.display = 'block';
        document.getElementById('aiModeInfo').style.display = 'none';
    }
    
    switchToAiMode() {
        if (!this.apiKey) {
            this.showApiKeyModal();
            return;
        }
        
        this.currentMode = 'ai';
        document.getElementById('typingMode').classList.remove('active');
        document.getElementById('aiMode').classList.add('active');
        document.getElementById('typingTestPanel').style.display = 'none';
        document.getElementById('aiAnswerPanel').style.display = 'block';
        document.getElementById('typingModeInfo').style.display = 'none';
        document.getElementById('aiModeInfo').style.display = 'block';
    }
    
    // API Key Management
    async loadCredentials() {
        try {
            const result = await chrome.storage.sync.get(['geminiApiKey', 'geminiProjectId', 'geminiLocation']);
            this.apiKey = result.geminiApiKey;
            this.projectId = result.geminiProjectId;
            this.location = result.geminiLocation;
            this.updateApiKeyStatus();
        } catch (error) {
            console.error('Error loading API credentials:', error);
        }
    }

    isVertexAI(key) {
        // Updated detection: Vertex keys are often long base64 strings
        return key && key.length > 40;
    }

    checkApiKeyFormat(key) {
        const vertexFields = document.getElementById('vertexFields');
        if (this.isVertexAI(key)) {
            vertexFields.style.display = 'block';
        } else {
            vertexFields.style.display = 'none';
        }
        document.getElementById('validateKey').disabled = key.trim().length < 10;
    }
    
    updateApiKeyStatus() {
        const statusText = document.getElementById('keyStatusText');
        const configureBtn = document.getElementById('configureKey');
        const aiActions = document.getElementById('aiActions');
        const aiSettings = document.getElementById('aiSettings');
        
        if (this.apiKey) {
            const keyType = this.isVertexAI(this.apiKey) ? 'Vertex AI' : 'AI Studio';
            statusText.textContent = `${keyType} key configured ✓`;
            statusText.style.color = '#28a745';
            configureBtn.textContent = '🔄 Update';
            aiActions.style.display = 'block';
            aiSettings.style.display = 'block';
        } else {
            statusText.textContent = 'No API key configured';
            statusText.style.color = '#dc3545';
            configureBtn.textContent = '⚙️ Configure';
            aiActions.style.display = 'none';
            aiSettings.style.display = 'none';
        }
    }
    
    async showOnboardingIfNeeded() {
        if (!this.apiKey) {
            const result = await chrome.storage.sync.get('skipOnboarding');
            if (!result.skipOnboarding) {
                this.showOnboardingModal();
            }
        }
    }
    
    showOnboardingModal() {
        document.getElementById('onboardingModal').style.display = 'flex';
        document.getElementById('onboardingApiKey').focus();
    }
    
    hideOnboardingModal() {
        document.getElementById('onboardingModal').style.display = 'none';
        chrome.storage.sync.set({ skipOnboarding: true });
    }
    
    showApiKeyModal() {
        // Reuse onboarding modal for API key configuration
        this.showOnboardingModal();
        if (this.apiKey) {
            document.getElementById('onboardingApiKey').value = this.apiKey;
            document.getElementById('onboardingProjectId').value = this.projectId || '';
            document.getElementById('onboardingLocation').value = this.location || '';
            this.checkApiKeyFormat(this.apiKey); // Show/hide Vertex fields
        }
    }
    
    async validateApiKey() {
        const apiKey = document.getElementById('onboardingApiKey').value.trim();
        const projectId = document.getElementById('onboardingProjectId').value.trim();
        const location = document.getElementById('onboardingLocation').value.trim();

        if (!apiKey) return;
        
        const validationDiv = document.getElementById('keyValidation');
        const validationText = document.getElementById('validationText');
        const spinner = document.getElementById('validationSpinner');
        const validateBtn = document.getElementById('validateKey');
        
        validationDiv.style.display = 'block';
        validationText.textContent = 'Validating API key...';
        validationText.style.color = '#333';
        spinner.style.display = 'block';
        validateBtn.disabled = true;
        
        try {
            const isVertex = this.isVertexAI(apiKey);
            
            let response;
            let endpoint = '';
            
            if (isVertex) {
                // Test Vertex AI key
                if (!projectId || !location) {
                    throw new Error('Project ID and Location are required for Vertex AI');
                }
                console.log(`AutoType: Testing Vertex AI key for project ${projectId} in ${location}`);
                // Use the correct REGIONAL endpoint
                endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-1.5-flash:streamGenerateContent`;
                
                response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}` // Vertex AI often uses Bearer tokens (OAuth), but API keys are also possible. Let's try key first.
                    },
                    body: JSON.stringify({
                        contents: [{
                            role: 'user',
                            parts: [{ text: 'Hello' }]
                        }]
                    })
                });

                // If auth fails, try with ?key= param
                if (response.status === 401 || response.status === 403) {
                     console.log('AutoType: Auth failed with Bearer token, retrying with API key parameter');
                     endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}`;
                     response = await fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{
                                role: 'user',
                                parts: [{ text: 'Hello' }]
                            }]
                        })
                    });
                }

            } else {
                // Test Gemini AI Studio key
                console.log('AutoType: Testing Google AI Studio key');
                
                // *** THIS IS THE FIX ***
                // Changed from 'gemini-1.5-flash' to 'gemini-1.5-flash-latest'
                endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
                
                response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: 'Hello' }] }]
                    })
                });
            }
            
            if (response && response.ok) {
                // Test if we can parse the response
                const responseText = await response.text();
                if (responseText.trim().length === 0) {
                     throw new Error('Empty response from API server');
                }

                try {
                    if (isVertex) {
                        // Vertex AI stream response is a JSON array
                        const data = JSON.parse(responseText);
                        if (data && Array.isArray(data) && data.length > 0 && data[0].candidates) {
                            validationText.textContent = '✅ Vertex AI key validated successfully!';
                        } else {
                            throw new Error('Invalid Vertex AI response format');
                        }
                    } else {
                        // AI Studio response is a single JSON object
                        const data = JSON.parse(responseText);
                        if (data.candidates && data.candidates.length > 0) {
                            validationText.textContent = '✅ Gemini AI key validated successfully!';
                        } else {
                            throw new Error('Invalid AI Studio response format');
                        }
                    }
                    
                    // Save the credentials
                    await chrome.storage.sync.set({ 
                        geminiApiKey: apiKey,
                        geminiProjectId: isVertex ? projectId : null,
                        geminiLocation: isVertex ? location : null
                    });
                    this.apiKey = apiKey;
                    this.projectId = isVertex ? projectId : null;
                    this.location = isVertex ? location : null;
                    
                    validationText.style.color = '#28a745';
                    spinner.style.display = 'none';
                    
                    setTimeout(() => {
                        this.hideOnboardingModal();
                        this.updateApiKeyStatus();
                        if (this.currentMode !== 'ai') {
                            this.switchToAiMode();
                        }
                    }, 1500);

                } catch (parseError) {
                    console.error('Validation parse error:', parseError, 'Response Text:', responseText);
                    throw new Error('Unexpected response format');
                }
            } else {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`API validation failed: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            validationText.textContent = `❌ ${error.message}. Check credentials/console.`;
            validationText.style.color = '#dc3545';
            spinner.style.display = 'none';
            validateBtn.disabled = false;
            console.error('API key validation error:', error);
        }
    }
    
    // AI Question Detection and Answering
    async detectQuestions() {
        this.showStatus('Detecting questions on page...', 'warning');
        
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            const result = await chrome.tabs.sendMessage(tab.id, { action: 'detectQuestions' });
            
            if (result.questions) {
                this.detectedQuestions = result.questions;
                this.displayDetectedQuestions();
                this.showStatus(`Found ${result.questions.length} questions with input fields`, 'success');
                
                document.getElementById('answerAll').disabled = false;
                document.getElementById('previewAnswers').disabled = false;
            } else {
                this.showStatus('No questions with input fields found on this page', 'error');
            }
        } catch (error) {
            this.showStatus('Error detecting questions: ' + error.message, 'error');
            console.error('Question detection error:', error);
        }
    }
    
    displayDetectedQuestions() {
        const questionsArea = document.getElementById('questionsArea');
        const questionsList = document.getElementById('questionsList');
        const questionCount = document.getElementById('questionCount');
        
        questionCount.textContent = this.detectedQuestions.length;
        questionsArea.style.display = 'block';
        
        questionsList.innerHTML = '';
        
        this.detectedQuestions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item';
            questionDiv.innerHTML = `
                <div class="question-text">${question.text.substring(0, 100)}${question.text.length > 100 ? '...' : ''}</div>
                <div style="font-size: 10px; color: #666; margin-top: 3px;">Input: ${question.inputField}</div>
            `;
            questionsList.appendChild(questionDiv);
        });
    }
    
    async previewAnswers() {
        this.showStatus('Generating answer previews...', 'warning');
        
        const aiTypingSpeed = parseInt(document.getElementById('aiTypingSpeed').value);
        
        for (let i = 0; i < this.detectedQuestions.length; i++) {
            const question = this.detectedQuestions[i];
            
            try {
                const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
                const result = await chrome.tabs.sendMessage(tab.id, {
                    action: 'answerQuestion',
                    question: question,
                    apiKey: this.apiKey,
                    projectId: this.projectId,
                    location: this.location
                });
                
                if (result.answer) {
                    question.answer = result.answer;
                    this.updateQuestionDisplay(i, result.answer);
                } else if (result.error) {
                    throw new Error(result.error);
                }
            } catch (error) {
                console.error(`Error getting answer for question ${i}:`, error);
                question.answer = `Error: ${error.message}`;
                this.updateQuestionDisplay(i, question.answer);
            }
        }
        
        this.showStatus('Answer previews generated', 'success');
    }
    
    updateQuestionDisplay(index, answer) {
        const questionItems = document.querySelectorAll('.question-item');
        const questionItem = questionItems[index];
        
        let answerDiv = questionItem.querySelector('.answer-preview');
        if (!answerDiv) {
            answerDiv = document.createElement('div');
            answerDiv.className = 'answer-preview';
            questionItem.appendChild(answerDiv);
        }
        
        answerDiv.textContent = `Answer: ${answer.substring(0, 150)}${answer.length > 150 ? '...' : ''}`;
    }
    
    async answerAllQuestions() {
        if (this.detectedQuestions.length === 0) {
            this.showStatus('Please detect questions first', 'error');
            return;
        }
        
        const reviewEnabled = document.getElementById('reviewBeforeType').checked;
        const aiTypingSpeed = parseInt(document.getElementById('aiTypingSpeed').value);
        
        if (reviewEnabled && !this.detectedQuestions[0].answer) {
            await this.previewAnswers();
        }
        
        if (reviewEnabled) {
            const proceed = confirm(`Ready to type ${this.detectedQuestions.length} AI-generated answers?\n\nThis will start typing in 3 seconds. Make sure you're ready!`);
            if (!proceed) return;
        }
        
        this.showStatus(`Answering ${this.detectedQuestions.length} questions...`, 'warning');
        
        for (let i = 0; i < this.detectedQuestions.length; i++) {
            const question = this.detectedQuestions[i];
            
            try {
                // Get answer if not already generated
                if (!question.answer || question.answer.startsWith('Error:')) {
                    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
                    const result = await chrome.tabs.sendMessage(tab.id, {
                        action: 'answerQuestion',
                        question: question,
                        apiKey: this.apiKey,
                        projectId: this.projectId,
                        location: this.location
                    });
                    
                    if (!result.answer) {
                        throw new Error(result.error || 'No answer generated');
                    }
                    question.answer = result.answer;
                }
                
                // Type the answer
                const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
                await chrome.tabs.sendMessage(tab.id, {
                    action: 'typeAIAnswer',
                    inputSelector: question.inputField,
                    answer: question.answer,
                    speed: aiTypingSpeed
                });
                
                this.showStatus(`Answered question ${i + 1}/${this.detectedQuestions.length}`, 'success');
                
                // Add delay between questions
                if (i < this.detectedQuestions.length - 1) {
                    await this.sleep(1000);
                }
            } catch (error) {
                this.showStatus(`Error answering question ${i + 1}: ${error.message}`, 'error');
                console.error(`Error answering question ${i + 1}:`, error);
            }
        }
        
        this.showStatus('All questions answered!', 'success');
    }
    
    async detectText() {
        this.showStatus('Detecting text on page...', 'warning');
        
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            
            const result = await chrome.tabs.sendMessage(tab.id, {
                action: 'detectText'
            });
            
            if (result && result.text) {
                this.currentText = result.text;
                this.showDetectedText(result.text);
                
                // Show helpful info about the detected text
                const wordCount = result.text.split(/\s+/).length;
                const charCount = result.text.length;
                this.showStatus(`Text detected! ${wordCount} words, ${charCount} characters`, 'success');
                document.getElementById('startTyping').disabled = false;
            } else {
                this.showStatus('No suitable text found on this page. Try refreshing and detecting again.', 'error');
                this.hideDetectedText();
            }
        } catch (error) {
            console.error('Error detecting text:', error);
            this.showStatus('Error detecting text. Make sure the page is loaded.', 'error');
            this.hideDetectedText();
        }
    }
    
    async startTyping() {
        if (!this.currentText || this.isTyping) return;
        
        // Validate WPM
        if (this.settings.targetWpm < 10 || this.settings.targetWpm > 200) {
            this.showStatus('Please enter a valid WPM between 10 and 200.', 'error');
            return;
        }
        
        this.isTyping = true;
        document.getElementById('startTyping').disabled = true;
        
        // Show countdown
        for (let i = this.settings.startDelay; i > 0; i--) {
            this.showStatus(`Starting in ${i} seconds... Click where you want to type!`, 'warning');
            await this.sleep(1000);
        }
        
        this.showStatus(`Typing at ${this.settings.targetWpm} WPM...`, 'warning');
        
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            
            await chrome.tabs.sendMessage(tab.id, {
                action: 'startTyping',
                text: this.currentText,
                settings: this.settings
            });
            
            this.showStatus(`Typing completed! Target: ${this.settings.targetWpm} WPM`, 'success');
        } catch (error) {
            console.error('Error during typing:', error);
            this.showStatus('Error during typing process.', 'error');
        } finally {
            this.isTyping = false;
            document.getElementById('startTyping').disabled = false;
        }
    }
    
    async typeManualText() {
        const text = document.getElementById('manualText').value.trim();
        if (!text) {
            this.showStatus('Please enter some text to type.', 'error');
            return;
        }
        
        this.currentText = text;
        await this.startTyping();
    }
    
    showDetectedText(text) {
        const detectedTextArea = document.getElementById('detectedTextArea');
        const detectedText = document.getElementById('detectedText');
        
        detectedText.textContent = text.length > 200 ? text.substring(0, 200) + '...' : text;
        detectedTextArea.style.display = 'block';
    }
    
    hideDetectedText() {
        document.getElementById('detectedTextArea').style.display = 'none';
        this.currentText = '';
        document.getElementById('startTyping').disabled = true;
    }
    
    showStatus(message, type) {
        const statusArea = document.getElementById('statusArea');
        statusArea.innerHTML = `<div class="status ${type}">${message}</div>`;
    }
    
    updateUI() {
        document.getElementById('targetWpm').value = this.settings.targetWpm;
        document.getElementById('startDelay').value = this.settings.startDelay;
        document.getElementById('addRandomness').checked = this.settings.addRandomness;
        document.getElementById('speedAdjustment').value = this.settings.speedAdjustment || 1.0;
        
        this.calculateDelaysFromWpm();
        this.updatePresetButtons();
    }
    
    calculateDelaysFromWpm() {
        // Calculate delays based on target WPM
        // More precise calculation accounting for real-world factors
        
        const avgWordLength = 5;
        const targetCharsPerSecond = (this.settings.targetWpm * avgWordLength) / 60;
        
        // Base character delay (theoretical)
        const theoreticalCharDelay = 1000 / targetCharsPerSecond;
        
        // Adjust for browser/system overhead (typically 10-20ms per keystroke)
        const systemOverhead = 15; // milliseconds
        const adjustedCharDelay = Math.max(10, theoreticalCharDelay - systemOverhead);
        
        // Apply speed adjustment factor
        const finalCharDelay = adjustedCharDelay / (this.settings.speedAdjustment || 1.0);
        this.settings.charDelay = Math.round(finalCharDelay);
        
        // Word delay calculation - balance between natural pauses and speed
        // For higher WPM, reduce the multiplier to maintain speed
        let wordMultiplier = 2.5;
        if (this.settings.targetWpm >= 80) wordMultiplier = 2.0;
        if (this.settings.targetWpm >= 120) wordMultiplier = 1.5;
        
        this.settings.wordDelay = Math.round(this.settings.charDelay * wordMultiplier);
        
        // Update display with more info
        document.getElementById('calculatedCharDelay').textContent = `${this.settings.charDelay}ms`;
        document.getElementById('calculatedWordDelay').textContent = `${this.settings.wordDelay}ms`;
        
        // Show theoretical vs actual
        const theoreticalWpm = Math.round((60 * 1000) / (theoreticalCharDelay * avgWordLength));
        console.log(`AutoType WPM Calculation:
        Target: ${this.settings.targetWpm} WPM
        Theoretical char delay: ${theoreticalCharDelay.toFixed(1)}ms
        Adjusted char delay: ${this.settings.charDelay}ms
        Theoretical WPM with overhead: ${theoreticalWpm} WPM`);
    }
    
    setTargetWpm(wpm) {
        this.settings.targetWpm = wpm;
        document.getElementById('targetWpm').value = wpm;
        this.calculateDelaysFromWpm();
        this.updatePresetButtons();
        this.saveSettings();
    }
    
    updatePresetButtons() {
        document.querySelectorAll('.preset-btn').forEach(btn => {
            const btnWpm = parseInt(btn.dataset.wpm);
            if (btnWpm === this.settings.targetWpm) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    loadSettings() {
        chrome.storage.local.get(['autoTypeSettings']).then((result) => {
            if (result.autoTypeSettings) {
                this.settings = {...this.settings, ...result.autoTypeSettings};
                this.updateUI();
            }
        });
    }
    
    saveSettings() {
        chrome.storage.local.set({
            autoTypeSettings: this.settings
        });
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async debugDetection() {
        this.showStatus('Running debug detection...', 'warning');
        
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            
            const result = await chrome.tabs.sendMessage(tab.id, {
                action: 'debugDetection'
            });
            
            if (result && result.debug) {
                console.log('AutoType Debug Info:', result.debug);
                
                let debugInfo = `Debug Results:\n`;
                debugInfo += `Elements found: ${result.debug.elementsFound || 0}\n`;
                debugInfo += `Best candidate: ${result.debug.bestCandidate || 'none'}\n`;
                debugInfo += `Raw text preview: ${(result.debug.rawText || '').substring(0, 100)}...\n`;
                
                alert(debugInfo);
                
                if (result.text) {
                    this.currentText = result.text;
                    this.showDetectedText(result.text);
                    document.getElementById('startTyping').disabled = false;
                }
            }
        } catch (error) {
            console.error('Debug error:', error);
            this.showStatus('Debug failed. Check console for details.', 'error');
        }
    }
    
    getWpmCategory(wpm) {
        if (wpm < 20) return "Very Slow";
        if (wpm < 40) return "Slow";
        if (wpm < 60) return "Average";
        if (wpm < 80) return "Good";
        if (wpm < 100) return "Fast";
        if (wpm < 120) return "Very Fast";
        return "Expert";
    }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AutoTypePopup();
});
