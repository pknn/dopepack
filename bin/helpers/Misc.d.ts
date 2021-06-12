import { UpgradeOption } from '../models/CommandOptions';
import { Version } from '../models/Version';
export declare const fromVersionString: (versionString: string) => Version;
export declare const toVersionString: (version: Version) => string;
export declare const toPrettyJsonString: (object: Record<string, unknown>) => string;
export declare const toUpgradedVersion: (currentVersion: Version, option: UpgradeOption) => Version;
