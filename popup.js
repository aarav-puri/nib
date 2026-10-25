/**
 * Nib — Popup Script
 *
 * Shows the Answer Hider toggle on AP Classroom and forwards it to hider.js
 * in every frame (including Learnosity iframes).
 */

(() => {
    'use strict';

    // ─── DOM Elements ────────────────────────────────────────────
    const errorCard = document.getElementById('errorCard');
    const errorText = document.getElementById('errorText');
    const notApCard = document.getElementById('notApCard');
    const hiderCard = document.getElementById('hiderCard');
    const hiderToggle = document.getElementById('hiderToggle');
    const hiderBadge = document.getElementById('hiderBadge');
    const hiderNote = document.getElementById('hiderNote');

    // ─── Initialize ──────────────────────────────────────────────
    async function init() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if (!tab || !tab.url || !tab.url.includes('apclassroom.collegeboard.org')) {
                showNotApClassroom();
                return;
            }

            // Inject the hider into ALL frames
            try {
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id, allFrames: true },
                    files: ['hider.js']
                });
            } catch (e) {
                // May already be injected
            }

            if (hiderCard) hiderCard.style.display = 'flex';
            initHiderControls(tab);

        } catch (error) {
            showError('Failed to initialize: ' + error.message);
        }
    }

    function setHiderUIState(available, panelVisible) {
        if (!hiderToggle || !hiderBadge) return;

        if (!available) {
            hiderToggle.checked = false;
            hiderToggle.disabled = true;
            hiderBadge.textContent = 'Unavailable';
            hiderBadge.classList.add('tool-badge--disabled');
            hiderBadge.classList.remove('tool-badge--showing');
            if (hiderNote) hiderNote.textContent = 'Open AP Classroom to enable';
            if (hiderCard) hiderCard.classList.add('tool-card--disabled');
            return;
        }

        hiderToggle.disabled = false;
        hiderToggle.checked = !!panelVisible;
        hiderBadge.textContent = panelVisible ? 'Visible' : 'Hidden';
        hiderBadge.classList.toggle('tool-badge--showing', !panelVisible);
        hiderBadge.classList.remove('tool-badge--disabled');
        if (hiderNote) hiderNote.textContent = 'Use panel to hide answers';
        if (hiderCard) hiderCard.classList.remove('tool-card--disabled');
    }

    async function getHiderState(tab) {
        try {
            const results = await chrome.scripting.executeScript({
                target: { tabId: tab.id, allFrames: true },
                func: () => {
                    if (typeof window.__cbhGetPanelVisible === 'function') {
                        return window.__cbhGetPanelVisible();
                    }
                    return null;
                }
            });

            const found = results.find(r => typeof r.result === 'boolean');
            if (found) return found.result;
        } catch (e) { }

        return null;
    }

    async function setHiderState(tab, panelVisible) {
        try {
            await chrome.scripting.executeScript({
                target: { tabId: tab.id, allFrames: true },
                func: (value) => {
                    if (typeof window.__cbhSetPanelVisible === 'function') {
                        return window.__cbhSetPanelVisible(value);
                    }
                    return null;
                },
                args: [panelVisible]
            });
            return true;
        } catch (e) {
            return false;
        }
    }

    async function initHiderControls(tab) {
        if (!hiderToggle) return;

        hiderToggle.addEventListener('change', async () => {
            const desired = hiderToggle.checked;
            setHiderUIState(true, desired);
            const ok = await setHiderState(tab, desired);
            if (!ok) {
                const fallback = await getHiderState(tab);
                if (fallback !== null) {
                    setHiderUIState(true, fallback);
                } else {
                    setHiderUIState(false, false);
                }
            }
        });

        const current = await getHiderState(tab);
        if (current === null) {
            setHiderUIState(false, false);
        } else {
            setHiderUIState(true, current);
        }
    }

    // ─── Helpers ─────────────────────────────────────────────────
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function showError(message) {
        errorCard.style.display = 'block';
        errorText.innerHTML = escapeHtml(message).replace(/\n/g, '<br>');
    }

    function showNotApClassroom() {
        if (hiderCard) hiderCard.style.display = 'none';
        notApCard.style.display = 'block';
    }

    // ─── Start ───────────────────────────────────────────────────
    init();

})();
