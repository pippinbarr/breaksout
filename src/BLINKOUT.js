BasicGame.BLINKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.BLINKOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.BLINKOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'BLINKOUT';

  this.blinkTimer = this.game.time.create(false);
  this.blinkTimer.add(Phaser.Timer.SECOND * 1, this.blink, this);
  this.blinkTimer.start();

};


BasicGame.BLINKOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.BLINKOUT.prototype.blink = function () {

  console.log("Blink...");
  this.bricks.forEachAlive(function (brick) {
    if (brick.body.enable) {
      brick.disable();
    }
    else {
      brick.enable();
    }
  }, this);

  this.blinkTimer.add(Phaser.Timer.SECOND * 1, this.blink, this);

}

BasicGame.BLINKOUT.prototype.constructor = BasicGame.TestBreakout;
