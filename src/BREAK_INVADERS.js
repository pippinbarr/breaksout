BasicGame.BREAK_INVADERS = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.BREAK_INVADERS.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.BREAK_INVADERS.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'BREAK_INVADERS';

  // this.leftWall.kill();
  this.leftWall.y = 0;
  this.leftWall.x = 0 - this.leftWall.width;
  this.leftWall.height = this.game.height;
  // this.rightWall.kill();
  this.rightWall.y = 0;
  this.rightWall.x = this.game.width;
  this.rightWall.height = this.game.height;
  // this.topWall.kill();
  this.topWall.y = 0 - this.topWall.height;

  BRICK_MOVE = BRICKS[0][0].width/4;
  BRICK_MOVE_STEP = 1;
  CHANGE_DIR = false;

  this.moveBricksTimer = this.game.time.create(false);
  this.moveBricksTimer.add(Phaser.Timer.SECOND * BRICK_MOVE_STEP, this.moveBricks, this);
  this.moveBricksTimer.start();

  INVADER_SOUNDS = [];
  INVADER_SOUNDS.push(this.game.add.audio('invader_0',1));
  INVADER_SOUNDS.push(this.game.add.audio('invader_1',1));
  INVADER_SOUNDS.push(this.game.add.audio('invader_2',1));
  INVADER_SOUNDS.push(this.game.add.audio('invader_3',1));
  this.invaderSoundIndex = 0;

  this.invaderDrops = 0;

};


BasicGame.BREAK_INVADERS.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  if (this.state == GameState.PLAY) {
    this.physics.arcade.overlap(this.paddle,this.bricks,this.handlePaddleBrickColliders,null,this);
  }

};


BasicGame.BREAK_INVADERS.prototype.handlePaddleBrickColliders = function (paddle,brick) {

  this.flashSprite(this.paddle,2);
  this.ball.body.velocity.set(0,0);
  this.paddle.body.velocity.x = 0;

  this.game.time.events.add(Phaser.Timer.SECOND * 2, this.gameOver, this);
  this.state = GameState.GAME_OVER;

};


BasicGame.BREAK_INVADERS.prototype.ballOut = function () {

  this.moveBricksTimer.pause();

  BasicGame.Breakout.prototype.ballOut.call(this);

};


BasicGame.BREAK_INVADERS.prototype.resetBall = function () {

  BasicGame.Breakout.prototype.resetBall.call(this);

  var lowestBrickY = this.getLowestBrickY();
  while (this.ball.y < lowestBrickY + 15) {
    this.ball.y += 5;
  }
  if (this.ball.y + this.ball.height > this.paddle.y) this.ball.y = this.paddle.y - this.ball.height;

};


BasicGame.BREAK_INVADERS.prototype.restartBall = function (ball,paddle) {

  this.moveBricksTimer.resume();

  BasicGame.Breakout.prototype.restartBall.call(this,ball,paddle);

};


BasicGame.BREAK_INVADERS.prototype.moveBricks = function () {

  this.moveBricksTimer.add(Phaser.Timer.SECOND * BRICK_MOVE_STEP, this.moveBricks, this);

    if (this.state != GameState.PLAY) return;

    var tempChangeDir = CHANGE_DIR;
    var tempBrickMove = BRICK_MOVE;

    INVADER_SOUNDS[this.invaderSoundIndex].play();
    this.invaderSoundIndex = (this.invaderSoundIndex + 1) % INVADER_SOUNDS.length;

    this.bricks.forEach(function (brick) {
      if (brick.alive) {
        if (CHANGE_DIR) {
          brick.y += brick.height;
          tempChangeDir = false;
          tempBrickMove = -BRICK_MOVE;
        }
        else {
          brick.x += BRICK_MOVE;
          if (brick.x + brick.width + BRICK_MOVE >= 640) {
            tempChangeDir = true;
          }
          else if (brick.x + BRICK_MOVE <= 0) {
            tempChangeDir = true;
          }
        }
      }
    });

    if (CHANGE_DIR) {
      this.invaderDrops++;
      if (this.invaderDrops % 2 == 0) {
        BRICK_MOVE_STEP = BRICK_MOVE_STEP / 1.25;
      }
    }

    BRICK_MOVE = tempBrickMove;
    CHANGE_DIR = tempChangeDir;
};


BasicGame.BREAK_INVADERS.prototype.shutdown = function () {

  INVADER_SOUNDS.forEach( function (sound) {
    this.game.sound.remove(sound);
  },this);

  BasicGame.Breakout.prototype.shutdown.call(this);

};


BasicGame.BREAK_INVADERS.prototype.constructor = BasicGame.Breakout;
