Game.addToManifest({
	bg_preload: "sprites/bg_preload.png",
	bg_preload_2: "sprites/bg_preload_2.png",
	preload_play: "sprites/misc/preload_play.json"
}, true);

function Scene_Preloader(){
	
	var self = this;
	Scene.call(self);

	// Background!
	Game.stage.addChild(MakeSprite("bg_preload"));

	// RECURSIVE SCREEN
	var renderTexturePoolIndex = 0;
	var renderTexturePool = [
		new PIXI.RenderTexture(Game.renderer, Game.width, Game.height),
		new PIXI.RenderTexture(Game.renderer, Game.width, Game.height)
	];
	self.stream = new PIXI.Sprite();
	self.stream.x = 722;
	self.stream.y = 359;
	self.stream.scale.x = self.stream.scale.y = 0.29;
	self.stream.anchor.x = self.stream.anchor.y = 0.5;
	self.stream.rotation = 0.087263889;
	Game.stage.addChild(self.stream);

	// Background! #2
	Game.stage.addChild(MakeSprite("bg_preload_2"));

	// Loading Bar
	var bar = MakeMovieClip("preload_play");
	bar.anchor.x = bar.anchor.y = 0.5;
	bar.x = 278;
	bar.y = 250;
	Game.stage.addChild(bar);
	var barEase = 0.9;

	// Loading text
	var text = new PIXI.Text("loading... 0%", {
		font: "16px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
		fill: "#fee761",
		align: "center"
	});
    text.anchor.x = 0.5;
    text.anchor.y = 0.5;
    text.x = bar.x;
    text.y = bar.y;
    Game.stage.addChild(text);
    
    // Playing time text
    var playingTimeText = new PIXI.Text(textStrings["playingTime"], {
    	font: "14px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
    	fill: "#fee761",
    	align: "center"
    });
    playingTimeText.anchor.x = 0.5;
    playingTimeText.anchor.y = 0.5;
    playingTimeText.x = bar.x;
    playingTimeText.y = 338;
    Game.stage.addChild(playingTimeText);
    
    // Warning text with clean column wrapping
    var warningText = new PIXI.Text(textStrings["warning"], {
    	font: "11px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
    	fill: "#8b9bb4",
    	align: "center",
    	wordWrap: true,
    	wordWrapWidth: 410,
    	lineHeight: 18
    });
    warningText.anchor.x = 0.5;
    warningText.anchor.y = 0.5;
    warningText.x = bar.x;
    warningText.y = 415;
    Game.stage.addChild(warningText);
    
    // CURSOR
    var cursor = new Cursor(self);
    Game.stage.addChild(cursor.graphics);

	// Update!
	self.update = function(){

		// RECURSIVE SCREEN
		var renderTexture = renderTexturePool[renderTexturePoolIndex];
	    renderTexture.render(Game.stage);
	    renderTexturePoolIndex = (renderTexturePoolIndex+1)%renderTexturePool.length;
	    self.stream.texture = renderTexture;

	    // THE BUTTON!
	    var scale = bar.scale.x;
	    var gotoScale = (bar.currentFrame==2) ? 1.02 : 1.00;
	    scale = scale*barEase + gotoScale*(1-barEase);
	    bar.scale.x = bar.scale.y = scale;

	    // Ya
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
