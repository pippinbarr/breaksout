BasicGame.РАЗРАЗИТЬСЯ = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.РАЗРАЗИТЬСЯ.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.РАЗРАЗИТЬСЯ.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'РАЗРАЗИТЬСЯ';

};


BasicGame.РАЗРАЗИТЬСЯ.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.РАЗРАЗИТЬСЯ.prototype.showGameOver = function () {

  BasicGame.Breakout.prototype.showGameOver.call(this);

  this.gameOverText.destroy();
  this.gameOverText = this.game.add.bitmapText(100, 100, 'cyrillic8bit','КОНЕЦ ИГРЫ',36);
  this.gameOverText.x = this.game.width/2 - this.gameOverText.width/2;
  this.gameOverText.y = this.game.height/2;
  // this.gameOverText.visible = false;

  this.gameOverScoreText.destroy();
  this.gameOverScoreText = this.game.add.bitmapText(100, 100, 'cyrillic8bit','ВАШИ ОЧКИ',16);
  this.gameOverScoreText.x = this.game.width/2 - this.gameOverScoreText.width/2;
  this.gameOverScoreText.y = this.gameOverText.y + 2 * this.gameOverText.height;
  // this.gameOverScoreText.visible = false;
},



BasicGame.РАЗРАЗИТЬСЯ.prototype.constructor = BasicGame.Breakout;
