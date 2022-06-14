BasicGame.BROKENOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.BROKENOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.BROKENOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'BROKENOUT';

  this.bricks.removeAll();
  BRICKS = [];

};


BasicGame.BROKENOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);
  
};


BasicGame.BROKENOUT.prototype.constructor = BasicGame.TestBreakout;
