import { useAtomValue } from "jotai";
import { personalInfoAtom } from "./atoms/personalInfoAtom";
import { resumeSectionsAtom } from "./atoms/resumeSectionsAtom";
import type { LiveResumePreviewProps } from "@/types/resume";
import { useEffect } from "react";
import { useAtom } from "jotai";
export default function LiveResumePreview({ dimensions }: LiveResumePreviewProps) {
  const personalInfo = useAtomValue(personalInfoAtom);
  const resumeSections = useAtomValue(resumeSectionsAtom);
  const [sections, setSections] = useAtom(resumeSectionsAtom);

  const getContactLine = () => {
    const parts = [
      personalInfo.city && personalInfo.state
        ? `${personalInfo.city}, ${personalInfo.state}`
        : personalInfo.city || personalInfo.state,
      personalInfo.phone,
      personalInfo.email,
    ].filter(Boolean);
    return parts.join(" | ");
  };

  useEffect(() => {
    const el = document.getElementById("resume-scroll-container");
    if (el) el.scrollLeft = 0;
  }, [dimensions]);

    // Load from localStorage on mount
    useEffect(() => {
      const saved = localStorage.getItem("resumeData");
      if (saved) setSections(JSON.parse(saved));
    }, []);
    
    // Save to localStorage whenever sections update
    useEffect(() => {
      localStorage.setItem("resumeData", JSON.stringify(sections));
    }, [sections]);
    

  return (
    <div
      id="resume-scroll-container"
      className="overflow-auto bg-gray-200"
      style={{
        display: "block",
        maxWidth: dimensions.width,
        maxHeight: dimensions.height,
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          width: dimensions.width,
          minWidth: dimensions.width,
          minHeight: dimensions.height,
        }}
        className="bg-white shadow-lg p-10 text-gray-900 font-sans"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold uppercase">
            {personalInfo.name || "Full Name"}
          </h1>
          {getContactLine() && (
            <p className="text-sm mt-1">{getContactLine()}</p>
          )}
          {personalInfo.linkedin && (
            <p className="text-sm">
              LinkedIn: <span className="underline">{personalInfo.linkedin}</span>
            </p>
          )}
        </div>

        {/* Sections */}
        {resumeSections.map((section) => (
          <div
            key={section.id}
            className="mb-6 break-inside-avoid-page"
            style={{ breakAfter: "page" }}
          >
            <div className="flex justify-between items-center border-b border-gray-300 mb-2">
              <h2 className="text-lg font-semibold uppercase">{section.heading}</h2>
            </div>

            {section.entries?.map((entry) => (
              <div key={entry.id} className="mb-4">
                <div className="flex justify-between text-sm font-semibold">
                  {/* Left: Position/Title */}
                  <span>{entry.position || ""}</span>
                  {/* Right: Timestamps */}
                  {entry.timestamps?.from && entry.timestamps?.to && (
                    <span className="italic text-gray-600">
                      {entry.timestamps.from} to {entry.timestamps.to}
                    </span>
                  )}
                </div>

                <div className="flex justify-between text-sm font-medium italic">
                  {/* Left: Company */}
                  <span>{entry.company || ""}</span>
                  {/* Right: Location */}
                  <span>{entry.location || ""}</span>
                </div>

                {/* Content */}
                <p className="text-sm whitespace-pre-line leading-relaxed mt-1">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
