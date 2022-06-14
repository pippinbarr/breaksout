BasicGame.KOUTBREA = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.KOUTBREA.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.KOUTBREA.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'KOUTBREA';

  this.leftWall.kill();
  this.rightWall.kill();

};


BasicGame.KOUTBREA.prototype.update = function () {
  
  BasicGame.Breakout.prototype.update.call(this);

  if (this.paddle.x + this.paddle.width/2 < 0) this.paddle.x += this.game.canvas.width;
  if (this.paddle.x + this.paddle.width/2 > this.game.canvas.width) this.paddle.x -= this.game.canvas.width;
  if (this.ball.x + this.ball.width/2 < 0) this.ball.x += this.game.canvas.width;
  if (this.ball.x + this.ball.width/2 > this.game.canvas.width) this.ball.x -= this.game.canvas.width;

};


BasicGame.KOUTBREA.prototype.constructor = BasicGame.Breakout;
