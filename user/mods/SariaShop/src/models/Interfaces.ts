//Spt Classes
import type { IItem } from "@spt/models/eft/common/tables/IItem";

export interface WeaponPreset {
    _id: string;
    _name: string;
    _parent: string;
    _items: IItem[];
}

export interface ArmorPreset {
    _id: string;
    _name: string;
    _parent: string;
    _items: IItem[];
}

export interface AssortTemplate {
    items: [
        {
            _id: string;
            _tpl: string;
            parentId: string;
            slotId: string;
            upd: {
                StackObjectsCount: number;
                UnlimitedCount: boolean;
            };
        },
    ];
    barter_scheme: {
        [itemid: string]: [
            [
                {
                    _tpl: string;
                    count: number;
                },
            ],
        ];
    };
    loyal_level_items: {
        [itemid: string]: number;
    };
}
//#endregion

export interface configFile {
    UnlimitedStackCount: boolean;
    RemoveMoneyLLRequirements: boolean;
    RemoveLevelLLRequirements: boolean;
}

export interface itemEntry {
    itemFormat: Record<string, string>;
}
