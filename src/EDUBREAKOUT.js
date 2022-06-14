BasicGame.EDUBREAKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.EDUBREAKOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.EDUBREAKOUT.prototype.create = function () {

  GETTYSBURG_ADDRESS = [
    "START",

    "Four score and seven years ago\n" +
    "our fathers brought forth on this\n" +
    "continent a new nation",

    "conceived in liberty and\n" +
    "dedicated to the proposition\n"+
    "that all men are created equal",

    "Now we are engaged in a great civil\n" +
    "war testing whether that nation\n" +
    "or any nation so conceived",

    "and so dedicated can long endure\n" +
    "We are met on a great battlefield\n" +
    "of that war",

    "We have come to dedicate a portion\n" +
    "of that field as a final resting place\n"+
    "for those who here gave their lives",

    "that that nation might live\n"+
    "It is altogether fitting and proper\n"+
    "that we should do this",

    "But in a larger sense we can not\n"+
    "dedicate we can not consecrate\n"+
    "we can not hallow this ground",

    "The brave men living and dead who\n" +
    "struggled here have consecrated it\n" +
    "far above our poor power to add",

    "or detract\n" +
    "The world will little note\n"+
    "nor long remember what we say here",

    "but it can never forget\n"+
    "what they did\n"+
    "here\n",

    "It is for us the living rather to be\n"+
    "dedicated here to the unfinished work\n"+
    "which they who fought here",

    "have thus far so nobly advanced\n"+
    "It is rather for us to be here\n"+
    "dedicated to the great task",

    "remaining before us that\n"+
    "from these honored dead we take\n"+
    "increased devotion to that cause",

    "for which they gave\n"+
    "the last full measure of devotion\n"+
    "that we here highly resolve that",

    "these dead shall not have died in vain\n"+
    "that this nation under God\n"+
    "shall have a new birth of freedom",

    "and that government of the people\n"+
    "by the people for the people\n"+
    "shall not perish from the earth"
  ];

  this.gettysburgIndex = 0;
  this.gettysburgText = this.game.add.bitmapText(100, 100, 'atari',GETTYSBURG_ADDRESS[this.gettysburgIndex].toUpperCase(),30);

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'EDUBREAKOUT';
  this.gameOverScoreString = 'UNITS OF EDUCATION GAINED';
  this.bricks.forEach(function (brick) {
    brick.score = 1;
  },this);

  this.gettysburgText.x = BRICKS[0][0].x;
  this.gettysburgText.y = BRICKS[0][0].y;

};


BasicGame.EDUBREAKOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  if (this.game.input.keyboard.isDown(Phaser.Keyboard.X)) {
    this.resetGame();
  }

};


BasicGame.EDUBREAKOUT.prototype.resetGame = function () {

  this.gettysburgIndex = (this.gettysburgIndex + 1) % GETTYSBURG_ADDRESS.length;

  if (this.gettysburgIndex == 0) {
    // Seen all the quotes
    this.exitToMenu();
  }
  else {
    this.gettysburgText.text = GETTYSBURG_ADDRESS[this.gettysburgIndex].toUpperCase();
    BasicGame.Breakout.prototype.resetGame.call(this);
  }

};


BasicGame.EDUBREAKOUT.prototype.shutdown = function () {

  this.gettysburgText.destroy();

  BasicGame.Breakout.prototype.shutdown.call(this);

};


BasicGame.EDUBREAKOUT.prototype.constructor = BasicGame.Breakout;
