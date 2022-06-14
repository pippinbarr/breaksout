BasicGame.SCREENSHAKEOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.SCREENSHAKEOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.SCREENSHAKEOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'SCREENSHAKEOUT';

  this.explosion = this.game.add.emitter(0, 0, 200);
  this.explosion.gravity = 0;
  this.explosion.setRotation(0,0);
  this.explosion.setXSpeed(-200,200);
  this.explosion.setYSpeed(-200,200);
  this.explosion.setSize(30,15);

  // SOUNDS

  this.ball_out_sfx = this.game.add.audio('ball_out_sfx',1);
  this.brick_explosion_sfx = this.game.add.audio('brick_explosion_sfx',1);
  this.paddle_wall_sfx = this.game.add.audio('paddle_wall_sfx',1);
  this.brick_pickup_sfx = this.game.add.audio('brick_pickup_sfx',1);

};


BasicGame.SCREENSHAKEOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  if (this.screenShake) {
    var rand1 = 20 - Math.random() * 40;
    var rand2 = 20 - Math.random() * 40;
    this.game.world.setBounds(rand1, rand2, this.game.width + rand1, this.game.height + rand2);
  }

};


BasicGame.SCREENSHAKEOUT.prototype.handlePaddleWallColliders = function (paddle,wall) {

  BasicGame.Breakout.prototype.handlePaddleWallColliders.call(this,paddle,wall);

  this.paddle_wall_sfx.play();

  this.startScreenShake();

};


BasicGame.SCREENSHAKEOUT.prototype.handleBallPaddleColliders = function (ball,paddle) {

  BasicGame.Breakout.prototype.handleBallPaddleColliders.call(this,ball,paddle);

  this.startScreenShake();

};


BasicGame.SCREENSHAKEOUT.prototype.handleBallBrickColliders = function (ball,brick) {

  if (!ball.collides) return;


  this.explosion.removeAll();
  this.explosion.makeParticles(brick.sprite.replace('brick','particle'));

  this.explosion.x = brick.x + brick.width/2;
  this.explosion.y = brick.y + brick.height/2;
  this.explosion.start(true, 2000, null, 30);

  this.brick_explosion_sfx.play();
  this.brick_pickup_sfx.play();

  BasicGame.Breakout.prototype.handleBallBrickColliders.call(this,ball,brick);

  this.startScreenShake();

};


BasicGame.SCREENSHAKEOUT.prototype.handleBallWallColliders = function (ball,wall) {

  BasicGame.Breakout.prototype.handleBallWallColliders.call(this,ball,wall);

  this.startScreenShake();

};


BasicGame.SCREENSHAKEOUT.prototype.lostPaddle = function () {

  this.paddle.visible = false;

  this.explosion.removeAll();
  this.explosion.makeParticles('particle_red');

  this.explosion.x = this.paddle.x + this.paddle.width/2;
  this.explosion.y = this.paddle.y + this.paddle.height/2;
  this.explosion.start(true, 2000, null, 30);

  this.brick_explosion_sfx.play();
  this.startScreenShake();

  this.time.events.add(Phaser.Timer.SECOND * 2, this.showPaddle, this);

  this.state = GameState.START
};


BasicGame.SCREENSHAKEOUT.prototype.showPaddle = function () {

  this.paddle.visible = true;
  BasicGame.Breakout.prototype.lostPaddle.call(this);

};


BasicGame.SCREENSHAKEOUT.prototype.startScreenShake = function () {

  this.screenShake = true;

  this.game.time.events.add(Phaser.Timer.SECOND * 0.1, this.stopScreenShake, this);

};


BasicGame.SCREENSHAKEOUT.prototype.stopScreenShake = function () {

  this.screenShake = false;

  this.game.world.setBounds(0, 0, this.game.width, this.game.height);

};


BasicGame.SCREENSHAKEOUT.prototype.shutdown = function () {

  this.game.sound.remove(this.explosion);
  this.game.sound.remove(this.ball_out_sfx);
  this.game.sound.remove(this.brick_explosion_sfx);
  this.game.sound.remove(this.paddle_wall_sfx);
  this.game.sound.remove(this.brick_pickup_sfx);

  BasicGame.Breakout.prototype.shutdown.call(this);

};


BasicGame.SCREENSHAKEOUT.prototype.constructor = BasicGame.Breakout;
