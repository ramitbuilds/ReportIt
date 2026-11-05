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
	bar.y = 230;
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
    
    // HOW TO PLAY BUTTON
    var guideBtn = new PIXI.Container();
    guideBtn.x = 480;
    guideBtn.y = 295;
    
    var gBtnBg = new PIXI.Graphics();
    gBtnBg.beginFill(0x102216, 0.9);
    gBtnBg.lineStyle(2, 0xfacc15, 1);
    gBtnBg.drawRect(-95, -16, 190, 32);
    gBtnBg.endFill();
    guideBtn.addChild(gBtnBg);
    
    var gBtnText = new PIXI.Text("?  HOW TO PLAY", {
    	font: "11px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
    	fill: "#fef08a",
    	align: "center"
    });
    gBtnText.anchor.x = 0.5;
    gBtnText.anchor.y = 0.5;
    guideBtn.addChild(gBtnText);
    Game.stage.addChild(guideBtn);
    
    // Playing time text - centered
    var playingTimeText = new PIXI.Text(textStrings["playingTime"], {
    	font: "12px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
    	fill: "#fde047",
    	align: "center"
    });
    playingTimeText.anchor.x = 0.5;
    playingTimeText.anchor.y = 0.5;
    playingTimeText.x = 480;
    playingTimeText.y = 345;
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
    warningText.x = 480;
    warningText.y = 428;
    Game.stage.addChild(warningText);

	// HOW TO PLAY MODAL GUIDE
	var modalContainer = new PIXI.Container();
	modalContainer.visible = false;
	Game.stage.addChild(modalContainer);

	// Dim overlay
	var overlay = new PIXI.Graphics();
	overlay.beginFill(0x000000, 0.82);
	overlay.drawRect(0, 0, Game.width, Game.height);
	overlay.endFill();
	overlay.interactive = true;
	modalContainer.addChild(overlay);

	// Card Container
	var card = new PIXI.Container();
	card.x = Game.width / 2;
	card.y = Game.height / 2;
	modalContainer.addChild(card);

	var cardBg = new PIXI.Graphics();
	cardBg.beginFill(0x0e1c12, 0.98);
	cardBg.lineStyle(3, 0xfacc15, 1);
	cardBg.drawRect(-300, -180, 600, 360);
	cardBg.endFill();
	card.addChild(cardBg);

	// Modal Header
	var mTitle = new PIXI.Text("★ FIELD REPORTER'S GUIDE ★", {
		font: "bold 16px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
		fill: "#fef08a",
		align: "center"
	});
	mTitle.anchor.x = 0.5;
	mTitle.anchor.y = 0.5;
	mTitle.y = -140;
	card.addChild(mTitle);

	// Guide Items
	var guideItems = [
		{ title: "YOUR ROLE", desc: "You are a live TV camera operator in the park.", col: "#ffffff" },
		{ title: "CONTROLS", desc: "Move mouse to aim viewfinder. Left-click to snap & broadcast.", col: "#cbd5e1" },
		{ title: "THE IMPACT", desc: "What you broadcast on TV shapes how the crowd thinks & acts!", col: "#93c5fd" },
		{ title: "FIRST LEAD", desc: "Look for someone wearing an unusual golden hat!", col: "#fde047" }
	];

	for(var gi=0; gi<guideItems.length; gi++){
		var item = guideItems[gi];
		var itemY = -90 + gi * 50;

		var tObj = new PIXI.Text("• " + item.title + ":", {
			font: "bold 11px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
			fill: item.col,
			align: "left"
		});
		tObj.x = -265;
		tObj.y = itemY;
		card.addChild(tObj);

		var dObj = new PIXI.Text(item.desc, {
			font: "11px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
			fill: "#e2e8f0",
			align: "left"
		});
		dObj.x = -265;
		dObj.y = itemY + 18;
		card.addChild(dObj);
	}

	// Close Button [ GOT IT! ]
	var closeBtn = new PIXI.Container();
	closeBtn.y = 135;
	card.addChild(closeBtn);

	var cbBg = new PIXI.Graphics();
	cbBg.beginFill(0x22c55e, 1);
	cbBg.lineStyle(2, 0xffffff, 1);
	cbBg.drawRect(-80, -18, 160, 36);
	cbBg.endFill();
	closeBtn.addChild(cbBg);

	var cbText = new PIXI.Text("▶  GOT IT!", {
		font: "bold 12px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
		fill: "#ffffff",
		align: "center"
	});
	cbText.anchor.x = 0.5;
	cbText.anchor.y = 0.5;
	closeBtn.addChild(cbText);

	closeBtn.interactive = true;
	closeBtn.mouseover = function(){
		closeBtn.scale.x = closeBtn.scale.y = 1.05;
	};
	closeBtn.mouseout = function(){
		closeBtn.scale.x = closeBtn.scale.y = 1.0;
	};
	closeBtn.mousedown = closeBtn.touchend = function(){
		Game.sounds.squeak.play();
		modalContainer.visible = false;
	};

	guideBtn.interactive = true;
	guideBtn.mouseover = function(){
		guideBtn.scale.x = guideBtn.scale.y = 1.05;
	};
	guideBtn.mouseout = function(){
		guideBtn.scale.x = guideBtn.scale.y = 1.0;
	};
	guideBtn.mousedown = guideBtn.touchend = function(){
		Game.sounds.squeak.play();
		modalContainer.visible = true;
	};

    // CURSOR
    var cursor = new Cursor(self);
    Game.stage.addChild(cursor.graphics);

	// Update loop
	self.update = function(){
	    var scale = bar.scale.x;
	    var gotoScale = (bar.currentFrame==2) ? 1.02 : 1.00;
	    scale = scale*barEase + gotoScale*(1-barEase);
	    bar.scale.x = bar.scale.y = scale;
	    cursor.update((bar.currentFrame==2 || guideBtn.scale.x > 1.01 || closeBtn.scale.x > 1.01));
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
