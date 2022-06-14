BasicGame.UNFAIR_BREAKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.UNFAIR_BREAKOUT.prototype = new BasicGame.Breakout();


BasicGame.UNFAIR_BREAKOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'UNFAIR_BREAKOUT';

  this.paddle.width = this.game.canvas.width - this.leftWall.width - this.rightWall.width - this.ball.width + 2;
  this.paddle.x = this.game.canvas.width/2;

};


BasicGame.UNFAIR_BREAKOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.UNFAIR_BREAKOUT.prototype.processBallPaddleColliders = function (ball,paddle) {

  paddleMid = this.paddle.x + this.paddle.width/2;
  ballMid = this.ball.x + this.ball.width/2;
  diff = 0;

  if (ballMid < paddleMid)
  {
    //  Ball is on the left of the bat
    diff = paddleMid - ballMid;
    this.ball.body.velocity.x = (-this.paddle.width/700 * diff);
  }
  else if (ballMid > paddleMid)
  {
    //  Ball on the right of the bat
    diff = ballMid - paddleMid;
    this.ball.body.velocity.x = (this.paddle.width/700 * diff);
  }
  else
  {
    //  Ball is perfectly in the middle
    //  A little random X to stop it bouncing up!
    this.ball.body.velocity.x = 2 + Math.floor(Math.random() * 8);
  }

  this.ball.collides = true;

};
