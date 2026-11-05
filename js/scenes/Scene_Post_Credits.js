Game.addToManifest({
    bg_shade: "sprites/bg_shade.png",
    bg_nighttime: "sounds/bg_nighttime.mp3"
});

/************************************

ACT V - Post-credits epilogue: Peace & Reconciliation

*************************************/

function Scene_Post_Credits(){

	var self = this;
	Scene.call(self);

	////////////
	// SET UP //
	////////////

    // Graphics!
    var g = new PIXI.Container();
    self.graphics = g;
    Game.stage.addChild(g);

	// Set Up Everything
    self.world = new World(self,{
        bg: "bg_dark"
    });
    self.world.layers.bg.addChild(MakeSprite("bg_shade"));

    var transitioning = false;
    self.camera = new Camera(self,{
        noIntro: true,
        streaming: true,
        onTakePhoto: function(){
            if(transitioning) return;
            transitioning = true;
            Tween_get(epilogueUI).to({alpha: 0}, _s(0.3));
            setTimeout(function(){
                if(Game.sounds.bg_nighttime) Game.sounds.bg_nighttime.stop();
                Game.sceneManager.gotoScene("Post_Post_Credits");
            }, 350);
        }
    });
    self.camera.x = Game.width;
    self.camera.y = Game.height;
    if(self.camera.storyBadgeText){
        self.camera.storyBadgeText.text = "● FINAL REPORT: PEACE";
    }

    // Put a SPRITE RIGHT IN THE BG
    self.stream = new PIXI.Sprite();
    self.stream.width = Game.width/8;
    self.stream.height = Game.height/8;
    self.stream.x = Game.width/2 - self.stream.width/2 - 2; // hack
    self.stream.y = Game.height/2 - self.stream.height/2 + 2; // hack
    self.world.layers.bg.addChild(self.stream);

    //////////////////////
    // EVEN MORE SET UP //
    //////////////////////

    // Candlelights
    var candlePositions =[
        [468.6,276.6],
        [535.7,281.6],
        [679.7,279.1],
        [612,281.6],
        [490.1,314.1],
        [421.8,309],
        [363.1,301.1],
        [786.9,304.4],
        [726.1,310.5],
        [656.9,309.5],
        [869.8,350.3],
        [820,373.5],
        [768.2,382.8],
        [698.4,389],
        [464.6,386.1],
        [396.3,382.3],
        [339.6,370.1],
        [294.3,350.3]
    ];
    for(var i=0;i<candlePositions.length;i++){
        var pos = candlePositions[i];
        var candle = new Candlelight(pos);
        self.world.addBG(candle);
    }

    // The lovers
    var loverCircle = new LoversWatching("circle");
    var loverSquare = new LoversWatching("square");
    self.world.addProp(loverCircle);
    self.world.addProp(loverSquare);

    // The 3 crickets
    var cricketPositions = [
        [400, 353],
        [420, 370],
        [450, 380]
    ];
    for(var i=0;i<cricketPositions.length;i++){
        var pos = cricketPositions[i];
        var cricket = new Cricket(self);
        cricket.x = pos[0];
        cricket.y = pos[1];
        cricket.mc.gotoAndStop(1);
        self.world.addProp(cricket);
    }

    //////////////////////////////////////////
    // EPILOGUE STORY HUD & CLEAR PROMPT   //
    //////////////////////////////////////////

    var epilogueUI = new PIXI.Container();
    Game.stage.addChild(epilogueUI);
    epilogueUI.alpha = 0;

    var cardW = 780;
    var cardH = 96;
    var cardX = (Game.width - cardW) / 2;
    var cardY = 22;

    var cardBg = new PIXI.Graphics();
    cardBg.beginFill(0x060c18, 0.88);
    cardBg.lineStyle(2, 0xfee761, 0.9);
    cardBg.drawRoundedRect(cardX, cardY, cardW, cardH, 8);
    cardBg.endFill();
    epilogueUI.addChild(cardBg);

    var epilogueTitle = new PIXI.Text("EPILOGUE: IN THE SILENCE AFTER THE STORM", {
        font: "bold 15px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
        fill: "#fee761",
        align: "center"
    });
    epilogueTitle.anchor.x = 0.5;
    epilogueTitle.anchor.y = 0.5;
    epilogueTitle.x = Game.width / 2;
    epilogueTitle.y = cardY + 22;
    epilogueUI.addChild(epilogueTitle);

    var epilogueDesc = new PIXI.Text("Senseless division tore the city apart, but two survivors sit together in peace.", {
        font: "12px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
        fill: "#e2e8f0",
        align: "center"
    });
    epilogueDesc.anchor.x = 0.5;
    epilogueDesc.anchor.y = 0.5;
    epilogueDesc.x = Game.width / 2;
    epilogueDesc.y = cardY + 48;
    epilogueUI.addChild(epilogueDesc);

    var epiloguePrompt = new PIXI.Text("▶ CLICK / TAP ANYWHERE TO SNAP THE FINAL REPORT & CONCLUDE ◀", {
        font: "bold 12px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
        fill: "#4ade80",
        align: "center"
    });
    epiloguePrompt.anchor.x = 0.5;
    epiloguePrompt.anchor.y = 0.5;
    epiloguePrompt.x = Game.width / 2;
    epiloguePrompt.y = cardY + 74;
    epilogueUI.addChild(epiloguePrompt);

    var loveTag = new PIXI.Text("♥ LOVE & PEACE ENDURE ♥", {
        font: "bold 12px 'Silkscreen', 'Press Start 2P', monospace, sans-serif",
        fill: "#f43f5e",
        align: "center"
    });
    loveTag.anchor.x = 0.5;
    loveTag.anchor.y = 0.5;
    loveTag.x = 535;
    loveTag.y = 312;
    epilogueUI.addChild(loveTag);

    Tween_get(epilogueUI).wait(_s(BEAT * 0.4)).to({alpha: 1}, _s(BEAT));

    // UPDATE
    var pulse = 0;
    self.update = function(){
        self.world.update();
        self.camera.update();

        // THE STREAM
        self.stream.texture = self.camera.getTexture();

        // Pulsing HUD effects
        pulse += 0.06;
        epiloguePrompt.alpha = 0.65 + Math.sin(pulse * 3) * 0.35;
        loveTag.y = 312 + Math.sin(pulse * 2) * 3;
    };

    /////////////
    // FADE IN //
    /////////////

    var blackout = MakeSprite("blackout");
    Game.stage.addChild(blackout);
    Tween_get(blackout).to({alpha:0}, _s(BEAT), Ease.quadInOut).call(function(){
        Game.stage.removeChild(blackout);
    });

}
