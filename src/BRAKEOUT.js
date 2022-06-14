BasicGame.BRAKEOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.BRAKEOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.BRAKEOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'BRAKEOUT';

  this.currentPaddleVelocity = PADDLE_SPEED;
  this.paddle.body.velocity.x = this.currentPaddleVelocity;

};


BasicGame.BRAKEOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.BRAKEOUT.prototype.handleInput = function () {

  if (this.state == GameState.GAME_OVER) return;

  if (this.leftPressed() || this.rightPressed()) {
    this.paddle.body.velocity.x = 0;
  }
  else {
    this.paddle.body.velocity.x = this.currentPaddleVelocity;
  }

  if (this.exitPressed()) {
    this.exitToMenu();
  }

};


BasicGame.BRAKEOUT.prototype.handlePaddleWallColliders = function (paddle,wall) {

  this.currentPaddleVelocity = -this.currentPaddleVelocity;
  paddle.body.velocity.x = this.currentPaddleVelocity;

  if (wall == this.leftWall) paddle.body.x = wall.body.x + wall.width;
  else if (wall == this.rightWall) paddle.body.x = wall.body.x - paddle.width;

};


BasicGame.BRAKEOUT.prototype.constructor = BasicGame.Breakout;
