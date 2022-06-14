BasicGame.MAKEOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.MAKEOUT.prototype = new BasicGame.Breakout();


BasicGame.MAKEOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'MAKEOUT';
  this.gameOverScoreString = 'YOU PRODUCED A POTENTIAL SCORE OF';

  // Now make them all invisible
  this.bricks.callAll('disable');

  for (var i = 0; i < BRICKS[0].length; i++) {
    BRICKS[0][i].enable();
    BRICKS[0][i].alpha = 0;
  }

};


BasicGame.MAKEOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.MAKEOUT.prototype.handleBallBrickColliders = function (ball,brick) {

  if (!this.ball.collides) return;

  // Handle the bounce
  this.ball.body.velocity.y *= -1;
  this.ball.collides = false;

  // Handle the case where we're making a brick visible by collision
  if (brick.alpha == 0) {
    brick.sfx.play();
    this.updateScore(brick.score);
    brick.alpha = 1;
    // And handle the case where we need to enable the next brick down
    if (brick.row + 1 < BRICKS.length) {
      BRICKS[brick.row + 1][brick.col].enable();
      BRICKS[brick.row + 1][brick.col].alpha = 0;
    }
  }

};
