/**************
RANDOM CRAP TO MAKE MY LIFE EASIER
***************/

Math.TAU = Math.PI*2;

// ANIMATION CRAP
var BEAT = 1;
var Tween_get = function(target, props){
	props = {} || props;
	props.useTicks = true;
	return Tween.get(target, props);
}
var _s = function(seconds){
	return Math.ceil(Ticker.framerate*seconds); // converts seconds to ticks
};

// IMAGE CRAP
var MakeSprite = function(textureName){
	var tex = PIXI.loader.resources[textureName].texture;
	if(tex && tex.baseTexture){
		tex.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
	}
	return new PIXI.Sprite(tex);
}

// MovieClips!
var MakeMovieClip = function(resourceName){

	// Make it!
	var resources = PIXI.loader.resources;
	var resource = resources[resourceName];	
	var numFrames = Object.keys(resource.data.frames).length;
	var frames = [];
	for(var i=0; i<numFrames; i++){
		var str = "0000" + i; // FOUR leading zeroes
		str = str.substr(str.length-4);
		var tex = PIXI.Texture.fromFrame(resourceName+str);
		if(tex && tex.baseTexture){
			tex.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
		}
		frames.push(tex);
	}
	var mc = new PIXI.extras.MovieClip(frames);

	// Shtuff
	mc.gotoAndStop(0);
	mc.anchor.x = 0.5;
	mc.anchor.y = 1.0;

	// Return
	return mc;

};