BasicGame.TRAVEL_BREAKOUT = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.TRAVEL_BREAKOUT.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.TRAVEL_BREAKOUT.prototype.create = function () {

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'TRAVEL_BREAKOUT';

  this.countriesByRow = ["New Zealand","Malta","Denmark","South Africa","Bangladesh","Canada"];
  this.currentPosition = "UNKNOWN";

  this.updatePosition();

  this.game.time.events.add(Phaser.Timer.SECOND * 10, this.updatePosition, this);

};


BasicGame.TRAVEL_BREAKOUT.prototype.updatePosition = function() {

  this.positionLastUpdated = Date.now();
  this.positionNextUpdate = Date.now() + (1 * 60 * 1000);
  // this.currentPosition = "UPDATING";
  navigator.geolocation.getCurrentPosition(this.successFunction.bind(this), this.errorFunction.bind(this));
  this.game.time.events.add(Phaser.Timer.SECOND * 10, this.updatePosition, this);

};


BasicGame.TRAVEL_BREAKOUT.prototype.successFunction = function(position) {

  this.currentPosition = get_country(position.coords.latitude,position.coords.longitude).name;

  // this.currentPosition =

};


BasicGame.TRAVEL_BREAKOUT.prototype.errorFunction = function() {

  this.currentPosition = "UNKNOWN";

};


BasicGame.TRAVEL_BREAKOUT.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  if (Date.now() >= this.positionNextUpdate) {

    this.updatePosition();

  }

};


BasicGame.TRAVEL_BREAKOUT.prototype.handleBallBrickColliders = function (ball,brick)
{
  if (!this.ball.collides) return;

  if (this.currentPosition == this.countriesByRow[brick.row]) {

    // Brick is in the same city as the player.
    this.updateScore(brick.score);
    brick.sfx.play();
    brick.disable();
    brick.alive = false;


  }
  else {

    // Brick is in a different city.
    var alertString = "This brick is in " + this.countriesByRow[brick.row];
    if (this.currentPosition == "UPDATING") {
      alertString += " and I don't know where you are yet.";
    }
    else if (this.currentPosition == "UNKNOWN") {
      alertString += " and I don't know where you are right now.";
    }
    else {
      alertString += " and you're in " + this.currentPosition + ".";
    }

    alert(alertString);

  }

  if (this.bricks.getFirstAlive() == null) {
    // They have cleared the screen!
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.resetGame, this);
  }

  this.ball.body.velocity.y *= -1;
  this.ball.collides = false;

};


BasicGame.TRAVEL_BREAKOUT.prototype.constructor = BasicGame.TRAVEL_BREAKOUT;
