BasicGame.SHIT_BREAKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.SHIT_BREAKOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.SHIT_BREAKOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'SHIT_BREAKOUT';

  this.shits = this.game.add.group();

};


BasicGame.SHIT_BREAKOUT.prototype.update = function () {

  this.physics.arcade.collide(this.ball,this.shits,function (ball,shit) { if (!shit.collides) return false; else { ball.collides = true; this.addShit(ball); }},function (ball,shit) {}, this);

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.SHIT_BREAKOUT.prototype.handleBallPaddleColliders = function (ball,paddle) {

  BasicGame.Breakout.prototype.handleBallPaddleColliders.call(this,ball,paddle);

  this.addShit(ball);

};


BasicGame.SHIT_BREAKOUT.prototype.addShit = function (ball) {

  var newShit = this.shits.create(ball.x,ball.y,'shit');
  this.game.physics.enable(newShit, Phaser.Physics.ARCADE);
  newShit.body.bounce.setTo(1,1);
  newShit.body.immovable = true;
  newShit.collides = false;
  this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {newShit.collides = true;}, this);

}



BasicGame.SHIT_BREAKOUT.prototype.handleBallBrickColliders = function (ball,brick) {

  if (!ball.collides) {
    return;
  }

  this.addShit(ball);
  BasicGame.Breakout.prototype.handleBallBrickColliders.call(this,ball,brick);

};


BasicGame.SHIT_BREAKOUT.prototype.processBallBrickColliders = function (ball,brick) {

  BasicGame.Breakout.prototype.processBallBrickColliders.call(this,ball,brick);

};


BasicGame.SHIT_BREAKOUT.prototype.handleBallWallColliders = function (ball,wall) {

  this.addShit(ball);
  BasicGame.Breakout.prototype.handleBallWallColliders.call(this,ball,wall);

};


BasicGame.SHIT_BREAKOUT.prototype.shutdown = function () {

  this.shits.destroy();

  BasicGame.Breakout.prototype.shutdown.call(this);

};


BasicGame.SHIT_BREAKOUT.prototype.constructor = BasicGame.Breakout;
