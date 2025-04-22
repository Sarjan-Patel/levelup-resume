// lib/openai.ts
export async function fetchAIResponse(prompt: string): Promise<string> {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.result || "No response generated.";
    } catch (error) {
      console.error("fetchAIResponse failed:", error);
      return "Error generating AI response.";
    }
  }
  