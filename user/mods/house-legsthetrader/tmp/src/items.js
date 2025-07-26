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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const LogTextColor_1 = require("@spt/models/spt/logging/LogTextColor");
const modPath = path.normalize(path.join(__dirname, '..'));
class items {
    mod;
    logger;
    configServer;
    constructor() {
    }
    items(container) {
        this.logger.debug(`[${this.mod}] postDb Loading... `);
        /*
                const bearHat: NewItemFromCloneDetails = {
                    itemTplToClone: "5b40e61f5acfc4001a599bec",
                    overrideProperties: {
                        Name: "Bear 5 Panel",
                        ShortName: "Bear Hat",
                        Description: "5 Panel hat used by BEAR PMCs",
                        Weight: 1,
                        Prefab: {
                            "path": "bear_hat.bundle",
                            "rcid": ""
                        },
                        Width: 1,
                        Height: 1
                    },
                    parentId: "5a341c4086f77401f2541505",
                    newId: "6765d79148caecc924f38301",
                    fleaPriceRoubles: 1,
                    handbookPriceRoubles: 1,
                    handbookParentId: "6765d794b79a3bb2607a2389",
                    locales: {
                        en: {
                            name: "Bear 5 Panel",
                            shortName: "Bear Hat",
                            description: "5 Panel hat used by BEAR PMCs",
                        },
                    },
                };
        
                customItem.createItemFromClone(bearHat);
        */
        this.logger.log("Custom Items Loaded", LogTextColor_1.LogTextColor.GREEN);
    }
}
