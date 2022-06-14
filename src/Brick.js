var Brick = function (game, x, y, row, col, sprite, value, sfx) {

	this.row = row;
	this.col = col;
	this.sprite = sprite;
	this.brickColor = sprite.split('_')[1];

	this.score = value;// 7 - 3*Math.floor(row / 2);

	this.sfx = sfx;

	Phaser.Sprite.call(this, game, x, y, sprite);
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	game.add.existing(this);
};


Brick.prototype = Object.create(Phaser.Sprite.prototype);



Brick.prototype.constructor = Brick;



Brick.prototype.update = function () {

};


Brick.prototype.destroy = function () {

	Phaser.Sprite.call(this);

};


Brick.prototype.disable = function () {

	this.body.enable = false;
	this.visible = false;
	// this.alive = false;

};


Brick.prototype.enable = function () {

	this.body.enable = true;
	this.visible = true;
	// this.alive = true;

};
