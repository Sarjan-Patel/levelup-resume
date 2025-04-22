import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { personalInfoAtom } from "./atoms/personalInfoAtom";
import { resumeSectionsAtom } from "./atoms/resumeSectionsAtom";
import { fetchAIResponse } from "@/lib/openai";
import { jobDescriptionAtom } from "./atoms/jobDescriptionAtom";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

// At the top of ResumeForm.tsx (or wherever you're using ResumeEntry)
import { ResumeEntry, ResumeSection } from "@/types/resume"; // ✅ check this path



export default function ResumeForm() {



    const [personalInfo, setPersonalInfo] = useAtom(personalInfoAtom);
    const [sections, setSections] = useAtom(resumeSectionsAtom);

    




    const addSection = () => {
        setSections((prev) => [
            ...prev,
            {
                id: uuidv4(),
                heading: "Job Description", // clearly named
                entries: [
                    {
                        id: uuidv4(),
                        position: "",
                        company: "",
                        location: "",
                        content: "", // JD content will go here
                        timestamps: { from: "", to: "" },
                        prompt: "",
                        response: "",
                        showPrompt: false,
                    },
                ],
            },
        ]);
    };


    const addEntry = (sectionId: string) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        entries: [
                            ...(section.entries || []),
                            {
                                id: uuidv4(),
                                position: "",
                                company: "",
                                location: "",
                                content: "",
                                timestamps: { from: "", to: "" },
                                prompt: "",
                                response: "",
                                showPrompt: false,
                            },
                        ],
                    }
                    : section
            )
        );
    };

    const deleteSection = (sectionId: string) => {
        setSections((prev) => prev.filter((section) => section.id !== sectionId));
    };


    const deleteEntry = (sectionId: string, entryId: string) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        entries: section.entries?.filter((entry) => entry.id !== entryId),
                    }
                    : section
            )
        );
    };

    const updateEntry = (
        sectionId: string,
        entryId: string,
        field: keyof ResumeEntry | "timestamps",
        value: string | ResumeEntry["timestamps"]
    ) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        entries: section.entries?.map((entry) =>
                            entry.id === entryId
                                ? field === "timestamps"
                                    ? { ...entry, timestamps: value as ResumeEntry["timestamps"] }
                                    : { ...entry, [field]: value }
                                : entry
                        ),
                    }
                    : section
            )
        );
    };


    const togglePrompt = (sectionId: string, entryId: string) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        entries: section.entries?.map((entry) =>
                            entry.id === entryId
                                ? { ...entry, showPrompt: !entry.showPrompt }
                                : entry
                        ),
                    }
                    : section
            )
        );
    };

    const [jobModalOpen, setJobModalOpen] = useState(false);
    const [jobDescription, setJobDescription] = useAtom(jobDescriptionAtom);
    const [tempJobDescription, setTempJobDescription] = useState("");
    useEffect(() => {
        setTempJobDescription(jobDescription);
    }, [jobDescription]);



    const handleGenerate = async (sectionId: string, entryId: string, prompt: string) => {
        const section = sections.find((s) => s.id === sectionId);
        const entry = section?.entries?.find((e) => e.id === entryId);
        const context = `
      Resume Section Content:
      ${entry?.content || ""}
      
      Job Description:
      ${jobDescription || "No job description provided."}
      
      Prompt:
      ${prompt}
      `;

        const aiResponse = await fetchAIResponse(context);
        updateEntry(sectionId, entryId, "response", aiResponse);
    };





    return (
        <div className="space-y-8">
            {/* Personal Info */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Personal Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        ["Full Name", "name"],
                        ["City", "city"],
                        ["State", "state"],
                        ["Phone", "phone"],
                        ["Email", "email"],
                        ["LinkedIn", "linkedin"],
                    ].map(([label, key]) => (
                        <TextField
                            key={key}
                            label={label}
                            value={personalInfo[key as keyof typeof personalInfo] || ""}
                            onChange={(e) =>
                                setPersonalInfo({ ...personalInfo, [key]: e.target.value })
                            }
                        />
                    ))}
                </div>
            </div>

            {/* Resume Sections */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Resume</h2>
                <button
                    onClick={() => {
                        setTempJobDescription(jobDescription); // preload
                        setJobModalOpen(true);
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                    Add Job Description
                </button>
            </div>


            {sections.map((section) => (
                <div key={section.id} className="border p-4 bg-white shadow space-y-4">
                    <TextField
                        label="Section Heading"
                        fullWidth
                        value={section.heading}
                        onChange={(e) =>
                            setSections((prev) =>
                                prev.map((s) =>
                                    s.id === section.id ? { ...s, heading: e.target.value } : s
                                )
                            )
                        }
                    />



                    {section.entries?.map((entry, idx) => (
                        <div key={entry.id} className="p-4 border rounded bg-gray-50 space-y-3">
                            {/* Experience-specific fields */}
                            {section.heading.toLowerCase() === "experience" && (
                                <div className="grid grid-cols-2 gap-4">
                                    <TextField
                                        label="Position"
                                        value={entry.position}
                                        onChange={(e) =>
                                            updateEntry(section.id, entry.id, "position", e.target.value)
                                        }
                                    />
                                    <TextField
                                        label="Company"
                                        value={entry.company}
                                        onChange={(e) =>
                                            updateEntry(section.id, entry.id, "company", e.target.value)
                                        }
                                    />
                                    <TextField
                                        label="From"
                                        value={entry.timestamps?.from || ""}
                                        onChange={(e) =>
                                            updateEntry(section.id, entry.id, "timestamps", {
                                                ...entry.timestamps,
                                                from: e.target.value,
                                            })
                                        }
                                    />
                                    <TextField
                                        label="To"
                                        value={entry.timestamps?.to || ""}
                                        onChange={(e) =>
                                            updateEntry(section.id, entry.id, "timestamps", {
                                                ...entry.timestamps,
                                                to: e.target.value,
                                            })
                                        }
                                    />
                                    <TextField
                                        label="Location"
                                        value={entry.location}
                                        onChange={(e) =>
                                            updateEntry(section.id, entry.id, "location", e.target.value)
                                        }
                                    />
                                </div>
                            )}

                            <TextField
                                label="Content"
                                multiline
                                fullWidth
                                rows={4}
                                value={entry.content}
                                onChange={(e) =>
                                    updateEntry(section.id, entry.id, "content", e.target.value)
                                }
                            />

                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => togglePrompt(section.id, entry.id)}
                                    className="text-blue-600  text-sm"
                                >
                                    ✨ Use AI
                                </button>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => deleteEntry(section.id, entry.id)}
                                        className="text-red-600 text-sm"
                                    >
                                        Delete Entry
                                    </button>
                                    <button
                                        onClick={() => deleteSection(section.id)}
                                        className="text-red-600 text-sm"
                                    >
                                        Delete Section
                                    </button>
                                </div>

                            </div>



                            {entry.showPrompt && (
                                <div className="space-y-2">
                                    <textarea
                                        className="w-full border px-2 py-1 rounded text-sm"
                                        placeholder="Enter prompt for AI..."
                                        value={entry.prompt}
                                        onChange={(e) =>
                                            updateEntry(section.id, entry.id, "prompt", e.target.value)
                                        }
                                    />
                                    <button
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded"
                                        onClick={() => handleGenerate(section.id, entry.id, entry.prompt || "")}
                                    >
                                        🚀 Generate
                                    </button>
                                    {entry.response && (
                                        <div className="transition-all duration-300 ease-in-out mt-2">
                                            <textarea
                                                className="w-full border rounded px-2 py-1 text-sm resize-none"
                                                readOnly
                                                value={entry.response}
                                                rows={Math.max(4, entry.response.split("\n").length + 1)}
                                            />
                                        </div>

                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <button
                            onClick={() => addEntry(section.id)}
                            className="text-blue-600 mt-2 text-sm flex items-center gap-1"
                        >
                            ➕ Add Entry
                        </button>
                    </div>
                </div>
            ))}

            <div className="flex justify-end mt-6">
                <button
                    onClick={addSection}
                    className="bg-gray-100 hover:bg-gray-300 text-black px-4 py-2 text-sm rounded"
                >
                    ➕ Add Section
                </button>
            </div>
            <Dialog open={jobModalOpen} onClose={() => setJobModalOpen(false)} fullWidth>
                <DialogTitle>Paste Job Description</DialogTitle>
                <DialogContent>
                    <textarea
                        value={tempJobDescription}
                        onChange={(e) => setTempJobDescription(e.target.value)}
                        className="w-full border rounded mt-2 px-3 py-2 text-sm"
                        rows={8}
                        placeholder="Paste the job description here for better AI context..."
                    />
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setJobModalOpen(false)}
                        className="text-gray-500 text-sm px-3 py-1"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            setJobDescription(tempJobDescription);
                            setJobModalOpen(false);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                    >
                        Save
                    </button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
