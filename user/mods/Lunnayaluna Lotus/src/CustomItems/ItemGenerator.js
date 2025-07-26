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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemGenerator = void 0;
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const GenEnums_1 = require("./GenEnums");
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
class ItemGenerator {
    ref;
    itemsToSell = [];
    barterScheme = {};
    loyaltyLevel = {};
    itemConfig;
    constructor(ref) {
        this.ref = ref;
    }
    //#region Item Gen
    createCustomItems(itemDirectory) {
        this.itemConfig = this.combineItems(itemDirectory);
        const tables = this.ref.tables;
        for (const newId in this.itemConfig) {
            const itemConfig = this.itemConfig[newId];
            const tempClone = GenEnums_1.AllItemList[itemConfig["ItemToClone"]] || itemConfig["ItemToClone"];
            const itemToClone = tempClone;
            const newItem = {
                itemTplToClone: itemToClone,
                overrideProperties: itemConfig.OverrideProperties,
                parentId: tables.templates.items[itemToClone]._parent,
                newId: newId,
                handbookParentId: this.createHandbook(itemConfig, newId).ParentId,
                handbookPriceRoubles: this.createHandbook(itemConfig, newId).Price,
                fleaPriceRoubles: this.createHandbook(itemConfig, newId).Price,
                locales: {
                    en: {
                        name: itemConfig.LocalePush.en.name,
                        shortName: itemConfig.LocalePush.en.shortName,
                        description: itemConfig.LocalePush.en.description,
                    },
                },
            };
            this.ref.customItem.createItemFromClone(newItem);
            if (itemConfig.CloneToFilters) {
                this.cloneToFilters(itemConfig, newId);
            }
            if (itemConfig.PushMastery) {
                this.pushMastery(itemConfig, newId);
            }
            if (itemConfig.BotPush?.AddToBots) {
                this.addToBots(itemConfig, newId);
            }
            if (itemConfig.LootPush?.LootContainersToAdd !== undefined) {
                this.addToStaticLoot(itemConfig, newId);
            }
            if (itemConfig.CasePush?.CaseFiltersToAdd !== undefined) {
                this.addToCases(itemConfig, newId);
            }
            if (itemConfig.PushToFleaBlacklist) {
                this.pushToBlacklist(newId);
            }
            if (itemConfig.SlotPush?.Slot !== undefined) {
                this.pushToSlot(itemConfig, newId);
            }
            if (itemConfig.PresetPush !== undefined) {
                this.addCustomPresets(itemConfig);
            }
            if (itemConfig.QuestPush !== undefined) {
                this.addToQuests(this.ref.tables.templates.quests, itemConfig.QuestPush.QuestConditionType, itemConfig.QuestPush.QuestTargetConditionToClone, newId);
            }
            this.buildCustomPresets(itemConfig, newId);
        }
    }
    createHandbook(itemConfig, itemID) {
        const tables = this.ref.tables;
        const tempClone = GenEnums_1.AllItemList[itemConfig["ItemToClone"]] || itemConfig["ItemToClone"];
        const itemToClone = tempClone;
        if (itemConfig.Handbook !== undefined) {
            const tempHBParent = GenEnums_1.HandbookIDs[itemConfig["Handbook"]["HandbookParent"]] || itemConfig["Handbook"]["HandbookParent"];
            const hbParent = tempHBParent;
            const handbookEntry = {
                Id: itemID,
                ParentId: hbParent,
                Price: itemConfig["Handbook"]["HandbookPrice"],
            };
            return handbookEntry;
        }
        else {
            const hbBase = tables.templates.handbook.Items.find((i) => i.Id === itemToClone);
            const handbookEntry = {
                Id: itemID,
                ParentId: hbBase.ParentId,
                Price: hbBase.Price,
            };
            return handbookEntry;
        }
    }
    cloneToFilters(itemConfig, itemID) {
        const tables = this.ref.tables;
        const tempClone = GenEnums_1.AllItemList[itemConfig.ItemToClone] || itemConfig.ItemToClone;
        const itemToClone = tempClone;
        for (const item in tables.templates.items) {
            const itemConflictId = tables.templates.items[item]._props.ConflictingItems;
            for (const itemInConflicts in itemConflictId) {
                const itemInConflictsFiltersId = itemConflictId[itemInConflicts];
                if (itemInConflictsFiltersId === itemToClone) {
                    itemConflictId.push(itemID);
                }
            }
            for (const slots in tables.templates.items[item]._props.Slots) {
                const slotsId = tables.templates.items[item]._props.Slots[slots]._props.filters[0].Filter;
                for (const itemInFilters in slotsId) {
                    const itemInFiltersId = slotsId[itemInFilters];
                    if (itemInFiltersId === itemToClone) {
                        slotsId.push(itemID);
                    }
                }
            }
            for (const cartridge in tables.templates.items[item]._props.Cartridges) {
                const cartridgeId = tables.templates.items[item]._props.Cartridges[cartridge]._props.filters[0].Filter;
                for (const itemInFilters in cartridgeId) {
                    const itemInFiltersId = cartridgeId[itemInFilters];
                    if (itemInFiltersId === itemToClone) {
                        cartridgeId.push(itemID);
                    }
                }
            }
            for (const chamber in tables.templates.items[item]._props.Chambers) {
                const chamberId = tables.templates.items[item]._props.Chambers[chamber]._props.filters[0].Filter;
                for (const itemInFilters in chamberId) {
                    const itemInFiltersId = chamberId[itemInFilters];
                    if (itemInFiltersId === itemToClone) {
                        chamberId.push(itemID);
                    }
                }
            }
        }
    }
    pushMastery(itemConfig, itemID) {
        const tables = this.ref.tables;
        const new_mastery_DJCore = {
            Name: itemConfig.LocalePush.en.name,
            Templates: [itemID],
            Level2: 450,
            Level3: 900,
        };
        tables.globals.config.Mastering.push(new_mastery_DJCore);
    }
    addToBots(itemConfig, itemID) {
        const tables = this.ref.tables;
        const tempClone = GenEnums_1.AllItemList[itemConfig.ItemToClone] || itemConfig.ItemToClone;
        const itemToClone = tempClone;
        for (const botId in tables.bots.types) {
            for (const lootSlot in tables.bots.types[botId].inventory.items) {
                const items = tables.bots.types[botId].inventory.items;
                if (items[lootSlot][itemToClone]) {
                    const weight = items[lootSlot][itemToClone];
                    items[lootSlot][itemID] = weight;
                }
            }
            for (const equipSlot in tables.bots.types[botId].inventory.equipment) {
                const equip = tables.bots.types[botId].inventory.equipment;
                if (equip[equipSlot][itemToClone]) {
                    const weight = equip[equipSlot][itemToClone];
                    equip[equipSlot][itemID] = weight;
                }
            }
            for (const modItem in tables.bots.types[botId].inventory.mods) {
                for (const modSlot in tables.bots.types[botId].inventory.mods[modItem]) {
                    if (tables.bots.types[botId]?.inventory?.mods[modItem][modSlot][itemToClone]) {
                        tables.bots.types[botId].inventory.mods[modItem][modSlot].push(itemID);
                    }
                }
                if (tables.bots.types[botId]?.inventory?.mods[itemToClone]) {
                    tables.bots.types[botId].inventory.mods[itemID] = structuredClone(tables.bots.types[botId].inventory.mods[itemToClone]);
                }
            }
        }
    }
    addToStaticLoot(itemConfig, itemID) {
        const tables = this.ref.tables;
        const locations = tables.locations;
        if (Array.isArray(itemConfig.LootPush?.LootContainersToAdd)) {
            itemConfig.LootPush?.LootContainersToAdd.forEach((lootContainer) => {
                const tempLC = GenEnums_1.AllItemList[lootContainer] || lootContainer;
                const staticLC = tempLC;
                const lootToPush = {
                    tpl: itemID,
                    relativeProbability: itemConfig.LootPush?.StaticLootProbability,
                };
                for (const map in locations) {
                    if (locations.hasOwnProperty(map)) {
                        const location = locations[map];
                        if (location.staticLoot) {
                            const staticLoot = location.staticLoot;
                            if (staticLoot.hasOwnProperty(staticLC)) {
                                const staticContainer = staticLoot[staticLC];
                                if (staticContainer) {
                                    staticContainer.itemDistribution.push(lootToPush);
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    addToCases(itemConfig, itemID) {
        const tables = this.ref.tables;
        const items = tables.templates.items;
        if (Array.isArray(itemConfig.CasePush?.CaseFiltersToAdd)) {
            itemConfig.CasePush?.CaseFiltersToAdd.forEach((caseToAdd) => {
                const tempCases = GenEnums_1.AllItemList[caseToAdd] || caseToAdd;
                const cases = tempCases;
                for (const item in items) {
                    if (items[item]._id === cases) {
                        if (items[item]._props?.Grids[0]._props.filters[0].Filter === undefined) {
                            const unbreakFilters = [
                                {
                                    Filter: ["54009119af1c881c07000029"],
                                    ExcludedFilter: [""],
                                },
                            ];
                            tables.templates.items[cases]._props.Grids[0]._props.filters = unbreakFilters;
                        }
                        else if (items[item]._props?.Grids[0]._props.filters[0].Filter !== undefined) {
                            items[item]._props?.Grids[0]._props.filters[0].Filter.push(itemID);
                        }
                    }
                }
            });
        }
        else {
            for (const item in items) {
                if (items[item]._id === itemConfig.CasePush?.CaseFiltersToAdd) {
                    if (items[item]._props?.Grids[0]._props.filters[0].Filter === undefined) {
                        const unbreakFilters = [
                            {
                                Filter: ["54009119af1c881c07000029"],
                                ExcludedFilter: [""],
                            },
                        ];
                        tables.templates.items[itemConfig.CasePush?.CaseFiltersToAdd]._props.Grids[0]._props.filters =
                            unbreakFilters;
                    }
                    if (items[item]._props?.Grids[0]._props.filters[0].Filter !== undefined) {
                        items[item]._props?.Grids[0]._props.filters[0].Filter.push(itemID);
                    }
                }
            }
        }
    }
    pushToSlot(itemConfig, itemID) {
        const tables = this.ref.tables;
        const DefaultInventory = tables.templates.items["55d7217a4bdc2d86028b456d"]._props.Slots;
        const tempSlot = GenEnums_1.SlotsIDs[itemConfig.SlotPush?.Slot] || itemConfig.SlotPush?.Slot;
        const slotToPush = tempSlot;
        DefaultInventory[slotToPush]._props.filters[0].Filter.push(itemID);
    }
    pushToBlacklist(itemID) {
        const ragfair = this.ref.configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        ragfair.dynamic.blacklist.custom.push(...[itemID]);
    }
    combineItems(itemDirectory) {
        const modules = fs.readdirSync(path.join(__dirname, itemDirectory));
        const combinedModules = {};
        modules.forEach((modFile) => {
            const filesPath = path.join(__dirname, itemDirectory, modFile);
            const fileContents = fs.readFileSync(filesPath, "utf-8");
            const module = JSON.parse(fileContents);
            Object.assign(combinedModules, module);
        });
        return combinedModules;
    }
    addCustomPresets(itemConfig) {
        const tables = this.ref.tables;
        const customPresets = itemConfig.PresetPush.PresetToAdd;
        const presets = tables.globals.ItemPresets;
        if (itemConfig.PresetPush !== undefined) {
            customPresets.forEach((preset) => {
                const finalPreset = {
                    _changeWeaponName: preset._changeWeaponName,
                    _encyclopedia: preset._encyclopedia || undefined,
                    _id: preset._id,
                    _items: preset._items.map((itemData) => {
                        const item = {
                            _id: itemData._id,
                            _tpl: itemData._tpl,
                        };
                        if (itemData.parentId) {
                            item.parentId = itemData.parentId;
                        }
                        if (itemData.slotId) {
                            item.slotId = itemData.slotId;
                        }
                        return item;
                    }),
                    _name: preset._name,
                    _parent: preset._parent,
                    _type: "Preset",
                };
                presets[finalPreset._id] = finalPreset;
            });
        }
    }
    buildCustomPresets(itemConfig, itemID) {
        const tables = this.ref.tables;
        const presets = tables.globals.ItemPresets;
        const basePresetID = this.ref.hashUtil.generate();
        if (tables.templates.items[itemID]._parent === "5a341c4086f77401f2541505" ||
            tables.templates.items[itemID]._parent === "5448e5284bdc2dcb718b4567" ||
            tables.templates.items[itemID]._parent === "5448e54d4bdc2dcc718b4568") {
            const finalPreset = {
                _changeWeaponName: false,
                _encyclopedia: itemID,
                _id: this.ref.hashUtil.generate(),
                _items: [],
                _name: `${itemConfig.LocalePush.en.name} Preset`,
                _parent: basePresetID,
                _type: "Preset",
            };
            finalPreset._items.push({ _id: basePresetID, _tpl: itemID });
            tables.templates.items[itemID]._props.Slots.forEach((slot) => {
                if (slot._name !== "mod_nvg") {
                    finalPreset._items.push({
                        _id: this.ref.hashUtil.generate(),
                        _tpl: this.ref.randomUtil
                            .drawRandomFromList(slot._props.filters[0].Filter, 1, false)
                            .toString(),
                        parentId: basePresetID,
                        slotId: slot._name,
                    });
                }
            });
            presets[finalPreset._id] = finalPreset;
        }
    }
    addToQuests(quests, condition, target, newTarget) {
        for (const quest of Object.keys(quests)) {
            const questConditions = quests[quest];
            for (const nextCondition of questConditions.conditions.AvailableForFinish) {
                const nextConditionData = nextCondition;
                if (nextConditionData.conditionType == condition && nextConditionData.target.includes(target)) {
                    nextConditionData.target.push(newTarget);
                }
            }
        }
    }
    //#endregion
    //
    //
    //
    //#region Clothing Gen
    createClothingTop(newTopConfig) {
        const tables = this.ref.tables;
        const newTop = structuredClone(tables.templates.customization["5d28adcb86f77429242fc893"]);
        const newHands = structuredClone(tables.templates.customization[newTopConfig.HandsToClone]);
        const newSet = structuredClone(tables.templates.customization["5d1f623e86f7744bce0ef705"]);
        newTop._id = newTopConfig.NewOutfitID;
        newTop._name = newTopConfig.LocaleName;
        newTop._props.Prefab.path = newTopConfig.BundlePath;
        tables.templates.customization[newTopConfig.NewOutfitID] = newTop;
        newHands._id = `${newTopConfig.NewOutfitID}Hands`;
        newHands._name = `${newTopConfig.LocaleName}Hands`;
        newHands._props.Prefab.path = newTopConfig.HandsBundlePath;
        tables.templates.customization[`${newTopConfig.NewOutfitID}Hands`] = newHands;
        newSet._id = `${newTopConfig.NewOutfitID}Set`;
        newSet._name = `${newTopConfig.LocaleName}Set`;
        newSet._props.Body = newTopConfig.NewOutfitID;
        newSet._props.Hands = `${newTopConfig.NewOutfitID}Hands`;
        newSet._props.Side = ["Usec", "Bear", "Savage"];
        tables.templates.customization[`${newTopConfig.NewOutfitID}Set`] = newSet;
        for (const locale in tables.locales.global) {
            tables.locales.global[locale][`${newTopConfig.NewOutfitID}Set Name`] = newTopConfig.LocaleName;
        }
        if (newTopConfig.TraderScheme !== undefined) {
            if (!tables.traders[newTopConfig.TraderScheme?.TraderToUse].base.customization_seller) {
                tables.traders[newTopConfig.TraderScheme?.TraderToUse].base.customization_seller = true;
            }
            if (!tables.traders[newTopConfig.TraderScheme?.TraderToUse].suits) {
                tables.traders[newTopConfig.TraderScheme?.TraderToUse].suits = [];
            }
            tables.traders[newTopConfig.TraderScheme?.TraderToUse].suits.push({
                _id: newTopConfig.NewOutfitID,
                tid: newTopConfig.TraderScheme?.TraderToUse,
                suiteId: `${newTopConfig.NewOutfitID}Set`,
                isActive: true,
                requirements: {
                    loyaltyLevel: newTopConfig.TraderScheme?.LoyaltyLevel,
                    profileLevel: newTopConfig.TraderScheme?.ProfileLevelRequirement,
                    standing: newTopConfig.TraderScheme?.TraderStandingRequirement,
                    skillRequirements: [],
                    questRequirements: [],
                    itemRequirements: [
                        {
                            count: newTopConfig.TraderScheme?.Cost,
                            _tpl: newTopConfig.TraderScheme?.CurrencyToUse,
                            onlyFunctional: false,
                        },
                    ],
                },
            });
        }
    }
    createClothingBottom(newBottomConfig) {
        const tables = this.ref.tables;
        const newBottom = structuredClone(tables.templates.customization["5d5e7f4986f7746956659f8a"]);
        const newSet = structuredClone(tables.templates.customization["5cd946231388ce000d572fe3"]);
        newBottom._id = newBottomConfig.NewBottomsID;
        newBottom._name = newBottomConfig.LocaleName;
        newBottom._props.Prefab.path = newBottomConfig.BundlePath;
        tables.templates.customization[newBottomConfig.NewBottomsID] = newBottom;
        newSet._id = `${newBottomConfig.NewBottomsID}Set`;
        newSet._name = `${newBottomConfig.NewBottomsID}Set`;
        newSet._props.Feet = newBottomConfig.NewBottomsID;
        newSet._props.Side = ["Usec", "Bear", "Savage"];
        tables.templates.customization[`${newBottomConfig.NewBottomsID}Set`] = newSet;
        for (const locale in tables.locales.global) {
            tables.locales.global[locale][`${newBottomConfig.NewBottomsID}Set Name`] = newBottomConfig.LocaleName;
        }
        if (newBottomConfig.TraderScheme !== undefined) {
            if (!tables.traders[newBottomConfig.TraderScheme?.TraderToUse].base.customization_seller) {
                tables.traders[newBottomConfig.TraderScheme?.TraderToUse].base.customization_seller = true;
            }
            if (!tables.traders[newBottomConfig.TraderScheme?.TraderToUse].suits) {
                tables.traders[newBottomConfig.TraderScheme?.TraderToUse].suits = [];
            }
            tables.traders[newBottomConfig.TraderScheme?.TraderToUse].suits.push({
                _id: newBottomConfig.NewBottomsID,
                tid: newBottomConfig.TraderScheme?.TraderToUse,
                suiteId: `${newBottomConfig.NewBottomsID}Set`,
                isActive: true,
                requirements: {
                    loyaltyLevel: newBottomConfig.TraderScheme?.LoyaltyLevel,
                    profileLevel: newBottomConfig.TraderScheme?.ProfileLevelRequirement,
                    standing: newBottomConfig.TraderScheme?.TraderStandingRequirement,
                    skillRequirements: [],
                    questRequirements: [],
                    itemRequirements: [
                        {
                            count: newBottomConfig.TraderScheme?.Cost,
                            _tpl: newBottomConfig.TraderScheme?.CurrencyToUse,
                            onlyFunctional: false,
                        },
                    ],
                },
            });
        }
    }
}
exports.ItemGenerator = ItemGenerator;
//# sourceMappingURL=ItemGenerator.js.map