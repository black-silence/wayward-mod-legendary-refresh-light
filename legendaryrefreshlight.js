var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mod = (function (_super) {
    __extends(Mod, _super);
    function Mod() {
        _super.apply(this, arguments);
    }
    Mod.prototype.onInitialize = function (saveDataGlobal) {
    };
    Mod.prototype.onLoad = function (saveData) {
    };
    Mod.prototype.onUnload = function () {
    };
    Mod.prototype.onSave = function () {
    };
    Mod.prototype.onTurnComplete = function () {
        var chanceToRefresh = this.getRefreshChance();
        var items = Item.getItemsInContainer(player.inventory, true);
        for (var i = items.length - 1; i >= 0; i--) {
            if (items[i].quality != ItemQuality.Legendary) {
                continue;
            }
            if (items[i].minDur < items[i].maxDur && Math.random() <= chanceToRefresh) {
                items[i].minDur += 1;
            }
            else if (items[i].decay > 0 && Math.random() <= chanceToRefresh) {
                items[i].decay += 1;
            }
        }
    };
    Mod.prototype.getRefreshChance = function () {
        var malignity = player.getMalignity();
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
    };
    return Mod;
}(Mods.Mod));
