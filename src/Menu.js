BasicGame.Menu = function (game)
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



BasicGame.Menu.prototype = {

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

    MENU_KEYS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        '0','1','2','3','4','5','6','7','8','9'];

    this.game.stage.backgroundColor = '#B24541';

    this.createDesktopMenu();

    this.game.input.keyboard.onDownCallback = this.handleKeyDown;

    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.changeBGColour, this);

  },


  handleKeyDown: function (event) {

    var index = MENU_KEYS.indexOf(String.fromCharCode(event.keyCode));

    if (index != -1) {
      this.game.state.start(MENU_ITEMS[index]);
    }

  },


  changeBGColour: function () {

    this.menuColourIndex = (this.menuColourIndex + 1) % MENU_COLOURS.length;

    this.game.stage.backgroundColor = MENU_COLOURS[this.menuColourIndex];

    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.changeBGColour, this);

  },


  createDesktopMenu: function () {

    title = this.game.add.bitmapText(0,0,'atari','BREAKSOUT',84);
    title.anchor.x = 0.5;
    title.anchor.y = 0;
    title.x = 30;
    title.y = this.game.height/2;
    title.angle = 270;

    var MENU_X_OFFSET = title.x + title.height + 50;
    var MENU_Y_OFFSET = 30;
    var MENU_Y_MAX = this.game.height - MENU_Y_OFFSET;

    var TITLE_OFFSET = 30;

    var ii = 0;
    for (var i = 0; i < MENU_ITEMS.length; i++) {

      if (MENU_Y_OFFSET + 24*ii >= MENU_Y_MAX) {
        MENU_X_OFFSET = this.game.canvas.width/2 + 50;
        ii = 0;
      }

      menuKey = this.game.add.bitmapText(MENU_X_OFFSET, MENU_Y_OFFSET + 24*ii, 'atari', "(" + MENU_KEYS[i] + ")", 20);
      if (MENU_ITEMS[i] == "РАЗРАЗИТЬСЯ") {
        menuItem = this.game.add.bitmapText(MENU_X_OFFSET + TITLE_OFFSET + 2, MENU_Y_OFFSET + 24*ii + 3, 'cyrillic8bit', MENU_ITEMS[i].replace(/_/g,' '), 14);
      }
      else {
        menuItem = this.game.add.bitmapText(MENU_X_OFFSET + TITLE_OFFSET, MENU_Y_OFFSET + 24*ii, 'atari', MENU_ITEMS[i].replace(/_/g,' '), 20);
      }

      ii++;

    }

  },


  update: function () {

  },


  shutdown: function () {

    this.game.input.keyboard.onDownCallback = null;

  }

};
