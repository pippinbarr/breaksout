BasicGame.TRACEOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.TRACEOUT.prototype = new BasicGame.Breakout();


BasicGame.TRACEOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'TRACEOUT';

  this.traces = this.game.add.group();
  this.frames = 0;

};


BasicGame.TRACEOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  this.frames++;

  if (this.ball.body.velocity.y != 0 || this.ball.body.velocity.x != 0) {
    if (this.frames % 5 == 0) this.traces.create(this.ball.x,this.ball.y,'ball');
  }

};


BasicGame.TRACEOUT.prototype.lostPaddle = function () {

  BasicGame.Breakout.prototype.lostPaddle.call(this);

  this.traces.removeAll();

};



BasicGame.TRACEOUT.prototype.shutdown = function () {

  this.traces.destroy();

  BasicGame.Breakout.prototype.shutdown.call(this);

};
