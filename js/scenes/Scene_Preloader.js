Game.addToManifest({
	bg_preload: "sprites/bg_preload.png",
	preload_play: "sprites/misc/preload_play.json"
}, true);

function Scene_Preloader(){
	
	var self = this;
	Scene.call(self);

	// Full-screen green park background (no TV)
	Game.stage.addChild(MakeSprite("bg_preload"));

	// Centered Play Button / Loading Bar (Canvas width 960 -> Center 480)
	var bar = MakeMovieClip("preload_play");
	bar.anchor.x = bar.anchor.y = 0.5;
	bar.x = 480;
	bar.y = 238;
	Game.stage.addChild(bar);
	var barEase = 0.9;

	// Loading text
	var text = new PIXI.Text("loading... 0%", {
		font: "15px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
		fill: "#fde047",
		align: "center"
	});
    text.anchor.x = 0.5;
    text.anchor.y = 0.5;
    text.x = bar.x;
    text.y = bar.y;
    Game.stage.addChild(text);
    
    // Playing time text - centered
    var playingTimeText = new PIXI.Text(textStrings["playingTime"], {
    	font: "13px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
    	fill: "#fde047",
    	align: "center"
    });
    playingTimeText.anchor.x = 0.5;
    playingTimeText.anchor.y = 0.5;
    playingTimeText.x = bar.x;
    playingTimeText.y = 328;
    Game.stage.addChild(playingTimeText);
    
    // Warning disclaimer centered both horizontally and vertically inside its box
    var warningText = new PIXI.Text(textStrings["warning"], {
    	font: "11px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
    	fill: "#c6d4c8",
    	align: "center",
    	wordWrap: true,
    	wordWrapWidth: 520,
    	lineHeight: 20
    });
    warningText.anchor.x = 0.5;
    warningText.anchor.y = 0.5;
    warningText.x = bar.x;
    warningText.y = 428;
    Game.stage.addChild(warningText);
    
    // CURSOR
    var cursor = new Cursor(self);
    Game.stage.addChild(cursor.graphics);

	// Update loop
	self.update = function(){
	    var scale = bar.scale.x;
	    var gotoScale = (bar.currentFrame==2) ? 1.02 : 1.00;
	    scale = scale*barEase + gotoScale*(1-barEase);
	    bar.scale.x = bar.scale.y = scale;
	    cursor.update((bar.currentFrame==2));
	};

	Game.loadAssets(function(){

		Game.stage.removeChild(text);
		bar.gotoAndStop(1);
		bar.scale.x = bar.scale.y = 1.1;

		// INTERACTIVITY!
		bar.interactive = true;
		bar.mouseover = function(){
			barEase = 0.5;
			bar.gotoAndStop(2);
		};
		bar.mouseout = function(){
			bar.gotoAndStop(1);
		};
		bar.mousedown = bar.touchend = function(){
			Game.sounds.squeak.play();
			setTimeout(function(){
				Game.sceneManager.gotoScene("Quote");
			},200);
		};

	}, function(ratio){
		var percent = Math.floor(ratio*100);
		text.text = "loading... "+percent+"%";
	}, false);

}
