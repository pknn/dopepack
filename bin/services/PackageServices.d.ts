import { Version } from '../models/Version';
export declare const getCurrentVersion: (packFilePath: string) => Version;
export declare const createBackupPackJson: (packFilePath: string) => void;
export declare const clearBackupPackJson: (packFilePath: string) => void;
export declare const restoreBackupPackJson: (packFilePath: string) => void;
export declare const setNewVersion: (packFilePath: string, newVersion: Version) => void;
