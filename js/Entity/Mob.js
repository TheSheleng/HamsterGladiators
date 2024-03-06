import * as HGStaticsModule from "../HGStatics.js";
import * as BaseEntityModule from "./BaseEntity.js"

export class Mob extends BaseEntityModule.BaseEntity
{
    Texture;

    constructor(Health, Damage, Speed, Texture)
    {
        super(Health, Damage, Speed);
        this.Texture = Texture;
    }
    
    SwingTarget;
    SwingTimeout;
    SwingWeakness; // Way of how to dodge

    GetSwingTime()
    {
        return 1000 / this.Speed;
    }

    // Like Attack but with delay
    Swing(Target)
    {
        this.SwingTarget = Target;

        //
        const PossibleSwingWeakness = [
            'Up',
            'Down',
            'Left',
            'Right',
        ];

        this.SwingWeakness = PossibleSwingWeakness[
            Math.floor(Math.random() * PossibleSwingWeakness.length)];

        this.SwingTimeout = setTimeout(() => {
            this.Attack(this.SwingTarget);
        }, this.GetSwingTime());

        HGStaticsModule.HGStatics.OnCallbacks(this.OnSwingCallbacks);
    }

    // Cancel Swing
    DodgeSwing(Direction)
    {
        if (!this.SwingTimeout)
        {
            return;
        }

        clearTimeout(this.SwingTimeout);

        if (this.SwingWeakness !== Direction) 
        {
            this.Attack(this.SwingTarget);
        }

        this.SwingWeakness = undefined;
        
        HGStaticsModule.HGStatics.OnCallbacks(this.OnDodgeSwingCallbacks);
    }

    OnSwingCallbacks = [];
    OnDodgeSwingCallbacks = [];
}