/**
 * AutoType Firefox Extension - Background Script
 * Handles extension lifecycle and cross-tab communication
 */

class AutoTypeBackground {
    constructor() {
        this.init();
    }
    
    init() {
        // Handle extension installation
        browser.runtime.onInstalled.addListener((details) => {
            if (details.reason === 'install') {
                this.showWelcomeNotification();
            }
        });
        
        // Handle browser action clicks (when popup is disabled)
        browser.browserAction.onClicked.addListener((tab) => {
            this.handleBrowserAction(tab);
        });
        
        // Listen for messages from content scripts or popup
        browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.handleMessage(message, sender, sendResponse);
            return true;
        });
    }
    
    showWelcomeNotification() {
        // Show a welcome message when extension is installed
        browser.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon-48.png',
            title: 'AutoType Extension Installed',
            message: 'Educational typing automation tool ready! Click the extension icon to get started.'
        });
    }
    
    handleBrowserAction(tab) {
        // This is called when the extension icon is clicked
        // The popup should normally handle this, but this is a fallback
        console.log('AutoType extension activated on tab:', tab.url);
    }
    
    handleMessage(message, sender, sendResponse) {
        switch (message.action) {
            case 'getSettings':
                this.getSettings(sendResponse);
                break;
                
            case 'saveSettings':
                this.saveSettings(message.settings, sendResponse);
                break;
                
            case 'logActivity':
                this.logActivity(message.data);
                sendResponse({success: true});
                break;
                
            default:
                sendResponse({error: 'Unknown action'});
        }
    }
    
    async getSettings(sendResponse) {
        try {
            const result = await browser.storage.local.get(['autoTypeSettings']);
            const defaultSettings = {
                targetWpm: 60,
                startDelay: 3,
                addRandomness: true,
                speedAdjustment: 1.0,
                charDelay: 83,    // Calculated from 60 WPM
                wordDelay: 200,   // Calculated from 60 WPM
                enableLogging: false
            };
            
            const settings = result.autoTypeSettings || defaultSettings;
            sendResponse({settings});
        } catch (error) {
            sendResponse({error: error.message});
        }
    }
    
    async saveSettings(settings, sendResponse) {
        try {
            await browser.storage.local.set({autoTypeSettings: settings});
            sendResponse({success: true});
        } catch (error) {
            sendResponse({error: error.message});
        }
    }
    
    logActivity(data) {
        // Log extension activity for debugging/educational purposes
        console.log('AutoType Activity:', {
            timestamp: new Date().toISOString(),
            ...data
        });
    }
}

// Initialize background script
new AutoTypeBackground();