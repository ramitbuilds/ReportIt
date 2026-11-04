# ReportIt

> *A 2D indie pixel-art game about news cycles, vicious cycles, and the stories we choose to broadcast.*

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
[![Art Style: 16-Bit Pixel Art](https://img.shields.io/badge/Art_Style-16--Bit_Pixel_Art-blueviolet.svg)](#-art--visual-design)
[![WebGL Nearest-Neighbor](https://img.shields.io/badge/Render-WebGL_Pixel_Perfect-success.svg)](https://pixijs.com/)
[![Built with HTML5](https://img.shields.io/badge/Platform-HTML5_Canvas-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

---

## ✦ Overview

**ReportIt** is a satirical, narrative-driven point-and-click game exploring how sensationalism, media amplification, and outrage loops shape human behavior. 

Step into the shoes of a broadcast camera operator: frame moments in the crowd, broadcast them on the retro CRT monitor, and observe how society reacts to the stories you choose to report.

> *"We shape our tools and then our tools shape us."*

---

## ✦ Key Features

- **Retro 2D Pixel-Art World** — Handcrafted 16-bit environments including a dithered day park, nocturnal firefly epilogue, arcade studio home screen, and vintage CRT television prop.
- **Pixel-Perfect Rendering** — Nearest-neighbor texture sampling with WebGL point-filtering for razor-sharp, zero-blur indie visuals.
- **Humanized Characters & Expressive Faces** — Stylized peeps featuring natural skin tones, distinct hairstyles (curls, bangs, fades), team-based outfits (Team White vs Team Black), and 13 animated facial expressions.
- **Sensationalist Broadcast HUD** — Retro viewfinder with pixel reticles, recording indicators, scanline flash, and dynamic breaking news chyrons.
- **60 FPS Fixed-Timestep Loop** — Fluid physics and smooth camera lerp tracking synchronized with `requestAnimationFrame`.
- **Streamlined Ending & Replay** — Direct narrative flow with a dedicated "Thanks for Playing" end screen and instantaneous "Play Again" restart.

---

## ✦ Quick Start

Run the game locally using any lightweight HTTP server:

### With Python
```bash
python -m http.server 8000
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.

### With Node.js
```bash
npx serve .
```

### With VS Code / Cursor
Right-click `index.html` and select **"Open with Live Server"**.

---

## ✦ Controls

| Action | Control |
| :--- | :--- |
| **Aim Viewfinder** | Move Mouse / Trackpad |
| **Capture Photo** | Left Click / Tap |
| **Pause Game** | Click outside the window |
| **Resume Game** | Click anywhere on the screen |

---

## ✦ Tech Stack

- **Rendering:** [PIXI.js](https://pixijs.com/) with point-filtered WebGL & `SCALE_MODES.NEAREST`
- **Typography:** [Google Fonts](https://fonts.google.com/) (`Silkscreen`, `Press Start 2P`)
- **Audio:** [Howler.js](https://howlerjs.com/) (Multi-channel Web Audio playback)
- **Tweening:** [TweenJS](https://createjs.com/tweenjs) (Choreographed easing curves & transitions)
- **Styling:** Modern CSS with crisp-edge canvas rendering and arcade bezel framing

---