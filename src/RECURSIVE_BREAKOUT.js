BasicGame.RECURSIVE_BREAKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.RECURSIVE_BREAKOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.RECURSIVE_BREAKOUT.prototype.create = function () {

  this.COLOR = '';
  this.bgBrick = this.game.add.sprite(0,0,'brick_black');
  this.bgBrick.width = this.game.canvas.width;
  this.bgBrick.height = this.game.canvas.height;

  ZOOM_FACTOR = 0.0001;

  if (this.screenshot != null) this.screenshot.visible = false;

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'RECURSIVE_BREAKOUT';

  this.screenshot = this.game.add.sprite(0,0);
  this.screenshot.visible = false;

  this.scaleBrickImage = false;

};


BasicGame.RECURSIVE_BREAKOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  if (this.scaleBrickImage && this.brickImage.scale.x < 1) {
    this.brickImage.scale.x = Math.min(this.brickImage.scale.x + ZOOM_FACTOR,1);
    this.brickImage.scale.y = this.brickImage.scale.x;

    this.screenshot.scale.y = this.brickImage.height / BRICKS[0][0].height;
    this.screenshot.scale.x = this.screenshot.scale.y;

    this.bgBrick.scale.x = this.screenshot.scale.x;
    this.bgBrick.scale.y = this.screenshot.scale.y;

    ZOOM_FACTOR += 0.0005;

    if (this.brickImage.scale.x == 1) {

      this.brickImage.kill();
      this.screenshot.visible = false;

      this.bgBrick.loadTexture(this.COLOR);
      this.bgBrick.width = this.game.canvas.width;
      this.bgBrick.height = this.game.canvas.height;

      // Now need to change the brick colors
      for (var x = 0; x < BRICKS[5].length; x++) {
        BRICKS[5][x].enable();
        BRICKS[5][x].loadTexture(this.COLOR == 'brick_blue' ? 'brick_yellow' : 'brick_blue');
      }
      for (var x = 0; x < BRICKS[3].length; x++) {
        BRICKS[3][x].loadTexture(this.COLOR);
      }

      this.ball.body.enable = true;
      this.paddle.body.enable = true;

      this.paddle.x = this.game.canvas.width/2 - this.paddle.width/2;
      this.paddle.y = this.game.canvas.height - 3*this.paddle.height;

      this.ball.body.velocity.x = 0;
      this.ball.body.velocity.y = 0;
      this.ball.body.x = this.paddle.x + this.paddle.width/2 - this.ball.width/2;
      this.ball.body.y = this.paddle.y - 160;

      this.restartBall(this.ball,this.paddle);

      ZOOM_FACTOR = 0.0001;

    }
  }

};


BasicGame.RECURSIVE_BREAKOUT.prototype.handleBallBrickColliders = function (ball,brick)
{

  if (!ball.collides) {
    return;
  }

  ball.body.enable = false;
  this.paddle.body.enable = false;

  var bmd = this.game.add.bitmapData(640,480);
  bmd.copy(this.game.canvas,0,0,this.game.canvas.width,this.game.canvas.height,0,0,640,480);
  this.screenshot.loadTexture(bmd);
  this.screenshot.visible = true;

  if (this.COLOR != 'brick_blue') {
    this.COLOR = 'brick_blue';
    this.brickImage = this.game.add.sprite(0,0,'recursive_breakout_blue');
  }
  else {
    this.COLOR = 'brick_yellow';
    this.brickImage = this.game.add.sprite(0,0,'recursive_breakout_yellow');
  }

  this.brickImage.scale.y = brick.height / this.brickImage.height;
  this.brickImage.scale.x = this.brickImage.scale.y;

  this.brickImage.anchor.x = ((brick.x + brick.width/2) / this.game.canvas.width);
  this.brickImage.anchor.y = ((brick.y + brick.height/2) / this.game.canvas.height);

  this.brickImage.x = brick.x + brick.width/2;
  this.brickImage.y = brick.y + brick.height/2 - 1;

  this.screenshot.anchor.x = this.brickImage.anchor.x;
  this.screenshot.anchor.y = this.brickImage.anchor.y;
  this.screenshot.x = brick.x + brick.width/2;
  this.screenshot.y = brick.y + brick.height/2;

  this.scaleBrickImage = true;

};


BasicGame.RECURSIVE_BREAKOUT.prototype.shutdown = function () {

  this.screenshot.destroy();

  BasicGame.Breakout.prototype.shutdown.call(this);

};


BasicGame.RECURSIVE_BREAKOUT.prototype.constructor = BasicGame.Breakout;
