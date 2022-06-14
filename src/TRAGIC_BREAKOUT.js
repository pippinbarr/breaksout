BasicGame.TRAGIC_BREAKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.TRAGIC_BREAKOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.TRAGIC_BREAKOUT.prototype.create = function () {

  OBIT_TIME_MIN = 3;
  OBIT_TIME_RANGE = 3;

  OBITS = [
    'HE HAS GONE TO A BETTER PLACE',
    'SHE HAS GONE TO A BETTER PLACE',
    'HE IS WITH THE ANGELS NOW',
    'SHE IS WITH THE ANGELS NOW',
    'HE LEFT US TOO SOON',
    'SHE LEFT US TOO SOON',
    'GONE BUT NOT FORGOTTEN',
    'ALWAYS IN OUR HEARTS',
    'UNTIL WE MEET AGAIN',
    'SHE IS ONLY SLEEPING',
    'HE IS ONLY SLEEPING',
    'LOVING MEMORIES LAST FOREVER',
    'STEP SOFTLY\nA DREAM LIES BURIED HERE',
    'I SHALL BUT LOVE THEE BETTER AFTER DEATH',
    'DEATH IS ONLY A SHADOW\nACROSS THE PATH TO HEAVEN',
    'NO PAIN NO GRIEF NO ANXIOUS FEAR\nCAN REACH OUR LOVED ONE SLEEPING HERE',
    'HEAVEN\nTHE TREASURY OF EVERLASTING JOY',
    'THE END AND REWARD OF TOIL IS REST',
    'SAFE IN THE HALLOWED QUIETS OF THE PAST',
    'THERE NEVER WAS A NIGHT THAT HAD NO MORN',
    'WHERE THERE IS SORROW\nTHERE IS HOLY GROUND',
    'HUSH MY DEAR\nBE STILL AND SLUMBER',
    'SLEEP MY LITTLE ONE\nSLEEP',
    'REMEMBERING A TINY ANGEL',
    'THE PLACE OF A SLEEPING ANGEL',
    'HIS MEMORY IS ENSHRINED IN OUR HEARTS',
    'HER MEMORY IS ENSHRINED IN OUR HEARTS',
    'RESTING WITH THOSE HE LOVED',
    'RESTING WITH THOSE SHE LOVED',
    'TO KNOW HER WAS TO LOVE HER',
    'TO KNOW HIM WAS TO LOVE HIM',
    'ALWAYS LOVING\nALWAYS LOVED',
  ];

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'TRAGIC_BREAKOUT';
  this.gameOverScoreString = 'LIVES DESTROYED';


  this.music = this.game.add.audio('funeral_march',true);

  this.blackBG = this.game.add.sprite(0,0,'brick_black');
  this.blackBG.width = this.game.canvas.width;
  this.blackBG.height = this.game.canvas.height;
  this.blackBG.visible = false;

  this.birthYear = new Date().getFullYear();

  this.brickGhost = this.game.add.sprite(0,0,'brick_white');
  this.brickGhost.anchor.x = 0.5;
  this.brickGhost.x = this.game.width/2;
  this.brickGhost.y = this.game.height/2;
  this.brickGhost.alpha = 0.5;
  this.brickGhost.visible = false;
  this.game.physics.enable(this.brickGhost, Phaser.Physics.ARCADE);

  this.tombstone = this.game.add.sprite(0,0,'tombstone');
  this.tombstone.x = this.game.width/2 - this.tombstone.width/2;
  this.tombstone.y = this.game.height/2 - this.tombstone.height/2;
  this.tombstone.visible = false;

  this.tombstoneText = this.game.add.bitmapText(320, 250, 'atari','',16);
  this.tombstoneText.anchor.x = 0.5;
  this.tombstoneText.anchor.y = 0.5;
  this.tombstoneText.visible = false;

  this.obitText = this.game.add.bitmapText(320, 400, 'atari','',24);
  this.obitText.anchor.x = 0.5;
  this.obitText.anchor.y = 0.5;
  this.obitText.visible = false;

  this.obitTimer = this.game.time.create(false);
  this.obitTimer.start();

};


BasicGame.TRAGIC_BREAKOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

};


BasicGame.TRAGIC_BREAKOUT.prototype.handleBallBrickColliders = function (ball,brick)
{
  if (!ball.collides) {
    return;
  }

  BasicGame.Breakout.prototype.handleBallBrickColliders.call(this,ball,brick);

  this.startObit(brick);

};


BasicGame.TRAGIC_BREAKOUT.prototype.updateScore = function (score,paddle) {

  if (score != 0) this.score += 1;
  console.log(this.score);
  if (this.score - Math.floor(this.score) == 0) {
    this.scoreText.text = this.score.toString();
  }
  else {
    this.scoreText.text = this.score.toFixed(2).toString();
  }
  this.scoreText.x = this.game.canvas.width - 280 - this.scoreText.width;

},


BasicGame.TRAGIC_BREAKOUT.prototype.startObit = function (brick) {

  if (this.state != 'PLAY') return;

  this.ball.body.enable = false;
  this.paddle.body.enable = false;

  var name = brick.brickColor.toUpperCase() + ' ' + (brick.col+1);
  var year = new Date().getFullYear();

  this.tombstoneText.text = 'BRICK ' + (brick.row * 19 + brick.col + 1) + '\n\n' + this.birthYear + ' TO ' + year + '\n\n                 RIP';
  this.obitText.text = OBITS[Math.floor(Math.random() * OBITS.length)];

  this.brickGhost.loadTexture(brick.sprite);
  this.brickGhost.x = this.game.width/2;
  this.brickGhost.y = this.game.height/2;
  this.brickGhost.body.velocity.y = -50;
  this.brickGhost.alpha = 0.5;

  this.blackBG.visible = true;
  this.brickGhost.visible = true;
  this.brickGhost
  this.tombstone.visible = true;
  this.tombstoneText.visible = true;
  this.obitText.visible = true;

  this.music.play();

  this.obitTimer.add(Phaser.Timer.SECOND * 6.2, this.stopObit, this);

};


BasicGame.TRAGIC_BREAKOUT.prototype.stopObit = function () {

  this.ball.body.enable = true;
  this.paddle.body.enable = true;
  this.brickGhost.body.velocity.y = 0;

  this.blackBG.visible = false;
  this.brickGhost.visible = false;
  this.tombstone.visible = false;
  this.tombstoneText.visible = false;
  this.obitText.visible = false;

};


BasicGame.TRAGIC_BREAKOUT.prototype.shutdown = function () {

  this.music.stop();
  this.game.sound.remove(this.music);

  this.blackBG.destroy();
  this.brickGhost.destroy();
  this.tombstone.destroy();
  this.tombstoneText.destroy();
  this.obitText.destroy();

  BasicGame.Breakout.prototype.shutdown.call(this);

};



BasicGame.TRAGIC_BREAKOUT.prototype.constructor = BasicGame.Breakout;
