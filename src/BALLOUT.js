BasicGame.BALLOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.BALLOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.BALLOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'BALLOUT';

  PADDLE_DELAY = 0.1;

  this.paddleTimer = this.game.time.create(false);
  this.paddleTimer.add(Phaser.Timer.SECOND * PADDLE_DELAY, this.handlePaddleAI, this);
  this.paddleTimer.start();

};


BasicGame.BALLOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  BasicGame.Breakout.prototype.handlePaddleAI.call(this,this.paddle,1,false,0.25);

};


BasicGame.BALLOUT.prototype.handlePaddleAI = function () {

  // BasicGame.Breakout.prototype.handlePaddleAI.call(this,this.paddle,1,false);

  // this.paddleTimer.add(Phaser.Timer.SECOND * PADDLE_DELAY, this.handlePaddleAI, this);
};


BasicGame.BALLOUT.prototype.handleInput = function () {

  var leftPressed = (this.leftPressed());
  var rightPressed = (this.rightPressed());

  if (leftPressed > 0)
  {
    this.ball.body.velocity.x = Math.max(this.ball.body.velocity.x + leftPressed * -BALL_SPEED,-1.5*BALL_SPEED);
  }
  else if (rightPressed > 0)
  {
    this.ball.body.velocity.x = Math.min(this.ball.body.velocity.x + rightPressed * BALL_SPEED,1.5*BALL_SPEED);
  }

  if (this.exitPressed())
  {
    this.exitToMenu();
  }

},


BasicGame.BALLOUT.prototype.constructor = BasicGame.Breakout;
