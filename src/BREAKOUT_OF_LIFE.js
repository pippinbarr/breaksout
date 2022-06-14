BasicGame.BREAKOUT_OF_LIFE = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.BREAKOUT_OF_LIFE.prototype = new BasicGame.Breakout();


BasicGame.BREAKOUT_OF_LIFE.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'BREAKOUT_OF_LIFE';

  this.bricks.removeAll();
  BRICKS = [];

  BRICKS_Y_OFFSET = 0;

  this.addBrickRow(0,7,'brick_red');
  this.addBrickRow(1,7,'brick_oranger');
  this.addBrickRow(2,4,'brick_orange');
  this.addBrickRow(3,4,'brick_yellow');
  this.addBrickRow(4,1,'brick_green');
  this.addBrickRow(5,1,'brick_blue');
  this.addBrickRow(6,7,'brick_red');
  this.addBrickRow(7,7,'brick_oranger');
  this.addBrickRow(8,4,'brick_orange');
  this.addBrickRow(9,4,'brick_yellow');
  this.addBrickRow(10,1,'brick_green');
  this.addBrickRow(11,1,'brick_blue');
  this.addBrickRow(12,7,'brick_red');
  this.addBrickRow(13,7,'brick_oranger');
  this.addBrickRow(14,4,'brick_orange');
  this.addBrickRow(15,4,'brick_yellow');
  this.addBrickRow(16,1,'brick_green');
  this.addBrickRow(17,1,'brick_blue');
  this.addBrickRow(18,7,'brick_red');
  this.addBrickRow(19,7,'brick_oranger');
  this.addBrickRow(20,4,'brick_orange');
  this.addBrickRow(21,4,'brick_yellow');
  this.addBrickRow(22,1,'brick_green');
  this.addBrickRow(23,1,'brick_blue');
  this.addBrickRow(24,7,'brick_red');
  this.addBrickRow(25,7,'brick_oranger');


  for (var y = 0; y < BRICKS.length; y++) {
    for (var x = 0; x < BRICKS[y].length; x++) {
      if (y < 6 || y > 11) {
        BRICKS[y][x].disable();
      }
    }
  }

  this.stepTimer = this.time.events.add(Phaser.Timer.SECOND * 1, this.step, this);

};


BasicGame.BREAKOUT_OF_LIFE.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.BREAKOUT_OF_LIFE.prototype.step = function () {

    this.stepTimer = this.time.events.add(Phaser.Timer.SECOND * 1, this.step, this);

    if (this.state != GameState.PLAY) return;

    var nextBRICKS = new Array(BRICKS.length);
    for (var i = 0; i < BRICKS.length; i++) {
      nextBRICKS[i] = new Array(BRICKS[i].length);
    }

    // Now process the board and figure out neighbours
    for (var x = 0; x < BRICKS.length; x++) {
      for (var y = 0; y < BRICKS[x].length; y++) {

        // Check all neighbours of this brick and set its next state

        var n = 0;

        for (var dx = -1; dx <= 1; dx++) {
          for (var dy = -1; dy <= 1; dy++) {
            if (dx == 0 && dy == 0) {
              // Skip because we dont examine ourselves.
            }
            else if (BRICKS[x+dx] != undefined && BRICKS[x+dx][y+dy] != undefined && BRICKS[x+dx][y+dy].body.enable) {
              // Have a neighbour at this location
              n++;
            }
          }
        }

        nextBRICKS[x][y] = n;
      }
    }

    for (var x = 0; x < BRICKS.length; x++) {
      for (var y = 0; y < BRICKS[x].length; y++) {
        if (BRICKS[x][y].body.enable && nextBRICKS[x][y] == 2) {
          BRICKS[x][y].enable();
          BRICKS[x][y].alive = true;
        }
        else if (BRICKS[x][y].body.enable && nextBRICKS[x][y] == 3) {
          BRICKS[x][y].enable();
          BRICKS[x][y].alive = true;
        }
        else if (!BRICKS[x][y].body.enable && nextBRICKS[x][y] == 3) {
          BRICKS[x][y].enable();
          BRICKS[x][y].alive = true;
        }
        else {
          BRICKS[x][y].disable(); BRICKS[x][y].alive = false;
        }
      }
    }


};

BasicGame.BREAKOUT_OF_LIFE.prototype.resetBall = function () {

  BasicGame.Breakout.prototype.resetBall.call(this);

  var lowestBrickY = this.getLowestBrickY();
  while (this.ball.y < lowestBrickY + 15) {
    this.ball.y += 5;
  }
  if (this.ball.y + this.ball.height > this.paddle.y) this.ball.y = this.paddle.y - this.ball.height;

};
