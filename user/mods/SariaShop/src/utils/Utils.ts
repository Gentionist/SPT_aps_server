import { inject, injectable } from "tsyringe";
//Spt Classes
import type { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import type { HashUtil } from "@spt/utils/HashUtil";
import type { RandomUtil } from "@spt/utils/RandomUtil";
//Modules
import path, { resolve } from "node:path";
import fs from "node:fs";

@injectable()
export class Utils {
    constructor(
        @inject("HashUtil") protected hashUtil: HashUtil,
        @inject("RandomUtil") protected randomUtil: RandomUtil,
        @inject("PreSptModLoader") protected preSptModLoader: PreSptModLoader,
    ) {}
    public static modLoc = path.join(__dirname, "..", "..");

    //#region Base Utils
    public loadFiles(dirPath, extName, cb): void {
        if (!fs.existsSync(dirPath)) return;
        const dir = fs.readdirSync(dirPath, { withFileTypes: true });
        dir.forEach((item) => {
            const itemPath = path.normalize(`${dirPath}/${item.name}`);
            if (item.isDirectory()) this.loadFiles(itemPath, extName, cb);
            else if (extName.includes(path.extname(item.name))) cb(itemPath);
        });
    }

    /**
     * Checks the mods directory to see if another mod is installed.
     *
     * @param modName - Folder name of the mod to check for.
     * @returns True if the mod is installed, else return false.
     */
    public checkForMod(modName: string): boolean {
        return this.preSptModLoader.getImportedModsNames().includes(modName);
    }

    /**
     * Sorts and shuffles the specified array.
     *
     * @param array - Array to shuffle.
     * @returns The shuffled array.
     */
    public shuffle(array: string[]): string[] {
        return array.sort(() => Math.random() - 0.5);
    }

    /**
     * Generates a random string to be used as an instance Id.
     * Gens a new ID each time it runs so not suitable for tpls and such unless you cache the Id.
     *
     * @returns Valid instance Id.
     */
    public genId(): string {
        return this.hashUtil.generate();
    }

    /**
     * Generates a random number in the supplied range.
     *
     * @returns Random integer in the given range.
     */
    public genRandomCount(min: number, max: number): number {
        return this.randomUtil.randInt(min, max);
    }

    /**
     * Pulls a random item from the specified array.
     *
     * @param list - The array to pull from.
     * @param count - Optional param. The number of items to return from the array. Returns 1 if left unused
     * @returns The pulled item as a string.
     */
    public drawRandom(list: string[], count?: number): string {
        return this.randomUtil.drawRandomFromList(list, count ?? 1, false).toString();
    }

    /**
     * Checks for dependancies in the specified path.
     *
     * @param path - The path to your dependancy. This is the containing folder. Ie BepInEx/plugins
     * @param dependancy - The dependancy you are checking for. Ie raidoverhaul.dll
     * @returns True if the dependancy exists and false if it doesn't.
     */
    public checkDependancies(path: string[], dependancy: string): boolean {
        try {
            return path.includes(dependancy);
        } catch {
            return false;
        }
    }

    public getFilesOfType(directory: string, fileType: string, files: string[] = []): string[] {
        // no dir so exit early
        if (!fs.existsSync(directory)) {
            return files;
        }

        const dirents = fs.readdirSync(directory, { encoding: "utf-8", withFileTypes: true });
        for (const dirent of dirents) {
            const res = resolve(directory, dirent.name);
            if (dirent.isDirectory()) {
                this.getFilesOfType(res, fileType, files);
            } else {
                if (res.endsWith(fileType)) {
                    files.push(res);
                }
            }
        }

        return files;
    }
    //#endregion
}
