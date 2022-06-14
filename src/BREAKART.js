BasicGame.BREAKART = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.BREAKART.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.BREAKART.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'BREAKART';
  this.gameOverScoreString = 'PAINTING VALUE';


};


BasicGame.BREAKART.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  if (this.state == GameState.GAME_OVER) {
    if (this.leftPressed() > 0) {
      this.avatar.scale.x = -1;
      this.avatar.animations.play('walk');
      this.avatar.body.velocity.x = -100;
    }
    else if (this.rightPressed() > 0) {
      this.avatar.scale.x = 1;
      this.avatar.animations.play('walk');
      this.avatar.body.velocity.x = 100;
    }
    else {
      this.avatar.animations.play('idle');
      this.avatar.body.velocity.x = 0;
    }

    if (this.avatar.x - this.avatar.width/2 < 0 || this.avatar.x - this.avatar.width/2 > this.game.width) {
      // Game is really over
      this.game.state.start(MENU_STATE);
    }
  }




};


BasicGame.BREAKART.prototype.gameOver = function () {

  this.state = GameState.GAME_OVER;

  this.ball.body.velocity.x = 0;
  this.ball.body.velocity.y = 0;
  this.paddle.body.velocity.x = 0;

  // Add white sprite behind painting for BG
  whiteSprite = this.game.add.sprite(0,0,'brick_white');
  whiteSprite.scale.x = this.game.canvas.width;
  whiteSprite.scale.y = this.game.canvas.height;

  // Add the bricks to the painting (scaled down)
  var OFFSET_X = 86;
  var OFFSET_Y = 110;
  var SCALE = 0.25;

  for (var y = 0; y < BRICKS.length; y++) {
    for (var x = 0; x < BRICKS[y].length; x++) {
      if (BRICKS[y][x].body.enable) {
        brick = this.game.add.sprite(OFFSET_X + x * SCALE*30, OFFSET_Y + y * SCALE*15,'brick_black');
        brick.scale.x *= 0.25;
        brick.scale.y *= 0.25;
      }
    }
  }

  // Add the background of the art gallery
  this.game.add.sprite(0,0,'breakart_bg');

  // Add the person of the art gallery
  this.avatar = this.game.add.sprite(0,0,'breakart_person');
  this.game.physics.enable(this.avatar, Phaser.Physics.ARCADE);
  this.avatar.animations.add('walk',[0,1,2,3,4,5,6,7],10,false);
  this.avatar.animations.add('idle',[8,8],5,false);
  this.avatar.animations.frame = 9;
  this.avatar.anchor.x = 0.5;
  this.avatar.x = 140;
  this.avatar.y = 140;

  // Add the foreground of the art gallery
  this.game.add.sprite(0,0,'breakart_fg');

};



BasicGame.BREAKART.prototype.shutdown = function () {

  BasicGame.Breakout.prototype.shutdown.call(this);

};


BasicGame.BREAKART.prototype.constructor = BasicGame.Breakout;
