/// <reference path="mod-reference/modreference.d.ts"/>

class Mod extends Mods.Mod {

    public onInitialize(saveDataGlobal: any): any {
    }

    public onLoad(saveData: any): void {
    }

    public onUnload(): void {
    }

    public onSave(): any {
    }

    /**
     * Called when a turn is completing
     */
    public onTurnComplete(): void {

        let chanceToRefresh = this.getRefreshChance();

        let items = Item.getItemsInContainer(player.inventory, true);
        for (let i = items.length - 1; i >= 0; i--) {

            if (items[i].quality != ItemQuality.Legendary) {
                continue;
            }

            // TODO cache legendary item list instead of looping full inventory each turn

            if (items[i].minDur < items[i].maxDur && Math.random() <= chanceToRefresh) {
                items[i].minDur += 1;
            } else if (items[i].decay > 0 && Math.random() <= chanceToRefresh) {
                items[i].decay += 1;
            }

        }

    }

    /**
     * Get chance to refresh an item, based on malignity
     */
    private getRefreshChance(): number {

        let malignity = player.getMalignity();

        if (malignity > 50000) {
            return 0; // The island hates you!
        } else if (malignity > 40000) {
            return 0.001;
        } else if (malignity > 30000) {
            return 0.005;
        } else if (malignity > 20000) {
            return 0.01;
        } else if (malignity > 10000) {
            return 0.02;
        } else if (malignity > 0) {
            return 0.04;
        } else {
            return 0.10; // You care for the island, the island cares for you.
        }

    }

}
