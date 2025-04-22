declare module 'vanta/dist/vanta.waves.min' {
    const VANTA: any;
    export default VANTA;
  }

  export {};

  export {};

  declare global {
    interface Window {
      VANTA: {
        FOG: (config: any) => any;
      };
      THREE: any; // Optional if you use this
    }
  }
  