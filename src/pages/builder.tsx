import { useRef, useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { atom, useAtom } from "jotai";
import LiveResumePreview from "@/components/builder/LiveResumePreview";
import ResumeForm from "@/components/builder/ResumeForm";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// ...

const handleDownload = async () => {
    const resumeElement = document.getElementById("resume-scroll-container");
    if (!resumeElement) return;

    const canvas = await html2canvas(resumeElement, {
        scale: 2, // higher scale = better quality
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("resume.pdf");
};



const paperSizeAtom = atom<keyof typeof PAPER_SIZES>("A4");

const PAPER_SIZES = {
    A4: { width: "794px", height: "1123px" },
    A3: { width: "1123px", height: "1587px" },
    Letter: { width: "816px", height: "1056px" },
};

export default function BuilderPage() {
    const [paperSize, setPaperSize] = useAtom(paperSizeAtom);
    const [leftWidth, setLeftWidth] = useState(50); // percent
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const isDragging = useRef(false);

    /** ← create the two handlers **once** */
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            const newLeft = (e.clientX / window.innerWidth) * 100;
            if (newLeft > 20 && newLeft < 80) setLeftWidth(newLeft);
        };

        const stopDrag = () => (isDragging.current = false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", stopDrag);

        /** cleanup when <BuilderPage/> unmounts (or hot‑reloads) */
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", stopDrag);
        };
    }, []);         //  ← empty dep‑array = only once

    return (
        <main className="flex h-screen overflow-hidden">
            {/* LEFT: Resume Form */}
            <section
                className="p-6 overflow-y-scroll"
                style={{ width: `${leftWidth}%`, minWidth: "20%" }}
            >
                <ResumeForm />
            </section>

            {/* Divider */}
            <div
                className="w-1 bg-gray-400 cursor-col-resize"
                onMouseDown={() => (isDragging.current = true)}
            />

            {/* RIGHT: Live Preview */}
            <section
                className="p-6 bg-gray-100 overflow-y-scroll flex flex-col items-center"
                style={{ width: `${100 - leftWidth}%`, minWidth: "20%" }}
            >
                <div className="w-full flex justify-end items-center mb-4 gap-3">
                    <FormControl size="small">
                        <InputLabel>Paper Size</InputLabel>
                        <Select
                            value={paperSize}
                            onChange={(e) =>
                                setPaperSize(e.target.value as keyof typeof PAPER_SIZES)
                            }
                            label="Paper Size"
                            sx={{ minWidth: 120 }}
                        >
                            <MenuItem value="A4">A4</MenuItem>
                            <MenuItem value="A3">A3</MenuItem>
                            <MenuItem value="Letter">Letter</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Preview Button */}
                    <button
                        onClick={() => setIsPreviewOpen(true)}
                        className="px-3 py-1 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                        Preview
                    </button>
                    <button
                        onClick={handleDownload}
                        className="px-3 py-1 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded"
                    >
                         Download PDF
                    </button>

                </div>

                <LiveResumePreview dimensions={PAPER_SIZES[paperSize]} />
            </section>

            {/* Floating Preview Modal */}
            {isPreviewOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        className="bg-gray-100 relative shadow-lg overflow-auto rounded-md p-8"
                        style={{
                            maxHeight: "90vh",
                            maxWidth: "90vw",
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsPreviewOpen(false)}
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                            Close
                        </button>

                        {/* Resume inside modal */}
                        <div className="bg-white flex justify-center items-center">
                            <LiveResumePreview dimensions={PAPER_SIZES[paperSize]} />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
