BasicGame.SPACEOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.SPACEOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.SPACEOUT.prototype.create = function () {

  // Make the stars
  NUM_STARS = 100;

  this.stars = this.game.add.group();
  for (var i = 0; i < NUM_STARS; i++) {
    star = this.stars.create(Math.random() * this.game.canvas.width,Math.random() * this.game.canvas.height, (Math.random() < 0.5 ? 'star_big' : 'star_small'));
    this.game.physics.enable(star, Phaser.Physics.ARCADE);
    star.body.velocity.y = (Math.random() < 0.5 ? 100 : 75);
  }

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'SPACEOUT';

  // Move and resize the walls for unobstructed view
  this.topWall.y = 0 - this.topWall.height;

  this.leftWall.x = 0 - this.leftWall.width;
  this.leftWall.y = 0;
  this.leftWall.body.height = this.game.canvas.height;

  this.rightWall.x = this.game.canvas.width;
  this.rightWall.y = 0;
  this.rightWall.body.height = this.game.canvas.height;



  // Move the bricks off screen
  this.bricks.forEach(function (brick) {
    brick.y = -100;
    // if (Math.random() < 0.95) {
    //   brick.disable();
    //   brick.alive = false;
    // }
  });

  WAVE_TIME = 2;
  WAVE_SIZE = 5;
  BRICK_VELOCITY_MIN = 100;
  BRICK_VELOCITY_RANGE = 100;

  this.waveTimer = this.game.time.create(false);
  this.waveTimer.add(Phaser.Timer.SECOND * WAVE_TIME, this.sendWave, this);
  this.waveTimer.start();

};


BasicGame.SPACEOUT.prototype.sendWave = function () {

  this.waveTimer.add(Phaser.Timer.SECOND * WAVE_TIME, this.sendWave, this);

  if (this.state != GameState.PLAY) return;

  var bricksSent = 0;
  if (this.bricks.countLiving() < WAVE_SIZE) WAVE_SIZE = this.bricks.countLiving();

  if (WAVE_SIZE == 0) {
    // Reset the game I guess
  }


  this.bricks.forEachAlive(function (brick) {

    // First check if we've already sent them all
    if (bricksSent == WAVE_SIZE) return;

    // First check if it's already on the move
    if (brick.body.velocity.y != 0) return;

    // If not we can send it
    brick.x = Math.random() * (640 - brick.width);
    brick.y = 0 - brick.height;
    brick.body.velocity.y = BRICK_VELOCITY_MIN + Math.random() * BRICK_VELOCITY_RANGE;

    bricksSent++;

  });


};


BasicGame.SPACEOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

    this.stars.forEach(function (star) {
      if (star.y > star.game.canvas.height) {
        star.y -= star.game.canvas.height;
        star.x = Math.random() * star.game.canvas.width;
      }
    },this);

    this.bricks.forEachAlive(function (brick) {
      if (brick.y > 480) {
        brick.y = -100;
        brick.body.velocity.y = 0;
        brick.body.velocity.x = 0;
      }
    },this);

    if (this.state == GameState.PLAY) {
      this.physics.arcade.overlap(this.paddle,this.bricks,this.handlePaddleBrickOverlap,null,this);
    }

};


BasicGame.SPACEOUT.prototype.restartBall = function () {

  this.bricks.forEachAlive(function (brick) {
    if (brick.pvy != null) {
      brick.body.velocity.y = brick.pvy;
      brick.pvy = null;
    }
  });

  this.stars.forEachAlive(function (star) {
    if (star.pvy != null) {
      star.body.velocity.y = star.pvy;
      star.pvy = null;
    }
  });

  BasicGame.Breakout.prototype.restartBall.call(this);

};


BasicGame.SPACEOUT.prototype.handlePaddleBrickOverlap = function (paddle,brick) {

  // Game over!

  // brick.disable();
  // brick.alive = false;

  brick.y = this.game.height + 10;

  this.flashSprite(this.paddle,2);
  this.ball.body.velocity.x = this.ball.body.velocity.y = 0;
  this.paddle.body.velocity.x = 0;

  this.bricks.forEachAlive(function (brick) {
    brick.pvx = brick.body.velocity.x;
    brick.pvy = brick.body.velocity.y;

    brick.body.velocity.x = 0;
    brick.body.velocity.y = 0;
  });

  this.stars.forEachAlive(function (star) {
    star.pvy = star.body.velocity.y;

    star.body.velocity.y = 0;
  });

  this.game.time.events.add(Phaser.Timer.SECOND * 2, this.lostPaddle, this);
  this.state = GameState.LOST_PADDLE;

};


BasicGame.SPACEOUT.prototype.lostPaddle = function () {

  BasicGame.Breakout.prototype.lostPaddle.call(this);

  this.bricks.forEachAlive(function (brick) {
    if (brick.pvx == null) brick.pvx = brick.body.velocity.x;
    if (brick.pvy == null) brick.pvy = brick.body.velocity.y;

    brick.body.velocity.x = 0;
    brick.body.velocity.y = 0;
  });

  this.stars.forEachAlive(function (star) {
    if (star.pvy == null) star.pvy = star.body.velocity.y;

    star.body.velocity.y = 0;
  });

};


BasicGame.SPACEOUT.prototype.resetBricks = function () {

  BasicGame.Breakout.prototype.resetBricks.call(this);

  this.bricks.forEach(function (brick) {
    brick.y = -100;
    // if (Math.random() < 0.95) {
    //   brick.disable();
    //   brick.alive = false;
    // }
  });

},



BasicGame.SPACEOUT.prototype.shutdown = function () {

  this.stars.destroy();

  BasicGame.Breakout.prototype.shutdown.call(this);

};


BasicGame.SPACEOUT.prototype.constructor = BasicGame.Breakout;
