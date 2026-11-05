/**************************************

CAMERA:
The graphics & controls for this sucka

**************************************/

Game.addToManifest({

	cam_frame: "sprites/cam/cam.png",
	cam_flash: "sprites/cam/cam-flash.png",
	cam_instructions: "sprites/cam/cam-instructions.png",

	cam_snap: "sounds/cam_snap.mp3"

});

Camera.WIDTH = Game.width/4;
Camera.HEIGHT = Game.height/4;

function Camera(scene, options){

	var self = this;
	options = options || {};

	// Properties
	self.scene = scene;
    self.x = Game.width/2;
    self.y = Game.height/2;
	self.width = Camera.WIDTH;
	self.height = Camera.HEIGHT;



	////////////////////////////////
	///// GRAPHICS /////////////////
	////////////////////////////////

	// MAIN CONTAINER
	self.graphics = new PIXI.Container();
	scene.graphics.addChild(self.graphics);

	// PHOTO
	self.photo = new PIXI.Container();
	self.graphics.addChild(self.photo);
	self.photoTexture = null;

	// FLASH, FRAME, INSTRUCTIONS
	var resources = PIXI.loader.resources;
	
	self.flash = new PIXI.Sprite(resources.cam_flash.texture);
	self.flash.scale.x = self.flash.scale.y = 0.5;
    self.flash.anchor.x = self.flash.anchor.y = 0.5;
    self.flash.alpha = 0;
    self.graphics.addChild(self.flash);
	
	self.frame = new PIXI.Sprite(resources.cam_frame.texture);
	self.frame.scale.x = self.frame.scale.y = 0.5;
    self.frame.anchor.x = self.frame.anchor.y = 0.5;
    self.graphics.addChild(self.frame);

	// STORY TARGET LOCK BADGE
	self.storyBadge = new PIXI.Container();
	var sbBg = new PIXI.Graphics();
	sbBg.beginFill(0x0a160d, 0.9);
	sbBg.lineStyle(1.5, 0x22c55e, 1);
	sbBg.drawRect(-65, -10, 130, 20);
	sbBg.endFill();
	self.storyBadge.addChild(sbBg);
	
	var sbText = new PIXI.Text("● TARGET LOCKED", {
		font: "10px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
		fill: "#4ade80",
		align: "center"
	});
	sbText.anchor.x = 0.5;
	sbText.anchor.y = 0.5;
	self.storyBadge.addChild(sbText);
	self.storyBadge.x = 0;
	self.storyBadge.y = -self.height/2 + 16;
	self.storyBadge.visible = false;
	self.graphics.addChild(self.storyBadge);

	// Check if camera frames an interesting story subject
	self.checkStoryTarget = function(){
		if(self.frozen || !scene.world || !scene.world.props){
			self.storyBadge.visible = false;
			self.frame.tint = 0xffffff;
			return;
		}
		var cl = self.x - self.width * 0.48;
		var cr = self.x + self.width * 0.48;
		var ct = self.y - self.height * 0.48;
		var cb = self.y + self.height * 0.48;
		
		var found = false;
		var props = scene.world.props;
		for(var i=0; i<props.length; i++){
			var p = props[i];
			if(!p || p.killed) continue;
			if(p.x >= cl && p.x <= cr && p.y >= ct && p.y <= cb){
				if(p.wearingHat || p._CLASS_=="HatPeep" || p._CLASS_=="LoverPeep" || 
				   p._CLASS_=="CrazyPeep" || p._CLASS_=="HappyWeirdoPeep" || p._CLASS_=="HelpingAnim" || 
				   p._CLASS_=="ProtestAnim" || p._CLASS_=="NervousPeep" || p._CLASS_=="SnobbyPeep" || 
				   p._CLASS_=="AngryPeep" || p._CLASS_=="PanicPeep" || p._CLASS_=="MurderPeep" || 
				   p._CLASS_=="DeadBody" || p._CLASS_=="EvilHatPeep" || p._CLASS_=="Cricket" || p._CLASS_=="LoversWatching" ||
				   p.isAngry || p.shocked){
					found = true;
					break;
				}
			}
		}
		if(found){
			self.storyBadge.visible = true;
			self.frame.tint = 0x86efac; // soft glowing emerald brackets
		}else{
			self.storyBadge.visible = false;
			self.frame.tint = 0xffffff;
		}
	};

	if(!options.noIntro){
	    self.instructions = new PIXI.Sprite(resources.cam_instructions.texture);
		self.instructions.scale.x = self.instructions.scale.y = 0.5;
	    self.instructions.anchor.x = 0.5;
	    self.instructions.anchor.y = 0;
	    self.instructions.y = 67.5;
	    self.graphics.addChild(self.instructions);
	    self.instructions.alpha = 0;
	    Tween_get(self.instructions)
	    	.wait(_s(BEAT))
	    	.to({alpha:1}, _s(BEAT*0.5));
	}


	////////////////////////////////
	///// CONTROLS /////////////////
	////////////////////////////////

    // Controls!
    self.frozen = false;
    self.targetX = self.x;
    self.targetY = self.y;
    Game.stage.mousemove = Game.stage.touchmove = function(mouseData){
	    var pos = mouseData.data.global;
	    self.targetX = pos.x;
	    self.targetY = pos.y;
	};
	Game.stage.touchstart = function(mouseData){
	    var pos = mouseData.data.global;
	    self.targetX = pos.x;
	    self.targetY = pos.y;
	    self.x = pos.x;
	    self.y = pos.y;
	};
	Game.stage.mousedown = Game.stage.touchend = function(mouseData){

		// ONLY ONCE. FREEZE.
		if(self.frozen) return;
		if(!options.streaming){
			self.frozen = true;
		}

		// Take Texture
		self.takePhoto();

		// Tell the director
		if(!options.streaming){
			scene.director.takePhoto(self);
		}

		// SOUND!
		if(self.noSounds) return;
		Game.sounds.cam_snap.play();

	};
	Game.stage.mouseup = function(mouseData){}; // nothing at all



	/////////////////////////////////////
	///// PHOTO - TAKE, HIDE, RESET /////
	/////////////////////////////////////

	// Take Photo!
	self.takePhoto = function(){

		if(!options.streaming){

			// Just update that...
			self.updatePosition(true);

		    // Save the texture
		    self.photoTexture = self.getTexture();

		    // Make it part of my graphics
		    var photo = new PIXI.Sprite(self.photoTexture);
		    photo.anchor.x = photo.anchor.y = 0.5;
		    self.photo.removeChildren();
		    self.photo.addChild(photo);

		}

	    // Flash!
		self.flash.alpha = 1;
		Tween_get(self.flash).to({alpha:0}, _s(0.25));

		// Fade out instructions...
		if(!options.noIntro){
			var instr = self.instructions;
			if(instr.alpha>0){
				Tween_get(instr).to({alpha:0}, _s(BEAT*0.25));
	    	}
	    }

	    // Callback?
	    if(options.onTakePhoto){
	    	options.onTakePhoto();
	    }

	};

	// Get texture!
	var renderTexturePoolIndex = 0;
	var renderTexturePool = [
		new PIXI.RenderTexture(Game.renderer, self.width, self.height),
		new PIXI.RenderTexture(Game.renderer, self.width, self.height)
	];
	self.getTexture = function(){

		// TAKE THE TEXTURE!
	    var sw = self.width;
	    var sh = self.height;
	    var sx = self.x-sw/2;
	    var sy = self.y-sh/2;

	    var matrix = new PIXI.Matrix();
	    matrix.translate(-scene.graphics.x, -scene.graphics.y);
	    matrix.scale(1/scene.graphics.scale.x, 1/scene.graphics.scale.y);
	    matrix.translate(-sx,-sy);

	    var renderTexture = renderTexturePool[renderTexturePoolIndex];
	    renderTexture.render(scene.world.graphics, matrix); // TO DO: higher rez
	    renderTexturePoolIndex = (renderTexturePoolIndex+1)%renderTexturePool.length;

	    // Return texture!
	    return renderTexture;

	};

	// Hide Camera
	self.hide = function(){
		self.graphics.visible = false;
		self.photo.removeChildren();
	};

	// Reset Camera
	self.reset = function(){
		var g = self.graphics;
		g.scale.x = g.scale.y = 1;
		g.visible = true;
		self.frozen = false;
		self.updatePosition(true);
	};




	//////////////////////////
	///// UPDATE /////////////
	//////////////////////////

	// Update with smooth lerp
	self.updatePosition = function(snap){
		
		if(snap){
			self.x = self.targetX;
			self.y = self.targetY;
		}else{
			// Buttery-smooth lerp interpolation
			self.x += (self.targetX - self.x) * 0.45;
			self.y += (self.targetY - self.y) * 0.45;
		}

		// Constraints
	    if(self.x<self.width/2) self.x=self.width/2;
	    if(self.x>Game.width-self.width/2) self.x=Game.width-self.width/2;
	    if(self.y<self.height/2) self.y=self.height/2;
	    if(self.y>Game.height-self.height/2) self.y=Game.height-self.height/2;

	    // Container moves!
		self.graphics.x = self.x;
		self.graphics.y = self.y;

	};
	self.update = function(){
		if(!self.frozen){
			self.updatePosition(false);
			self.checkStoryTarget();
		}
	};

	// And that's all she wrote.
	self.updatePosition(true);




	//////////////////////////
	///// MISC CRAP //////////
	//////////////////////////

	self.isOverTV = function(smaller){
		var x = self.x;
		var y = self.y;
		var cx = Game.width/2;
		var cy = Game.height/2;
		var w = smaller ? 140 : self.width;
		var h = smaller ? 90 : self.height;
		var l = cx - w/2;
		var r = cx + w/2;
		var t = cy - h/2;
		var b = cy + h/2;
		return (l<x && x<r && t<y && y<b);
	};



};
