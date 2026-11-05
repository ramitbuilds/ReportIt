Game.addToManifest({
	
	logo: "sprites/postcredits/logo.png",
	end_button: "sprites/postcredits/end_button.json"

});

function Scene_Post_Post_Credits(){
	
	var self = this;
	Scene.call(self);

	self.UNPAUSEABLE = true; // HACK.

	// Layers, yo.
	Game.stage.addChild(MakeSprite("blackout"));
	var cont = new PIXI.Container();
	Game.stage.addChild(cont);
	cont.visible = false;

	// THANKS FOR PLAYING Text
	var thanksText = new PIXI.Text("THANKS FOR PLAYING!", {
		font: "bold 32px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
		fill: "#fee761",
		align: "center"
	});
	thanksText.anchor.x = 0.5;
	thanksText.anchor.y = 0.5;
	thanksText.x = Game.width / 2;
	thanksText.y = 180;
	cont.addChild(thanksText);

	var subtitleText = new PIXI.Text("REPORT IT", {
		font: "14px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
		fill: "#8b9bb4",
		align: "center"
	});
	subtitleText.anchor.x = 0.5;
	subtitleText.anchor.y = 0.5;
	subtitleText.x = Game.width / 2;
	subtitleText.y = 235;
	cont.addChild(subtitleText);

	// PLAY AGAIN Button
	var isHovering = false;
	var button = new PIXI.Container();
	button.x = Game.width / 2;
	button.y = 345;
	cont.addChild(button);

	var bg = MakeMovieClip("end_button");
	bg.anchor.x = bg.anchor.y = 0.5;
	button.addChild(bg);

	var label = MakeMovieClip("end_button");
	label.anchor.x = label.anchor.y = 0.5;
	label.gotoAndStop(4); // "PLAY AGAIN"
	button.addChild(label);

	// INTERACTIVITY!
	button.interactive = true;
	button.mouseover = button.touchstart = function(){
		isHovering = true;
		bg.gotoAndStop(1);
		Tween_get(button.scale).to({x:1.05, y:1.05}, _s(0.2));
	};
	button.mouseout = function(){
		isHovering = false;
		bg.gotoAndStop(0);
		Tween_get(button.scale).to({x:1, y:1}, _s(0.2));
	};
	button.mousedown = button.touchend = function(){
		isHovering = false;
		Game.sounds.squeak.play();
		Game.sceneManager.gotoScene("Quote");
	};

	// CURSOR
    var cursor = new Cursor(self);
    var g = cursor.graphics;
    cont.addChild(g);
    g.scale.x = g.scale.y = 0.5;
    g.x = Game.width/2;
    g.y = Game.height/2;

	// TWEEN ANIM
	Tween_get(cont)
	.wait(_s(BEAT*2))
	.call(function(){
		cont.visible = true;
	});

	// Update!
	self.update = function(){
		cursor.update(isHovering);
	};

}
