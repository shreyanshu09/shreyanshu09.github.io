/* ============================================================
   CHATBOT.JS — Keyword-Matching Portfolio Assistant
   ============================================================ */

'use strict';

const PORTFOLIO_DATA = {
  name:     'Shreyanshu Bhushan',
  title:    'AI Engineer & Researcher',
  location: 'Seoul, South Korea',
  visa:     'F-2 Residency Visa',
  email:    'shreyanshubhushan@gmail.com',
  linkedin: 'linkedin.com/in/shreyanshu09',
  github:   'github.com/shreyanshu09',

  experience: `Shreyanshu has 3+ years of industry experience. He currently works as an AI Researcher at NEOALI Co. Ltd. in Seoul (May 2023 – Present). He also completed his Master's in AI at Kyungpook National University (2021–2023) where he worked as a Graduate Researcher in the ABR Lab.`,

  skills: `Core skills include: Python, PyTorch, HuggingFace Transformers, FastAPI, Docker, LLMs/sLLMs, Prompt Engineering, RAG systems, Vector Databases (Qdrant), OCR (EasyOCR, PaddleOCR, Tesseract), VLMs, Ollama, vLLM, OpenCV, Node.js, ElectronJS, Pandoc, Layout Detection, Document Parsing, On-Device AI, OpenAI API, Streamlit, and more.`,

  projects: `Key projects include:
  1. LayGen — Award-winning multi-platform AI document translation system with on-device LLM support. Available at: https://ondevice.neoali.com/laygen
  2. AskMe — Intelligent document QA system using RAG architecture.
  3. VLMFusion OCR — Multi-engine OCR with Vision-Language Model post-correction.
  4. HanForge — HTML to HWPX conversion engine (Open source: github.com/shreyanshu09/HanForge).
  5. FormGen — AI-powered form field extraction and auto-fill for HTML, DOCX, HWPX documents.
  6. SlideGen — AI presentation generator with multi-LLM provider support.
  7. Medical Document Disease Extractor — RAG-based medical NLP analysis tool.
  8. Chart2Excel — Chart data extraction to structured Excel format.`,

  awards: `Awards: 1st Place at Intel AI PC Innovation Challenge 2024 (LayGen), 2nd Place at AI Grand Challenge 2023 (Chart2Excel + Chart QA). Also published at ACL 2024 and AACL-IJCNLP 2022, and filed a patent for AI-Based Document Structure Understanding.`,

  research: `Published papers: BlockNet at ACL 2024 (block diagram summarization with multilingual support), and a paper at AACL-IJCNLP 2022 on image-based text summarization. Also holds a patent application for AI-based document structure understanding.`,

  education: `M.S. in Artificial Intelligence — Kyungpook National University, South Korea (2021–2023), GPA 4.1/4.3. B.S. in Engineering — Kyungpook National University (2018–2020, Exchange Student), GPA 3.81/4.3. B.Tech — Christ University, India (2016–2018, 2+2 Double Degree Program), GPA 3.6/4.0.`,

  contact: `You can reach Shreyanshu at: Email — shreyanshubhushan@gmail.com | LinkedIn — linkedin.com/in/shreyanshu09 | GitHub — github.com/shreyanshu09`,

  availability: `Shreyanshu is based in Seoul, South Korea, holding an F-2 residency visa. He is open to discussing AI research and engineering opportunities, collaborations, and consulting engagements.`,
};

const RULES = [
  {
    keywords: ['hello', 'hi', 'hey', 'greet', 'start', 'help'],
    response:  `Hello! I'm Shreyanshu's portfolio assistant. You can ask me about his experience, projects, skills, research, education, or how to contact him.`,
  },
  {
    keywords: ['experience', 'work', 'job', 'career', 'neoali', 'company', 'industry', 'role'],
    response:  PORTFOLIO_DATA.experience,
  },
  {
    keywords: ['skill', 'technology', 'tech', 'stack', 'framework', 'tools', 'python', 'pytorch', 'rag', 'llm', 'ocr', 'fastapi', 'docker', 'ollama', 'vllm', 'huggingface'],
    response:  PORTFOLIO_DATA.skills,
  },
  {
    keywords: ['project', 'build', 'made', 'created', 'laygen', 'askme', 'formgen', 'hanforge', 'slidegen', 'vlmfusion', 'chart2excel', 'disease'],
    response:  PORTFOLIO_DATA.projects,
  },
  {
    keywords: ['award', 'prize', 'win', 'intel', 'challenge', 'recognition', 'honor', 'achievement'],
    response:  PORTFOLIO_DATA.awards,
  },
  {
    keywords: ['research', 'paper', 'publication', 'acl', 'blocknet', 'patent', 'publish', 'journal'],
    response:  PORTFOLIO_DATA.research,
  },
  {
    keywords: ['education', 'study', 'university', 'degree', 'master', 'bachelor', 'gpa', 'knu', 'korea'],
    response:  PORTFOLIO_DATA.education,
  },
  {
    keywords: ['contact', 'email', 'reach', 'linkedin', 'github', 'social', 'message'],
    response:  PORTFOLIO_DATA.contact,
  },
  {
    keywords: ['available', 'hire', 'open', 'opportunity', 'visa', 'location', 'seoul', 'relocate'],
    response:  PORTFOLIO_DATA.availability,
  },
  {
    keywords: ['laygen', 'document translation', 'on-device', 'ondevice'],
    response:  `LayGen is Shreyanshu's flagship project — a multi-platform AI document translation ecosystem supporting DOCX, HWPX, PDF and more, with on-device LLM support for offline/enterprise use. It won 1st Place at Intel AI PC Innovation Challenge 2024. Live at: https://ondevice.neoali.com/laygen`,
  },
  {
    keywords: ['hanforge', 'hwpx', 'html to hwpx', 'html2hwpx'],
    response:  `HanForge converts HTML documents to HWPX (Hangul Word Processor format) — pure JavaScript, no native binaries. It's open source: https://github.com/shreyanshu09/HanForge`,
  },
];

function matchResponse(input) {
  const lower = input.toLowerCase().trim();
  if (!lower) return null;

  // Score each rule
  let best = { score: 0, response: null };

  for (const rule of RULES) {
    let score = 0;
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) score += 1;
    }
    if (score > best.score) {
      best = { score, response: rule.response };
    }
  }

  if (best.score > 0) return best.response;

  return `I don't have specific details on that topic. You can browse the portfolio sections for more, or contact Shreyanshu directly at shreyanshubhushan@gmail.com.`;
}

/* ── DOM Chatbot ─────────────────────────────────────────── */
class Chatbot {
  constructor() {
    this.trigger   = document.getElementById('chatbot-trigger');
    this.window    = document.getElementById('chatbot-window');
    this.closeBtn  = document.getElementById('chatbot-close');
    this.input     = document.getElementById('chatbot-input');
    this.sendBtn   = document.getElementById('chatbot-send');
    this.messages  = document.getElementById('chatbot-messages');

    if (!this.trigger) return;

    this.open = false;
    this.bindEvents();
  }

  bindEvents() {
    this.trigger.addEventListener('click', () => this.toggle());
    this.closeBtn.addEventListener('click', () => this.close());

    this.sendBtn.addEventListener('click', () => this.send());
    this.input.addEventListener('keydown', e => {
      if (e.key === 'Enter') this.send();
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (this.open &&
          !this.window.contains(e.target) &&
          !this.trigger.contains(e.target)) {
        this.close();
      }
    });
  }

  toggle() {
    this.open ? this.close() : this.openChat();
  }

  openChat() {
    this.open = true;
    this.window.classList.add('open');
    this.input.focus();
  }

  close() {
    this.open = false;
    this.window.classList.remove('open');
  }

  send() {
    const text = this.input.value.trim();
    if (!text) return;

    this.addMessage(text, 'user');
    this.input.value = '';

    // Simulate typing delay
    setTimeout(() => {
      const reply = matchResponse(text);
      this.addMessage(reply, 'bot');
    }, 450);
  }

  addMessage(text, who) {
    const div = document.createElement('div');
    div.className = `chat-msg ${who}`;
    div.textContent = text;
    this.messages.appendChild(div);
    this.messages.scrollTop = this.messages.scrollHeight;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window._chatbot = new Chatbot();
});
