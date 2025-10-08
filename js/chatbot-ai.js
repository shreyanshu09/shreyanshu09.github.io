/**
 * Enhanced Chatbot with Gemini AI Integration and Fallback
 * Supports both English and Korean languages
 * Uses simple keyword matching as fallback when Gemini is unavailable
 */

class EnhancedChatbot {
    constructor() {
        this.apiKey = null;
        this.isOnline = navigator.onLine;
        this.currentLanguage = 'en';
        
        // Knowledge base with bilingual support
        this.knowledgeBase = [
            {
                keywords: ['name', 'who', 'introduce', 'yourself', '이름', '누구', '소개'],
                response: {
                    en: "I'm here to tell you about Shreyanshu Bhushan! He's an AI Researcher specializing in Document AI, LLMs/sLLMs, NLP, OCR, and Vision-Language Integration. Currently based in Seoul, South Korea with an F-2 residency visa (no sponsorship needed).",
                    ko: "Shreyanshu Bhushan에 대해 말씀드리겠습니다! 그는 Document AI, LLMs/sLLMs, NLP, OCR 및 Vision-Language Integration을 전문으로 하는 AI 연구원입니다. 현재 F-2 거주 비자로 한국 서울에 거주하고 있습니다 (비자 스폰서십 불필요)."
                },
                link: { 
                    text: { en: "Learn more about him", ko: "더 알아보기" },
                    url: "about.html" 
                }
            },
            {
                keywords: ['education', 'study', 'degree', 'university', 'master', 'bachelor', 'gpa', '교육', '학위', '대학', '석사', '학사'],
                response: {
                    en: "Shreyanshu has impressive academic credentials:\n• M.Sc. in Artificial Intelligence from Kyungpook National University (GPA: 4.1/4.3)\n• B.Sc. in Computer Science from KNU (GPA: 3.81/4.3)\n• B.Tech in Computer Science from Christ University, India (GPA: 3.6/4.0)",
                    ko: "Shreyanshu는 인상적인 학력을 보유하고 있습니다:\n• 경북대학교 인공지능 석사 (학점: 4.1/4.3)\n• 경북대학교 컴퓨터과학 학사 (학점: 3.81/4.3)\n• 인도 Christ University 컴퓨터공학 학사 (학점: 3.6/4.0)"
                },
                link: { 
                    text: { en: "View full education details", ko: "전체 교육 정보 보기" },
                    url: "about.html#education" 
                }
            },
            {
                keywords: ['experience', 'work', 'job', 'career', 'current', 'position', 'neoali', '경력', '일', '직장', '현재', '포지션'],
                response: {
                    en: "Shreyanshu is currently an AI Researcher at NEOALI Co. Ltd. in Seoul (since May 2023). He has:\n• 2+ years of industry experience\n• 3+ years of research experience\n• Previously worked at Huawei Technologies and as a graduate researcher at KNU",
                    ko: "Shreyanshu는 현재 서울의 NEOALI Co. Ltd.에서 AI 연구원으로 근무 중입니다 (2023년 5월부터). 그는:\n• 2년 이상의 산업 경력\n• 3년 이상의 연구 경력\n• 이전에 Huawei Technologies 및 경북대학교 대학원 연구원으로 근무"
                },
                link: { 
                    text: { en: "See detailed experience", ko: "상세 경력 보기" },
                    url: "experience.html" 
                }
            },
            {
                keywords: ['project', 'laygen', 'askme', 'vlmfusion', 'blocknet', 'chart2excel', 'portfolio', '프로젝트', '포트폴리오'],
                response: {
                    en: "Shreyanshu has developed 15+ impressive AI projects! Some highlights:\n• LayGen - AI document translation (🥇 Intel Challenge 2024 Winner)\n• AskMe - Document QA using RAG (83% accuracy)\n• VLMFusion OCR - Enhanced OCR engine (10% accuracy boost)\n• BlockNet - Block diagram analysis (ACL 2024)\n• Chart2Excel - Chart to Excel conversion (🥈 AI Grand Challenge 2023)",
                    ko: "Shreyanshu는 15개 이상의 인상적인 AI 프로젝트를 개발했습니다! 주요 프로젝트:\n• LayGen - AI 문서 번역 (🥇 Intel Challenge 2024 우승)\n• AskMe - RAG를 사용한 문서 QA (83% 정확도)\n• VLMFusion OCR - 향상된 OCR 엔진 (10% 정확도 향상)\n• BlockNet - 블록 다이어그램 분석 (ACL 2024)\n• Chart2Excel - 차트를 Excel로 변환 (🥈 AI Grand Challenge 2023)"
                },
                link: { 
                    text: { en: "Explore all projects", ko: "모든 프로젝트 보기" },
                    url: "projects.html" 
                }
            },
            {
                keywords: ['laygen', 'document translation', 'intel challenge', 'winner', '문서 번역', '인텔 챌린지', '우승'],
                response: {
                    en: "LayGen is Shreyanshu's flagship project - a multi-platform AI document translation ecosystem!\n• 🥇 1st Place Winner - Intel AI PC Innovation Challenge 2024\n• 95%+ format retention\n• 60% decrease in processing time\n• 100% offline security\n• Works on desktop, mobile, and web",
                    ko: "LayGen은 Shreyanshu의 대표 프로젝트입니다 - 다중 플랫폼 AI 문서 번역 생태계!\n• 🥇 1위 우승 - Intel AI PC Innovation Challenge 2024\n• 95% 이상 형식 유지\n• 처리 시간 60% 단축\n• 100% 오프라인 보안\n• 데스크톱, 모바일, 웹에서 작동"
                },
                link: { 
                    text: { en: "Learn more about LayGen", ko: "LayGen에 대해 더 알아보기" },
                    url: "projects.html#laygen" 
                }
            },
            {
                keywords: ['award', 'achievement', 'recognition', 'prize', 'winner', 'competition', '상', '수상', '업적', '인정', '우승'],
                response: {
                    en: "Shreyanshu has received outstanding recognition:\n🥇 1st Place - Intel AI PC Innovation Challenge 2024 (LayGen)\n🥈 2nd Place - AI Grand Challenge 2023 (Chart2Excel)\n📄 Published at ACL 2024 and AACL-IJCNLP 2022\n🏆 Multiple academic scholarships\n📜 2 Patents filed in AI document understanding",
                    ko: "Shreyanshu는 뛰어난 인정을 받았습니다:\n🥇 1위 - Intel AI PC Innovation Challenge 2024 (LayGen)\n🥈 2위 - AI Grand Challenge 2023 (Chart2Excel)\n📄 ACL 2024 및 AACL-IJCNLP 2022 논문 발표\n🏆 다수의 학업 장학금\n📜 AI 문서 이해 분야 2개 특허 출원"
                },
                link: { 
                    text: { en: "View all achievements", ko: "모든 업적 보기" },
                    url: "about.html#awards" 
                }
            },
            {
                keywords: ['skill', 'technology', 'programming', 'language', 'tech stack', 'python', 'pytorch', '기술', '프로그래밍', '언어', '스택'],
                response: {
                    en: "Shreyanshu has a strong technical skill set:\n• Programming: Python, Java, C++, JavaScript, ElectronJS\n• AI/ML: PyTorch, TensorFlow, HuggingFace, OpenCV\n• LLMs: T5, Llama, Qwen, GPT\n• OCR: Tesseract, EasyOCR, PaddleOCR\n• Tools: Docker, GCP, FastAPI, Git\n• Languages: English (fluent), Hindi (native), Korean (beginner)",
                    ko: "Shreyanshu는 강력한 기술 스킬을 보유하고 있습니다:\n• 프로그래밍: Python, Java, C++, JavaScript, ElectronJS\n• AI/ML: PyTorch, TensorFlow, HuggingFace, OpenCV\n• LLMs: T5, Llama, Qwen, GPT\n• OCR: Tesseract, EasyOCR, PaddleOCR\n• 도구: Docker, GCP, FastAPI, Git\n• 언어: 영어 (유창), 힌디어 (모국어), 한국어 (초급)"
                },
                link: { 
                    text: { en: "See complete skill list", ko: "전체 기술 목록 보기" },
                    url: "about.html#skills" 
                }
            },
            {
                keywords: ['research', 'publication', 'paper', 'conference', 'acl', 'patent', '연구', '논문', '출판', '학회', '특허'],
                response: {
                    en: "Shreyanshu has strong research contributions:\n• ACL 2024: BlockNet - Block Diagram Summarization\n• AACL-IJCNLP 2022: Block Diagram-to-Text Understanding\n• 2 Patents filed in AI document understanding\n• Multiple ongoing research projects in Document AI and LLMs",
                    ko: "Shreyanshu는 강력한 연구 기여를 하고 있습니다:\n• ACL 2024: BlockNet - 블록 다이어그램 요약\n• AACL-IJCNLP 2022: 블록 다이어그램 텍스트 이해\n• AI 문서 이해 분야 2개 특허 출원\n• Document AI 및 LLMs 분야 다수의 진행 중인 연구 프로젝트"
                },
                link: { 
                    text: { en: "Read research papers", ko: "연구 논문 읽기" },
                    url: "research.html" 
                }
            },
            {
                keywords: ['contact', 'email', 'reach', 'linkedin', 'github', 'phone', 'touch', '연락', '이메일', '전화', '연락처'],
                response: {
                    en: "You can reach Shreyanshu through:\n📧 Email: shreyanshubhushan@gmail.com\n📱 Phone: +82 10-6715-9903\n💼 LinkedIn: linkedin.com/in/shreyanshu09\n💻 GitHub: github.com/shreyanshu09\n📍 Location: Seoul, South Korea",
                    ko: "다음을 통해 Shreyanshu에게 연락할 수 있습니다:\n📧 이메일: shreyanshubhushan@gmail.com\n📱 전화: +82 10-6715-9903\n💼 LinkedIn: linkedin.com/in/shreyanshu09\n💻 GitHub: github.com/shreyanshu09\n📍 위치: 대한민국 서울"
                },
                link: { 
                    text: { en: "Visit contact page", ko: "연락처 페이지 방문" },
                    url: "contact.html" 
                }
            },
            {
                keywords: ['visa', 'sponsorship', 'work permit', 'korea', 'seoul', 'location', '비자', '스폰서십', '근무 허가', '한국', '서울', '위치'],
                response: {
                    en: "Shreyanshu is based in Seoul, South Korea and holds an F-2 residency visa, which means no visa sponsorship is required for employment in Korea!",
                    ko: "Shreyanshu는 대한민국 서울에 거주하며 F-2 거주 비자를 보유하고 있어 한국 취업 시 비자 스폰서십이 필요하지 않습니다!"
                },
                link: { 
                    text: { en: "Learn more about his background", ko: "배경에 대해 더 알아보기" },
                    url: "about.html" 
                }
            },
            {
                keywords: ['document ai', 'ocr', 'nlp', 'computer vision', 'specialization', 'expertise', '전문', '전문성', '특기'],
                response: {
                    en: "Shreyanshu specializes in cutting-edge AI domains:\n• Document AI - Advanced document processing systems\n• LLMs/sLLMs - Large and small language models\n• Natural Language Processing - Text understanding and generation\n• OCR - Optical Character Recognition\n• Vision-Language Integration - Combining visual and textual understanding\n• Computer Vision - Image analysis and processing",
                    ko: "Shreyanshu는 최첨단 AI 도메인을 전문으로 합니다:\n• Document AI - 고급 문서 처리 시스템\n• LLMs/sLLMs - 대형 및 소형 언어 모델\n• 자연어 처리 - 텍스트 이해 및 생성\n• OCR - 광학 문자 인식\n• Vision-Language Integration - 시각 및 텍스트 이해 결합\n• Computer Vision - 이미지 분석 및 처리"
                },
                link: { 
                    text: { en: "Explore his specializations", ko: "전문 분야 탐색" },
                    url: "index.html#specializations" 
                }
            },
            {
                keywords: ['hire', 'available', 'opportunity', 'collaborate', 'freelance', 'consulting', '채용', '가능', '기회', '협업', '프리랜서', '컨설팅'],
                response: {
                    en: "Shreyanshu is open to exciting opportunities! He's currently working as an AI Researcher but is interested in:\n• Collaborative AI projects\n• Consulting opportunities\n• Research partnerships\n• Full-time positions in Document AI and LLMs\n\nHe has an F-2 visa in Korea (no sponsorship needed) and brings 5+ years of combined experience.",
                    ko: "Shreyanshu는 흥미로운 기회에 열려 있습니다! 현재 AI 연구원으로 근무 중이지만 다음에 관심이 있습니다:\n• AI 협업 프로젝트\n• 컨설팅 기회\n• 연구 파트너십\n• Document AI 및 LLMs 분야 정규직\n\n한국에서 F-2 비자를 보유하고 있으며 (스폰서십 불필요) 5년 이상의 통합 경력을 제공합니다."
                },
                link: { 
                    text: { en: "Get in touch", ko: "연락하기" },
                    url: "contact.html" 
                }
            },
            {
                keywords: ['cv', 'resume', 'portfolio', 'download', 'pdf', '이력서', '다운로드'],
                response: {
                    en: "You can download Shreyanshu's professional documents:\n• CV/Resume - Complete career history and qualifications\n• Portfolio - Detailed project showcase with technical details\n\nBoth documents are available in PDF format on the homepage.",
                    ko: "Shreyanshu의 전문 문서를 다운로드할 수 있습니다:\n• CV/이력서 - 완전한 경력 이력 및 자격\n• 포트폴리오 - 기술 세부 정보가 포함된 상세 프로젝트 쇼케이스\n\n두 문서 모두 홈페이지에서 PDF 형식으로 제공됩니다."
                },
                link: { 
                    text: { en: "Download documents", ko: "문서 다운로드" },
                    url: "index.html" 
                }
            }
        ];

        this.systemPrompts = {
            en: `You are an AI assistant representing Shreyanshu Bhushan, an AI Researcher and Document Intelligence Expert. 

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
8. IMPORTANT: At the end of your response, always suggest a relevant link in this format: "🔗 [Link Text]: [page].html"

Example response: "Shreyanshu has extensive experience in Document AI. His LayGen project achieved 95%+ format retention. 🔗 Explore all projects: projects.html"`,

            ko: `당신은 AI 연구원이자 문서 인텔리전스 전문가인 Shreyanshu Bhushan을 대표하는 AI 어시스턴트입니다.

중요: 아래 제공된 정보를 바탕으로 Shreyanshu Bhushan에 대한 질문에만 답변해야 합니다. Shreyanshu와 관련 없는 질문을 받으면 정중하게 대화를 그에게로 다시 돌려주세요.

개인 정보:
- 이름: Shreyanshu Bhushan
- 위치: 대한민국 서울
- 이메일: shreyanshubhushan@gmail.com
- 전화: +82 10-6715-9903
- LinkedIn: https://www.linkedin.com/in/shreyanshu09/
- GitHub: https://github.com/shreyanshu09
- 비자 상태: 한국 F-2 거주 비자 (스폰서십 불필요)

현재 직책:
NEOALI Co. Ltd., 서울, 대한민국 AI 연구원 (2023년 5월 - 현재)
- 2년 이상 산업 경력, 3년 이상 연구 경력
- Document AI, LLMs/sLLMs, NLP, OCR, Vision-Language Integration 전문

교육:
- 경북대학교 인공지능 석사 (2021-2023), 학점: 4.1/4.3
- 경북대학교 컴퓨터과학 학사 (2018-2020), 학점: 3.81/4.3
- 인도 Christ University 컴퓨터공학 학사 (2016-2018), 학점: 3.6/4.0

주요 업적:
- 🥇 1위: Intel AI PC Innovation Challenge 2024 (LayGen 프로젝트)
- 🥈 2위: AI Grand Challenge 2023 (Chart2Excel)
- ACL 2024 및 AACL-IJCNLP 2022 논문 발표
- AI 문서 이해 분야 2개 특허 출원

대표 프로젝트 - LayGen:
95% 이상 형식 유지, 60% 빠른 처리, 완전한 오프라인 보안을 갖춘 다중 플랫폼 AI 문서 번역 생태계. Intel AI PC Innovation Challenge 2024에서 1위를 차지했습니다.

기타 주요 프로젝트:
- AskMe: RAG 기반 문서 QA 시스템 (83% 정확도, 5배 빠른 분석)
- VLMFusion OCR: Vision-Language Models로 향상된 OCR (10% 정확도 향상)
- BlockNet: 다국어 블록 다이어그램 분석 (ACL 2024 논문)
- Chart2Excel: 차트를 Excel로 변환 (AI Grand Challenge 2023 우승)

기술 스킬:
- 프로그래밍: Python, Java, C++, JavaScript, ElectronJS
- AI/ML: PyTorch, TensorFlow, HuggingFace, OpenCV
- 전문 분야: Document AI, LLMs, OCR, Computer Vision, NLP
- 언어: 영어 (유창), 힌디어 (모국어), 한국어 (초급)

응답 가이드라인:
1. 대화형이고 유익한 응답 유지
2. 관련 시 구체적인 업적 및 지표 강조
3. 프로젝트에 대해 질문받으면 영향 수치 및 기술 세부 정보 제공
4. 협업/채용 문의의 경우 그의 가용성 및 전문성 언급
5. 항상 자세한 정보를 위한 관련 포트폴리오 섹션 제안
6. 연락에 대해 질문받으면 연락처 정보 제공
7. 그의 업무에 대해 열정적이되 전문적인 톤 유지
8. 중요: 응답 끝에 항상 이 형식으로 관련 링크 제안: "🔗 [링크 텍스트]: [페이지].html"

예시 응답: "Shreyanshu는 Document AI 분야에서 광범위한 경험을 보유하고 있습니다. 그의 LayGen 프로젝트는 95% 이상의 형식 유지를 달성했습니다. 🔗 모든 프로젝트 탐색: projects.html"`
        };
        
        this.initializeNetworkListener();
        this.initializeApiKey();
    }

    /**
     * Initialize API key from environment variable or localStorage
     */
    initializeApiKey() {
        // Check if API key is available in environment (GitHub Pages with secrets)
        if (typeof GEMINI_API_KEY !== 'undefined') {
            this.apiKey = GEMINI_API_KEY;
            console.log('Chatbot: Gemini API key loaded from environment');
        } 
        // Fallback to localStorage for development
        else if (localStorage.getItem('gemini_api_key')) {
            this.apiKey = localStorage.getItem('gemini_api_key');
            console.log('Chatbot: Gemini API key loaded from localStorage');
        }
        else {
            console.log('Chatbot: No API key found, using fallback mode');
        }
    }

    /**
     * Set language
     */
    setLanguage(language) {
        this.currentLanguage = language;
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
     * Calculate similarity score for fallback system
     */
    calculateSimilarity(message, keywords) {
        const messageLower = message.toLowerCase();
        let score = 0;
        
        keywords.forEach(keyword => {
            if (messageLower.includes(keyword.toLowerCase())) {
                score += 2;
            } else {
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
     * Get fallback response using keyword matching
     */
    getFallbackResponse(message) {
        const trimmedMessage = message.trim();
        
        if (!trimmedMessage) {
            return {
                response: this.currentLanguage === 'ko' 
                    ? "Shreyanshu에 대해 질문해주세요!"
                    : "Please ask me a question about Shreyanshu!",
                link: null
            };
        }

        const scoredEntries = this.knowledgeBase.map(entry => ({
            ...entry,
            score: this.calculateSimilarity(trimmedMessage, entry.keywords)
        }));

        scoredEntries.sort((a, b) => b.score - a.score);
        const bestMatch = scoredEntries[0];

        if (bestMatch.score > 0) {
            return {
                response: bestMatch.response[this.currentLanguage],
                link: {
                    text: bestMatch.link.text[this.currentLanguage],
                    url: bestMatch.link.url
                }
            };
        }

        return {
            response: this.currentLanguage === 'ko'
                ? "다음에 대해 도와드릴 수 있습니다:\n• 배경 및 교육\n• 업무 경력\n• AI 프로젝트 (LayGen, AskMe, VLMFusion 등)\n• 기술 및 스킬\n• 연구 논문\n• 수상 및 업적\n• 연락처 정보\n\n무엇을 알고 싶으신가요?"
                : "I can help you learn about Shreyanshu's:\n• Background and education\n• Work experience\n• AI projects (LayGen, AskMe, VLMFusion, etc.)\n• Skills and technologies\n• Research publications\n• Awards and achievements\n• Contact information\n\nWhat would you like to know?",
            link: {
                text: this.currentLanguage === 'ko' ? "포트폴리오 탐색" : "Explore his portfolio",
                url: "index.html"
            }
        };
    }

    /**
     * Get response from Gemini AI
     */
    async getGeminiResponse(message) {
        if (!this.apiKey || !this.isOnline) {
            throw new Error('API key not set or offline');
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`;
        
        const systemPrompt = this.systemPrompts[this.currentLanguage];
        const userPrompt = this.currentLanguage === 'ko'
            ? `사용자 질문: ${message}\n\n제공된 정보를 바탕으로 Shreyanshu Bhushan에 대한 도움이 되는 응답을 한국어로 제공해주세요.`
            : `User Question: ${message}\n\nPlease provide a helpful response about Shreyanshu Bhushan based on the information provided.`;
        
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: `${systemPrompt}\n\n${userPrompt}`
                        }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1000,
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
     * Extract link from AI response
     */
    extractLinkFromResponse(response) {
        // Look for link pattern: 🔗 [text]: [url]
        const linkPattern = /🔗\s*([^:]+):\s*(\S+\.html)/;
        const match = response.match(linkPattern);
        
        if (match) {
            return {
                text: match[1].trim(),
                url: match[2].trim(),
                responseWithoutLink: response.replace(linkPattern, '').trim()
            };
        }
        
        return {
            text: null,
            url: null,
            responseWithoutLink: response
        };
    }

    /**
     * Main method to get chatbot response
     */
    async getResponse(message) {
        // Try Gemini AI first if available and online
        if (this.apiKey && this.isOnline) {
            try {
                console.log('Chatbot: Attempting Gemini AI response...');
                const aiResponse = await this.getGeminiResponse(message);
                
                // Extract link from AI response
                const { text, url, responseWithoutLink } = this.extractLinkFromResponse(aiResponse);
                
                return {
                    response: responseWithoutLink,
                    link: text && url ? { text, url } : null,
                    source: 'gemini'
                };
                
            } catch (error) {
                console.error('Gemini AI failed, using fallback:', error);
                // Fall through to fallback
            }
        }
        
        // Use fallback keyword matching system
        console.log('Chatbot: Using fallback response system');
        const fallbackResult = this.getFallbackResponse(message);
        return {
            ...fallbackResult,
            source: 'fallback'
        };
    }

    /**
     * Get response as HTML with clickable link
     */
    async getResponseHTML(message) {
        const result = await this.getResponse(message);
        let html = `<p>${result.response.replace(/\n/g, '<br>')}</p>`;
        
        if (result.link) {
            html += `<div class="chatbot-link"><a href="${result.link.url}" target="_self">🔗 ${result.link.text}</a></div>`;
        }
        
        // Add indicator for response source (optional, for debugging)
        // html += `<small style="opacity:0.5;font-size:10px;">[${result.source}]</small>`;
        
        return html;
    }

    /**
     * Get greeting message based on language
     */
    getGreetingMessage() {
        if (this.currentLanguage === 'ko') {
            return "안녕하세요! Shreyanshu의 경험, 프로젝트 및 기술에 대한 질문에 답변드립니다. 무엇을 알고 싶으신가요?";
        } else {
            return "Hi! I'm here to answer questions about Shreyanshu's experience, projects, and skills. What would you like to know?";
        }
    }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedChatbot;
} else {
    window.EnhancedChatbot = EnhancedChatbot;
}

// Usage Example:
/*
// Initialize the enhanced chatbot
const chatbot = new EnhancedChatbot();

// Set language based on user selection
function setLanguage(lang) {
    chatbot.setLanguage(lang);
    // Update greeting message
    updateGreeting();
}

// Update greeting message
function updateGreeting() {
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.innerHTML = '';
    const greetingDiv = document.createElement('div');
    greetingDiv.className = 'bot-message';
    greetingDiv.textContent = chatbot.getGreetingMessage();
    messagesContainer.appendChild(greetingDiv);
}

// Send message function
async function sendMessage() {
    const messageInput = document.getElementById('chatbot-message');
    const messagesContainer = document.getElementById('chatbot-messages');
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    messageInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Get bot response (will use Gemini or fallback automatically)
        const responseHTML = await chatbot.getResponseHTML(message);
        removeTypingIndicator();
        addBotMessage(responseHTML);
    } catch (error) {
        removeTypingIndicator();
        const errorMsg = chatbot.currentLanguage === 'ko' 
            ? '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.'
            : 'Sorry, I encountered an error. Please try again.';
        addBotMessage(`<p>${errorMsg}</p>`);
    }
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addUserMessage(text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'user-message';
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
}

function addBotMessage(html) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bot-message';
    messageDiv.innerHTML = html;
    messagesContainer.appendChild(messageDiv);
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Initialize event listeners
document.getElementById('chatbot-send').addEventListener('click', sendMessage);
document.getElementById('chatbot-message').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Language toggle listeners
document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
document.getElementById('lang-ko').addEventListener('click', () => setLanguage('ko'));

// Optional: For development - set API key in localStorage
// localStorage.setItem('gemini_api_key', 'YOUR_GEMINI_API_KEY');
*/