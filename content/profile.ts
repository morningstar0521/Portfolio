// From Resume Builder/profile/core.md. Phone number is deliberately not published.
export const portrait = {
  src: "/shubh-ghiya.webp",
  alt: "Portrait of Shubh Ghiya in a dark suit, smiling, in warm afternoon light",
  caption: "Subject: Shubh Ghiya",
  width: 630,
  height: 788,
};

export const profile = {
  name: "Shubh Ghiya",
  role: "Software Engineer",
  email: "ghiyashubh23@gmail.com",
  github: "https://github.com/morningstar0521",
  githubHandle: "morningstar0521",
  linkedin: "https://www.linkedin.com/in/shubh-ghiya",
  linkedinHandle: "shubh-ghiya",
  location: "Bhopal, India",
  resumePdf: "/resume/Shubh-Ghiya-SDE-Resume.pdf",
  positioning:
    "I build software that makes complex systems more reliable, useful and measurable: production full-stack platforms, resilient backends, developer tools and machine-learning systems.",
  seeking: "Looking for software engineering internships in 2026 and full-time roles from 2027.",
};

export const education = [
  {
    school: "Indian Institute of Technology Madras",
    degree: "B.S. Data Science & Applications",
    period: "2023 – 2027",
    grade: "CGPA 8.49 / 10",
  },
  {
    school: "University Institute of Technology, RGPV Bhopal",
    degree: "B.Tech. Computer Science & Engineering",
    period: "2023 – 2027",
    grade: "CGPA 8.16 / 10",
  },
];

export const experience = [
  {
    org: "Nakhrali Fashion (Nakhrali Luxury)",
    title: "Freelance Full Stack Developer",
    period: "Feb 2026 – Present",
    note: "Promotions engine, VPS migration, production recovery, analytics and SEO.",
  },
  {
    org: "Nakhrali Fashion (Nakhrali Luxury)",
    title: "Full Stack Developer Intern",
    period: "Aug 2025 – Jan 2026",
    note: "Built the live store end to end as sole developer: checkout, payments, admin and search.",
  },
];

export const awards = [
  { title: "5th of 2,343", detail: "Comment Category Prediction, Kaggle competition, IIT Madras", year: "2026" },
  { title: "Best Project Award", detail: "QuickPark, IIT Madras", year: "2025" },
  { title: "Letter of Recommendation", detail: "Head of Student Affairs, IIT Madras BS", year: "2025" },
];

export const certifications = [
  "Oracle Cloud Infrastructure: Generative AI Professional (2025)",
  "Oracle Cloud Infrastructure: Data Science Professional (2025)",
  "Oracle Cloud Infrastructure: AI Vector Search Professional (2025)",
  "McKinsey Forward Learning Program (2025)",
];

export const leadership = [
  {
    title: "Secretary, Synapse Society",
    detail: "1,600+ member student community, IIT Madras",
    period: "2025 – 26",
  },
  {
    title: "Deputy Secretary, Kanha House",
    detail: "4,000+ students, IIT Madras. Led 12 Paradox'25 programmes; co-founded 3 communities (1,200+ members)",
    period: "2024 – 25",
  },
];

export const coursework = ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks", "Software Testing"];

// Curated from the seven case stacks. Only tools that appear in a case file.
export const skills = [
  { group: "Backend & Systems", items: ["TypeScript", "Node.js", "Express", "Python", "Flask", "FastAPI", "PostgreSQL", "Redis Streams", "Celery"] },
  { group: "Full-stack", items: ["React", "Next.js", "Vue 3", "Tailwind CSS", "Zod", "NextAuth"] },
  { group: "Machine Learning & Data", items: ["scikit-learn", "LightGBM", "XGBoost", "implicit ALS", "pandas", "NumPy / SciPy"] },
  { group: "Tools & Infrastructure", items: ["Docker Compose", "GitHub Actions", "Nginx + PM2", "Cloudflare", "AWS EC2", "Vercel", "Vitest", "Playwright", "pytest", "k6"] },
];
