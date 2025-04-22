import { atom } from "jotai";
import { v4 as uuidv4 } from "uuid";

export interface ResumeEntry {
  id: string;
  position: string;
  company: string;
  location: string;
  content: string;
  timestamps: { from: string; to: string };
  prompt?: string;
  response?: string;
  showPrompt?: boolean;
}

export interface ResumeSection {
  id: string;
  heading: string;
  entries?: ResumeEntry[];
}

export const resumeSectionsAtom = atom<ResumeSection[]>([
  {
    id: uuidv4(),
    heading: "Summary",
    entries: [
      {
        id: uuidv4(),
        position: "",
        company: "",
        location: "",
        content:
          "Driven Computer Science and Business student passionate about AI, full-stack development, and impactful innovation. Experienced in building scalable web applications and integrating AI solutions. Recognized for strong leadership, technical skills, and delivering results in collaborative team settings.",
        timestamps: { from: "", to: "" },
        prompt: "",
        response: "",
        showPrompt: false,
      },
    ],
  },
  {
    id: uuidv4(),
    heading: "Experience",
    entries: [
      {
        id: uuidv4(),
        position: "Program Activator",
        company: "ASU Changemaker Central",
        location: "Arizona State University",
        content: `• Led planning and execution of service and entrepreneurship initiatives for 50+ students weekly.\n• Coordinated university-wide events promoting community engagement and social impact.`,
        timestamps: { from: "09/2023", to: "Present" },
        prompt: "",
        response: "",
        showPrompt: false,
      },
      {
        id: uuidv4(),
        position: "AI/ML Engineer Intern",
        company: "Attri",
        location: "Remote",
        content: `• Implemented GPT-based knowledge assistant with LangChain, Faiss, and OpenAI API.\n• Fine-tuned prompts and built RAG pipelines for enterprise data.\n• Collaborated with full-stack and data teams to ship production-ready AI tools.`,
        timestamps: { from: "05/2024", to: "10/2024" },
        prompt: "",
        response: "",
        showPrompt: false,
      },
      {
        id: uuidv4(),
        position: "Full-Stack Developer Intern",
        company: "Attri",
        location: "Remote",
        content: `• Built modular dashboards in React + Express for internal analytics.\n• Developed authentication flows with OAuth2 and integrated third-party APIs.\n• Led migration from REST to GraphQL improving data fetch times by 35%.`,
        timestamps: { from: "05/2023", to: "01/2024" },
        prompt: "",
        response: "",
        showPrompt: false,
      },
    ],
  },
  {
    id: uuidv4(),
    heading: "Education",
    entries: [
      {
        id: uuidv4(),
        position: "B.S. Computer Science (with Business)",
        company: "Arizona State University",
        location: "Tempe, AZ",
        content:
          "• NAmU Scholar (10,000/year)\n• Dean’s List (Fall 2022, Spring 2023)",
        timestamps: { from: "08/2022", to: "05/2026" },
        prompt: "",
        response: "",
        showPrompt: false,
      },
    ],
  },
  {
    id: uuidv4(),
    heading: "Projects",
    entries: [
      {
        id: uuidv4(),
        position: "SunDevil Book Exchange",
        company: "Arizona State University",
        location: "Tempe, AZ",
        content:
          "• Developed a book buying/selling system using JavaFX and MVC pattern.\n• Implemented unit testing with JUnit; containerized with Docker.\n• Managed user roles, data validation, and file storage.",
        timestamps: { from: "11/2023", to: "12/2023" },
        prompt: "",
        response: "",
        showPrompt: false,
      },
      {
        id: uuidv4(),
        position: "AI Resume Enhancer",
        company: "Arizona State University",
        location: "Tempe, AZ",
        content:
          "• Built a resume analysis tool using GPT-4 and LangChain.\n• Enabled context-aware bullet generation from job descriptions.\n• Deployed on Render using CI/CD with GitHub Actions.",
        timestamps: { from: "01/2024", to: "03/2024" },
        prompt: "",
        response: "",
        showPrompt: false,
      },
    ],
  },
  {
    id: uuidv4(),
    heading: "Skills",
    entries: [
      {
        id: uuidv4(),
        position: "",
        company: "",
        location: "",
        content:
          "Languages: Python, Java, TypeScript\nFrameworks: React, Node.js, Express, Flask\nAI/ML: OpenAI API, LangChain, Faiss, RAG\nDevOps: GitHub Actions, Docker, Render\nOther: SQL, Firebase, OAuth2, RxJS, Agile, JIRA",
        timestamps: { from: "", to: "" },
        prompt: "",
        response: "",
        showPrompt: false,
      },
    ],
  },
]);


// atoms/resumeSectionsAtom.ts
// import { atomWithStorage } from "jotai/utils";
// import { ResumeSection } from "@/types/resume";
// import { v4 as uuidv4 } from "uuid";

// export const resumeSectionsAtom = atomWithStorage<ResumeSection[]>("resumeData", [
//   {
//     id: uuidv4(),
//     heading: "Summary",
//     entries: [
//       {
//         id: uuidv4(),
//         position: "",
//         company: "",
//         location: "",
//         content: "Motivated and detail-oriented individual...",
//         timestamps: { from: "", to: "" },
//         prompt: "",
//         response: "",
//         showPrompt: false,
//       },
//     ],
//   },
// ]);
