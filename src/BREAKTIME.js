BasicGame.BREAKTIME = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.BREAKTIME.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.BREAKTIME.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'BREAKTIME';

  BREAK_TIME_MESSAGES = [
    "You've been breaking a lot of bricks. You should take a break for a while.",
    "You should really take a break now, don't want to over-do it",
    "Doctors recommend regular breaks during brick-breaking. Let's take one now.",
    "Okay, that's a lot of brick-breaking you've been doing. Time for a break.",
    "Too much brick-breaking is bad for your health. Let's take a break.",
    "Great brick-breaking! Let's take a small break now.",
    "After that much brick-breaking, it's recommend you take a small break."

  ];
  BACK_TO_WORK_MESSAGES = [
    "Alright! Back to brick-breaking!",
    "That's better. Let's break some bricks!",
    "No time like the present to break some bricks!",
    "Okay, now that you're well-rested, let's break bricks!",
    "And now back to the bricks!",
    "Let's get back to the bricks!",
    "Let's break some more bricks!"
  ];

  this.breakTimer = this.game.time.create(false);
  this.breakTimer.add(Phaser.Timer.SECOND * 5, this.checkBreak, this);
  this.breakTimer.start();

  BRICKS_PER_BREAK = 10;
  BREAK_TIME = 15;

  this.onBreak = false;
  this.bricksBroken = 0;
  this.nextBreakAt = BRICKS_PER_BREAK;

};


BasicGame.BREAKTIME.prototype.checkBreak = function () {

  if (this.state == GameState.GAME_OVER) return;

  if (this.bricksBroken >= this.nextBreakAt && !this.onBreak) {

    this.nextBreakAt = this.bricksBroken + BRICKS_PER_BREAK;
    this.breakTimer.add(Phaser.Timer.SECOND * BREAK_TIME, this.checkBreak, this);
    this.breakTimer.start();

    this.onBreak = true;

    this.paddle.body.velocity.x = 0;
    this.ball.body.enable = false;

    alert(BREAK_TIME_MESSAGES[Math.floor(Math.random() * BREAK_TIME_MESSAGES.length)]);

  }
  else if (this.onBreak) {

    this.paddle.body.velocity.x = 0;

    alert(BACK_TO_WORK_MESSAGES[Math.floor(Math.random() * BACK_TO_WORK_MESSAGES.length)]);

    this.ball.body.enable = true;

    this.breakTimer.add(Phaser.Timer.SECOND * 5, this.checkBreak, this);
    this.breakTimer.start();

    this.onBreak = false;

  }
  else {

    this.breakTimer.add(Phaser.Timer.SECOND * 5, this.checkBreak, this);
    this.breakTimer.start();

  }

};


BasicGame.BREAKTIME.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.BREAKTIME.prototype.handleBallBrickColliders = function (ball,brick) {

  if (!ball.collides) return;

  this.bricksBroken++;

  BasicGame.Breakout.prototype.handleBallBrickColliders.call(this,ball,brick);

};


BasicGame.BREAKTIME.prototype.constructor = BasicGame.Breakout;
