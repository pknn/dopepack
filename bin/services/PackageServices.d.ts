import { Version } from '../models/Version';
export declare const getCurrentVersion: (packFilePath: string) => Version;
export declare const setNewVersion: (packFilePath: string, newVersion: Version) => void;
