<div align="center">

<a href="https://nibextension.vercel.app">
  <img src="icons/icon.svg" alt="Nib" height="64">
</a>

<h1>Nib</h1>

### Turn every graded set into fresh practice.

Nib is a browser extension for AP Classroom. It hides the correct and incorrect markers so you can retry finished assignments and test yourself honestly.

[**Website**](https://nibextension.vercel.app) · [Download ZIP](https://github.com/aarav-puri/nib/archive/refs/heads/main.zip) · [How it works](#how-it-works) · [Install](#install) · [Report an issue](https://github.com/aarav-puri/nib/issues)

![Manifest V3](https://img.shields.io/badge/Chrome-Manifest%20V3-0b1426?logo=googlechrome&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/JavaScript-no%20build%20step-3d6fd8?logo=javascript&logoColor=white)
![Private](https://img.shields.io/badge/data-stays%20in%20your%20browser-3d6fd8)

</div>

---

## Features

- **Hide the markers**: covers the green and red correctness highlights and the answer explanations, so a completed assignment reads like a fresh one.
- **One switch**: turn hiding on or off from the popup or the small floating panel on the page.
- **Nothing leaves your browser**: no account, no API key and no network requests. Nib only runs on AP Classroom and only changes how the page looks.

## How it works

1. **Open a graded assignment** on `apclassroom.collegeboard.org`. The popup stays inactive on every other site.
2. **Turn on Answer Hider** from the Nib popup or the on-page panel.
3. **Work through the set again** with the markers covered, then switch hiding off to check yourself.

> Nib is an independent open-source project and is not affiliated with, endorsed by, or connected to the College Board. Use it in line with your school's academic integrity policy.

## Install

Nib is not on the Chrome Web Store yet, so it is loaded unpacked. It works in Chrome, Edge and Brave.

```bash
git clone https://github.com/aarav-puri/nib
```

Or click **Code**, then **Download ZIP**, and unzip it somewhere it will not move (an unpacked extension stops working if its folder moves).

1. Open `chrome://extensions` (or `edge://extensions`, `brave://extensions`).
2. Turn on **Developer mode** in the top right.
3. Click **Load unpacked** and choose the folder that contains `manifest.json`.
4. Pin Nib from the puzzle piece icon in the toolbar.

## Built with

| Part | Technology |
| --- | --- |
| Extension | Chrome Manifest V3, plain HTML, CSS and JavaScript, no build step |
| Answer Hider | Content script on AP Classroom and its Learnosity question frames |
| Permissions | `activeTab` and `scripting` only |

## Repository layout

```
manifest.json    Extension manifest: permissions, popup, content script
popup.html/js    The popup with the Answer Hider toggle
hider.js         Hides the markers and draws the floating on-page panel
nib.html         Landing page
setup.html       Step-by-step setup guide
icons/           Extension icons (SVG source and PNG sizes)
```

## Known limits

- It hides markers on multiple-choice questions. Other question layouts may still show feedback.
- If College Board changes the page, some markers may show until Nib is updated.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| The toggle is greyed out | You are not on AP Classroom, or the page loaded before the extension. Refresh and reopen the popup. |
| Some markers still show | Questions inside frames can load after Nib. Refresh the page and turn Answer Hider on again. |
| "Manifest is missing" on Load unpacked | You picked the outer folder from the ZIP. Select the inner folder that holds `manifest.json`. |
| The extension vanished after a restart | Its folder was moved, renamed or deleted. Put it back and reload it from the extensions page. |
