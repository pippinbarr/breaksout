BasicGame.BREAK_IN = function (game) {

  BasicGame.Breakout.call(this,game);

};


BasicGame.BREAK_IN.prototype = Object.create(BasicGame.Breakout.prototype);


BasicGame.BREAK_IN.prototype.create = function () {

  this.leftApartmentWall = this.game.add.sprite(0,0,'left_wall');
  this.leftApartmentWall.x = 0;
  this.leftApartmentWall.y = -this.leftApartmentWall.height;
  this.game.physics.enable(this.leftApartmentWall, Phaser.Physics.ARCADE);
  this.leftApartmentWall.body.immovable = true;

  this.rightApartmentWall = this.game.add.sprite(0,0,'right_wall');
  this.rightApartmentWall.x = this.game.width - this.rightApartmentWall.width;
  this.rightApartmentWall.y = this.leftApartmentWall.y;
  this.game.physics.enable(this.rightApartmentWall, Phaser.Physics.ARCADE);
  this.rightApartmentWall.body.immovable = true;

  this.apartmentTopWall = this.game.add.sprite(0,0,'top_wall');
  this.apartmentTopWall.x = this.leftApartmentWall.x;
  this.apartmentTopWall.y = this.leftApartmentWall.y;
  this.game.physics.enable(this.apartmentTopWall, Phaser.Physics.ARCADE);
  this.apartmentTopWall.body.immovable = true;

  BasicGame.Breakout.prototype.create.call(this);

  this.currentStateName = 'BREAK_IN';
  this.gameOverScoreString = 'YOU SELL THE ITEMS FOR';


  this.walls.add(this.leftApartmentWall);
  this.walls.add(this.rightApartmentWall);
  this.walls.add(this.apartmentTopWall);

  // Shift main walls to accomodate a door

  this.topWall.x = this.topWall.x - this.topWall.width/2 - 60;

  this.topWall2 = this.game.add.sprite(0,0,'top_wall');
  this.topWall2.x = this.topWall.x + this.topWall.width + 120;
  this.topWall2.y = this.leftWall.y;
  this.game.physics.enable(this.topWall2, Phaser.Physics.ARCADE);
  this.walls.add(this.topWall2);
  this.topWall2.body.immovable = true;

  // Set up the furniture

  this.setupFurniture();

  // Block off the bottoms of the upper walls with grey
  black1 = this.game.add.sprite(0,0,'brick_black');
  black1.x = this.leftApartmentWall.x;
  black1.y = this.leftApartmentWall.y + this.leftApartmentWall.height - 48;
  black1.width = this.leftApartmentWall.width;
  black1.height = 88;
  this.game.physics.enable(black1, Phaser.Physics.ARCADE);
  black1.body.immovable = true;
  this.walls.add(black1);

  black2 = this.game.add.sprite(0,0,'brick_black');
  black2.x = this.rightApartmentWall.x;
  black2.y = this.leftApartmentWall.y + this.leftApartmentWall.height - 48;
  black2.width = this.leftApartmentWall.width;
  black2.height = 88;
  this.game.physics.enable(black2, Phaser.Physics.ARCADE);
  black2.body.immovable = true;
  this.walls.add(black2);

  // Set up the camera

  this.game.world.setBounds(0,-480,640,960);
  this.game.camera.follow(this.ball);
  this.game.camera.deadzone = new Phaser.Rectangle(0,40,0,80);

  // DEBUG to make it easier to get into the apartment
  // this.bricks.removeAll();
  // BRICKS = [];
  // this.topWall.body.enable = false;
  // this.topWall2.body.enable = false;

  this.furniture_pickup_sfx = this.game.add.audio('brick_pickup_sfx',1);

};


BasicGame.BREAK_IN.prototype.update = function () {

  BasicGame.Breakout.prototype.update.call(this);

  this.physics.arcade.collide(this.ball,this.furniture,this.handleBallFurnitureCollision,null,this);

};


BasicGame.BREAK_IN.prototype.handleBallBrickColliders = function (ball,brick) {

  if (!ball.collides) {
    return;
  }

  brick.sfx.play();

  // this.updateScore(brick.score,this.paddle);

  ball.body.velocity.y *= -1;
  ball.collides = false;

  brick.disable();
  brick.alive = false;

  if (this.bricks.getFirstAlive() == null) {
    // They have cleared the screen!
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.resetGame, this);
  }

},


BasicGame.BREAK_IN.prototype.handleBallFurnitureCollision = function (ball,item) {

  this.flashSprite(item,0.5);
  item.vanishTimer = this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.vanishItem, this, item);

  ball.pvx = ball.body.velocity.x;
  ball.pvy = ball.body.velocity.y;

  ball.body.velocity.x = ball.body.velocity.y = 0;


};


BasicGame.BREAK_IN.prototype.handleBallWallColliders = function (ball,wall) {

  if (wall == this.topWall || wall == this.topWall2) ball.collides = true;

  this.launch_wall_sfx.play();

};



BasicGame.BREAK_IN.prototype.vanishItem = function (item) {

  this.furniture_pickup_sfx.play();

  var itemText = this.game.add.bitmapText(0, 8, 'atari','100',36);
  itemText.tint = 0x880000;
  itemText.x = item.x + item.width/2 - itemText.width/2;
  itemText.y = item.y + item.height/2 - itemText.height/2;

  this.updateScore(100);

  this.paddle_sfx.play();

  item.kill();

  itemText.vanishTimer = this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.vanishItemText, this, itemText);

};


BasicGame.BREAK_IN.prototype.vanishItemText = function (itemText) {

  itemText.kill();

  this.ball.body.velocity.x = this.ball.pvx;
  this.ball.body.velocity.y = this.ball.pvy;

  if (this.furniture.getFirstAlive() == null) {
    this.gameOver();
  }

};


BasicGame.BREAK_IN.prototype.setupFurniture = function () {

  this.furniture = this.game.add.group();

  this.armchair = this.furniture.create(0,0,'armchair');
  this.armchair.x = this.leftApartmentWall.x + this.leftApartmentWall.width + 8;
  this.armchair.y = this.apartmentTopWall.y + this.apartmentTopWall.height + 8;
  this.game.physics.enable(this.armchair, Phaser.Physics.ARCADE);
  this.armchair.body.immovable = true;
  this.armchair.body.height = 10;
  this.armchair.body.offset.y = this.armchair.height - this.armchair.body.height;

  this.bed = this.furniture.create(0,0,'bed');
  this.bed.x = this.rightApartmentWall.x - this.bed.width - 8;
  this.bed.y = this.apartmentTopWall.y + this.apartmentTopWall.height + 8;
  this.game.physics.enable(this.bed, Phaser.Physics.ARCADE);
  this.bed.body.immovable = true;
  this.bed.body.height = 10;
  this.bed.body.offset.y = this.bed.height - this.bed.body.height;

  this.dresser = this.furniture.create(0,0,'dresser');
  this.dresser.x = this.bed.x - this.dresser.width - 32;
  this.dresser.y = this.bed.y;
  this.game.physics.enable(this.dresser, Phaser.Physics.ARCADE);
  this.dresser.body.immovable = true;
  this.dresser.body.height = 10;
  this.dresser.body.offset.y = this.dresser.height - this.dresser.body.height;

  VERTICAL_OFFSET = 40;

  this.kitchenBenchLeft = this.walls.create(0,0,'kitchen_bench_left');
  this.kitchenBenchLeft.x = this.leftWall.x + this.leftWall.width + 8;
  this.kitchenBenchLeft.y = this.topWall.y - this.kitchenBenchLeft.height - 8 - VERTICAL_OFFSET;
  this.game.physics.enable(this.kitchenBenchLeft, Phaser.Physics.ARCADE);
  this.kitchenBenchLeft.body.immovable = true;

  this.kitchenBenchRight = this.walls.create(0,0,'kitchen_bench_right');
  this.kitchenBenchRight.x = this.kitchenBenchLeft.x + this.kitchenBenchLeft.width;
  this.kitchenBenchRight.y = this.kitchenBenchLeft.y + this.kitchenBenchLeft.height - this.kitchenBenchRight.height;
  this.game.physics.enable(this.kitchenBenchRight, Phaser.Physics.ARCADE);
  this.kitchenBenchRight.body.immovable = true;

  this.stove = this.furniture.create(0,0,'stove');
  this.stove.x = this.leftWall.x + this.leftWall.width + 8;
  this.stove.y = this.kitchenBenchLeft.y - this.stove.height - 8;
  this.game.physics.enable(this.stove, Phaser.Physics.ARCADE);
  this.stove.body.immovable = true;
  this.stove.body.height = 10;
  this.stove.body.offset.y = this.stove.height - this.stove.body.height;

  this.fridge = this.furniture.create(0,0,'fridge');
  this.fridge.x = this.stove.x;
  this.fridge.y = this.stove.y - this.fridge.height - 8;
  this.game.physics.enable(this.fridge, Phaser.Physics.ARCADE);
  this.fridge.body.immovable = true;
  this.fridge.body.height = 10;
  this.fridge.body.offset.y = this.fridge.height - this.fridge.body.height;

  this.chairLeft = this.furniture.create(0,0,'chair_left');
  this.chairLeft.x = this.fridge.x + this.fridge.width + 48;
  this.chairLeft.y = this.fridge.y;
  this.game.physics.enable(this.chairLeft, Phaser.Physics.ARCADE);
  this.chairLeft.body.immovable = true;
  this.chairLeft.body.height = 10;
  this.chairLeft.body.offset.y = this.chairLeft.height - this.chairLeft.body.height;

  this.table = this.furniture.create(0,0,'table');
  this.table.x = this.chairLeft.x + this.chairLeft.width;
  this.table.y = this.chairLeft.y;
  this.game.physics.enable(this.table, Phaser.Physics.ARCADE);
  this.table.body.immovable = true;
  this.table.body.height = 10;
  this.table.body.offset.y = this.table.height - this.table.body.height;

  this.chairRight = this.furniture.create(0,0,'chair_right');
  this.chairRight.x = this.table.x + this.table.width;
  this.chairRight.y = this.chairLeft.y;
  this.game.physics.enable(this.chairRight, Phaser.Physics.ARCADE);
  this.chairRight.body.immovable = true;
  this.chairRight.body.height = 10;
  this.chairRight.body.offset.y = this.chairRight.height - this.chairRight.body.height;


  this.shower = this.walls.create(0,0,'shower');
  this.shower.x = this.rightApartmentWall.x - this.shower.width;
  this.shower.y = this.topWall.y - this.shower.height - 64 - VERTICAL_OFFSET;
  this.game.physics.enable(this.shower, Phaser.Physics.ARCADE);
  this.shower.body.immovable = true;
  this.shower.body.height = 10;
  this.shower.body.offset.y = this.shower.height - this.shower.body.height;

  this.sink = this.walls.create(0,0,'sink');
  this.sink.x = this.shower.x - this.sink.width;
  this.sink.y = this.shower.y + this.shower.height - this.sink.height;
  this.game.physics.enable(this.sink, Phaser.Physics.ARCADE);
  this.sink.body.immovable = true;
  this.sink.body.height = 10;
  this.sink.body.offset.y = this.sink.height - this.sink.body.height;

  this.toilet = this.furniture.create(0,0,'toilet');
  this.toilet.x = this.rightApartmentWall.x - this.toilet.width;
  this.toilet.y = this.shower.y + this.shower.height + 8;
  this.game.physics.enable(this.toilet, Phaser.Physics.ARCADE);
  this.toilet.body.immovable = true;
  this.toilet.body.height = 10;
  this.toilet.body.offset.y = this.toilet.height - this.toilet.body.height;

  this.bathroomTopWall = this.walls.create(0,0,'bathroom_top_wall');
  this.bathroomTopWall.x = this.rightApartmentWall.x - this.bathroomTopWall.width;
  this.bathroomTopWall.y = this.shower.y + - this.bathroomTopWall.height - 32;
  this.game.physics.enable(this.bathroomTopWall, Phaser.Physics.ARCADE);
  this.bathroomTopWall.body.immovable = true;

  this.bathroomLeftWall = this.walls.create(0,0,'bathroom_left_wall');
  this.bathroomLeftWall.x = this.bathroomTopWall.x;
  this.bathroomLeftWall.y = this.bathroomTopWall.y + this.bathroomTopWall.height;
  this.game.physics.enable(this.bathroomLeftWall, Phaser.Physics.ARCADE);
  this.bathroomLeftWall.body.immovable = true;

  this.tv = this.furniture.create(0,0,'tv');
  this.tv.x = this.armchair.x + this.armchair.width + 90;
  this.tv.y = this.armchair.y + this.armchair.height - this.tv.height;
  this.game.physics.enable(this.tv, Phaser.Physics.ARCADE);
  this.tv.body.immovable = true;
  this.tv.body.height = 10;
  this.tv.body.offset.y = this.tv.height - this.tv.body.height;

};


BasicGame.BREAK_IN.prototype.shutdown = function () {

  this.furniture.destroy();

  this.game.sound.remove(this.furniture_pickup_sfx);

  BasicGame.Breakout.prototype.shutdown.call(this);

};


BasicGame.BREAK_IN.prototype.constructor = BasicGame.Breakout;
