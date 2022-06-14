BasicGame.BREAKUP = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.BREAKUP.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.BREAKUP.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'BREAKUP';

  this.balls = this.game.add.group();

};


BasicGame.BREAKUP.prototype.update = function () {

  this.physics.arcade.collide(this.balls,this.paddle,this.handleBallPaddleColliders,null,this);
  this.physics.arcade.collide(this.balls,this.bricks,this.handleBallBrickColliders,null,this);
  this.physics.arcade.collide(this.balls,this.walls,this.handleBallWallColliders,null,this);

  BasicGame.Breakout.prototype.update.call(this);
};


BasicGame.BREAKUP.prototype.checkBallOut = function () {

  var allOut;

  if (this.ball.y > this.game.canvas.height)
  {
    this.ball.body.velocity.x = 0;
    this.ball.body.velocity.y = 0;
    allOut = true;
  }
  else {
    allOut = false;
  }

  this.balls.forEachAlive(function (ball) {
    if (ball.y > this.game.height) {
      ball.kill();
    }
  },this);

  allOut = (allOut && !this.balls.getFirstAlive());

  if (allOut) {
    this.lostPaddle();
  }

},


BasicGame.BREAKUP.prototype.handleBallBrickColliders = function (ball,brick) {

  if (ball.collides == false) return;

  // console.log("BREAKUP.handleBallBrickColliders");

  var newBall = this.balls.create(ball.x,ball.y,'ball');
  this.game.physics.enable(newBall, Phaser.Physics.ARCADE);
  newBall.body.bounce.setTo(1,1);
  newBall.body.velocity.y = -ball.body.velocity.y;
  newBall.body.velocity.x = -ball.body.velocity.x;
  newBall.collides = true;

  ball.body.velocity.y *= -1;
  ball.collides = false;

  this.updateScore(brick.score);
  brick.disable();
  brick.alive = false;

};


BasicGame.BREAKUP.prototype.handleBallPaddleColliders = function (ball,paddle) {

  paddleMid = paddle.x + paddle.width/2;
  ballMid = ball.x + ball.width/2;
  diff = 0;

  if (ballMid < paddleMid) {

    //  Ball is on the left of the bat
    diff = paddleMid - ballMid;
    ball.body.velocity.x = ( -10 * diff);

  }
  else if (ballMid > paddleMid) {

    //  Ball on the right of the bat
    diff = ballMid - paddleMid;
    ball.body.velocity.x = (10 * diff);

  }
  else {

    //  Ball is perfectly in the middle
    //  A little random X to stop it bouncing up!
    ball.body.velocity.x = 2 + Math.floor(Math.random() * 8);

  }

  // var newBall = this.game.add.sprite(ball.body.x,ball.body.y,'ball');
  var newBall = this.balls.create(ball.body.x,ball.body.y,'ball');
  this.game.physics.enable(newBall, Phaser.Physics.ARCADE);
  newBall.body.bounce.setTo(1,1);
  newBall.body.velocity.y = ball.body.velocity.y;
  newBall.body.velocity.x = -ball.body.velocity.x;
  newBall.collides = true;

  ball.collides = true;

};


BasicGame.BREAKUP.prototype.constructor = BasicGame.Breakout;
