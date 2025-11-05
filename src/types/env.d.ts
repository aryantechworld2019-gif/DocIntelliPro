// Global type definitions
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      GEMINI_API_KEY: string;
      DB_PATH?: string;
      STORAGE_PATH?: string;
      PORT?: string;
      VITE_API_URL?: string;
    }
  }
}

export {};
