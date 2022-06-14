BasicGame.FREAKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.FREAKOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.FREAKOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'FREAKOUT';

  this.madness = 0.01;
  // this.madness = 0.5;

};


BasicGame.FREAKOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  this.bricks.forEach(function (brick) {
    if (Math.random() < this.madness && Math.random() < 0.01) {
      this.freak(brick);
    }
  },this);

  if (Math.random() < this.madness && Math.random() < 0.01) this.freak(this.paddle);
  if (Math.random() < this.madness && Math.random() < 0.01)this.freak(this.leftWall);
  if (Math.random() < this.madness && Math.random() < 0.01)this.freak(this.rightWall);
  if (Math.random() < this.madness && Math.random() < 0.01)this.freak(this.topWall);
  if (Math.random() < this.madness && Math.random() < 0.01)this.freak(this.scoreText);
  if (Math.random() < this.madness && Math.random() < 0.01)this.freak(this.paddlesText);
  if (Math.random() < this.madness && Math.random() < 0.01)this.freak(this.ball);

  if (this.state == GameState.GAME_OVER_SCREEN) {
    if (Math.random() < this.madness && Math.random() < 0.05) this.freak(this.gameOverBG);
    if (Math.random() < this.madness && Math.random() < 0.05) this.freak(this.gameOverText);
    if (Math.random() < this.madness && Math.random() < 0.05) this.freak(this.gameOverScoreText);
    if (Math.random() < this.madness && Math.random() < 0.05) this.freak(this.gameOverScoreNumberText);
  }
};


BasicGame.FREAKOUT.prototype.handleBallBrickColliders = function (ball,brick) {

  BasicGame.Breakout.prototype.handleBallBrickColliders.call(this,ball,brick);

  this.madness += 0.01;

};


BasicGame.FREAKOUT.prototype.freak = function (sprite) {

  if (Math.random() > this.madness) return;

  if (Math.random() < this.madness) sprite.x += 1 - Math.random() * 2;
  if (Math.random() < this.madness) sprite.y += 1 - Math.random() * 2;
  if (Math.random() < this.madness) sprite.alpha = Math.random();
  if (Math.random() < this.madness) sprite.angle = Math.random() * 360;
  if (Math.random() < this.madness) sprite.scale.x = Math.random();
  if (Math.random() < this.madness) sprite.scale.y = Math.random();
  if (Math.random() < this.madness) sprite.x = Math.random() * this.game.width;
  if (Math.random() < this.madness) sprite.y = Math.random() * this.game.height;

  // sounds too

};


BasicGame.FREAKOUT.prototype.constructor = BasicGame.Breakout;
