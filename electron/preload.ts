import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  selectFiles: () => ipcRenderer.invoke('select-files'),
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
});

export type ElectronAPI = {
  selectFolder: () => Promise<string>;
  selectFiles: () => Promise<string[]>;
  readFile: (filePath: string) => Promise<{ success: boolean; data?: Buffer; error?: string }>;
  getAppPath: () => Promise<string>;
};

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
