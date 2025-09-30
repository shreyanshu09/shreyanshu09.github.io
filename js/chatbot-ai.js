/**
 * Enhanced Chatbot with Gemini AI Integration
 * This file provides an upgraded chatbot that can use Google's Gemini API
 * for more intelligent responses while maintaining offline fallback capability
 */

class EnhancedChatbot {
    constructor() {
        this.apiKey = null; // Set this to your Gemini API key
        this.isOnline = navigator.onLine;
        this.useAI = false; // Set to true when API key is available
        
        // Knowledge base about Shreyanshu (same as in main script.js)
        this.knowledgeBase = {
            personal: {
                name: "Shreyanshu Bhushan",
                location: "Seoul, South Korea",
                email: "shreyanshubhushan@gmail.com",
                phone: "+82 10-6715-9903",
                linkedin: "https://www.linkedin.com/in/shreyanshu09/",
                github: "https://github.com/shreyanshu09",
                visa: "F-2 residency visa in Korea (no visa sponsorship required)"
            },
            specializations: [
                "Document AI",
                "LLMs/sLLMs (Large and Small Language Models)",
                "Natural Language Processing (NLP)",
                "Optical Character Recognition (OCR)",
                "Vision-Language Integration",
                "Computer Vision"
            ],
            experience: {
                current: "AI Researcher at NEOALI Co. Ltd., Seoul, South Korea (May 2023 - Present)",
                totalYears: "5+ years combined industry and research experience"
            },
            education: {
                masters: "M.Sc. in Artificial Intelligence, Kyungpook National University (Mar 2021 - Feb 2023), GPA: 4.1/4.3",
                bachelor_korea: "Bachelor of Science in Engineering, Computer Science, Kyungpook National University (Sep 2018 - Jul 2020), GPA: 3.81/4.3",
                bachelor_india: "Bachelor of Technology, Computer Science and Engineering, Christ University, India (Jul 2016 - Aug 2018), GPA: 3.6/4.0"
            },
            projects: {
                flagship: {
                    name: "LayGen",
                    description: "Multi-platform, end-to-end AI document translation and processing ecosystem",
                    achievement: "🥇 1st Place Winner - Intel AI PC Innovation Challenge 2024",
                    impact: "95%+ format retention, 60% decrease in processing time, 100% offline security"
                },
                major: [
                    "AskMe - Intelligent Document QA using RAG architecture",
                    "VLMFusion OCR - Vision-Language Model enhanced OCR engine",
                    "BlockNet - Multilingual Block Diagram Analysis (ACL 2024 publication)",
                    "AdVision Pro - AI Marketing Visual Generation",
                    "Chart2Excel - Chart Image to Excel conversion (🥈 AI Grand Challenge 2023)"
                ]
            },
            publications: [
                "ACL 2024: BlockNet - Block Diagram Summarization through Local-Global Fusion",
                "AACL-IJCNLP 2022: Block Diagram-to-Text Understanding"
            ],
            awards: [
                "🥇 1st Place: Intel AI PC Innovation Challenge 2024 (LayGen)",
                "🥈 2nd Place: AI Grand Challenge 2023 (Chart2Excel + Chart QA)",
                "📄 ACL 2024 Publication",
                "🏆 Multiple academic scholarships"
            ],
            skills: {
                programming: ["Python", "Java", "C++", "JavaScript", "ElectronJS"],
                ai_ml: ["PyTorch", "TensorFlow", "HuggingFace Transformers", "OpenCV"],
                specialties: ["Document AI", "LLMs/sLLMs", "OCR", "Computer Vision", "NLP"],
                languages: ["English (fluent)", "Hindi (native)", "Korean (beginner)"]
            }
        };
        
        this.systemPrompt = this.buildSystemPrompt();
        this.initializeNetworkListener();
    }

    /**
     * Build system prompt for AI with comprehensive knowledge about Shreyanshu
     */
    buildSystemPrompt() {
        return `You are an AI assistant representing Shreyanshu Bhushan, an AI Researcher and Document Intelligence Expert. 

IMPORTANT: You should ONLY answer questions about Shreyanshu Bhushan based on the information provided below. If asked about anything not related to Shreyanshu, politely redirect the conversation back to him.

PERSONAL INFORMATION:
- Name: Shreyanshu Bhushan
- Location: Seoul, South Korea
- Email: shreyanshubhushan@gmail.com
- Phone: +82 10-6715-9903
- LinkedIn: https://www.linkedin.com/in/shreyanshu09/
- GitHub: https://github.com/shreyanshu09
- Visa Status: F-2 residency visa in Korea (no sponsorship required)

CURRENT POSITION:
AI Researcher at NEOALI Co. Ltd., Seoul, South Korea (May 2023 - Present)
- 2+ years industry experience, 3+ years research experience
- Specializes in Document AI, LLMs/sLLMs, NLP, OCR, Vision-Language Integration

EDUCATION:
- M.Sc. in Artificial Intelligence, Kyungpook National University (2021-2023), GPA: 4.1/4.3
- B.Sc. Computer Science, Kyungpook National University (2018-2020), GPA: 3.81/4.3
- B.Tech Computer Science, Christ University, India (2016-2018), GPA: 3.6/4.0

MAJOR ACHIEVEMENTS:
- 🥇 1st Place: Intel AI PC Innovation Challenge 2024 (LayGen project)
- 🥈 2nd Place: AI Grand Challenge 2023 (Chart2Excel)
- Published at ACL 2024 and AACL-IJCNLP 2022
- 2 Patents filed in AI document understanding

FLAGSHIP PROJECT - LayGen:
Multi-platform AI document translation ecosystem with 95%+ format retention, 60% faster processing, and complete offline security. Won 1st place at Intel AI PC Innovation Challenge 2024.

OTHER MAJOR PROJECTS:
- AskMe: RAG-based document QA system (83% accuracy, 5x faster analysis)
- VLMFusion OCR: Enhanced OCR with Vision-Language Models (10% accuracy boost)
- BlockNet: Multilingual block diagram analysis (ACL 2024 publication)
- Chart2Excel: Chart-to-Excel conversion (AI Grand Challenge 2023 winner)

TECHNICAL SKILLS:
- Programming: Python, Java, C++, JavaScript, ElectronJS
- AI/ML: PyTorch, TensorFlow, HuggingFace, OpenCV
- Specialties: Document AI, LLMs, OCR, Computer Vision, NLP
- Languages: English (fluent), Hindi (native), Korean (beginner)

RESPONSE GUIDELINES:
1. Keep responses conversational and informative
2. Highlight specific achievements and metrics when relevant
3. If asked about projects, provide impact numbers and technical details
4. For collaboration/job inquiries, mention his availability and expertise
5. Always suggest relevant portfolio sections for more details
6. If someone asks about contacting him, provide the contact information
7. Be enthusiastic about his work but professional in tone

Example response style: "Shreyanshu has extensive experience in [specific area]. His [project name] achieved [specific metric]. You can learn more about this in the [relevant section] of his portfolio. Would you like to know more about his other projects or technical expertise?"`;
    }

    /**
     * Initialize network status listener
     */
    initializeNetworkListener() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log('Chatbot: Network connection restored');
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log('Chatbot: Working in offline mode');
        });
    }

    /**
     * Set Gemini API key (call this method to enable AI features)
     */
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        this.useAI = true;
        console.log('Chatbot: AI mode enabled');
    }

    /**
     * Get response from Gemini AI
     */
    async getGeminiResponse(message) {
        if (!this.apiKey || !this.isOnline) {
            throw new Error('API key not set or offline');
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`;
        
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: `${this.systemPrompt}\n\nUser Question: ${message}\n\nPlease provide a helpful response about Shreyanshu Bhushan based on the information provided.`
                        }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 500,
            }
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`Gemini API error: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Invalid response format from Gemini API');
            }
        } catch (error) {
            console.error('Gemini API Error:', error);
            throw error;
        }
    }

    /**
     * Fallback local response system (same as in main script.js)
     */
    getLocalResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Personal information
        if (lowerMessage.includes('name') || lowerMessage.includes('who is')) {
            return `Shreyanshu Bhushan is an AI Researcher specializing in Document AI, LLMs/sLLMs, NLP, OCR, and Vision-Language Integration. He's currently based in Seoul, South Korea with an F-2 residency visa. Would you like to know more about his experience or projects?`;
        }
        
        // Education
        if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree')) {
            return `Shreyanshu has a Master's in Artificial Intelligence from Kyungpook National University (GPA: 4.1/4.3) and dual bachelor's degrees in Computer Science from both KNU and Christ University, India. His education spans multiple countries and focuses on AI and computer science. Check the About section for more details!`;
        }
        
        // Experience
        if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
            return `Shreyanshu currently works as an AI Researcher at NEOALI Co. Ltd. in Seoul (since May 2023). He has 2+ years of industry experience and 3+ years of academic research experience. Previously, he worked at Huawei Technologies and was a graduate researcher at KNU. Visit the Experience section to see his full career journey!`;
        }
        
        // Projects
        if (lowerMessage.includes('project') || lowerMessage.includes('laygen') || lowerMessage.includes('askme')) {
            return `Shreyanshu has developed 15+ AI projects! His flagship project is LayGen - an award-winning AI document translation system that won 1st place at Intel AI PC Innovation Challenge 2024. Other notable projects include AskMe (Document QA), VLMFusion OCR, and BlockNet (ACL 2024 publication). Check out the Projects section for detailed information!`;
        }
        
        // Awards
        if (lowerMessage.includes('award') || lowerMessage.includes('achievement') || lowerMessage.includes('recognition')) {
            return `Shreyanshu has received multiple prestigious awards: 🥇 1st Place at Intel AI PC Innovation Challenge 2024 for LayGen, 🥈 2nd Place at AI Grand Challenge 2023, published research at ACL 2024 and AACL-IJCNLP 2022, plus several academic scholarships. His work has significant impact in the AI community!`;
        }
        
        // Skills
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('programming')) {
            return `Shreyanshu is proficient in Python, Java, C++, ElectronJS, PyTorch, TensorFlow, and many more technologies. He specializes in NLP/LLM frameworks (T5, Llama, Qwen), OCR systems (Tesseract, EasyOCR, PaddleOCR), and deployment tools (Docker, GCP, FastAPI). He's fluent in English and Hindi, with beginner Korean skills.`;
        }
        
        // Contact
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            return `You can contact Shreyanshu at shreyanshubhushan@gmail.com or connect via LinkedIn (linkedin.com/in/shreyanshu09) and GitHub (github.com/shreyanshu09). He's based in Seoul, South Korea. Visit the Contact section for more ways to get in touch!`;
        }
        
        // Research/Publications
        if (lowerMessage.includes('research') || lowerMessage.includes('publication') || lowerMessage.includes('paper')) {
            return `Shreyanshu has published research at top AI conferences including ACL 2024 (BlockNet - block diagram analysis) and AACL-IJCNLP 2022. He also holds patents in AI document understanding and block diagram summarization. His research focuses on bridging fundamental AI research with practical applications. Check the Research section for detailed information!`;
        }
        
        // Default response
        return `I can help you learn about Shreyanshu's background, experience, projects, skills, and achievements. Try asking about his projects like LayGen, his AI research, awards, or how to contact him. What specific aspect would you like to know more about?`;
    }

    /**
     * Main method to get chatbot response
     */
    async getResponse(message) {
        // Try AI response first if available and online
        if (this.useAI && this.isOnline && this.apiKey) {
            try {
                const aiResponse = await this.getGeminiResponse(message);
                
                // Add navigation suggestions to AI responses
                const navigationSuggestion = this.getNavigationSuggestion(message);
                return aiResponse + (navigationSuggestion ? `\n\n${navigationSuggestion}` : '');
                
            } catch (error) {
                console.error('AI response failed, falling back to local:', error);
                // Fall back to local response
            }
        }
        
        // Use local response system
        return this.getLocalResponse(message);
    }

    /**
     * Get navigation suggestions based on the message topic
     */
    getNavigationSuggestion(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('project')) {
            return "🔗 Explore more projects in the Projects section!";
        } else if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
            return "🔗 See detailed experience in the Experience section!";
        } else if (lowerMessage.includes('research') || lowerMessage.includes('publication')) {
            return "🔗 Read more publications in the Research section!";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
            return "🔗 Find all contact methods in the Contact section!";
        } else if (lowerMessage.includes('education') || lowerMessage.includes('background')) {
            return "🔗 Learn more about his background in the About section!";
        }
        
        return null;
    }

    /**
     * Add quick action buttons to the chat
     */
    addQuickActions(container) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'quick-actions';
        
        const actions = [
            { text: 'View Projects', link: 'projects.html' },
            { text: 'See Experience', link: 'experience.html' },
            { text: 'Research Papers', link: 'research.html' },
            { text: 'Contact Info', link: 'contact.html' }
        ];
        
        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'quick-action-btn';
            btn.textContent = action.text;
            btn.onclick = () => window.location.href = action.link;
            actionsDiv.appendChild(btn);
        });
        
        container.appendChild(actionsDiv);
    }
}

// Usage example:
/*
// Initialize the enhanced chatbot
const enhancedChatbot = new EnhancedChatbot();

// Optional: Set Gemini API key to enable AI features
// enhancedChatbot.setApiKey('YOUR_GEMINI_API_KEY_HERE');

// Use in your existing chatbot implementation
async function sendMessage() {
    const messageInput = document.getElementById('chatbot-message');
    const messagesContainer = document.getElementById('chatbot-messages');
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    messageInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Get enhanced AI response
        const response = await enhancedChatbot.getResponse(message);
        removeTypingIndicator();
        addMessage(response, 'bot');
        
        // Add quick actions if response mentions sections
        if (response.includes('section')) {
            enhancedChatbot.addQuickActions(messagesContainer);
        }
    } catch (error) {
        removeTypingIndicator();
        addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
*/

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedChatbot;
} else {
    window.EnhancedChatbot = EnhancedChatbot;
}