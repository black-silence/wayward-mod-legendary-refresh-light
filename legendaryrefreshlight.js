define(["require", "exports", "Enums", "mod/Mod"], function (require, exports, Enums_1, Mod_1) {
    "use strict";
    class LegendaryRefreshLight extends Mod_1.default {
        onInitialize(saveDataGlobal) {
        }
        onGameTickEnd() {
            let chanceToRefresh = this.getRefreshChance();
            let items = itemManager.getItemsInContainer(localPlayer.inventory, true);
            for (let i = items.length - 1; i >= 0; i--) {
                if (items[i].quality != Enums_1.ItemQuality.Legendary) {
                    continue;
                }
                if (items[i].minDur < items[i].maxDur && Math.random() <= chanceToRefresh) {
                    items[i].minDur += 1;
                }
                else if (items[i].decay > 0 && Math.random() <= chanceToRefresh) {
                    items[i].decay += 1;
                }
            }
        }
        getRefreshChance() {
            let malignity = localPlayer.getReputation();
            if (malignity > 50000) {
                return 0;
            }
            else if (malignity > 40000) {
                return 0.001;
            }
            else if (malignity > 30000) {
                return 0.005;
            }
            else if (malignity > 20000) {
                return 0.01;
            }
            else if (malignity > 10000) {
                return 0.02;
            }
            else if (malignity > 0) {
                return 0.04;
            }
            else {
                return 0.10;
            }
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = LegendaryRefreshLight;
});
