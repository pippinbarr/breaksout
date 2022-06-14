BasicGame.SOCIAL_BREAKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.SOCIAL_BREAKOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.SOCIAL_BREAKOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'SOCIAL_BREAKOUT';

  START_TEXTS = [
    "I'm psyched to start playing @pippinbarr's SOCIAL BREAKOUT!",
    "Let's do this! Time for @pippinbarr's SOCIAL BREAKOUT!",
    "Just started @pippinbarr's SOCIAL BREAKOUT! Join in!",
    "Already so excited about @pippinbarr's SOCIAL BREAKOUT! Go! Go! Go!",
    "Just about to play @pippinbarr's SOCIAL BREAKOUT!"
  ];

  LOST_PADDLE_TEXTS = [
    "Oh no! I missed the ball in @pippinbarr's SOCIAL BREAKOUT!",
    "Oops! Missed the ball in @pippinbarr's SOCIAL BREAKOUT!",
    "That tricky ball! I missed in @pippinbarr's SOCIAL BREAKOUT!",
    "The ball just got past me in @pippinbarr's SOCIAL BREAKOUT!",
    "Darn! The ball snuck by in @pippinbarr's SOCIAL BREAKOUT!"
  ];

  GAME_OVER_TEXTS = [
    "I just lost my last paddle in @pippinbarr's SOCIAL BREAKOUT! So intense!",
    "Oh no! Game over in @pippinbarr's SOCIAL BREAKOUT! Great game!",
    "Can't wait to play @pippinbarr's SOCIAL BREAKOUT again!",
    "Had such a great time playing @pippinbarr's SOCIAL BREAKOUT!",
    "Wow! Now that's a game! @pippinbarr's SOCIAL BREAKOUT!"
  ];

  RESTART_TEXTS = [
    "Here comes the ball! I'm loving @pippinbarr's SOCIAL BREAKOUT!",
    "Ball's about to launch in @pippinbarr's SOCIAL BREAKOUT!",
    "Which way will the ball launch in @pippinbarr's SOCIAL BREAKOUT!? Can't wait!",
    "Feeling excited about the ball launching in @pippinbarr's SOCIAL BREAKOUT!",
    "So ready for the ball to launch in @pippinbarr's SOCIAL BREAKOUT!"
  ];

  HIT_BALL_TEXTS = [
    "Just hit the ball in @pippinbarr's SOCIAL BREAKOUT! This rules!",
    "Nailed it! Hit the ball in @pippinbarr's SOCIAL BREAKOUT!",
    "Showed the ball who's boss in @pippinbarr's SOCIAL BREAKOUT!",
    "That's how it's done! I'm All Pro in @pippinbarr's SOCIAL BREAKOUT!",
    "Yes! Hit the ball in @pippinbarr's SOCIAL BREAKOUT!",
    "You cannot escape, ball! Winning at @pippinbarr's SOCIAL BREAKOUT!",
    "Physics is working in @pippinbarr's SOCIAL BREAKOUT!",
    "I am the paddle master! Got a hit in @pippinbarr's SOCIAL BREAKOUT!"
  ];

  HIT_WALL_TEXTS = [
    "The ball just hit a wall in @pippinbarr's SOCIAL BREAKOUT!",
    "The walls work in @pippinbarr's SOCIAL BREAKOUT!",
    "Well-constructed walls in @pippinbarr's SOCIAL BREAKOUT! Boing!",
    "Bouncing off the walls in @pippinbarr's SOCIAL BREAKOUT!",
    "Bounce-shot! Ball hit the wall in @pippinbarr's SOCIAL BREAKOUT!"
  ];

  HIT_BRICK_TEXTS = [
    "Just hit a brick in @pippinbarr's SOCIAL BREAKOUT!",
    "Yes! Got a brick in @pippinbarr's SOCIAL BREAKOUT!",
    "Brick annihilated in @pippinbarr's SOCIAL BREAKOUT!",
    "Bricks are no match for me in @pippinbarr's SOCIAL BREAKOUT!",
    "Brick, meet ball! I love @pippinbarr's SOCIAL BREAKOUT!",
    "Broke a brick in @pippinbarr's SOCIAL BREAKOUT! Winning!",
    "There goes a brick in @pippinbarr's SOCIAL BREAKOUT!",
    "Another brick bites the dust in @pippinbarr's SOCIAL BREAKOUT!"
  ];

  FINAL_SCORE_TEXTS = [
    "Oh no! Game over in @pippinbarr's SOCIAL BREAKOUT!",
    "It's all over for me in @pippinbarr's SOCIAL BREAKOUT!",
    "I just lost at @pippinbarr's SOCIAL BREAKOUT!",
    "Just lost my last paddle in @pippinbarr's SOCIAL BREAKOUT!",
    "Game Over! I loved @pippinbarr's SOCIAL BREAKOUT!",
    "That's it! Game Over in @pippinbarr's SOCIAL BREAKOUT!",
    "Game Over! But can't wait to play @pippinbarr's SOCIAL BREAKOUT again!",
    "Oh no! My last paddle in @pippinbarr's SOCIAL BREAKOUT is gone!"
  ];

  this.tweet(this.choose(START_TEXTS));

};


BasicGame.SOCIAL_BREAKOUT.prototype.choose = function (array) {
  return (array[Math.floor(Math.random() * array.length)]);
}


BasicGame.SOCIAL_BREAKOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.SOCIAL_BREAKOUT.prototype.lostPaddle = function () {

  BasicGame.Breakout.prototype.lostPaddle.call(this);

  this.tweet(this.choose(LOST_PADDLE_TEXTS));

};


BasicGame.SOCIAL_BREAKOUT.prototype.gameOver = function () {

  BasicGame.Breakout.prototype.gameOver.call(this);

  this.tweet(this.choose(GAME_OVER_TEXTS));

},



BasicGame.SOCIAL_BREAKOUT.prototype.restartBall = function (ball,paddle) {

  BasicGame.Breakout.prototype.restartBall.call(this,ball,paddle);

  this.delaySound(this.launch_wall_sfx,0.1);

  this.tweet(this.choose(RESTART_TEXTS));

};


BasicGame.SOCIAL_BREAKOUT.prototype.handleBallPaddleColliders = function (ball,paddle) {

  BasicGame.Breakout.prototype.handleBallPaddleColliders.call(this,ball,paddle);

  this.delaySound(this.paddle_sfx,0.1);

  this.tweet(this.choose(HIT_BALL_TEXTS));

};


BasicGame.SOCIAL_BREAKOUT.prototype.handleBallBrickColliders = function (ball,brick) {

  BasicGame.Breakout.prototype.handleBallBrickColliders.call(this,ball,brick);

  this.delaySound(brick.sfx,0.1);

  this.tweet(this.choose(HIT_BRICK_TEXTS) + " That's " + brick.score + ((brick.score == 1) ? " point!" : " points!"));

};


BasicGame.SOCIAL_BREAKOUT.prototype.handleBallWallColliders = function (ball,wall) {

  BasicGame.Breakout.prototype.handleBallWallColliders.call(this,ball,wall);

  this.delaySound(this.launch_wall_sfx,0.1);

  this.tweet(this.choose(HIT_WALL_TEXTS));

};

BasicGame.SOCIAL_BREAKOUT.prototype.showGameOver = function () {

  BasicGame.Breakout.prototype.showGameOver.call(this);

  this.tweet(this.choose(FINAL_SCORE_TEXTS) + " I scored " + this.score + ((this.score == 1) ? " point!" : " points!"));

};



BasicGame.SOCIAL_BREAKOUT.prototype.delaySound = function (sound, delay) {

  this.game.time.events.add(Phaser.Timer.SECOND * delay, this.playDelayedSound, this, sound);

};


BasicGame.SOCIAL_BREAKOUT.prototype.playDelayedSound = function (sound) {

  sound.play();

};


BasicGame.SOCIAL_BREAKOUT.prototype.tweet = function (text) {

  var url = 'http://www.pippinbarr.com/games/breaksout/';
  url = encodeURI(url);

  if (this.game.device.desktop) {

    text.replace(' ','+');
    window.open('http://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + url,"_system");

  }
  else {

    nativeTwitter = window.open('twitter://post?message=' + encodeURIComponent(text) + ' ' + url,"_self");
    if (!nativeTwitter)
    {
      window.open('http://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + url,"_system");
    }

  }

};


BasicGame.SOCIAL_BREAKOUT.prototype.constructor = BasicGame.Breakout;
