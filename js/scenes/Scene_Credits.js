function Scene_Credits(){
	
	var self = this;
	Scene.call(self);

	// Bypass credits directly to post-credits
	var ambience = Game.sounds.bg_nighttime;
	if(ambience){
		ambience.loop(true);
		ambience.volume(0);
		ambience.play();
		ambience.fade(0, 1, 2000);
	}
	Game.sceneManager.gotoScene("Post_Credits");

}
