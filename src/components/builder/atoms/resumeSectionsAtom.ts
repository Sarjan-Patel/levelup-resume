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
          "Versatile and results-oriented professional with a passion for technology, innovation, and continuous learning. Skilled in collaborating across teams to build impactful solutions and deliver user-centric applications.",
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
        position: "Marketing Intern",
        company: "InnovateX Solutions",
        location: "New York, NY",
        content: `• Assisted in planning and promoting company events and campaigns.\n• Conducted market research and presented findings to senior leadership.`,
        timestamps: { from: "06/2023", to: "08/2023" },
        prompt: "",
        response: "",
        showPrompt: false,
      },
      {
        id: uuidv4(),
        position: "Software Developer Intern",
        company: "NextGen Tech",
        location: "Remote",
        content: `• Collaborated on full-stack web development projects using modern frameworks.\n• Contributed to API integration and unit testing for product features.`,
        timestamps: { from: "01/2024", to: "04/2024" },
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
        position: "B.S. in Information Technology",
        company: "State University",
        location: "City, State",
        content:
          "• GPA: 3.8/4.0\n• President of the Tech Club\n• Completed coursework in Data Structures, AI, and Database Systems",
        timestamps: { from: "08/2021", to: "05/2025" },
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
        position: "E-Commerce Platform",
        company: "Capstone Project",
        location: "State University",
        content:
          "• Built a full-stack shopping platform with secure user login and payment integration.\n• Designed product listing and inventory system with admin dashboard.",
        timestamps: { from: "09/2023", to: "12/2023" },
        prompt: "",
        response: "",
        showPrompt: false,
      },
      {
        id: uuidv4(),
        position: "Chatbot Assistant",
        company: "Independent Project",
        location: "Remote",
        content:
          "• Developed a chatbot using NLP libraries for basic Q&A interactions.\n• Integrated deployment with cloud hosting and continuous updates.",
        timestamps: { from: "02/2024", to: "04/2024" },
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
          "Languages: JavaScript, Python, Java\nFrameworks: React, Express, Spring Boot\nTools: Git, Docker, Postman\nOther: SQL, REST APIs, Agile, GitHub Actions",
        timestamps: { from: "", to: "" },
        prompt: "",
        response: "",
        showPrompt: false,
      },
    ],
  },
]);
