BasicGame.BREAKOUT_VR = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.BREAKOUT_VR.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.BREAKOUT_VR.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'BREAKOUT_VR';

  this.oculus = this.game.add.sprite(0,0,'oculus_frame');

};


BasicGame.BREAKOUT_VR.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.BREAKOUT_VR.prototype.shutdown = function () {

  this.oculus.destroy();

  BasicGame.Breakout.prototype.shutdown.call(this);

};


BasicGame.BREAKOUT_VR.prototype.constructor = BasicGame.Breakout;
