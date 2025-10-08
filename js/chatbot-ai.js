/**
 * Simple Keyword-Based Chatbot for Shreyanshu's Portfolio
 * Uses keyword matching and similarity scoring to provide relevant responses
 */

class SimpleChatbot {
    constructor() {
        // Knowledge base with keywords and responses
        this.knowledgeBase = [
            {
                keywords: ['name', 'who', 'introduce', 'yourself'],
                response: "I'm here to tell you about Shreyanshu Bhushan! He's an AI Researcher specializing in Document AI, LLMs/sLLMs, NLP, OCR, and Vision-Language Integration. Currently based in Seoul, South Korea with an F-2 residency visa (no sponsorship needed).",
                link: { text: "Learn more about him", url: "about.html" }
            },
            {
                keywords: ['education', 'study', 'degree', 'university', 'master', 'bachelor', 'gpa'],
                response: "Shreyanshu has impressive academic credentials:\n• M.Sc. in Artificial Intelligence from Kyungpook National University (GPA: 4.1/4.3)\n• B.Sc. in Computer Science from KNU (GPA: 3.81/4.3)\n• B.Tech in Computer Science from Christ University, India (GPA: 3.6/4.0)",
                link: { text: "View full education details", url: "about.html#education" }
            },
            {
                keywords: ['experience', 'work', 'job', 'career', 'current', 'position', 'neoali'],
                response: "Shreyanshu is currently an AI Researcher at NEOALI Co. Ltd. in Seoul (since May 2023). He has:\n• 2+ years of industry experience\n• 3+ years of research experience\n• Previously worked at Huawei Technologies and as a graduate researcher at KNU",
                link: { text: "See detailed experience", url: "experience.html" }
            },
            {
                keywords: ['project', 'laygen', 'askme', 'vlmfusion', 'blocknet', 'chart2excel', 'portfolio'],
                response: "Shreyanshu has developed 15+ impressive AI projects! Some highlights:\n• LayGen - AI document translation (🥇 Intel Challenge 2024 Winner)\n• AskMe - Document QA using RAG (83% accuracy)\n• VLMFusion OCR - Enhanced OCR engine (10% accuracy boost)\n• BlockNet - Block diagram analysis (ACL 2024)\n• Chart2Excel - Chart to Excel conversion (🥈 AI Grand Challenge 2023)",
                link: { text: "Explore all projects", url: "projects.html" }
            },
            {
                keywords: ['laygen', 'document translation', 'intel challenge', 'winner'],
                response: "LayGen is Shreyanshu's flagship project - a multi-platform AI document translation ecosystem!\n• 🥇 1st Place Winner - Intel AI PC Innovation Challenge 2024\n• 95%+ format retention\n• 60% decrease in processing time\n• 100% offline security\n• Works on desktop, mobile, and web",
                link: { text: "Learn more about LayGen", url: "projects.html#laygen" }
            },
            {
                keywords: ['award', 'achievement', 'recognition', 'prize', 'winner', 'competition'],
                response: "Shreyanshu has received outstanding recognition:\n🥇 1st Place - Intel AI PC Innovation Challenge 2024 (LayGen)\n🥈 2nd Place - AI Grand Challenge 2023 (Chart2Excel)\n📄 Published at ACL 2024 and AACL-IJCNLP 2022\n🏆 Multiple academic scholarships\n📜 2 Patents filed in AI document understanding",
                link: { text: "View all achievements", url: "about.html#awards" }
            },
            {
                keywords: ['skill', 'technology', 'programming', 'language', 'tech stack', 'python', 'pytorch'],
                response: "Shreyanshu has a strong technical skill set:\n• Programming: Python, Java, C++, JavaScript, ElectronJS\n• AI/ML: PyTorch, TensorFlow, HuggingFace, OpenCV\n• LLMs: T5, Llama, Qwen, GPT\n• OCR: Tesseract, EasyOCR, PaddleOCR\n• Tools: Docker, GCP, FastAPI, Git\n• Languages: English (fluent), Hindi (native), Korean (beginner)",
                link: { text: "See complete skill list", url: "about.html#skills" }
            },
            {
                keywords: ['research', 'publication', 'paper', 'conference', 'acl', 'patent'],
                response: "Shreyanshu has strong research contributions:\n• ACL 2024: BlockNet - Block Diagram Summarization\n• AACL-IJCNLP 2022: Block Diagram-to-Text Understanding\n• 2 Patents filed in AI document understanding\n• Multiple ongoing research projects in Document AI and LLMs",
                link: { text: "Read research papers", url: "research.html" }
            },
            {
                keywords: ['contact', 'email', 'reach', 'linkedin', 'github', 'phone', 'touch'],
                response: "You can reach Shreyanshu through:\n📧 Email: shreyanshubhushan@gmail.com\n📱 Phone: +82 10-6715-9903\n💼 LinkedIn: linkedin.com/in/shreyanshu09\n💻 GitHub: github.com/shreyanshu09\n📍 Location: Seoul, South Korea",
                link: { text: "Visit contact page", url: "contact.html" }
            },
            {
                keywords: ['visa', 'sponsorship', 'work permit', 'korea', 'seoul', 'location'],
                response: "Shreyanshu is based in Seoul, South Korea and holds an F-2 residency visa, which means no visa sponsorship is required for employment in Korea!",
                link: { text: "Learn more about his background", url: "about.html" }
            },
            {
                keywords: ['document ai', 'ocr', 'nlp', 'computer vision', 'specialization', 'expertise'],
                response: "Shreyanshu specializes in cutting-edge AI domains:\n• Document AI - Advanced document processing systems\n• LLMs/sLLMs - Large and small language models\n• Natural Language Processing - Text understanding and generation\n• OCR - Optical Character Recognition\n• Vision-Language Integration - Combining visual and textual understanding\n• Computer Vision - Image analysis and processing",
                link: { text: "Explore his specializations", url: "index.html#specializations" }
            },
            {
                keywords: ['hire', 'available', 'opportunity', 'collaborate', 'freelance', 'consulting'],
                response: "Shreyanshu is open to exciting opportunities! He's currently working as an AI Researcher but is interested in:\n• Collaborative AI projects\n• Consulting opportunities\n• Research partnerships\n• Full-time positions in Document AI and LLMs\n\nHe has an F-2 visa in Korea (no sponsorship needed) and brings 5+ years of combined experience.",
                link: { text: "Get in touch", url: "contact.html" }
            },
            {
                keywords: ['cv', 'resume', 'portfolio', 'download', 'pdf'],
                response: "You can download Shreyanshu's professional documents:\n• CV/Resume - Complete career history and qualifications\n• Portfolio - Detailed project showcase with technical details\n\nBoth documents are available in PDF format on the homepage.",
                link: { text: "Download documents", url: "index.html" }
            }
        ];
    }

    /**
     * Calculate similarity score between user message and keywords
     */
    calculateSimilarity(message, keywords) {
        const messageLower = message.toLowerCase();
        let score = 0;
        
        keywords.forEach(keyword => {
            if (messageLower.includes(keyword.toLowerCase())) {
                // Exact match gets higher score
                score += 2;
            } else {
                // Check for partial matches
                const words = messageLower.split(/\s+/);
                words.forEach(word => {
                    if (keyword.toLowerCase().includes(word) || word.includes(keyword.toLowerCase())) {
                        score += 1;
                    }
                });
            }
        });
        
        return score;
    }

    /**
     * Get response based on keyword matching
     */
    getResponse(message) {
        const trimmedMessage = message.trim();
        
        if (!trimmedMessage) {
            return {
                response: "Please ask me a question about Shreyanshu!",
                link: null
            };
        }

        // Calculate similarity scores for all knowledge entries
        const scoredEntries = this.knowledgeBase.map(entry => ({
            ...entry,
            score: this.calculateSimilarity(trimmedMessage, entry.keywords)
        }));

        // Sort by score and get the best match
        scoredEntries.sort((a, b) => b.score - a.score);
        const bestMatch = scoredEntries[0];

        // If best match has a score > 0, return it
        if (bestMatch.score > 0) {
            return bestMatch;
        }

        // Default response if no good match found
        return {
            response: "I can help you learn about Shreyanshu's:\n• Background and education\n• Work experience\n• AI projects (LayGen, AskMe, VLMFusion, etc.)\n• Skills and technologies\n• Research publications\n• Awards and achievements\n• Contact information\n\nWhat would you like to know?",
            link: { text: "Explore his portfolio", url: "index.html" }
        };
    }

    /**
     * Format response with link
     */
    formatResponse(result) {
        let formattedResponse = result.response;
        
        if (result.link) {
            formattedResponse += `\n\n🔗 ${result.link.text}: ${result.link.url}`;
        }
        
        return formattedResponse;
    }

    /**
     * Get response as HTML with clickable link
     */
    getResponseHTML(message) {
        const result = this.getResponse(message);
        let html = `<p>${result.response.replace(/\n/g, '<br>')}</p>`;
        
        if (result.link) {
            html += `<div class="chatbot-link"><a href="${result.link.url}" target="_self">🔗 ${result.link.text}</a></div>`;
        }
        
        return html;
    }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleChatbot;
} else {
    window.SimpleChatbot = SimpleChatbot;
}
