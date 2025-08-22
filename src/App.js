const config = {
  type: Phaser.AUTO,
  width:800,
  height:600,
  physics:{default:'arcade'},
  scene:{preload,create,update},
  scale:{mode:Phaser.Scale.FIT, autoCenter:Phaser.Scale.CENTER_BOTH}
};

let player, ammo=12, grenades=3, nightMode=false;
let joystickBase, joystickThumb, move={x:0,y:0};
let shootButton, grenadeButton, nightButton, aimLine;

function preload(){
  this.load.image('player','https://labs.phaser.io/assets/sprites/phaser-dude.png');
  this.load.image('shoot','assets/shoot.png');
  this.load.image('grenade','assets/grenade.png');
  this.load.image('night','assets/night.png');
  this.load.image('joystickBase','assets/joystickBase.png');
  this.load.image('joystickThumb','assets/joystickThumb.png');
}

function create(){
  const screenW=this.scale.width;
  const screenH=this.scale.height;

  // Player
  player=this.physics.add.sprite(screenW/2,screenH/2,'player');

  // HUD
  joystickBase=this.add.image(screenW*0.1,screenH*0.85,'joystickBase').setScrollFactor(0).setAlpha(0.5);
  joystickThumb=this.add.image(screenW*0.1,screenH*0.85,'joystickThumb').setScrollFactor(0).setAlpha(0.8);

  shootButton=this.add.image(screenW*0.85,screenH*0.85,'shoot').setScrollFactor(0).setInteractive();
  grenadeButton=this.add.image(screenW*0.7,screenH*0.85,'grenade').setScrollFactor(0).setInteractive();
  nightButton=this.add.image(screenW*0.95,50,'night').setScrollFactor(0).setInteractive();

  aimLine=this.add.graphics();

  // Night mode
  nightButton.on('pointerdown',()=>{ nightMode=!nightMode; this.cameras.main.setBackgroundColor(nightMode?0x000022:0x111111); });

  // Shooting (simulated)
  shootButton.on('pointerdown',()=>{ ammo--; console.log('Shoot! Ammo:',ammo); });
  grenadeButton.on('pointerdown',()=>{ grenades--; console.log('Grenade thrown! Left:',grenades); });

  // Joystick input
  this.input.on('pointerdown',pointer=>{ if(pointer.x<screenW*0.2) joystickThumb.x=pointer.x; joystickThumb.y=pointer.y; });
  this.input.on('pointermove',pointer=>{ if(pointer.x<screenW*0.2){ move.x=(pointer.x-joystickBase.x)/50; move.y=(pointer.y-joystickBase.y)/50; joystickThumb.x=pointer.x; joystickThumb.y=pointer.y; } });
  this.input.on('pointerup',()=>{ joystickThumb.x=joystickBase.x; joystickThumb.y=joystickBase.y; move={x:0,y:0}; });
}

function update(){
  player.x+=move.x*3;
  player.y+=move.y*3;
}
new Phaser.Game(config);

