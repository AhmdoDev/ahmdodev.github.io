// ---------------------------------------------------------------
// Central data. Add/edit projects, experiments, and skills here —
// nothing else in the site needs to change.
// ---------------------------------------------------------------

const SITE = {
  githubUsername: "ahmdodev",
  // Set to a real address when ready. Leave null to hide the email button
  // and fall back to GitHub/LinkedIn only.
  email: null, // e.g. "hello@ahmdo.dev"
};

const projects = [
  {
    title: "AI Date Quality Detection",
    status: "CONCEPT",
    description:
      "Exploring how computer vision and machine learning could help classify the quality of locally grown rutab dates, using a community-contributed dataset.",
    technologies: ["Computer Vision", "Machine Learning", "JavaScript", "Node.js"],
    github: "",
    demo: "",
    type: "project",
  },
  {
    title: "Plant Insect Detection",
    status: "CONCEPT",
    description:
      "Exploring whether the tiny vibrations and sounds produced by insects feeding on plants can be captured and analyzed to identify pest activity early.",
    technologies: ["Sensors", "Signal Processing", "Machine Learning", "IoT"],
    github: "",
    demo: "",
    type: "project",
  },
  {
    title: "Developer Automation Tools",
    status: "EXPERIMENT",
    description:
      "A recurring interest in building small automation tools for developer workflows — APIs, webhooks, bots, and AI-assisted development.",
    technologies: ["APIs", "Webhooks", "Automation", "VS Code"],
    github: "",
    demo: "",
    type: "project",
  },
  {
    title: "Codrew",
    status: "CONCEPT",
    description:
      "Exploring better ways for developers to collaborate, build together, and turn ideas into working software.",
    technologies: ["Product Design", "Collaboration", "Web"],
    github: "",
    demo: "",
    type: "project",
  },
];

const experiments = [
  {
    category: "AI & Machine Learning",
    items: ["Computer vision", "Dataset creation", "AI-powered applications", "AI product ideas"],
  },
  {
    category: "Automation",
    items: ["Webhooks", "APIs", "Bots", "Workflow automation", "Developer tooling"],
  },
  {
    category: "Hardware",
    items: ["Sensors", "IoT", "Plant monitoring", "Audio & vibration detection"],
  },
  {
    category: "Systems & Infrastructure",
    items: ["Servers", "Networking", "APIs", "Web services", "Self-hosted systems"],
  },
  {
    category: "Product Ideas",
    items: ["Developer collaboration", "UAE-focused software", "Automation businesses", "AI applications"],
  },
];

const stack = {
  Languages: ["Python", "JavaScript", "HTML", "CSS"],
  Development: ["Node.js", "Git", "GitHub", "VS Code"],
  "AI / Data": ["Machine Learning", "Computer Vision", "AI APIs", "Dataset Development"],
  Systems: ["APIs", "Webhooks", "Servers", "Networking", "Automation"],
};
