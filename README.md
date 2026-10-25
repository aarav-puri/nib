<div align="center">

<a href="https://nibextension.vercel.app">
  <img src="icons/icon.svg" alt="Nib" height="64">
</a>

<h1>Nib</h1>

### Take your AP Classroom practice offline.

Nib is a browser extension for AP Classroom. Export a question set to a text file, hide the right-or-wrong markers so you can actually think, and turn a unit into flashcards.

[**Website**](https://nibextension.vercel.app) · [Download ZIP](https://github.com/aarav-puri/nib/archive/refs/heads/main.zip) · [How it works](#how-it-works) · [Install](#install) · [Report an issue](https://github.com/aarav-puri/nib/issues)

![Manifest V3](https://img.shields.io/badge/Chrome-Manifest%20V3-0b1426?logo=googlechrome&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/JavaScript-no%20build%20step-3d6fd8?logo=javascript&logoColor=white)
![Claude](https://img.shields.io/badge/AI-Claude-3d6fd8?logo=anthropic&logoColor=white)
![Status](https://img.shields.io/badge/status-beta-0b1426)

</div>

---

## Features

- **Export to text (beta)**: pick your course, hit extract, and download the MCQ and FRQ set as a `.txt` you can study anywhere. Works across all AP courses. Image-based answer choices are flagged instead of dropped silently.
- **Answer Hider**: covers the correct and incorrect markers so a graded review page works as fresh practice. Toggle it from the popup or the floating panel on the page.
- **AI study tools**: generate similar questions, flashcards or a concept summary from what you extracted, with your own Claude API key.

## How it works

1. **Open a question page** on `apclassroom.collegeboard.org`. The popup stays inactive on every other site.
2. **Pick your course** in the popup. It tells Nib how to label the export.
3. **Turn on Answer Hider** if you want to practice on a review page.
4. **Extract and download.** Nib shows what it found, including any questions with image choices, then saves a `.txt`.
5. **Generate study material** (optional). Choose similar questions, flashcards or a concept summary.

Extraction and Answer Hider need no account and no key. Your Claude key is saved in your browser's local storage and is only ever sent to Anthropic when you generate something. Nothing syncs.

> Nib is an independent open-source project and is not affiliated with, endorsed by, or connected to the College Board. Exported questions are College Board material, so keep them to yourself and use Nib in line with your school's academic integrity policy.

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

**For the AI study tools:** create a key at [console.anthropic.com](https://console.anthropic.com), then open the popup, click the gear icon and paste it in. API usage is billed per use, separately from a Claude subscription, so set a spending limit in the console.

## Built with

| Part | Technology |
| --- | --- |
| Extension | Chrome Manifest V3, plain HTML, CSS and JavaScript, no build step |
| Question extraction | Content script on AP Classroom and its Learnosity question frames |
| AI | Anthropic Messages API called directly from the popup with the user's key |
| Storage | `chrome.storage`, local to one browser profile |

## Repository layout

```
manifest.json    Extension manifest: permissions, popup, content scripts
popup.html/js    The popup: course picker, extraction, download, AI study tools, settings
content.js       Reads MCQ and FRQ questions from AP Classroom and Learnosity frames
hider.js         Answer Hider and its floating on-page panel
nib.html         Landing page
setup.html       Step-by-step setup guide
icons/           Extension icons (SVG source and PNG sizes)
```

## Known limits

- Extraction across all AP courses is in beta. Coverage is best for AP Physics 2 and AP English Language.
- Other formats, such as drag-and-drop and matching, are skipped.
- If extraction finds zero questions, scroll through the whole set so every question renders, then try again.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Everything in the popup is greyed out | You are not on AP Classroom, or the page loaded before the extension. Refresh and reopen the popup. |
| "Manifest is missing" on Load unpacked | You picked the outer folder from the ZIP. Select the inner folder that holds `manifest.json`. |
| AI generation fails with a CORS error | Requests need the `anthropic-dangerous-direct-browser-access: true` header. Restore it if you removed it. |
| The extension vanished after a restart | Its folder was moved, renamed or deleted. Put it back and reload it from the extensions page. |
