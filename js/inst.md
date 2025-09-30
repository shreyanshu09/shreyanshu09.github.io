# 🤖 Gemini AI Chatbot Integration Guide

This guide shows you how to upgrade your portfolio chatbot to use Google's Gemini AI for more intelligent responses while maintaining offline fallback capability.

## 🚀 Quick Setup

### Step 1: Get Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key (keep it secure!)

### Step 2: Add Enhanced Chatbot File
1. Save the `chatbot-ai.js` file in your `js/` folder
2. Add it to your HTML files **after** the main script:

```html
<!-- In all your HTML files, before </body> -->
<script src="js/script.js"></script>
<script src="js/chatbot-ai.js"></script>
<script>
    // Initialize enhanced chatbot
    const enhancedChatbot = new EnhancedChatbot();
    
    // OPTIONAL: Enable AI mode with your API key
    // enhancedChatbot.setApiKey('YOUR_GEMINI_API_KEY_HERE');
</script>
```

### Step 3: Update Main Script
Replace the `getAIResponse` function in your `js/script.js`:

```javascript
// Replace the existing getAIResponse function with this:
async function getAIResponse(message) {
    if (window.enhancedChatbot) {
        return await window.enhancedChatbot.getResponse(message);
    }
    
    // Fallback to original local responses if enhanced chatbot not available
    return getLocalResponse(message);
}

// Keep your existing getLocalResponse function as backup
function getLocalResponse(message) {
    // Your existing local response logic here
}
```

## 🔧 Configuration Options

### Basic Configuration (Free)
```javascript
// Uses local responses only - no API key needed
const enhancedChatbot = new EnhancedChatbot();
```

### AI-Powered Configuration
```javascript
// Uses Gemini AI with fallback to local responses
const enhancedChatbot = new EnhancedChatbot();
enhancedChatbot.setApiKey('YOUR_GEMINI_API_KEY_HERE');
```

### Environment Variable Setup (Recommended)
For security, store your API key in environment variables:

1. Create a `config.js` file (add to .gitignore):
```javascript
// config.js - DO NOT COMMIT TO GIT
const CONFIG = {
    GEMINI_API_KEY: 'your-actual-api-key-here'
};
```

2. Include in your HTML:
```html
<script src="config.js"></script>
<script src="js/chatbot-ai.js"></script>
<script>
    const enhancedChatbot = new EnhancedChatbot();
    if (CONFIG.GEMINI_API_KEY) {
        enhancedChatbot.setApiKey(CONFIG.GEMINI_API_KEY);
    }
</script>
```

3. Add to `.gitignore`:
```
config.js
```

## 🌟 Features

### Intelligent Responses
- **Context-aware**: Understands your specific background and projects
- **Detailed answers**: Provides comprehensive information with metrics
- **Professional tone**: Maintains appropriate communication style
- **Navigation suggestions**: Directs users to relevant portfolio sections

### Fallback System
- **Offline capability**: Works without internet connection
- **API failure handling**: Gracefully falls back to local responses
- **No dependencies**: Doesn't break if API is unavailable

### Enhanced Interactions
- **Quick actions**: Provides buttons to navigate to relevant sections
- **Conversation memory**: Maintains context during the chat session
- **Multi-language support**: Works with your existing language toggle

## 📊 API Usage & Costs

### Gemini API Pricing (as of 2024)
- **Free tier**: 60 requests per minute
- **Pay-as-you-go**: $0.00025 per 1K characters for text input
- **Very affordable**: Most portfolio chats cost less than $0.01

### Usage Optimization
```javascript
// Add rate limiting to prevent excessive API calls
class RateLimitedChatbot extends EnhancedChatbot {
    constructor() {
        super();
        this.lastRequest = 0;
        this.minInterval = 1000; // 1 second between requests
    }
    
    async getResponse(message) {
        const now = Date.now();
        if (now - this.lastRequest < this.minInterval) {
            return this.getLocalResponse(message);
        }
        
        this.lastRequest = now;
        return await super.getResponse(message);
    }
}
```

## 🔒 Security Best Practices

### API Key Security
1. **Never commit API keys** to version control
2. **Use environment variables** or config files (in .gitignore)
3. **Restrict API key** to specific domains in Google Cloud Console
4. **Monitor usage** regularly in Google Cloud Console

### Domain Restrictions
In Google Cloud Console:
1. Go to "Credentials"
2. Edit your API key
3. Under "Website restrictions", add:
   - `yourusername.github.io`
   - `localhost` (for development)

## 🧪 Testing

### Test the Integration
1. **Open browser console** (F12)
2. **Check for errors** when chatbot loads
3. **Test offline mode** (disable network in DevTools)
4. **Verify fallback** works when API fails

### Debug Common Issues
```javascript
// Add debugging to your chatbot initialization
const enhancedChatbot = new EnhancedChatbot();

// Test if API key is working
enhancedChatbot.setApiKey('your-api-key');

// Test a simple query
enhancedChatbot.getResponse('Tell me about Shreyanshu')
    .then(response => console.log('✅ Chatbot working:', response))
    .catch(error => console.error('❌ Chatbot error:', error));
```

## 🚀 Advanced Features

### Custom Personality
Modify the system prompt in `chatbot-ai.js` to adjust the chatbot's personality:

```javascript
buildSystemPrompt() {
    return `You are an enthusiastic AI assistant representing Shreyanshu Bhushan...
    
    PERSONALITY TRAITS:
    - Professional but approachable
    - Enthusiastic about AI and technology
    - Helpful and informative
    - Encourages exploration of the portfolio
    
    // ... rest of the prompt
    `;
}
```

### Analytics Integration
Track chatbot usage:

```javascript
class AnalyticsChatbot extends EnhancedChatbot {
    async getResponse(message) {
        // Track chatbot usage
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chatbot_interaction', {
                'message_type': this.categorizeMessage(message),
                'ai_enabled': this.useAI
            });
        }
        
        return await super.getResponse(message);
    }
    
    categorizeMessage(message) {
        const lower = message.toLowerCase();
        if (lower.includes('project')) return 'projects';
        if (lower.includes('experience')) return 'experience';
        if (lower.includes('contact')) return 'contact';
        return 'general';
    }
}
```

## 🔄 Deployment

### GitHub Pages Deployment
1. **Commit all files** (except config.js with API keys)
2. **Push to main branch**
3. **GitHub Pages will automatically deploy**
4. **API key configuration** needs to be done client-side or use Netlify/Vercel for environment variables

### Alternative Hosting (for Environment Variables)
If you want server-side environment variables, consider:
- **Netlify**: Free hosting with environment variables
- **Vercel**: Free hosting with environment variables
- **Cloudflare Pages**: Free hosting with environment variables

### Example Netlify Deployment
1. Connect your GitHub repo to Netlify
2. Add environment variable in Netlify dashboard:
   - Key: `GEMINI_API_KEY`
   - Value: Your API key
3. Modify your build to inject the variable into a config file

## 🆘 Troubleshooting

### Common Issues

#### "API key not set" error
```javascript
// Check if API key is properly set
console.log('API Key set:', enhancedChatbot.apiKey ? 'Yes' : 'No');
```

#### "CORS error" with API calls
- Make sure you're using HTTPS (GitHub Pages uses HTTPS)
- Check domain restrictions in Google Cloud Console
- Verify API key has proper permissions

#### Chatbot not responding
```javascript
// Test the fallback system
enhancedChatbot.useAI = false;
enhancedChatbot.getResponse('test').then(console.log);
```

#### Rate limiting issues
```javascript
// Add request throttling
const throttledChatbot = new EnhancedChatbot();
throttledChatbot.getResponse = debounce(throttledChatbot.getResponse, 1000);
```

## 📈 Monitoring & Analytics

### Track Usage
```javascript
// Simple usage tracking
let chatInteractions = 0;
const originalGetResponse = enhancedChatbot.getResponse;

enhancedChatbot.getResponse = async function(message) {
    chatInteractions++;
    console.log(`Chatbot interactions: ${chatInteractions}`);
    return await originalGetResponse.call(this, message);
};
```

### Monitor API Costs
- Check Google Cloud Console regularly
- Set up billing alerts
- Monitor request patterns

## 🎯 Next Steps

1. **Deploy basic version** first without AI
2. **Test thoroughly** with local responses
3. **Add Gemini API** gradually
4. **Monitor usage** and costs
5. **Optimize based** on user feedback

---

🚀 **Your AI-powered portfolio chatbot is ready!** Users can now get intelligent, personalized responses about your background and projects.