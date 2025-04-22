import { useEffect, useRef } from "react";

export default function CloudBackground({ children }: { children: React.ReactNode }) {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    const waitForVantaAndThree = () => {
      // 🔍 Debug logs to confirm what’s available
      console.log("✅ window.VANTA:", window.VANTA);
      console.log("✅ window.THREE:", (window as any).THREE);
  
      const hasThree = typeof (window as any).THREE !== "undefined";
      const hasFOG = typeof window.VANTA?.FOG === "function";
  
      if (hasThree && hasFOG && !vantaEffect.current && vantaRef.current) {
        console.log("🎉 Both VANTA and THREE are ready, initializing...");
  
        vantaEffect.current = window.VANTA.FOG({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x8e614b,
          midtoneColor: 0xffffff,
          lowlightColor: 0xff9d00,
          baseColor: 0xffffff,
          blurFactor: 0.6,
          zoom: 1,
          speed: 1,
        });
        
      } else {
        console.log("⏳ Waiting for VANTA or THREE to load...");
        setTimeout(waitForVantaAndThree, 200);
      }
    };
  
    waitForVantaAndThree();
  
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        console.log("🧹 Cleaned up Vanta effect");
      }
    };
  }, []);
  

  return (
    <div ref={vantaRef} className="relative w-full h-screen overflow-hidden text-white">
      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        {children}
      </div>
    </div>

    
  );
}
