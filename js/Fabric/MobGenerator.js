import * as MobModule from "../Entity/Mob.js"

export class MobGenerator
{
    static CreateMob(Health, Damage, Speed, Texture)
    {
        return new MobModule.Mob(Health, Damage, Speed, Texture);
    }

    // Default Values
    static HealthDef = 10;
    static DamageDef = 1;
    static SpeedDef = 0.5;

    //static Bonus = 0.25;
    static BonusHealth = 2;
    static BonusDamage = 0.25;
    static BonusSpeed = 0.1;
    static BonusAdvantage = 0.25

    static CreateBeginnerMob(MobLevel, Texture)
    {
        return MobGenerator.CreateMob(
            this.HealthDef + MobLevel * this.BonusHealth, 
            this.DamageDef + MobLevel * this.BonusDamage, 
            this.SpeedDef + MobLevel * this.BonusSpeed, 
            Texture);
    }

    static CreateTankMob(MobLevel, Texture)
    {
        return MobGenerator.CreateMob(
            this.HealthDef + MobLevel * this.BonusHealth * (this.BonusAdvantage + 1), 
            this.DamageDef + MobLevel * this.BonusDamage, 
            this.SpeedDef + MobLevel * this.BonusSpeed, 
            Texture);
    }

    static CreateDamagerMob(MobLevel, Texture)
    {
        return MobGenerator.CreateMob(
            this.HealthDef + MobLevel * this.BonusHealth,
            this.DamageDef + MobLevel * this.BonusDamage * (this.BonusAdvantage + 1), 
            this.SpeedDef + MobLevel * this.BonusSpeed, 
            Texture);
    }

    static CreateFastMob(MobLevel, Texture)
    {
        return MobGenerator.CreateMob(
            this.HealthDef + MobLevel * this.BonusHealth,
            this.DamageDef + MobLevel * this.BonusDamage, 
            this.SpeedDef + MobLevel * this.BonusSpeed * (this.BonusAdvantage + 1), 
            Texture);
    }

    static CreatePaladinMob(MobLevel, Texture)
    {
        return MobGenerator.CreateMob(
            this.HealthDef + MobLevel * this.BonusHealth * (this.BonusAdvantage + 1),
            this.DamageDef + MobLevel * this.BonusDamage * (this.BonusAdvantage + 1), 
            this.SpeedDef + MobLevel * this.BonusSpeed * (this.BonusAdvantage - - 0.15), 
            Texture);
    }

    static CreateBarbarianMob(MobLevel, Texture)
    {
        return MobGenerator.CreateMob(
            this.HealthDef + MobLevel * this.BonusHealth * (this.BonusAdvantage + 1),
            this.DamageDef + MobLevel * this.BonusDamage * (this.BonusAdvantage - 0.15), 
            this.SpeedDef + MobLevel * this.BonusSpeed * (this.BonusAdvantage + 1), 
            Texture);
    }

    static CreateAssassinMob(MobLevel, Texture)
    {
        return MobGenerator.CreateMob(
            this.HealthDef + MobLevel * this.BonusHealth * (this.BonusAdvantage - 0.15),
            this.DamageDef + MobLevel * this.BonusDamage * (this.BonusAdvantage + 1), 
            this.SpeedDef + MobLevel * this.BonusSpeed * (this.BonusAdvantage + 1), 
            Texture);
    }

    static CreateRandomBoss(MobLevel)
    {
        return MobGenerator.CreateMob(
            this.HealthDef + MobLevel * this.BonusHealth * (this.BonusAdvantage + 1),
            this.DamageDef + MobLevel * this.BonusDamage * (this.BonusAdvantage + 1), 
            this.SpeedDef + MobLevel * this.BonusSpeed * (this.BonusAdvantage + 1), 
            "../../resources/images/mobs/Murmillo.png");
    }

    static LastMobIndex;

    static CreateRandomMob(MobLevel)
    {
        const MobPool = 7;

        // Select an index different from the last one
        let MobIndex;
        do {
            MobIndex = Math.floor(Math.random() * (MobPool));
        } while (MobIndex === this.LastMobIndex)   

        // Get random from pool
        switch (MobIndex)
        {
            case 0: return this.CreateBeginnerMob(MobLevel, "../../resources/images/mobs/Hamster.png");
            case 1: return this.CreateDamagerMob(MobLevel, "../../resources/images/mobs/Hamster.png");
            case 2: return this.CreateTankMob(MobLevel, "../../resources/images/mobs/Hamster.png");
            case 3: return this.CreateFastMob(MobLevel, "../../resources/images/mobs/Hamster.png");
            case 4: return this.CreatePaladinMob(MobLevel, "../../resources/images/mobs/Hoplomachus.png");
            case 5: return this.CreateBarbarianMob(MobLevel, "../../resources/images/mobs/Retiarius.png");
            case 6: return this.CreateAssassinMob(MobLevel, "../../resources/images/mobs/Thraex.png");
        }
    }
}