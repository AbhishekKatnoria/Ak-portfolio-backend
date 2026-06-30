const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Gen AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Abhishek's Full Data Source (Mirrored from resumeData.js)
const abhishekData = {
  personal: {
    name: "Abhishek Katnoria",
    title: "Software Engineer",
    email: "abhishekkatnoria993@gmail.com",
    location: "Rajpura, Punjab, India",
    phone: "+91 8894066726",
    website: "",
    linkedin: "https://linkedin.com/in/abhishek-katnoria-2221581b2",
    github: "https://github.com/AbhishekKatnoria"
  },
  summary: "Software Engineer skilled in building cross-platform applications using React, TypeScript, Next.js, and Redux. Experienced in creating responsive, consistent UIs with Tailwind CSS, SCSS, and MUI, integrating REST APIs, and optimizing app performance across mobile and web platforms. Strong understanding of frontend architecture, component design, and clean code practices, with experience mentoring junior developers and collaborating closely with backend teams.",
  experience: [
    {
      company: "Rw Infotech",
      role: "Software Engineer",
      period: "02/2024 – 04/2025",
      location: "Mohali, India",
      description: [
        "Built and maintained cross-platform applications using React with TypeScript.",
        "Designed responsive and consistent UIs using Tailwind CSS, SCSS, and MUI.",
        "Integrated REST APIs and optimized app performance for smooth user experiences on both mobile and web platforms.",
        "Developed key features like mobile authentication flows, job listings UI, admin dashboards, and dynamic forms.",
        "Implemented mobile-friendly search, filter, and responsive UI components in React.",
        "Collaborated with backend teams to integrate APIs for real-time data handling.",
        "Participated in code reviews, managed pull requests, and ensured clean code practices.",
        "Mentored junior developers in React, offering support and feedback through code reviews."
      ]
    },
    {
      company: "Extech Digital",
      role: "Software Engineer - Intern",
      period: "02/2023 – 07/2023",
      location: "Mohali, India",
      description: [
        "Assisted in developing user-friendly web applications using HTML, CSS, and JavaScript.",
        "Collaborated with designers to implement responsive and visually appealing layouts.",
        "Utilized version control tools (e.g., Git) to manage project changes and collaborate effectively with the development team."
      ]
    }
  ],
  education: [
    {
      institution: "Chitkara University, Rajpura, Punjab",
      degree: "B.E in Computer Science Engineering",
      period: "2023",
      description: "Graduated with a 9.2 CGPA, building a strong foundation in computer science fundamentals."
    }
  ],
  skills: {
    frontend: ["HTML", "CSS", "Sass", "Tailwind CSS", "Styled Components", "MUI", "JavaScript", "TypeScript", "React.js", "Next.js", "Redux", "RTK Query"],
    backend: [],
    database: [],
    infrastructure: ["Git & GitHub"],
    other: ["C++"]
  },
  projects: [
    {
      name: "HireTechies",
      description: "Developed dashboards and recruitment workflows using Next.js, MUI, and RTK Query. Built candidate management, resume screening, and interview scheduling features.",
      tech: ["Next.js", "MUI", "RTK Query"],
      link: "#"
    },
    {
      name: "ShopBix",
      description: "Developed business listing and category-based marketplace modules with detailed business profile pages, including business onboarding, profile management, and KYC verification workflows.",
      tech: ["React.js", "JavaScript", "REST APIs"],
      link: "#"
    },
    {
      name: "NFT Marketplace",
      description: "Developed the user interface for a dynamic NFT marketplace with responsive design, like/dislike functionality, and a strong focus on performance optimization.",
      tech: ["React", "Tailwind CSS", "TypeScript"],
      link: "#"
    }
  ],
  portfolioLinks: [],
  strengths: [
    "Cross-Platform Frontend Development",
    "Responsive UI/UX Design",
    "REST API Integration",
    "Clean Code & Code Review Practices",
    "Mentoring & Team Collaboration",
    "Performance Optimization",
    "Component-Based Architecture"
  ]
};

const systemPrompt = `
You are the elite, professional digital reflection of Abhishek Katnoria. 
Your primary objective is to engage visitors and articulate Abhishek's professional background, technical acumen, and projects in a premium, sophisticated, and articulate manner.

CRITICAL CONTEXT: Use the following JSON data as your absolute source of truth for all facts regarding Abhishek:
${JSON.stringify(abhishekData, null, 2)}

STRICT FIREWALL POLICY (MANDATORY):
1. **ONLY PROVIDE ABHISHEK'S INFORMATION**: You are strictly prohibited from answering any questions, providing explanations, or discussing any topics that are not directly about Abhishek Katnoria (his skills, background, projects, experience, or contact info).
2. **NO CODE OR PROGRAMMING**: Under no circumstances are you allowed to generate, explain, review, write, or debug code, scripts, markup, styling, queries, or programming tutorials. Even if the user asks you to explain a technology Abhishek has worked with (e.g. "how do I write a React hook?"), you must decline. You can only say what projects Abhishek built using that technology.
3. **NO GENERAL KNOWLEDGE / MATH / TRANSLATION**: Do not answer general questions, solve math problems, write essays, or translate text.
4. **DEVIATION RESPONSE**: If a user asks a question that is outside the scope of Abhishek's personal/professional info, or if they ask you to write code, you must politely but firmly decline using a variation of this response: "I am a digital reflection of Abhishek Katnoria. I am strictly authorized to provide information about his background, projects, skills, and experience. I cannot write code or answer unrelated queries."

Core Directives for your Responses:
- Keep responses concise, elite, highly professional, and perfectly formatted. 
- Always refer to Abhishek in the 3rd person ("Abhishek is...", "He engineers...").
- If asked for contact details, provide the email from the data and direct them to the contact form.
- Subtly acknowledge the immersive UI design (3D cards, magnetic cursors, motion effects) if asked.
- CRITICAL INSTRUCTION: If asked about downloading a resume or CV, you MUST include the exact string \`[DOWNLOAD_RESUME]\` in your response. This renders a button in the UI.
- If asked for project links, ALWAYS provide the direct URLs from the data.
- Do not make up facts. If information is not in the JSON data, politely state that you are Abhishek's professional reflection and focus on his known engineering achievements.
`;

router.post('/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: "Gemini API Key is not configured." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const formattedHistory = history.map(msg => ({
            role: msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        }));

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I have integrated Abhishek Katnoria's full professional dataset into my neural network. I am ready to represent his engineering excellence with absolute precision." }],
                },
                ...formattedHistory
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Something went wrong with the AI service." });
    }
});

module.exports = router;