BasicGame.SNAKEOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.SNAKEOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.SNAKEOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'SNAKEOUT';

  this.paddle.body.enable = false;
  this.paddle.visible = false;

  SNAKE_UNIT = 10;
  SNAKE_TICK = 0.05;
  BALL_SPEED = 100;

  this.snakeletsToAdd = 0;

  this.SNAKE = [];
  this.snake = this.game.add.group();
  this.makeSnake();

  this.ticker = this.game.time.create(false);
  this.ticker.add(Phaser.Timer.SECOND * SNAKE_TICK, this.tick, this);
  this.ticker.start();

  this.lastInput = 'NONE';
  this.leftEnabled = true;
  this.rightEnabled = true;

};


BasicGame.SNAKEOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  if (this.state == GameState.START || this.state == GameState.PLAY) {
    this.physics.arcade.overlap(this.snake,this.walls,this.handleSnakeletWallColliders,null,this);
    this.physics.arcade.overlap(this.snake,this.bricks,this.handleSnakeletBricksColliders,null,this);
  }

  if (this.state == GameState.PLAY) {
    this.physics.arcade.collide(this.ball,this.snake,this.handleBallSnakeletColliders,null,this);
  }

};


BasicGame.SNAKEOUT.prototype.handleInput = function () {

  if (this.state == GameState.GAME_OVER) return;

  var leftPressed = (this.leftPressed());
  var rightPressed = (this.rightPressed());

  if (this.leftPressed() != 0 && this.leftEnabled) {
    this.lastInput = 'LEFT';
    this.leftEnabled = false;
  }
  if (this.rightPressed() != 0 && this.rightEnabled) {
    this.lastInput = 'RIGHT';
    this.rightEnabled = false;
  }

  if (this.exitPressed())
  {
    this.exitToMenu();
  }

  if (!this.leftPressed()) this.leftEnabled = true;
  if (!this.rightPressed()) this.rightEnabled = true;

};



BasicGame.SNAKEOUT.prototype.tick = function () {

  this.ticker.add(Phaser.Timer.SECOND * SNAKE_TICK, this.tick, this);

  if (this.state != GameState.START && this.state != GameState.PLAY) return;

  if (this.lastInput == 'LEFT')
  {
    this.controlsUsed++;

    if (this.SNAKE[0].direction[0] > 0) this.SNAKE[0].direction = [0,-SNAKE_UNIT];
    else if (this.SNAKE[0].direction[0] < 0) this.SNAKE[0].direction = [0,SNAKE_UNIT];
    else if (this.SNAKE[0].direction[1] < 0) this.SNAKE[0].direction = [-SNAKE_UNIT,0];
    else if (this.SNAKE[0].direction[1] > 0) this.SNAKE[0].direction = [SNAKE_UNIT,0];

    this.lastInput = 'NONE';
  }
  else if (this.lastInput == 'RIGHT')
  {
    this.controlsUsed++;

    if (this.SNAKE[0].direction[0] > 0) this.SNAKE[0].direction = [0,SNAKE_UNIT];
    else if (this.SNAKE[0].direction[0] < 0) this.SNAKE[0].direction = [0,-SNAKE_UNIT];
    else if (this.SNAKE[0].direction[1] < 0) this.SNAKE[0].direction = [SNAKE_UNIT,0];
    else if (this.SNAKE[0].direction[1] > 0) this.SNAKE[0].direction = [-SNAKE_UNIT,0];

    this.lastInput = 'NONE';
  }

  var nextDirection = [0,0];

  for (var i = 0; i < this.SNAKE.length; i++) {

    previousDirection = this.SNAKE[i].direction;

    if (i == this.SNAKE.length - 1 && this.snakeletsToAdd > 0 && this.state != GameState.PAUSED) {

      // If it's the final one then we can add a snakelet wherever it was...
      var snakelet = this.snake.create(this.SNAKE[i].x,this.SNAKE[i].y,'ball');
      this.game.physics.enable(snakelet, Phaser.Physics.ARCADE);
      snakelet.body.immovable = true;
      snakelet.direction = this.SNAKE[i].direction;
      this.SNAKE.push(snakelet);
      this.snakeletsToAdd--;

      this.SNAKE[i].x += this.SNAKE[i].direction[0];
      this.SNAKE[i].y += this.SNAKE[i].direction[1];
      this.SNAKE[i].direction = nextDirection;

      break;
    }

    this.SNAKE[i].x += this.SNAKE[i].direction[0];
    this.SNAKE[i].y += this.SNAKE[i].direction[1];

    if (i != 0) {
      this.SNAKE[i].direction = nextDirection;
    }


    nextDirection = previousDirection;
  }

  for (var i = 1; i < this.SNAKE.length; i++) {
    if (this.SNAKE[0].x == this.SNAKE[i].x && this.SNAKE[0].y == this.SNAKE[i].y) {

      this.snakeDeath();
      break;

    }
  }

};


BasicGame.SNAKEOUT.prototype.handleBallBrickColliders = function (ball,brick) {

  if (!ball.collides) {
    return;
  }

  this.snakeletsToAdd += 3;

  BasicGame.Breakout.prototype.handleBallBrickColliders.call(this,ball,brick);


};


BasicGame.SNAKEOUT.prototype.handleBallSnakeletColliders = function (ball,snakelet) {

  var hDistance = Math.abs(ball.x - snakelet.x);
  var vDistance = Math.abs(ball.y - snakelet.y);

  if (hDistance > vDistance) {
    ball.collides = true;
    return;
  }

  var leftSnakelets = 0;
  var rightSnakelets = 0;

  // Work out how many snakelets are to the left of this one
  for (var i = snakelet.index - 1; i >= 0; i--) {
    if (this.SNAKE[i].y == snakelet.y) {
      if (this.SNAKE[i].x < snakelet.x) leftSnakelets++;
      else rightSnakelets++;
    }
    else {
      break;
    }
  }

  // Work out how many snakelets are to the right of this one
  for (var i = snakelet.index + 1; i < this.SNAKE.length; i++) {
    if (this.SNAKE[i].y == snakelet.y) {
      if (this.SNAKE[i].x < snakelet.x) leftSnakelets++;
      else rightSnakelets++;
    }
    else {
      break;
    }
  }

  snakeletsWidth = (rightSnakelets + leftSnakelets + 1) * SNAKE_UNIT;
  paddleMid = (snakelet.x - leftSnakelets*SNAKE_UNIT) + snakeletsWidth/2;

  // paddleMid = paddle.x + paddle.width/2;
  ballMid = ball.x + ball.width/2;
  diff = 0;

  if (ballMid < paddleMid - ball.width/2)
  {
    //  Ball is on the left of the bat
    diff = paddleMid - ballMid;
    var proportion = (diff / (snakeletsWidth/2));
    ball.body.velocity.x = (-BALL_X_SPEED * proportion);
    // ball.body.velocity.x = ( -10 * diff);
  }
  else if (ballMid > paddleMid + ball.width/2)
  {
    //  Ball on the right of the bat
    diff = ballMid - paddleMid;
    var proportion = (diff / (snakeletsWidth/2));
    ball.body.velocity.x = (BALL_X_SPEED * proportion);
    // ball.body.velocity.x = (10 * diff);
  }
  else
  {
    //  Ball is perfectly in the middle
    //  A little random X to stop it bouncing up!
    ball.body.velocity.x = 2 + Math.floor(Math.random() * 8);
  }

  ball.collides = true;

  this.paddle_sfx.play();

};


BasicGame.SNAKEOUT.prototype.handleSnakeletWallColliders = function (snakelet,wall) {

  this.snakeDeath();

};


BasicGame.SNAKEOUT.prototype.handleSnakeletBricksColliders = function (snakelet,brick) {

  this.snakeDeath();

};


BasicGame.SNAKEOUT.prototype.snakeDeath = function () {

  this.game.time.events.remove(this.restartTimer);

  for (var i = 0; i < this.SNAKE.length; i++) {
    var snakelet = this.SNAKE[i];
    this.flashSprite(snakelet,2);
    snakelet.direction = [0,0];
  }

  this.ball.body.velocity.x = this.ball.body.velocity.y = 0;

  this.game.time.events.add(Phaser.Timer.SECOND * 2, this.lostPaddle, this);

  this.state = GameState.PAUSED;

};


BasicGame.SNAKEOUT.prototype.lostPaddle = function () {

  BasicGame.Breakout.prototype.lostPaddle.call(this);

  this.snake.removeAll();
  this.SNAKE = [];

  if (this.paddles != 0) {
    this.makeSnake();
  }
  else {
    this.gameOver();
  }

};


BasicGame.SNAKEOUT.prototype.makeSnake = function () {

  this.lastInput = 'NONE';

  for (var i = 6; i >= 0; i--) {
    snakelet = this.snake.create(this.paddle.x + i*10, this.paddle.y, 'ball');
    snakelet.direction = [SNAKE_UNIT,0];
    snakelet.index = 6-i;
    this.SNAKE.push(snakelet);
    this.game.physics.enable(snakelet, Phaser.Physics.ARCADE);
    snakelet.body.immovable = true;
  }

};


BasicGame.SNAKEOUT.prototype.shutdown = function () {

  this.snake.destroy();

  BasicGame.Breakout.prototype.shutdown.call(this);

};


BasicGame.SNAKEOUT.prototype.constructor = BasicGame.Breakout;
