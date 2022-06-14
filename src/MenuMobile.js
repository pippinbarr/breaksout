MENU_MOBILE_INDEX = 0;

BasicGame.MenuMobile = function (game)
{
  //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

  this.game;		//	a reference to the currently running game
  this.add;		//	used to add sprites, text, groups, etc
  this.camera;	//	a reference to the game camera
  this.cache;		//	the game cache
  this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
  this.load;		//	for preloading assets
  this.math;		//	lots of useful common math operations
  this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
  this.stage;		//	the game stage
  this.time;		//	the clock
  this.tweens;    //  the tween manager
  this.state;	    //	the state manager
  this.world;		//	the game world
  this.particles;	//	the particle manager
  this.physics;	//	the physics manager
  this.rnd;		//	the repeatable random number generator

  //	You can use any of these from any function within this State.
  //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};



BasicGame.MenuMobile.prototype = {

  create: function () {

    MENU_COLOURS = [ "#B24541", "#AD5D34", "#9E6A2D", "#969128", "#528F3B", "#2B42BF"];
    this.menuColourIndex = 0;

    MENU_ITEMS = [
      'BALLOUT','BLACKOUT','BLEAK_HOUSE','BLINKOUT','BRAKEOUT','РАЗРАЗИТЬСЯ','BREAK_IN','BREAK_INVADERS','BREAKART','BREAKOUT_2P',
      'BREAKOUT_OF_LIFE','BREAKOUT_VR','BREAKTIME','BROKENOUT','EDUBREAKOUT','EKE_OUT','FAKEOUT','FREAKOUT',
      'GHOST_BREAKOUT','KOUTBREA','MAKEOUT','OUTBREAK','PONGOUT','RECURSIVE_BREAKOUT',
      'SCREENSHAKEOUT','SERIOUS_BREAKOUT','SHIT_BREAKOUT','SNAKEOUT','SOCIAL_BREAKOUT','SPACEOUT','TRACEOUT',
      'TRAGIC_BREAKOUT','TRAVEL_BREAKOUT','TREE_OF_BREAKOUT','UNFAIR_BREAKOUT','ZENOS_BREAKOUT'
    ];

    this.russianIndex = 5;

    this.game.stage.backgroundColor = '#B24541';

    this.createMobileMenu();

    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.changeBGColour, this);

  },


  changeBGColour: function () {

    this.menuColourIndex = (this.menuColourIndex + 1) % MENU_COLOURS.length;

    this.game.stage.backgroundColor = MENU_COLOURS[this.menuColourIndex];

    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.changeBGColour, this);

  },


  createMobileMenu: function () {

    title = this.game.add.bitmapText(0,0,'atari','BREAKSOUT',84);
    title.x = this.game.width/2 - title.width/2;
    title.y = 15


    this.menuItem = this.game.add.bitmapText(0,0, 'atari', MENU_ITEMS[MENU_MOBILE_INDEX].replace(/_/g,' '), 48);
    this.menuItem.x = this.game.width/2 - this.menuItem.width/2;
    this.menuItem.y = this.game.height/2 - this.menuItem.height/2 + 10;

    this.menuItemRussian = this.game.add.bitmapText(0,0, 'cyrillic8bit', MENU_ITEMS[this.russianIndex].replace(/_/g,' '), 32);
    this.menuItemRussian.x = this.game.width/2 - this.menuItemRussian.width/2;
    this.menuItemRussian.y = this.game.height/2 - this.menuItemRussian.height/2 + 15;
    this.menuItemRussian.visible = false;


    this.leftArrow = this.game.add.bitmapText(0,0, 'atari', "<", 100);
    this.leftArrow.x = 15;
    this.leftArrow.y = this.game.height/2 - this.leftArrow.height/2;

    this.rightArrow = this.game.add.bitmapText(0,0, 'atari', ">", 100);
    this.rightArrow.x = this.game.width - 25 - this.rightArrow.width;
    this.rightArrow.y = this.game.height/2 - this.leftArrow.height/2;


    this.play = this.game.add.bitmapText(0,0, 'atari', "CLICK GAME TITLE TO PLAY", 24);
    this.play.x = this.game.width/2 - this.play.width/2;
    this.play.y = this.game.height - this.play.height - 60;
  },


  update: function () {

    if (this.game.input.activePointer.justReleased(30)) {
      if (this.game.input.activePointer.x > this.play.x - 50 &&
        this.game.input.activePointer.x < this.play.x + this.play.width + 50) {

          this.game.state.start(MENU_ITEMS[MENU_MOBILE_INDEX]);

      }
      else if (this.game.input.activePointer.x < this.leftArrow.x + this.leftArrow.width + 50) {

        MENU_MOBILE_INDEX = MENU_MOBILE_INDEX - 1;
        if (MENU_MOBILE_INDEX == -1) MENU_MOBILE_INDEX = MENU_ITEMS.length - 1;

      }
      else if (this.game.input.activePointer.x > this.rightArrow.x - 50) {

        MENU_MOBILE_INDEX = (MENU_MOBILE_INDEX + 1) % MENU_ITEMS.length;

      }

      if (MENU_MOBILE_INDEX != this.russianIndex) {

        this.menuItem.visible = true;
        this.menuItemRussian.visible = false;
        this.menuItem.text = MENU_ITEMS[MENU_MOBILE_INDEX].replace(/_/g,' ');
        this.menuItem.x = this.game.width/2 - this.menuItem.width/2;
        this.menuItem.y = this.game.height/2 - this.menuItem.height/2 + 10;

      }
      else {

        this.menuItem.visible = false;
        this.menuItemRussian.visible = true;

      }
    }

  },


  shutdown: function () {

    this.game.input.keyboard.onDownCallback = null;

  }

};
