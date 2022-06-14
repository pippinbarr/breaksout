BasicGame.BLACKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.BLACKOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.BLACKOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'BLACKOUT';

  this.black = this.game.add.sprite(0,0,'brick_black');
  this.black.width = this.game.canvas.width;
  this.black.height = this.game.canvas.height;
  this.black.alpha = 0.0;

};


BasicGame.BLACKOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.BLACKOUT.prototype.ballOut = function () {

  this.black.alpha = 0;

  BasicGame.Breakout.prototype.ballOut.call(this);

};


BasicGame.BLACKOUT.prototype.handleBallBrickColliders = function (ball,brick) {

  if (!this.ball.collides) return;

  this.black.alpha = Math.min(this.black.alpha + (8 / (BRICKS.length * BRICKS[0].length)),0.95);

  BasicGame.Breakout.prototype.handleBallBrickColliders.call(this,ball,brick);
},


BasicGame.BLACKOUT.prototype.shutdown = function () {

  this.black.destroy();

  BasicGame.Breakout.prototype.shutdown.call(this);

};

BasicGame.BLACKOUT.prototype.constructor = BasicGame.TestBreakout;
