
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		// this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');
		this.preloadBar.y = this.game.canvas.width/2 - this.preloadBar.height/2;

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);


		// FONTS

		this.load.bitmapFont('atari', 'assets/fonts/atari.png', 'assets/fonts/atari.xml');
		this.load.bitmapFont('cyrillic8bit', 'assets/fonts/cyrillic8bit.png', 'assets/fonts/cyrillic8bit.xml');


		// SPRITES/IMAGES

		this.load.image('paddle','assets/images/paddle.png');
		this.load.image('paddle2','assets/images/paddle2.png');
		this.load.image('ball','assets/images/ball.png');
		this.load.image('left_wall','assets/images/left_wall.png');
		this.load.image('right_wall','assets/images/right_wall.png');
		this.load.image('top_wall','assets/images/top_wall.png');

		this.load.image('brick_blue','assets/images/brick_blue.png');
		this.load.image('brick_green','assets/images/brick_green.png');
		this.load.image('brick_yellow','assets/images/brick_yellow.png');
		this.load.image('brick_orange','assets/images/brick_orange.png');
		this.load.image('brick_oranger','assets/images/brick_oranger.png');
		this.load.image('brick_red','assets/images/brick_red.png');
		this.load.image('brick_black','assets/images/brick_black.png');
		this.load.image('brick_white','assets/images/brick_white.png');

		this.load.image('particle_blue','assets/images/particle_blue.png');
		this.load.image('particle_green','assets/images/particle_green.png');
		this.load.image('particle_yellow','assets/images/particle_yellow.png');
		this.load.image('particle_orange','assets/images/particle_orange.png');
		this.load.image('particle_oranger','assets/images/particle_oranger.png');
		this.load.image('particle_red','assets/images/particle_red.png');

		this.load.image('shit','assets/images/shit.png');
		this.load.image('oculus_frame','assets/images/oculus_frame.png');
		this.load.image('breakart_bg','assets/images/breakart_bg.png');
		this.load.image('breakart_fg','assets/images/breakart_fg.png');
		this.load.spritesheet('breakart_person', 'assets/images/breakart_person.png', 56, 140);
		this.load.image('star_big','assets/images/star_big.png');
		this.load.image('star_small','assets/images/star_small.png');
		this.load.image('recursive_breakout_blue','assets/images/recursive_breakout_blue.png');
		this.load.image('recursive_breakout_yellow','assets/images/recursive_breakout_yellow.png');
		this.load.image('tombstone','assets/images/tombstone.png');

		this.load.image('armchair','assets/images/apartment/armchair.png');
		this.load.image('bed','assets/images/apartment/bed.png');
		this.load.image('dresser','assets/images/apartment/dresser.png');
		this.load.image('fridge','assets/images/apartment/fridge.png');
		this.load.image('shower','assets/images/apartment/shower.png');
		this.load.image('sink','assets/images/apartment/sink.png');
		this.load.image('stove','assets/images/apartment/stove.png');
		this.load.image('toilet','assets/images/apartment/toilet.png');
		this.load.image('tv','assets/images/apartment/tv.png');
		this.load.image('chair_left','assets/images/apartment/chair_left.png');
		this.load.image('table','assets/images/apartment/table.png');
		this.load.image('chair_right','assets/images/apartment/chair_right.png');
		this.load.image('kitchen_bench_left','assets/images/apartment/kitchen_bench_left.png');
		this.load.image('kitchen_bench_right','assets/images/apartment/kitchen_bench_right.png');
		this.load.image('bathroom_left_wall','assets/images/apartment/bathroom_left_wall.png');
		this.load.image('bathroom_top_wall','assets/images/apartment/bathroom_top_wall.png');


		// AUDIO

		this.load.audio('launch_wall_sfx',['assets/sounds/launch_wall.mp3','assets/sounds/launch_wall.ogg']);
		this.load.audio('paddle_sfx',['assets/sounds/paddle.mp3','assets/sounds/paddle.ogg']);
		this.load.audio('paddle_wall_sfx',['assets/sounds/paddle_wall.mp3','assets/sounds/paddle_wall.ogg']);
		this.load.audio('brick_explosion_sfx',['assets/sounds/brick_explosion.mp3','assets/sounds/brick_explosion.ogg']);
		this.load.audio('brick_pickup_sfx',['assets/sounds/brick_pickup.mp3','assets/sounds/brick_pickup.ogg']);
		this.load.audio('ball_out_sfx',['assets/sounds/ball_out.mp3','assets/sounds/ball_out.ogg']);

		this.load.audio('brick_blue_sfx',['assets/sounds/0.mp3','assets/sounds/0.ogg']);
		this.load.audio('brick_green_sfx',['assets/sounds/1.mp3','assets/sounds/1.ogg']);
		this.load.audio('brick_yellow_sfx',['assets/sounds/2.mp3','assets/sounds/2.ogg']);
		this.load.audio('brick_orange_sfx',['assets/sounds/3.mp3','assets/sounds/3.ogg']);
		this.load.audio('brick_oranger_sfx',['assets/sounds/4.mp3','assets/sounds/4.ogg']);
		this.load.audio('brick_red_sfx',['assets/sounds/5.mp3','assets/sounds/5.ogg']);

		this.load.audio('invader_0',['assets/sounds/invader_0.mp3','assets/sounds/invader_0.ogg']);
		this.load.audio('invader_1',['assets/sounds/invader_1.mp3','assets/sounds/invader_1.ogg']);
		this.load.audio('invader_2',['assets/sounds/invader_2.mp3','assets/sounds/invader_2.ogg']);
		this.load.audio('invader_3',['assets/sounds/invader_3.mp3','assets/sounds/invader_3.ogg']);


		this.load.audio('unchained_melody',['assets/music/unchained_melody.mp3','assets/music/unchained_melody.ogg']);
		this.load.audio('funeral_march',['assets/music/funeral_march.mp3','assets/music/funeral_march.ogg']);

	},


	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},


	update: function () {

		if (this.cache.isSoundDecoded('unchained_melody') && this.ready == false)
		{
			this.ready = true;
			this.state.start('Instructions');
		}

	}

};
