# ReportIt

> *A game about news cycles, vicious cycles, and the stories we choose to broadcast.*

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
[![WebGL](https://img.shields.io/badge/Render-WebGL-blue.svg)](https://pixijs.com/)
[![Built with HTML5](https://img.shields.io/badge/Platform-HTML5%20Canvas-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

---

## ✦ Overview

**ReportIt** is a satirical, narrative-driven point-and-click game exploring how sensationalism, media amplification, and outrage loops shape human behavior. 

Capture moments in the crowd, broadcast them on the big screen, and observe how society reacts to what you choose to report.

> *"We shape our tools and then our tools shape us."*

---

## ✦ Highlights

- **Minimalist Aesthetic** — Refined monochrome-and-red visual palette with ambient staging, crisp typography, and distraction-free UI.
- **Fluid Animation Engine** — Synchronized fixed-timestep game loop powered by `requestAnimationFrame`, delivering rock-solid 60 FPS across high-refresh displays.
- **Smooth Viewfinder Controls** — Cushioned camera motion with responsive lerp tracking for tactile, effortless photography.
- **Dynamic Feedback Loop** — Procedural crowd behavior that directly reflects the photos you feed to the media stream.

---

## ✦ Quick Start

Run the game locally using any lightweight HTTP server:

### With Python
```bash
python -m http.server 8000
```
Then visit **[http://localhost:8000](http://localhost:8000)**.

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

- **Rendering:** [PIXI.js](https://pixijs.com/) (Hardware-accelerated 2D WebGL)
- **Audio:** [Howler.js](https://howlerjs.com/) (Web Audio API with multi-channel playback)
- **Tweening:** [TweenJS](https://createjs.com/tweenjs) (Parametric easing & state choreography)
- **Staging:** Modern CSS with responsive viewport framing and frosted-glass overlays

---