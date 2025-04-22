import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CloudBackground from "@/components/ui/CloudBackground";
import { Button } from "@mui/material";
import { useRouter } from "next/router";


const statements = [
  "Instantly level up your resume with AI-powered suggestions.",
  "Create a stunning resume in minutes with our intuitive builder.",
  "Preview your resume live and export as PDF.",
  "Get smart skill and project suggestions tailored to you.",
  "Match your resume to any job post with a single click.",
];

export default function WelcomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // Loop through each statement every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statements.length);
    }, 3000); // Change statement every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <CloudBackground>
      <div className="text-center px-6 max-w-3xl">
        {/* Fade-in Title */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold text-black"
        >
          LevelUp Resume Builder
        </motion.h1>

        {/* Fade-in Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-lg md:text-xl text-black mt-4"
        >
          Empowering your career with AI.
        </motion.p>

        {/* Animated Statement with Cursor */}
        <motion.div
          key={statements[currentIndex]}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-lg md:text-xl font-medium text-black inline-block whitespace-nowrap"
        >
          <span className="animate-typing">{statements[currentIndex]}</span>
          <span className="animate-cursor ml-1">|</span>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12"
        >
          <Button
            onClick={() => router.push("/builder")}
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #b37d5d 40%, #ffcc99 100%)",
              color: "#ffff",
              fontWeight: 600,
              fontSize: "1rem",
              borderRadius: "30px",
              px: 4,
              py: 1.5,
              boxShadow: "0 4px 20px rgba(179, 125, 93, 0.35)",
              transition: "all 0.3s ease-in-out",
              transform: "scale(1)",
              backgroundSize: "200%",
              backgroundPosition: "left center",
              "&:hover": {
                backgroundPosition: "right center",
                boxShadow: "0 6px 24px rgba(179, 125, 93, 0.5)",
                transform: "scale(1.05)",
              },
            }}
          >
            Start Building
          </Button>




        </motion.div>
      </div>
    </CloudBackground>
  );
}
