import * as HGStaticsModule from "../HGStatics.js";

export class InventoryManager 
{
    CountHPPoison;
    CountDMGPoison;
    CountSPEEDPotion;

    constructor() 
    {
        this.CountHPPoison = 0;
        this.CountDMGPoison = 0;
        this.CountSPEEDPotion = 0;

        HGStaticsModule.HGStatics.OnCallbacks(this.OnUpdateCallbacks);
    }

    // Get potions by name and quantity (Map)
    GetPoisons(loot)
    {
        loot.forEach((value, key) => {
            switch (key)
            {
                case 'HPPoison': this.CountHPPoison += value; break;
                case 'DMGPoison': this.CountDMGPoison += value; break;
                case 'SPEEDPotion': this.CountSPEEDPotion += value; break;
            }
        });

        HGStaticsModule.HGStatics.OnCallbacks(this.OnUpdateCallbacks);
    }
    
    UseHPPoison(Target) 
    {
        if (this.CountHPPoison <= 0) return;

        this.CountHPPoison -= 1;
        
        Target.Health = Math.min(Target.Health * 1.33, Target.MaxHealth);

        HGStaticsModule.HGStatics.OnCallbacks(this.OnUpdateCallbacks);
    }

    DMGPoisonTime = 7000;
    DMGPoisonEffect = 0.25;

    UseDMGPoison(Target) 
    {
        if (this.CountDMGPoison <= 0) return;

        this.CountDMGPoison -= 1;

        Target.Damage += Target.Damage * this.DMGPoisonEffect;

        // Remove effect over time
        setTimeout(() => {
            Target.Damage = Target.MaxDamage;
            HGStaticsModule.HGStatics.OnCallbacks(this.OnEffectEndCallbacks);
        }, this.DMGPoisonTime);

        HGStaticsModule.HGStatics.OnCallbacks(this.OnUpdateCallbacks);
    }

    SPEEDPoisonTime = 7000;
    SPEEDPoisonEffect = 2;

    UseSPEEDPotion(Target)
    {
        if (this.CountSPEEDPotion <= 0) return;

        this.CountSPEEDPotion -= 1;

        Target.Speed += Target.Speed * this.SPEEDPoisonEffect;

        // Remove effect over time
        setTimeout(() => {
            Target.Speed = Target.MaxSpeed;
            HGStaticsModule.HGStatics.OnCallbacks(this.OnEffectEndCallbacks);
        }, this.SPEEDPoisonTime);

        HGStaticsModule.HGStatics.OnCallbacks(this.OnUpdateCallbacks);
    }

    OnUpdateCallbacks = [];
    OnEffectEndCallbacks = [];
}