BasicGame.SERIOUS_BREAKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.SERIOUS_BREAKOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.SERIOUS_BREAKOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'SERIOUS_BREAKOUT';
  this.gameOverScoreString = 'YOU ARE THIS SERIOUS:';


  hate = [
    [0,0,1,0,1,0,0,1,0,0,1,1,1,0,1,1,1,0,0],
    [0,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,0,0],
    [0,0,1,1,1,0,1,1,1,0,0,1,0,0,1,1,0,0,0],
    [0,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,0,0],
    [0,0,1,0,1,0,1,0,1,0,0,1,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ];

  war = [
    [0,0,0,1,0,0,0,1,0,0,1,0,0,1,1,0,0,0,0],
    [0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0],
    [0,0,0,1,0,0,0,1,0,1,1,1,0,1,0,1,0,0,0],
    [0,0,0,1,0,1,0,1,0,1,0,1,0,1,1,0,0,0,0],
    [0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,0],
    [0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,0],
  ];

  drugs = [
    [1,1,0,0,1,1,0,0,1,0,1,0,1,1,1,0,1,1,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0],
    [1,0,1,0,1,1,0,0,1,0,1,0,1,0,1,0,0,1,0],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
    [1,1,0,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1],
  ];

  fear = [
    [0,0,1,1,1,0,1,1,1,0,0,1,0,0,1,1,0,0,0],
    [0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,0],
    [0,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,0,0,0],
    [0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,0],
    [0,0,1,0,0,0,1,1,1,0,1,0,1,0,1,0,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ];

  words = [hate,war,drugs,fear];

  this.bricks.removeAll();
  BRICKS = [];

  this.buildWall(words[Math.floor(Math.random() * words.length)]);

};


BasicGame.SERIOUS_BREAKOUT.prototype.buildWall = function (word) {

  for (var row = 0; row < word.length; row++) {

    BRICKS.push([]);

    brickX = this.leftWall.x + this.leftWall.width;
    brickY = this.topWall.y + this.topWall.height + BRICKS_Y_OFFSET + (row * 15);

    col = 0;
    while(brickX < this.rightWall.x) {

      if (word[row][col]) {

        brick = new Brick(this,brickX,brickY,row,col,'brick_orange',10,this.BRICK_SFX['brick_orange']);

        this.game.physics.enable(brick, Phaser.Physics.ARCADE);
        brick.body.immovable = true;

        this.bricks.add(brick);
        BRICKS[row].push(brick);

      }

      brickX += brick.width;
      col++;

    }
  }

};


BasicGame.SERIOUS_BREAKOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.SERIOUS_BREAKOUT.prototype.constructor = BasicGame.Breakout;
