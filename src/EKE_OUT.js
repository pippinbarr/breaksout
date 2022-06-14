BasicGame.EKE_OUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.EKE_OUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.EKE_OUT.prototype.create = function () {

  this.BRICK_SFX = {};

  this.BRICK_SFX["brick_blue"] = this.game.add.audio('brick_blue_sfx',0.2);
  this.BRICK_SFX["brick_green"] = this.game.add.audio('brick_green_sfx',0.2);
  this.BRICK_SFX["brick_yellow"] = this.game.add.audio('brick_yellow_sfx',0.2);
  this.BRICK_SFX["brick_orange"] = this.game.add.audio('brick_orange_sfx',0.2);
  this.BRICK_SFX["brick_oranger"] = this.game.add.audio('brick_oranger_sfx',0.2);
  this.BRICK_SFX["brick_red"] = this.game.add.audio('brick_red_sfx',0.2);

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'EKE_OUT';

};


BasicGame.EKE_OUT.prototype.addBrickRow = function (row,value,brickImage) {

  BRICKS.push([]);

  brickX = this.leftWall.x + this.leftWall.width;
  brickY = this.topWall.y + this.topWall.height + BRICKS_Y_OFFSET + (row * 15);

  col = 0;
  while(brickX < this.rightWall.x) {

    for (var y = 0; y < 15; y += 5) {
      for (var x = 0; x < 30; x += 5) {
        brick = new Brick(this,brickX + x,brickY + y,row,col,brickImage,value/18,this.BRICK_SFX[brickImage]);

        brick.width = 5;
        brick.height = 5;

        this.game.physics.enable(brick, Phaser.Physics.ARCADE);
        brick.body.immovable = true;

        this.bricks.add(brick);
        // BRICKS[row].push(brick);
      }
    }

    brickX += 30;
    col++;

  }
};


BasicGame.EKE_OUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.EKE_OUT.prototype.constructor = BasicGame.Breakout;
