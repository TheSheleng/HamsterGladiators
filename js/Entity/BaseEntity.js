import * as HGStaticsModule from "../HGStatics.js";

export class BaseEntity
{
    MaxHealth;
    Health;

    MaxDamage;
    Damage;

    MaxSpeed;
    Speed;

    Alive;

    constructor (Health, Damage, Speed)
    {
        this.MaxHealth = Health;
        this.MaxDamage = Damage;
        this.MaxSpeed = Speed;

        this.Health = Health;
        this.Damage = Damage;
        this.Speed = Speed;

        this.Alive = true;
    }

    TakeDamage(Damage)
    {
        this.Health -= Damage;
        HGStaticsModule.HGStatics.OnCallbacks(this.OnTakeDamageCallbacks);

        if (this.Health <= 0 && this.Alive)
        {
            HGStaticsModule.HGStatics.OnCallbacks(this.OnDieCallbacks);
            this.Alive = false;
        }
    }

    Attack(Target)
    {
        Target.TakeDamage(this.Damage);
    }

    OnTakeDamageCallbacks = [];
    OnDieCallbacks = [];
}