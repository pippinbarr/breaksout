BasicGame.ZENOS_BREAKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.ZENOS_BREAKOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.ZENOS_BREAKOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'ZENOS_BREAKOUT';

  this.zenoSpeed = BALL_SPEED;

  this.zenoTimer = this.game.time.create(false);

};


BasicGame.ZENOS_BREAKOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  var THRESHOLD = 3;

  if (Math.abs(this.ball.y - this.destinationY) <= THRESHOLD) {
    this.ball.body.velocity.x = 0;
    this.ball.body.velocity.y = 0;
  }
  else if (Math.abs(this.ball.y - this.wayPointY) <= THRESHOLD) {
    this.ball.body.velocity.x = 0;
    this.ball.body.velocity.y = 0;

    this.wayPointX = (this.ball.x - this.destinationX)/2 + this.destinationX;
    this.wayPointY = (this.ball.y - this.destinationY)/2 + this.destinationY;

    this.zenoTimer.add(Phaser.Timer.SECOND * 1, this.zenoBall, this);
    this.zenoTimer.start();
  }

};


BasicGame.ZENOS_BREAKOUT.prototype.zenoBall = function () {

  if (this.paddle.y - (this.ball.y + this.ball.height) <= 2) {
    this.ball.y = this.paddle.y - this.ball.height - 2;
    return;
  }

  this.game.physics.arcade.moveToXY(this.ball,this.wayPointX,this.wayPointY,this.zenoSpeed);//,1000);

};



BasicGame.ZENOS_BREAKOUT.prototype.restartBall = function (ball,paddle) {

  this.destinationX = this.paddle.x;
  this.destinationY = this.paddle.y - this.ball.height;

  this.wayPointX = (this.ball.x - this.destinationX)/2 + this.destinationX;
  this.wayPointY = (this.ball.y - this.destinationY)/2 + this.destinationY;

  this.game.physics.arcade.moveToXY(this.ball,this.wayPointX,this.wayPointY,this.zenoSpeed);//,1000);

  this.launch_wall_sfx.play();

};


BasicGame.ZENOS_BREAKOUT.prototype.constructor = BasicGame.Breakout;
