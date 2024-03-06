import * as HGStaticsModule from "./HGStatics.js";
import * as GameModule from "./Game.js";
import * as UIModule from "./UI/HamsterGladiatorsUI.js";

let GameObject = new GameModule.Game;

// Load save
let Save = JSON.parse(localStorage.getItem("Game Save"));
if (Save)
{
    HGStaticsModule.HGStatics.CopyValues(Save, GameObject);
}

let UIObject = new UIModule.HamsterGladiatorsUI(GameObject); 

//
// Resources
//

UIObject.Resourses.HoverInventoryItemSlot = "url('../resources/images/hud/inventory/slots/HoverInventoryItemSlot.png')";
UIObject.Resourses.ClickInventoryItemSlot = "url('../resources/images/hud/inventory/slots/ClickInventoryItemSlot.png')";
UIObject.Resourses.DefaultInventoryItemSlot = "url('../resources/images/hud/inventory/slots/InventoryItemSlot.png')";

UIObject.Resourses.WeaponAnimationName = "WeaponAttack";
UIObject.Resourses.WeaponAnimationTime = 1000;

UIObject.Resourses.HurtOverlayAnimationName = "TakeDamage";
UIObject.Resourses.HurtOverlayAnimationTime = 500;

UIObject.Resourses.Backgrounds.push("url(../resources/images/rooms/Room1.jpg)");
UIObject.Resourses.Backgrounds.push("url(../resources/images/rooms/Room2.jpg)");
UIObject.Resourses.Backgrounds.push("url(../resources/images/rooms/Room3.jpg)");
UIObject.Resourses.Backgrounds.push("url(../resources/images/rooms/Room4.jpg)");
UIObject.Resourses.Backgrounds.push("url(../resources/images/rooms/Room5.jpg)");
UIObject.Resourses.Backgrounds.push("url(../resources/images/rooms/Room6.jpg)");

//
// Bind graphics
//

UIObject.EscMenu = document.getElementById("EscMenu");
UIObject.YouDiedMenu = document.getElementById("YouDiedMenu");

UIObject.EscMenuResume = document.getElementById("EscMenuResume");
UIObject.EscMenuMenu = document.getElementById("EscMenuMenu");
UIObject.YouDiedMenuRespawn = document.getElementById("YouDiedMenuRespawn");
UIObject.YouDiedMenuMenu = document.getElementById("YouDiedMenuMenu");

UIObject.HurtOverlay = document.getElementById("HurtOverlay");

UIObject.InventoryItem1Slot = document.getElementById("InventoryItem1Slot");
UIObject.InventoryItem2Slot = document.getElementById("InventoryItem2Slot");
UIObject.InventoryItem3Slot = document.getElementById("InventoryItem3Slot");

UIObject.InventoryItem1SlotHint = document.getElementById("InventoryItem1SlotHint");
UIObject.InventoryItem2SlotHint = document.getElementById("InventoryItem2SlotHint");
UIObject.InventoryItem3SlotHint = document.getElementById("InventoryItem3SlotHint");

UIObject.InventoryItem1Quantity = document.getElementById("InventoryItem1Quantity");
UIObject.InventoryItem2Quantity = document.getElementById("InventoryItem2Quantity");
UIObject.InventoryItem3Quantity = document.getElementById("InventoryItem3Quantity");

UIObject.QteKey = document.getElementById("QteKey");
UIObject.Weapon = document.getElementById('Weapon');
UIObject.MobDisplay = document.getElementById('Mob');
UIObject.PlayerHPBar = document.getElementById("ProfileHpColor"); 
UIObject.ProfileDmg = document.getElementById("ProfileDmg"); 
UIObject.PlayerHPTitle = document.getElementById("ProfileHpValue");
UIObject.MobHPBar = document.getElementById("MobHpColor");
UIObject.MobHPTitle = document.getElementById("MobHpValue");

UIObject.PlayerTakeDamageSound = document.getElementById("PlayerTakeDamageSound");
UIObject.PlayerTakeDamageSound.volume = 0.05;
UIObject.PlayerAttackSound = document.getElementById("PlayerAttackSound");
UIObject.PlayerAttackSound.volume = 0.2;
UIObject.Music = document.getElementById("Music");
UIObject.Music.volume = 0.02;
UIObject.GameOverMusic = document.getElementById("GameOverMusic");
UIObject.GameOverMusic.volume = 0.02;

//
// Game startup
//

UIObject.RebindInput();
UIObject.LoadOutput();
UIObject.UpdateDisplayAllPlayer();

GameObject.OnFinishFightCallbacks.push(() => {
    GameObject.Room += 1;

    GameObject.StartFight();
});

GameObject.StartFight();