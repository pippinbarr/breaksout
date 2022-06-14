BasicGame.GHOST_BREAKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.GHOST_BREAKOUT.prototype = new BasicGame.Breakout();


BasicGame.GHOST_BREAKOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'GHOST_BREAKOUT';
  this.gameOverScoreString = 'ROMANCE POINTS';


  this.music = this.game.add.audio('unchained_melody',0.2,true);
  // this.music.volume = 0.5;
  this.music.loop = true;
  this.music.loops = true;

};


BasicGame.GHOST_BREAKOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  if (this.state == GameState.PLAY) this.handlePaddleAI(this.paddle,0.5,true);

};


BasicGame.GHOST_BREAKOUT.prototype.lostPaddle = function () {

  console.log("Stopping music in lostPaddle");

  this.music.stop();

  BasicGame.Breakout.prototype.lostPaddle.call(this);

};


BasicGame.GHOST_BREAKOUT.prototype.restartBall = function (ball,paddle) {

  this.music.loopFull();

  BasicGame.Breakout.prototype.restartBall.call(this,ball,paddle);

};


BasicGame.GHOST_BREAKOUT.prototype.shutdown = function () {

  this.music.stop();
  this.game.sound.remove(this.music);

  BasicGame.Breakout.prototype.shutdown.call(this);

};
