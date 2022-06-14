BasicGame.FAKEOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.FAKEOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.FAKEOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'FAKEOUT';

  this.game.time.events.add(Phaser.Timer.SECOND * 2, this.fakeOut, this);

};


BasicGame.FAKEOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.FAKEOUT.prototype.fakeOut = function () {

  this.ball.body.velocity.x *= -1;

  this.game.time.events.add(Phaser.Timer.SECOND * 2, this.fakeOut, this);
  
}


BasicGame.FAKEOUT.prototype.constructor = BasicGame.Breakout;
