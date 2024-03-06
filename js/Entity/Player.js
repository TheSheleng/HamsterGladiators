import * as BaseEntityModule from "./BaseEntity.js"
import * as InventoryModule from "../Manager/InventoryManager.js"

export class Player extends BaseEntityModule.BaseEntity
{
    Inventory;
    Level = 1;

    Dodge(Target, Direction) {
        Target.DodgeSwing(Direction);
    }

    GetReaction() {
        return this.Speed * 1000
    }
}