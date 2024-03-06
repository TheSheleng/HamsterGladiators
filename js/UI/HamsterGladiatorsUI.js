import * as ResoursesModel from "../Manager/HamsterGladiatorsResourcesManager.js";

export class HamsterGladiatorsUI 
{
    Game;
    Resourses;

    EscMenu;
    YouDiedMenu;
    
    EscMenuResume;
    EscMenuMenu;
    YouDiedMenuRespawn;
    YouDiedMenuMenu;

    HurtOverlay;

    InventoryItem1Slot;
    InventoryItem2Slot;
    InventoryItem3Slot;
    
    InventoryItem1SlotHint;
    InventoryItem2SlotHint;
    InventoryItem3SlotHint;

    InventoryItem1Quantity;
    InventoryItem2Quantity;
    InventoryItem3Quantity;

    QteKey;
    PlayerHPBar;
    PlayerHPTitle;
    MobHPBar;
    ProfileDmg;
    MobHPTitle;
    MobDisplay;
    Weapon;

    Music;
    PlayerTakeDamageSound;
    PlayerAttackSound;
    GameOverMusic;

    constructor(Game)
    {
        this.Game = Game;
        this.Resourses = new ResoursesModel.HamsterGladiatorsResourcesManager();
    }

    LoadOutput()
    {
        // Player Take Damage 
        this.Game.CurrentPlayer.OnTakeDamageCallbacks.push(() => {
            this.UpdateDisplayHealth();
            this.QteKey.style.display = "none";
            
            this.HurtOverlay.style.animation = 
                `${this.Resourses.HurtOverlayAnimationName} ${this.Resourses.HurtOverlayAnimationTime / 1000}s forwards`;
            
            setTimeout(() => {
                this.HurtOverlay.style.animation = null;
            }, this.Resourses.HurtOverlayAnimationTime);

            PlayerTakeDamageSound.play();
        });

        // Inventory Update
        this.Game.CurrentPlayer.Inventory.OnUpdateCallbacks.push(() => {         
            this.UpdateDisplayInventory();
        });

        // Inventory Effect End
        this.Game.CurrentPlayer.Inventory.OnEffectEndCallbacks.push(() => {         
            this.UpdateDisplayProfileStats();
        });
        
        // Game Start Fight
        this.Game.OnStartFightCallbacks.push(() => {
            // Random background
            document.body.style.backgroundImage = 
                this.Resourses.Backgrounds[Math.floor(Math.random() * this.Resourses.Backgrounds.length)];

            this.UpdateDisplayAllMob();

            this.Game.CurrentMob.OnTakeDamageCallbacks.push(() => {
                this.UpdateDisplayMobHealth();
            });

            this.Game.CurrentMob.OnDieCallbacks.push(() => {
                this.QteKey.style.display = "none";
            });

            this.Game.CurrentMob.OnSwingCallbacks.push(() => {
                let angle = 0; 

                switch (this.Game.CurrentMob.SwingWeakness)
                {
                    case 'Up': angle = 0; break;
                    case 'Down': angle = 180; break;
                    case 'Left': angle = -90; break;
                    case 'Right': angle = 90; break;
                }

                this.QteKey.style.transform = `rotate(${angle}deg)`
                this.QteKey.style.display = 'block';
            });
        });

        // Game over
        this.Game.CurrentPlayer.OnDieCallbacks.push(() => {
            clearInterval(this.Game.BattleInterval);
            this.YouDiedMenu.style.display = 'flex';
            localStorage.setItem("Game Save", JSON.stringify(null));

            this.Music.pause();
            this.GameOverMusic.play();
        });

        document.addEventListener("click", () => { 
            if (this.Game.CurrentPlayer.Alive) 
            {
                Music.play(); 
            }
        });
    }

    RebindInput() 
    {
        //
        // Menus
        //
        
        document.addEventListener("keydown", (event) => {
            if (event.key === 'Escape') 
            {
                if (this.EscMenu.style.display === "flex") 
                {
                    this.EscMenu.style.display = "none";
                }
                else 
                {
                    this.EscMenu.style.display = "flex";
                }
            }
        });
        
        //
        // Menus Btns
        //

        this.EscMenuResume.addEventListener("click", () => {
            this.EscMenu.style.display = "none";
        });
        
        this.EscMenuMenu.addEventListener("click", () => {
            localStorage.setItem("Game Save", JSON.stringify(this.Game));

            document.location.href = "../index.html";
        });

        this.YouDiedMenuRespawn.addEventListener("click", () => {
            document.location.href = "../pages/HamsterGladiators.html";
        });

        this.YouDiedMenuMenu.addEventListener("click", () => {
            document.location.href = "../index.html";
        });

        //
        // Inventory
        //

        const InventoryItemAnimationBind = (InventoryItemSlot, InventoryItemSlotHint) => {
            InventoryItemSlot.addEventListener("mouseenter", () => {
                InventoryItemSlotHint.style.display = "flex";
                InventoryItemSlot.style.backgroundImage = this.Resourses.HoverInventoryItemSlot;
            });
    
            InventoryItemSlot.addEventListener("mouseleave", () => {
                InventoryItemSlotHint.style.display = "none";
                InventoryItemSlot.style.backgroundImage = this.Resourses.DefaultInventoryItemSlot;
            });
    
            InventoryItemSlot.addEventListener("mousedown", () => {
                InventoryItemSlot.style.backgroundImage = this.Resourses.ClickInventoryItemSlot;
            });
    
            InventoryItemSlot.addEventListener("mouseup", () => {
                InventoryItemSlot.style.backgroundImage = this.Resourses.DefaultInventoryItemSlot;
            });
        };

        InventoryItemAnimationBind(this.InventoryItem1Slot, this.InventoryItem1SlotHint);
        InventoryItemAnimationBind(this.InventoryItem2Slot, this.InventoryItem2SlotHint);
        InventoryItemAnimationBind(this.InventoryItem3Slot, this.InventoryItem3SlotHint);

        this.InventoryItem1Slot.addEventListener("mouseup", () => {
            this.Game.CurrentPlayer.Inventory.UseHPPoison(this.Game.CurrentPlayer);
            this.UpdateDisplayAllPlayer();
        });

        this.InventoryItem2Slot.addEventListener("mouseup", () => {
            this.Game.CurrentPlayer.Inventory.UseDMGPoison(this.Game.CurrentPlayer);
            //console.log(this);
            this.UpdateDisplayAllPlayer();
        });

        this.InventoryItem3Slot.addEventListener("mouseup", () => {
            this.Game.CurrentPlayer.Inventory.UseSPEEDPotion(this.Game.CurrentPlayer);
            this.UpdateDisplayAllPlayer();
        });

        //
        // Fight
        //

        this.MobDisplay.onclick = () => {
            this.Game.CurrentPlayer.Attack(this.Game.CurrentMob);

            if (!this.WeaponAnimationTimeout)
            {
                this.Weapon.style.animation = 
                    `${this.Resourses.WeaponAnimationName} ${this.Resourses.WeaponAnimationTime / 1000}s forwards`;

                PlayerAttackSound.play();

                this.WeaponAnimationTimeout = setTimeout(() => {
                    this.Weapon.style.animation = null;
                    this.WeaponAnimationTimeout = null;
                }, this.Resourses.WeaponAnimationTime);
            }
        }

        document.addEventListener("keydown", (event) => {
            let Direction = undefined;

            switch (event.code)
            {
                case 'ArrowUp': Direction = 'Up'; break;
                case 'ArrowRight': Direction = 'Right'; break;
                case 'ArrowLeft': Direction = 'Left'; break;
                case 'ArrowDown': Direction = 'Down'; break;
                default: return;
            }

            this.Game.CurrentPlayer.Dodge(this.Game.CurrentMob, Direction);

            this.QteKey.style.display = "none";
        });
    }

    UpdateDisplayAllPlayer()
    {
        this.UpdateDisplayHealth();
        this.UpdateDisplayInventory();
        this.UpdateDisplayProfileStats();
    }

    UpdateDisplayAllMob()
    {
        this.UpdateDisplayMob();
        this.UpdateDisplayMobHealth();
    }

    UpdateDisplayHealth()
    {
        this.PlayerHPBar.style.width =
            `${Math.max(this.Game.CurrentPlayer.Health / this.Game.CurrentPlayer.MaxHealth * 100, 0)}%`;

        this.PlayerHPTitle.textContent = 
            `${Math.max(Math.ceil(this.Game.CurrentPlayer.Health), 0)}/${Math.ceil(this.Game.CurrentPlayer.MaxHealth)}`;
    }

    UpdateDisplayInventory()
    {
        this.InventoryItem1Quantity.textContent = this.Game.CurrentPlayer.Inventory.CountHPPoison;
        this.InventoryItem2Quantity.textContent = this.Game.CurrentPlayer.Inventory.CountDMGPoison;
        this.InventoryItem3Quantity.textContent = this.Game.CurrentPlayer.Inventory.CountSPEEDPotion;
    }

    UpdateDisplayProfileStats()
    {
        ProfileDmg.textContent = `DMG: ${Math.floor(this.Game.CurrentPlayer.Damage)} /  SPEED: ${Math.floor(this.Game.CurrentPlayer.Speed)}`;
    }

    UpdateDisplayMob()
    {
        this.MobDisplay.children[0].src = this.Game.CurrentMob.Texture;
    }

    UpdateDisplayMobHealth()
    {
        this.MobHPBar.style.width =
            `${Math.max(this.Game.CurrentMob.Health / this.Game.CurrentMob.MaxHealth * 100, 0)}%`;

        this.MobHPTitle.textContent = 
            `${Math.max(Math.ceil(this.Game.CurrentMob.Health), 0)}/${Math.ceil(this.Game.CurrentMob.MaxHealth)}`;
    }

    WeaponAnimationTimeout;
}