import * as HGStaticsModule from "./HGStatics.js";
import * as PlayerModule from "./Entity/Player.js";
import * as MobGeneratorModule from "./Fabric/MobGenerator.js";
import * as InventoryModule from "./Manager/InventoryManager.js";

export class Game 
{
    CurrentPlayer;
    CurrentMob;

    Room = 1;
    BossRoomEach = 6;

    constructor()
    {
        // Initialization player
        this.CurrentPlayer = new PlayerModule.Player(10, 1, 1);
        this.CurrentPlayer.Inventory = new InventoryModule.InventoryManager();
    }

    BattleInterval = undefined;

    // Creates an enemy and engage him in battle
    StartFight()
    {
        // Create mob
        if (this.Room % this.BossRoomEach === 0)
        {
            this.CurrentMob = MobGeneratorModule.MobGenerator.CreateRandomBoss(this.Room);
        }
        else
        {
            this.CurrentMob = MobGeneratorModule.MobGenerator.CreateRandomMob(this.Room);
        }

        this.CurrentMob.OnDieCallbacks.push(() => {
            clearInterval(this.CurrentMob.SwingTimeout);
            clearInterval(this.BattleInterval);

            // Give award for player
            const MaxAwards = 2;
            const AwardCount = () => Math.floor(Math.random() * (MaxAwards));

            this.CurrentPlayer.Inventory.GetPoisons(new Map([
                ["HPPoison", AwardCount()],
                ["DMGPoison", AwardCount()],
                ["SPEEDPotion", AwardCount()],
            ]));

            HGStaticsModule.HGStatics.OnCallbacks(this.OnFinishFightCallbacks);
        });

        // The enemy must Swing periodically
        const AgrFunc = () => {
            this.BattleInterval = setInterval(() => {
                this.CurrentMob.Swing(this.CurrentPlayer);
            }, this.CurrentMob.GetSwingTime() + this.CurrentPlayer.GetReaction());
        };

        // Dodging provokes an attack
        this.CurrentMob.OnDodgeSwingCallbacks.push(() => {
            clearInterval(this.BattleInterval);
            AgrFunc();
        });

        AgrFunc();

        HGStaticsModule.HGStatics.OnCallbacks(this.OnStartFightCallbacks);
    }

    OnStartFightCallbacks = [];
    OnFinishFightCallbacks = [];
}