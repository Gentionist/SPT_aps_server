"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
//Modules
const node_path_1 = __importStar(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
let Utils = class Utils {
    hashUtil;
    randomUtil;
    preSptModLoader;
    constructor(hashUtil, randomUtil, preSptModLoader) {
        this.hashUtil = hashUtil;
        this.randomUtil = randomUtil;
        this.preSptModLoader = preSptModLoader;
    }
    static modLoc = node_path_1.default.join(__dirname, "..", "..");
    //#region Base Utils
    loadFiles(dirPath, extName, cb) {
        if (!node_fs_1.default.existsSync(dirPath))
            return;
        const dir = node_fs_1.default.readdirSync(dirPath, { withFileTypes: true });
        dir.forEach((item) => {
            const itemPath = node_path_1.default.normalize(`${dirPath}/${item.name}`);
            if (item.isDirectory())
                this.loadFiles(itemPath, extName, cb);
            else if (extName.includes(node_path_1.default.extname(item.name)))
                cb(itemPath);
        });
    }
    /**
     * Checks the mods directory to see if another mod is installed.
     *
     * @param modName - Folder name of the mod to check for.
     * @returns True if the mod is installed, else return false.
     */
    checkForMod(modName) {
        return this.preSptModLoader.getImportedModsNames().includes(modName);
    }
    /**
     * Sorts and shuffles the specified array.
     *
     * @param array - Array to shuffle.
     * @returns The shuffled array.
     */
    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    /**
     * Generates a random string to be used as an instance Id.
     * Gens a new ID each time it runs so not suitable for tpls and such unless you cache the Id.
     *
     * @returns Valid instance Id.
     */
    genId() {
        return this.hashUtil.generate();
    }
    /**
     * Generates a random number in the supplied range.
     *
     * @returns Random integer in the given range.
     */
    genRandomCount(min, max) {
        return this.randomUtil.randInt(min, max);
    }
    /**
     * Pulls a random item from the specified array.
     *
     * @param list - The array to pull from.
     * @param count - Optional param. The number of items to return from the array. Returns 1 if left unused
     * @returns The pulled item as a string.
     */
    drawRandom(list, count) {
        return this.randomUtil.drawRandomFromList(list, count ?? 1, false).toString();
    }
    /**
     * Checks for dependancies in the specified path.
     *
     * @param path - The path to your dependancy. This is the containing folder. Ie BepInEx/plugins
     * @param dependancy - The dependancy you are checking for. Ie raidoverhaul.dll
     * @returns True if the dependancy exists and false if it doesn't.
     */
    checkDependancies(path, dependancy) {
        try {
            return path.includes(dependancy);
        }
        catch {
            return false;
        }
    }
    getFilesOfType(directory, fileType, files = []) {
        // no dir so exit early
        if (!node_fs_1.default.existsSync(directory)) {
            return files;
        }
        const dirents = node_fs_1.default.readdirSync(directory, { encoding: "utf-8", withFileTypes: true });
        for (const dirent of dirents) {
            const res = (0, node_path_1.resolve)(directory, dirent.name);
            if (dirent.isDirectory()) {
                this.getFilesOfType(res, fileType, files);
            }
            else {
                if (res.endsWith(fileType)) {
                    files.push(res);
                }
            }
        }
        return files;
    }
};
exports.Utils = Utils;
exports.Utils = Utils = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("HashUtil")),
    __param(1, (0, tsyringe_1.inject)("RandomUtil")),
    __param(2, (0, tsyringe_1.inject)("PreSptModLoader")),
    __metadata("design:paramtypes", [Object, Object, Object])
], Utils);
//# sourceMappingURL=Utils.js.map