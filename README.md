# 📸 Report It

> *A narrative 2D indie pixel-art game exploring how sensationalist media, viral outrage, and selective reporting manufacture racial division—and how empathy can break the cycle.*

[![Genre: Social Good](https://img.shields.io/badge/Theme-Social_Good_%26_Media_Literacy-22c55e.svg)](#-the-motive-social-good--media-literacy)
[![Art Style: 16-Bit Pixel Art](https://img.shields.io/badge/Art_Style-16--Bit_Indie_Pixel_Art-8b5cf6.svg)](#-visual--audio-craft)
[![Render: WebGL Nearest-Neighbor](https://img.shields.io/badge/Render-WebGL_Pixel_Perfect-38bdf8.svg)](https://pixijs.com/)
[![Controls: Point & Click](https://img.shields.io/badge/Controls-Intuitive_Point_%26_Click-f59e0b.svg)](#-controls)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)

---

> ### *"If you're not careful, the media will have you hating the people who are being oppressed, and loving the people who are doing the oppressing."*  
> — **Malcolm X**

---

## ✦ The Motive: Social Good & Media Literacy

In an era driven by algorithmic outrage, viral soundbites, and cultural polarization, **Report It** was created as an interactive thought experiment to teach **social empathy, racial harmony, and critical media awareness**.

Behind every news chyron and social feed is a human choice: **What stories do we choose to amplify?**

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   SELECTIVE     │  ───▶ │     PUBLIC      │  ───▶ │     TRIBAL      │
│   REPORTING     │       │     OUTRAGE     │       │    DIVISION     │
└─────────────────┘       └─────────────────┘       └─────────────────┘
         ▲                                                   │
         └────────────────── VICIOUS CYCLE ──────────────────┘
```

### 1. Rejecting Racial Discrimination & Tribalism
The game humanizes its characters with authentic skin tones, diverse hairstyles, and expressive features. Rather than depicting violence as innate, the narrative demonstrates how **prejudice is manufactured**:
- Peaceful citizens walk together in the same park without fear or hostility.
- When the camera selectively broadcasts anger and labels entire groups, suspicion spreads through the crowd.
- The game illustrates the tragic cost of prejudice—showing players that **division harms everyone**, while mutual understanding is the only path forward.

### 2. Deconstructing the Outrage Economy
Social media and broadcast news often reward cynicism, conflict, and spectacle over peaceful reality:
- Capturing acts of kindness or quiet love produces zero sensationalism.
- Capturing a single misunderstanding, fear, or conflict creates immediate breaking news that dominates public attention.
- Players experience firsthand how **content algorithms shape the human psyche**.

### 3. Fostering Critical Media Consumers
By placing the player behind the viewfinder, **Report It** transforms passive observers into mindful media creators. Players learn to ask:
- *Was this moment representative, or was it cherry-picked?*
- *Who benefits when communities are turned against each other?*
- *How can we champion unity, peace, and social justice instead of fueling outrage?*

---

## ✦ Key Gameplay Features

- **The Park as a Living Ecosystem** — A lush, handcrafted 16-bit park featuring rolling dithered lawns, wildflowers, and wandering citizens.
- **The Broadcast Feedback Loop** — Every photo taken is instantly beamed onto the giant public CRT television. The park's population watches the screen in real-time, modifying their behavior, dress, and attitudes based on what was reported.
- **Beginner-Friendly Onboarding** — Designed so first-time players immediately understand their objective:
  - **Field Reporter's Guide Modal** — Accessible with one click on the home screen (`? HOW TO PLAY`), explaining controls, role, and first assignments.
  - **Target Locked HUD** — Camera viewfinder brackets glow vibrant emerald green with a `● TARGET LOCKED` indicator when framing story-relevant events.
  - **Dynamic Assignment Ticker** — Non-intrusive fallback guidance that gently steers players if they ever feel stuck.
- **Atmospheric Pixel Artistry** — Pure nearest-neighbor rendering with zero blur, authentic 16-bit color palettes, expressive facial animations, and retro scanline visual effects.
- **Streamlined Ending & Replay** — Dedicated post-credits reflection with an instant one-click restart.

---

## ✦ Quick Start

Play locally with zero installation required:

### Option A: Python Built-In Server
```bash
python -m http.server 8000
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.

### Option B: Node.js (npx)
```bash
npx serve .
```

### Option C: VS Code / Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## ✦ Controls

| Action | Control | Description |
| :--- | :--- | :--- |
| **Aim Viewfinder** | Mouse / Trackpad | Move the news camera reticle across the park |
| **Capture & Broadcast** | Left-Click / Tap | Snap a photo to air breaking news on the big screen |
| **How to Play Guide** | Click `? HOW TO PLAY` | View the Field Reporter's Guide on the title screen |
| **Pause** | Click Outside Window | Pauses animation loop |
| **Resume** | Click Screen | Resumes gameplay immediately |

---

## ✦ Technical Highlights

- **Engine:** Point-filtered WebGL with [PIXI.js](https://pixijs.com/) utilizing `SCALE_MODES.NEAREST` for authentic pixel precision.
- **Animation & Physics:** 60 FPS fixed-timestep loop synchronized with `requestAnimationFrame` and choreographed with [TweenJS](https://createjs.com/tweenjs).
- **Audio Engineering:** Multi-track positional sound design powered by [Howler.js](https://howlerjs.com/) (camera snaps, crowd murmurs, broadcast chimes).
- **Cache-Busting Architecture:** Coordinated version query strings on all manifests and scripts ensuring immediate asset loading across modern browsers.
- **Responsive Layout:** Dynamic viewport scaling that adapts cleanly to any desktop or laptop display while preserving crisp 16-bit aspect ratios.

---

<p align="center">
  <b>Report It</b> is dedicated to a more empathetic, united, and thoughtful digital world.
</p>
