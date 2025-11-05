// Environment variable loader for Electron app
// Note: In Electron, we need to load from both process.env and import.meta.env

export const env = {
  // Gemini API Key (loaded at runtime in Electron main process)
  GEMINI_API_KEY: typeof process !== 'undefined' ? process.env.GEMINI_API_KEY || '' : '',

  // Database path
  DB_PATH: typeof process !== 'undefined' ? process.env.DB_PATH || './data/docintelipro.db' : './data/docintelipro.db',

  // Storage path
  STORAGE_PATH: typeof process !== 'undefined' ? process.env.STORAGE_PATH || './storage' : './storage',

  // Port for API server
  PORT: typeof process !== 'undefined' ? parseInt(process.env.PORT || '3001', 10) : 3001,

  // Development mode
  isDevelopment: typeof process !== 'undefined' ? process.env.NODE_ENV === 'development' : false,

  // Vite environment variables (for renderer process)
  vite: {
    apiUrl: typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_API_URL : '',
  },
};

// Validate critical environment variables
export function validateEnv(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!env.GEMINI_API_KEY && env.isDevelopment) {
    errors.push('GEMINI_API_KEY is not set. AI features will not work.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Log environment status (only in development)
if (env.isDevelopment) {
  const validation = validateEnv();
  if (!validation.valid) {
    console.warn('⚠️  Environment validation warnings:');
    validation.errors.forEach((error) => console.warn(`  - ${error}`));
  } else {
    console.info('✓ Environment variables loaded successfully');
  }
}
