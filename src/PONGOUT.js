BasicGame.PONGOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.PONGOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.PONGOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'PONGOUT';
  this.paddles = 1;
  this.updatePaddles(this.paddles);

  this.bricks.removeAll();
  BRICKS = [];

  BRICKS_Y_OFFSET = 95;

  this.addBrickRow(0,1,'brick_blue');
  this.addBrickRow(1,1,'brick_green');
  this.addBrickRow(2,4,'brick_yellow');
  this.addBrickRow(3,4,'brick_orange');
  this.addBrickRow(4,7,'brick_oranger');
  this.addBrickRow(5,7,'brick_red');
  this.addBrickRow(6,7,'brick_oranger');
  this.addBrickRow(7,4,'brick_orange');
  this.addBrickRow(8,4,'brick_yellow');
  this.addBrickRow(9,1,'brick_green');
  this.addBrickRow(10,1,'brick_blue');

  this.paddle.y -= 20;

  this.paddle2 = this.game.add.sprite(0,0,'paddle');
  this.paddle2.x = this.game.canvas.width/2 - this.paddle.width/2;
  this.paddle2.y = this.topWall.y + 2*this.paddle.height;
  this.game.physics.enable(this.paddle2, Phaser.Physics.ARCADE);
  this.paddle2.body.immovable = true;

  // For tracking scores
  this.paddle.lastHit = null;
  this.paddle2.lastHit = null;

  this.score2 = 0;
  this.scoreText2 = this.game.add.bitmapText(0, 8, 'atari','',120);
  this.scoreText2.tint = 0x888888;
  this.scoreText2.scale.x = 0.75;
  this.scoreText2.scale.y = 0.25;
  this.scoreText2.x = this.game.canvas.width/2 - this.scoreText2.width/2;

  this.scoreText2.text = "" + this.score2;
  this.scoreText2.updateText();

  this.scoreText.x = this.game.canvas.width/2;
  this.scoreText.y = this.game.canvas.height - this.scoreText.height - 10;

  // Adjust bottom ball starting location
  this.ball.y = this.paddle.y - 60 - this.ball.height;

  this.ball2 = this.game.add.sprite(0,0,'ball');
  this.ball2.x = this.game.canvas.width/2 - this.ball2.width/2;
  this.ball2.y = this.paddle2.y + this.paddle2.height + 60;
  this.game.physics.enable(this.ball2, Phaser.Physics.ARCADE);
  this.ball2.body.bounce.setTo(1,1);

  this.ball2.collides = true;

  // Remove the top wall
  this.topWall.body.enable = false;
  this.topWall.visible = false;

  this.game.time.events.add(Phaser.Timer.SECOND * 2, this.restartBall, this, this.ball2, this.paddle2);
};


BasicGame.PONGOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  if (this.state == GameState.PLAY) this.handlePaddleAI(this.paddle2,1,false,0.75);

  this.physics.arcade.overlap(this.paddle2,this.walls,this.handlePaddleWallColliders,null,this);

  this.physics.arcade.collide(this.ball,this.paddle2,this.handleBallPaddleColliders,null,this);
  this.physics.arcade.collide(this.ball2,this.paddle2,this.handleBallPaddleColliders,null,this);
  this.physics.arcade.collide(this.ball2,this.paddle,this.handleBallPaddleColliders,null,this);

  this.physics.arcade.overlap(this.ball2,this.bricks,this.handleBallBrickColliders,null,this);

  this.physics.arcade.collide(this.ball2,this.leftWall,this.handleBallWallColliders,null,this);
  this.physics.arcade.collide(this.ball2,this.rightWall,this.handleBallWallColliders,null,this);

  if (this.state == GameState.PLAY) {
    this.checkBallOutPong(this.ball);
    this.checkBallOutPong(this.ball2);
  }
};


BasicGame.PONGOUT.prototype.handleInput = function () {

  BasicGame.Breakout.prototype.handleInput.call(this);

};


BasicGame.PONGOUT.prototype.handlePaddleAI = function (paddle, force, additive, reactions) {

  var old_pvx = paddle.body.velocity.x;

  var xDistanceToBall1 = (paddle.x + paddle.width/2) - (this.ball.x + this.ball.width/2);
  var xDistanceToBall2 = (paddle.x + paddle.height/2) - (this.ball2.x + this.ball2.width/2);

  var distanceToBall = (this.game.physics.arcade.distanceBetween(paddle,this.ball) > this.game.physics.arcade.distanceBetween(paddle,this.ball2)) ? xDistanceToBall2 : xDistanceToBall1;

  if (distanceToBall < -paddle.width/4) {
    new_pvx = force * PADDLE_SPEED;//Math.min(PADDLE_SPEED,PADDLE_SPEED * -distanceToBall/(this.game.width/8));
  }
  else if (distanceToBall > paddle.width/4) {
    new_pvx = force * -PADDLE_SPEED;//Math.max(-PADDLE_SPEED,-PADDLE_SPEED * distanceToBall/(this.game.width/8));
  }
  else {
    new_pvx = 0;
  }

  // Don't actually change speed if too dumb to do so
  if (Math.random() > reactions) return;

  paddle.body.velocity.x = new_pvx;
};


BasicGame.PONGOUT.prototype.checkBallOut = function () {

};

BasicGame.PONGOUT.prototype.checkBallOutPong = function (ball) {

  if (this.state != GameState.PLAY) return;

  if (ball.visible && ball.y > this.game.canvas.height)
  {
    this.lostPaddle(ball,this.paddle);
  }
  else if (ball.visible && ball.y < 0) {
    this.lostPaddle(ball,this.paddle2);
  }

},



BasicGame.PONGOUT.prototype.lostPaddle = function (ball,paddle) {

  this.paddles--;
  this.updatePaddles(this.paddles);

  if (this.paddles <= 0) {
    this.gameOver();
    return;
  }

  ball.body.velocity.x = 0;
  ball.body.velocity.y = 0;

  // ball.body.x = paddle.x + paddle.width/2 - ball.width/2;

  this.paddle2.body.velocity.x = 0;

  if (paddle == this.paddle) {
    ball.y = this.paddle2.y + this.paddle2.height + 40;
    ball.x = this.paddle2.x + this.paddle2.width/2;
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.restartBall, this, ball, this.paddle2);
  }
  else if (paddle == this.paddle2) {
    ball.y = this.paddle.y - 40;
    ball.x = this.paddle.x + this.paddle.width/2;
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.restartBall, this, ball, this.paddle);
  }

};


BasicGame.PONGOUT.prototype.resetBall = function () {


  // this.ball.x = this.paddle.x + this.paddle.width/2 - this.ball.width/2;
  // this.ball.y = this.paddle.y - 140;

  this.ball.body.velocity.x = 0;
  this.ball.body.velocity.y = 0;

  this.restartTimer = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.restartBall, this, this.ball, this.paddle);
},


BasicGame.PONGOUT.prototype.restartBall = function (ball, paddle) {

  this.launch_wall_sfx.play();

  ball.body.velocity.x = 20 - Math.random() * 40;

  if (paddle == this.paddle) {
    ball.body.velocity.y = BALL_SPEED;
  }
  else if (paddle == this.paddle2) {
    ball.body.velocity.y = -BALL_SPEED;
  }

  this.state = GameState.PLAY;

};


BasicGame.PONGOUT.prototype.handleBallPaddleColliders = function (ball,paddle) {

  BasicGame.Breakout.prototype.handleBallPaddleColliders.call(this,ball,paddle);

  ball.lastHit = paddle;

};


BasicGame.PONGOUT.prototype.handleBallBrickColliders = function (ball,brick) {

  if (!ball.collides) return;

  brick.sfx.play();

  this.updateScore(brick.score,ball.lastHit);

  ball.body.velocity.y *= -1;
  ball.collides = false;

  brick.disable();
  brick.alive = false;

  if (this.bricks.getFirstAlive() == null) {
    // GAME OVER
  }

};


BasicGame.PONGOUT.prototype.updateScore = function (score,paddle) {

  if (paddle == this.paddle) {
    this.score += score;
    this.scoreText.text = "" + this.score;
    this.scoreText.updateText();
    this.scoreText.x = this.game.canvas.width - 280 - this.scoreText.width;
  }
  else if (paddle == this.paddle2) {
    this.score2 += score;
    this.scoreText2.text = "" + this.score2;
    this.scoreText2.updateText();
    this.scoreText2.x = this.game.canvas.width - 280 - this.scoreText2.width;
  }

};


BasicGame.PONGOUT.prototype.showGameOver = function () {

  BasicGame.Breakout.prototype.showGameOver.call(this);

  this.paddle2.visible = false;
  this.ball2.visible = false;
  this.scoreText2.visible = false;


  this.gameOverScoreText.text = this.gameOverScoreString;
  this.gameOverScoreText.x = this.game.width/2 - this.gameOverScoreText.width/2;

  this.gameOverScoreNumberText.text = "TOP PADDLE: " + this.score2.toString();
  this.gameOverScoreNumberText.x = this.game.width/2 - this.gameOverScoreNumberText.width/2;
  this.gameOverScoreNumberText.y = this.gameOverScoreText.y + 2 * this.gameOverScoreText.height;

  this.gameOverScoreNumberText2 = this.game.add.bitmapText(100, 100, 'atari','',24);
  this.gameOverScoreNumberText2.text = "BOTTOM PADDLE: " + this.score.toString();

  this.gameOverScoreNumberText2.x = this.game.width/2 - this.gameOverScoreNumberText2.width/2;
  this.gameOverScoreNumberText2.y = this.gameOverScoreNumberText.y + 1.5 * this.gameOverScoreNumberText.height;


  this.state = GameState.GAME_OVER_SCREEN;

  // this.game.time.events.add(Phaser.Timer.SECOND * 3, this.exitToMenu, this);
};


BasicGame.PONGOUT.prototype.shutdown = function () {

  this.ball2.destroy();
  this.scoreText2.destroy();
  
  BasicGame.Breakout.prototype.shutdown.call(this);

};



BasicGame.PONGOUT.prototype.constructor = BasicGame.TestBreakout;
