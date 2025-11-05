// Type definitions for Electron IPC API exposed to renderer
export interface ElectronAPI {
  selectFolder: () => Promise<string | undefined>;
  selectFiles: () => Promise<string[]>;
  readFile: (filePath: string) => Promise<{ success: boolean; data?: Buffer; error?: string }>;
  getAppPath: () => Promise<string>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export {};
