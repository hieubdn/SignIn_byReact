// src/zalo.d.ts
interface ZaloSDK {
    init: () => void;
    login: (options: { scope: string; redirect_uri: string }) => void;
  }
  
  declare global {
    interface Window {
      zalo: ZaloSDK;
    }
  }
  
  export {};