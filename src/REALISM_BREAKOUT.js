BasicGame.REALISM_BREAKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.REALISM_BREAKOUT.prototype = new BasicGame.Breakout();


BasicGame.REALISM_BREAKOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'REALISM_BREAKOUT';

  // Make the ball have gravity applied to it.
  this.ball.body.enable = true;
  this.ball.body.gravity.y = 10;

  // Make the ball not bounce perfectly.
  this.ball.body.bounce.setTo(0.25,0.25);

};


BasicGame.REALISM_BREAKOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


// BasicGame.REALISM_BREAKOUT.prototype.restartBall = function () {
//
//   // Don't do any launching, just let it fall.
//   this.state = GameState.PLAY;
//
// };


BasicGame.REALISM_BREAKOUT.prototype.handleBallPaddleColliders = function (ball,paddle) {

  this.ball.collides = true;

};
