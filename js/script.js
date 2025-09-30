// Global variables
let currentLanguage = 'en';
let chatbotOpen = false;

// Shreyanshu's information database for chatbot
const shreyanshuData = {
    personal: {
        name: "Shreyanshu Bhushan",
        location: "Seoul, South Korea",
        email: "shreyanshubhushan@gmail.com",
        phone: "+82 10-6715-9903",
        linkedin: "https://www.linkedin.com/in/shreyanshu09/",
        github: "https://github.com/shreyanshu09",
        visa: "F-2 residency visa in Korea (no visa sponsorship required)"
    },
    education: {
        masters: "M.Sc. in Artificial Intelligence, Kyungpook National University (Mar 2021 - Feb 2023), GPA: 4.1/4.3",
        bachelor_korea: "Bachelor of Science in Engineering, Computer Science, Kyungpook National University (Sep 2018 - Jul 2020), GPA: 3.81/4.3",
        bachelor_india: "Bachelor of Technology, Computer Science and Engineering, Christ University, India (Jul 2016 - Aug 2018), GPA: 3.6/4.0"
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
        previous: [
            "Graduate Student Researcher at Kyungpook National University (Mar 2021 - Feb 2023)",
            "AI Youth Trainer for Intel at Shashwat Foundation (Sep 2020 - Feb 2021)",
            "Software Developer Intern at Huawei Technologies, Bengaluru, India (Apr 2018 - May 2018)"
        ]
    },
    projects: {
        flagship: {
            name: "LayGen",
            description: "Multi-platform, end-to-end AI document translation and processing ecosystem",
            impact: "95%+ format retention, 60% decrease in processing time, 100% offline security",
            technologies: ["Python", "ElectronJS", "PyTorch", "OpenAI GPT", "FastAPI"],
            subprojects: ["LayGen Windows Desktop Application", "LayGen-Ubuntu Distributed System", "LayGen Enterprise APIs"]
        },
        major: [
            {
                name: "AskMe",
                description: "Intelligent Document QA & Retrieval using RAG architecture",
                impact: "83% query accuracy, 5x faster doc analysis, 40% cost savings"
            },
            {
                name: "VLMFusion OCR",
                description: "Vision-Language Model enhanced OCR engine",
                impact: "10% accuracy boost over best single-engine systems"
            },
            {
                name: "BlockNet",
                description: "Multilingual Block Diagram Analysis (ACL 2024 publication)",
                impact: "92% summary accuracy, 70% workflow speed-up"
            }
        ]
    },
    awards: [
        "🥇 1st Place: Intel AI PC Innovation Challenge 2024 (LayGen)",
        "🥈 2nd Place: AI Grand Challenge 2023 (Chart2Excel + Chart QA)",
        "📄 ACL 2024 Publication (BlockNet)",
        "📄 AACL-IJCNLP 2022 Publication",
        "🏆 KNU Graduate School Innovation Project Scholarship",
        "🏆 KNU International Graduate Scholarship"
    ],
    skills: {
        programming: ["Python", "Java", "C++", "ElectronJS", "JavaScript", "FastAPI", "Docker"],
        ai_ml: ["PyTorch", "TensorFlow", "OpenCV", "HuggingFace Transformers"],
        nlp: ["T5", "Llama", "Qwen", "DeepSeek", "Gemma", "Prompt Engineering"],
        vision: ["Tesseract", "EasyOCR", "PaddleOCR", "YOLO", "VLMs", "DALL-E", "Flux"],
        deployment: ["Docker", "GCP", "RESTful API", "JWT", "AES Encryption"],
        languages: ["English (fluent)", "Hindi (native)", "Korean (beginner)"]
    },
    patents: [
        "AI-Based Method and System for Understanding Document Structures (10-2024-0132123)",
        "Relevant Method for Understanding Block Diagrams and Generating Natural Language Descriptions (10-2024-0101342)"
    ]
};

// Language translations
const translations = {
    en: {
        // Navigation
        'Home': 'Home',
        'About': 'About',
        'Experience': 'Experience',
        'Projects': 'Projects',
        'Research': 'Research',
        'Contact': 'Contact',
        
        // Hero section
        'AI Researcher &': 'AI Researcher &',
        'Document Intelligence Expert': 'Document Intelligence Expert',
        'Specializing in Document AI, LLMs/sLLMs, Natural Language Processing, OCR, and Vision-Language Integration': 'Specializing in Document AI, LLMs/sLLMs, Natural Language Processing, OCR, and Vision-Language Integration',
        'Years Industry': 'Years Industry',
        'Years Research': 'Years Research',
        'AI Projects': 'AI Projects',
        'View Projects': 'View Projects',
        'Get In Touch': 'Get In Touch',
        
        // Sections
        'Specializations': 'Specializations',
        'Featured Projects': 'Featured Projects',
        'Recognition & Awards': 'Recognition & Awards',
        'Let\'s Work Together': 'Let\'s Work Together',
        
        // Chatbot
        'Ask about Shreyanshu': 'Ask about Shreyanshu',
        'Hi! I\'m here to answer questions about Shreyanshu\'s experience, projects, and skills. What would you like to know?': 'Hi! I\'m here to answer questions about Shreyanshu\'s experience, projects, and skills. What would you like to know?',
        'Type your question...': 'Type your question...'
    },
    ko: {
        // Navigation
        'Home': '홈',
        'About': '소개',
        'Experience': '경력',
        'Projects': '프로젝트',
        'Research': '연구',
        'Contact': '연락처',
        
        // Hero section
        'AI Researcher &': 'AI 연구원 &',
        'Document Intelligence Expert': '문서 지능 전문가',
        'Specializing in Document AI, LLMs/sLLMs, Natural Language Processing, OCR, and Vision-Language Integration': '문서 AI, LLM/sLLM, 자연어 처리, OCR 및 비전-언어 통합 전문',
        'Years Industry': '년 산업 경력',
        'Years Research': '년 연구 경력',
        'AI Projects': 'AI 프로젝트',
        'View Projects': '프로젝트 보기',
        'Get In Touch': '연락하기',
        
        // Sections
        'Specializations': '전문 분야',
        'Featured Projects': '주요 프로젝트',
        'Recognition & Awards': '수상 및 인정',
        'Let\'s Work Together': '함께 일해요',
        
        // Chatbot
        'Ask about Shreyanshu': 'Shreyanshu에 대해 물어보세요',
        'Hi! I\'m here to answer questions about Shreyanshu\'s experience, projects, and skills. What would you like to know?': '안녕하세요! Shreyanshu의 경험, 프로젝트 및 기술에 대한 질문에 답변드립니다. 무엇을 알고 싶으신가요?',
        'Type your question...': '질문을 입력하세요...'
    }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeNavigation();
    initializeChatbot();
    initializeAnimations();
    initializeMobileMenu();
});

// Language Functions
function initializeLanguage() {
    const langEn = document.getElementById('lang-en');
    const langKo = document.getElementById('lang-ko');
    
    if (langEn && langKo) {
        langEn.addEventListener('click', () => switchLanguage('en'));
        langKo.addEventListener('click', () => switchLanguage('ko'));
    }
    
    // Set default language
    switchLanguage('en');
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update language toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(element => {
        if (element.hasAttribute(`data-${lang}`)) {
            element.textContent = element.getAttribute(`data-${lang}`);
        }
    });
    
    // Update placeholder text
    document.querySelectorAll('[data-placeholder-en]').forEach(element => {
        if (element.hasAttribute(`data-placeholder-${lang}`)) {
            element.placeholder = element.getAttribute(`data-placeholder-${lang}`);
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Navigation Functions
function initializeNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navigation highlight on scroll
    window.addEventListener('scroll', updateNavigation);
}

function updateNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Add background on scroll
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
}

// Mobile Menu Functions
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Animation Functions
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attributes
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

// Chatbot Functions
function initializeChatbot() {
    const toggle = document.getElementById('chatbot-toggle');
    const window = document.getElementById('chatbot-window');
    const close = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const messageInput = document.getElementById('chatbot-message');
    
    if (toggle) {
        toggle.addEventListener('click', toggleChatbot);
    }
    
    if (close) {
        close.addEventListener('click', closeChatbot);
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function toggleChatbot() {
    const window = document.getElementById('chatbot-window');
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        window.classList.add('open');
    } else {
        window.classList.remove('open');
    }
}

function closeChatbot() {
    const window = document.getElementById('chatbot-window');
    chatbotOpen = false;
    window.classList.remove('open');
}

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
        // Get response from AI
        const response = await getAIResponse(message);
        removeTypingIndicator();
        addMessage(response, 'bot');
    } catch (error) {
        removeTypingIndicator();
        addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message`;
    messageDiv.textContent = text;
    
    messagesContainer.appendChild(messageDiv);
    
    // Add quick action buttons for bot messages
    if (sender === 'bot' && text.includes('section')) {
        addQuickActions(messagesContainer);
    }
}

function addQuickActions(container) {
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'quick-actions';
    
    const actions = [
        { text: 'View Projects', link: 'projects.html' },
        { text: 'See Experience', link: 'experience.html' },
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

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.innerHTML = '●●●';
    typingDiv.id = 'typing-indicator';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function getAIResponse(message) {
    // Enhanced local AI response system
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

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedScroll = debounce(updateNavigation, 10);
window.addEventListener('scroll', debouncedScroll);

// Page visibility API for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page is visible
        document.body.style.animationPlayState = 'running';
    }
});

// Export functions for other pages
window.ShreyanshuPortfolio = {
    switchLanguage,
    currentLanguage,
    translations,
    shreyanshuData
};