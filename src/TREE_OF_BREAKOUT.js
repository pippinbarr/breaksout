BasicGame.TREE_OF_BREAKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.TREE_OF_BREAKOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.TREE_OF_BREAKOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'TREE_OF_BREAKOUT';
  this.gameOverScoreString = 'SONS GIVEN';


  TREE_OF_LIFE_VO = [
    'HELP EACH OTHER\nLOVE EVERYONE\nEVERY LEAF\nEVERY RAY OF LIGHT\nFORGIVE',
    'NATURE ONLY WANTS TO\nPLEASE ITSELF\nGET OTHERS TO\nPLEASE IT TOO',
    'THE ONLY WAY TO BE HAPPY\nIS TO LOVE\nUNLESS YOU LOVE\nYOUR LIFE WILL\nFLASH BY',
    'DO GOOD TO THEM\nWONDER\nHOPE',
    'GRACE DOESNT TRY\nTO PLEASE ITSELF\nACCEPTS BEING SLIGHTED\nFORGOTTEN\nDISLIKED\nACCEPTS INSULTS\nAND INJURIES',
    'THE NUNS TAUGHT US THAT\nNO ONE WHO LOVES\nTHE WAY OF GRACE\nEVER COMES TO\nA BAD END',
    'I WILL BE TRUE TO YOU\nWHATEVER COMES',
    'LORD WHY\nWHERE WERE YOU\nDID YOU KNOW WHAT HAPPENED\nDO YOU CARE',
    'LIGHT OF MY LIFE\nI SEARCH FOR YOU',
    'MY HOPE\nMY CHILD',
    'MY HOPE\nMY GOD\nWHAT DID YOU GAIN',
    'WHERE WERE YOU',
    'DID YOU KNOW',
  ];

  TREE_OF_LIFE_VO = _.shuffle(TREE_OF_LIFE_VO);

  TREE_OF_LIFE_VO_FINAL = 'I GIVE HIM TO YOU\nI GIVE YOU MY SON';

  VO_TIME_MIN = 3;
  VO_TIME_RANGE = 3;

  this.blackBG = this.game.add.sprite(0,0,'brick_black');
  this.blackBG.width = this.game.canvas.width;
  this.blackBG.height = this.game.canvas.height;
  this.blackBG.visible = false;

  this.voText = this.game.add.bitmapText(100, 100, 'atari',TREE_OF_LIFE_VO[0],32);
  this.voText.visible = false;

  this.voTimer = this.game.time.create(false);
  this.voTimer.add(Phaser.Timer.SECOND * (VO_TIME_MIN + Math.random() * VO_TIME_RANGE), this.triggerVO, this);
  this.voTimer.start();

};


BasicGame.TREE_OF_BREAKOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.TREE_OF_BREAKOUT.prototype.triggerVO = function () {

  if (this.state != 'PLAY') return;

  this.ball.body.enable = false;
  this.paddle.body.enable = false;

  this.blackBG.visible = true;
  this.voText.visible = true;


  if (TREE_OF_LIFE_VO.length == 0) {
    // GAME OVER
    this.voText.text = TREE_OF_LIFE_VO_FINAL;
    this.voTimer.add(Phaser.Timer.SECOND * 5, this.endGame, this);
  }
  else {
    this.voText.text = TREE_OF_LIFE_VO.pop();
    this.voTimer.add(Phaser.Timer.SECOND * 5, this.stopVO, this);
  }

};


BasicGame.TREE_OF_BREAKOUT.prototype.stopVO = function () {

  this.ball.body.enable = true;
  this.paddle.body.enable = true;

  this.blackBG.visible = false;
  this.voText.visible = false;

  this.voTimer.add(Phaser.Timer.SECOND * (VO_TIME_MIN + Math.random() * VO_TIME_RANGE), this.triggerVO, this);

};


BasicGame.TREE_OF_BREAKOUT.prototype.endGame = function () {

  // GO TO THE MENU
  this.game.state.start(MENU_STATE);

};


BasicGame.TREE_OF_BREAKOUT.prototype.gameOver = function () {

  TREE_OF_LIFE_VO = [];
  this.triggerVO();

  this.score = 1;

  BasicGame.Breakout.prototype.gameOver.call(this);

};



BasicGame.TREE_OF_BREAKOUT.prototype.shutdown = function () {

  this.blackBG.destroy();
  this.voText.destroy();

  BasicGame.Breakout.prototype.shutdown.call(this);

};


BasicGame.TREE_OF_BREAKOUT.prototype.constructor = BasicGame.Breakout;
