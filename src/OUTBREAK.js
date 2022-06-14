BasicGame.OUTBREAK = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.OUTBREAK.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.OUTBREAK.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'OUTBREAK';

  SPREAD_TIME = 0.5;
  GROWTH_CHANCE = 0.01;

  this.bricks.removeAll();
  BRICKS = [];

  BRICKS_Y_OFFSET = 0;

  this.addBrickRow(0,7,'brick_red');
  this.addBrickRow(1,7,'brick_oranger');
  this.addBrickRow(2,4,'brick_orange');
  this.addBrickRow(3,4,'brick_yellow');
  this.addBrickRow(4,1,'brick_green');
  this.addBrickRow(5,1,'brick_blue');
  this.addBrickRow(6,7,'brick_red');
  this.addBrickRow(7,7,'brick_oranger');
  this.addBrickRow(8,4,'brick_orange');
  this.addBrickRow(9,4,'brick_yellow');
  this.addBrickRow(10,1,'brick_green');
  this.addBrickRow(11,1,'brick_blue');
  this.addBrickRow(12,7,'brick_red');
  this.addBrickRow(13,7,'brick_oranger');
  this.addBrickRow(14,4,'brick_orange');
  this.addBrickRow(15,4,'brick_yellow');
  this.addBrickRow(16,1,'brick_green');
  this.addBrickRow(17,1,'brick_blue');
  this.addBrickRow(18,7,'brick_red');
  this.addBrickRow(19,7,'brick_oranger');
  this.addBrickRow(20,4,'brick_orange');
  this.addBrickRow(21,4,'brick_yellow');
  this.addBrickRow(22,1,'brick_green');
  this.addBrickRow(23,1,'brick_blue');
  this.addBrickRow(24,7,'brick_red');
  this.addBrickRow(25,7,'brick_oranger');

  for (var x = 0; x < BRICKS.length; x++) {
    if (x > 5 && x < 12) continue;
    for (var y = 0; y < BRICKS[x].length; y++) {
      BRICKS[x][y].disable();
      BRICKS[x][y].alive = false;
    }
  }

  this.spreadTimer = this.game.time.create(false);
  this.spreadTimer.add(Phaser.Timer.SECOND * SPREAD_TIME, this.checkSpread, this);
  this.spreadTimer.start();

};


BasicGame.OUTBREAK.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  if (this.state == GameState.PLAY) {
    this.physics.arcade.overlap(this.paddle,this.bricks,this.handlePaddleBrickOverlap,null,this);
  }

};


BasicGame.OUTBREAK.prototype.handlePaddleBrickOverlap = function (paddle,brick) {

  // console.log("Paddle brick overlap");

  this.flashSprite(this.paddle,2);
  this.ball.body.velocity.x = this.ball.body.velocity.y = 0;
  this.paddle.body.velocity.x = 0;
  this.game.time.events.add(Phaser.Timer.SECOND * 2, this.lostPaddle, this);
  this.state = GameState.LOST_PADDLE;

};


BasicGame.OUTBREAK.prototype.checkSpread = function () {

  this.spreadTimer.add(Phaser.Timer.SECOND * SPREAD_TIME, this.checkSpread, this);

  if (this.state != GameState.PLAY) return;

  this.bricks.forEachAlive(function (brick) {
    if (Math.random() < GROWTH_CHANCE) {

      if (brick.row - 1 >= 0 && !BRICKS[brick.row - 1][brick.col].body.enable) {
        BRICKS[brick.row - 1][brick.col].enable();
        BRICKS[brick.row - 1][brick.col].alive = true;
      }
      if (brick.row + 1 < BRICKS.length && !BRICKS[brick.row + 1][brick.col].body.enable) {
        BRICKS[brick.row + 1][brick.col].enable();
        BRICKS[brick.row + 1][brick.col].alive = true;
      }
      if (brick.col - 1 >= 0 && !BRICKS[brick.row][brick.col - 1].body.enable) {
        BRICKS[brick.row][brick.col - 1].enable();
        BRICKS[brick.row][brick.col - 1].alive = true;
      }
      if (brick.col + 1 < BRICKS[brick.row].length && !BRICKS[brick.row][brick.col + 1].body.enable) {
        BRICKS[brick.row][brick.col + 1].enable();
        BRICKS[brick.row][brick.col + 1].alive = true;
      }

    }
  });

};


BasicGame.OUTBREAK.prototype.resetBall = function () {

  BasicGame.Breakout.prototype.resetBall.call(this);

  var lowestBrickY = this.getLowestBrickY();
  while (this.ball.y < lowestBrickY + 15) {
    this.ball.y += 5;
  }
  if (this.ball.y + this.ball.height > this.paddle.y) this.ball.y = this.paddle.y - this.ball.height;

};



BasicGame.OUTBREAK.prototype.constructor = BasicGame.Breakout;
