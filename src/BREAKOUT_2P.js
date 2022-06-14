BasicGame.BREAKOUT_2P = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.BREAKOUT_2P.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.BREAKOUT_2P.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'BREAKOUT_2P';
  this.paddles = 1;

  this.paddle.x = this.game.width/3 - this.paddle.width/2;
  this.paddle.y -= 20;

  this.paddle2 = this.game.add.sprite(0,0,'paddle2');
  this.paddle2.x = 2*this.game.canvas.width/3 - this.paddle2.width/2;
  this.paddle2.y = this.paddle.y;
  this.game.physics.enable(this.paddle2, Phaser.Physics.ARCADE);

  this.ball.body.customSeparateY = true;
  this.paddle.body.customSeparateY = true;
  this.paddle2.body.customSeparateY = true;

  this.MIN_PADDLE_SPEED = PADDLE_SPEED / 200;

  this.paddle.body.immovable = false;
  // this.paddle.body.mass = 100;
  // this.paddle.body.maxVelocity.set(PADDLE_SPEED,0);
  this.paddle.body.bounce.set(1,1);
  this.paddle2.body.immovable = false;
  // this.paddle2.body.mass = 100;
  // this.paddle.body.maxVelocity.set(PADDLE_SPEED,0);
  this.paddle2.body.bounce.set(1,1);

  // For tracking scores
  this.paddle.lastHit = null;
  this.paddle2.lastHit = null;

  this.scoreText.x = this.game.canvas.width/2 - this.scoreText.width/2;
  this.scoreText.y = this.game.canvas.height - this.scoreText.height - 10;

  this.score2 = 0;

  this.scoreText2 = this.game.add.bitmapText(0, 8, 'atari','',120);
  this.scoreText2.tint = 0x888888;
  this.scoreText2.scale.x = 0.75;
  this.scoreText2.scale.y = 0.25;
  this.scoreText2.x = this.game.canvas.width/2 - this.scoreText2.width/2;

  this.scoreText2.text = "" + this.score2;
  this.scoreText2.updateText();

  this.paddle_paddle_sfx = this.game.add.audio('paddle_wall_sfx',0.5);


};


BasicGame.BREAKOUT_2P.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  this.physics.arcade.collide(this.paddle,this.walls);
  this.physics.arcade.collide(this.paddle2,this.walls);

  this.physics.arcade.overlap(this.paddle2,this.walls,this.handlePaddleWallColliders,null,this);
  this.physics.arcade.collide(this.ball,this.paddle2,this.handleBallPaddleColliders,null,this);
  this.physics.arcade.collide(this.paddle,this.paddle2,this.handlePaddlePaddleColliders,null,this);

};


BasicGame.BREAKOUT_2P.prototype.updateScore = function (score,paddle) {

  if (paddle == this.paddle) {
    this.score += score;
    this.scoreText.text = "" + this.score;
    this.scoreText.updateText();
    this.scoreText.x = this.game.canvas.width/2 - this.scoreText.width/2;
  }
  else if (paddle == this.paddle2) {
    this.score2 += score;
    this.scoreText2.text = "" + this.score2;
    this.scoreText2.updateText();
    this.scoreText2.x = this.game.canvas.width/2 - this.scoreText2.width/2;
  }

};


BasicGame.BREAKOUT_2P.prototype.handlePaddlePaddleColliders = function (paddle1,paddle2) {

  // paddle1.body.velocity.x = 0;
  // paddle2.body.velocity.x = 0;

  // paddle1.body.x -= 10;
  // paddle2.body.x += 10;

  this.paddle_paddle_sfx.play();

};


BasicGame.BREAKOUT_2P.prototype.handleBallPaddleColliders = function (ball,paddle) {

  ball.body.y = paddle.body.y - ball.body.height;
  ball.body.velocity.y *= -1;

  ball.lastHit = paddle;

  BasicGame.Breakout.prototype.handleBallPaddleColliders.call(this,ball,paddle);

};


BasicGame.BREAKOUT_2P.prototype.handleBallBrickColliders = function (ball,brick) {

  if (!ball.collides) {
    return;
  }

  this.updateScore(brick.score,ball.lastHit);

  brick.sfx.play();

  ball.body.velocity.y *= -1;
  ball.collides = false;

  brick.disable();
  brick.alive = false;

};



BasicGame.BREAKOUT_2P.prototype.handleInput = function () {

  if (this.state != GameState.GAME_OVER) BasicGame.Breakout.prototype.handlePaddleAI.call(this,this.paddle2,1,false);
  BasicGame.Breakout.prototype.handleInput.call(this);

},


BasicGame.BREAKOUT_2P.prototype.lostPaddle = function () {

  BasicGame.Breakout.prototype.lostPaddle.call(this);

  this.paddle2.body.velocity.x = 0;

};


BasicGame.BREAKOUT_2P.prototype.showGameOver = function () {

  BasicGame.Breakout.prototype.showGameOver.call(this);

  this.paddle2.visible = false;
  this.scoreText2.visible = false;

  this.gameOverScoreText.text = this.gameOverScoreString;
  this.gameOverScoreNumberText.text = "LEFT PADDLE: " + this.score.toString() + "\n\nRIGHT PADDLE: " + this.score2.toString();

  this.gameOverScoreText.x = this.game.width/2 - this.gameOverScoreText.width/2;
  this.gameOverScoreNumberText.x = this.game.width/2 - this.gameOverScoreNumberText.width/2;
  this.gameOverScoreNumberText.y = this.gameOverScoreText.y + 2 * this.gameOverScoreText.height;

  this.state = GameState.GAME_OVER_SCREEN;

  // this.game.time.events.add(Phaser.Timer.SECOND * 3, this.exitToMenu, this);
};



BasicGame.BREAKOUT_2P.prototype.shutdown = function () {

  this.paddle2.destroy();
  this.scoreText2.destroy();
  this.paddle_paddle_sfx.destroy();

  BasicGame.Breakout.prototype.shutdown.call(this);

};



BasicGame.BREAKOUT_2P.prototype.constructor = BasicGame.Breakout;
