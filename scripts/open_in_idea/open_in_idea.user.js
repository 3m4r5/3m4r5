// ==UserScript==
// @homepageURL  https://github.com/3m4r5/3m4r5/tree/main/scripts/open_in_idea
// @updateURL    https://raw.githubusercontent.com/3m4r5/3m4r5/main/scripts/open_in_idea/open_in_idea.user.js
// @downloadURL  https://raw.githubusercontent.com/3m4r5/3m4r5/main/scripts/open_in_idea/open_in_idea.user.js
// @name        Open Current Page In Intellij Idea
// @namespace   Violentmonkey Scripts
// @match       http://localhost*/*
// @match       http://192.168.2.*/*
// @grant       GM_registerMenuCommand
// @version     1.0
// @author      3m4r5
// @description 7/2/2025, 11:46:59 AM
// ==/UserScript==
(function() {
  'use strict';
  const channel_id = '';
  const forms      = document.querySelectorAll('form');
  const parts      = forms[forms.length - 1].getAttribute('action').slice(1).split('/');
  GM_registerMenuCommand("Open in Idea", function (){window.open(`jetbrains://${channel_id == '' ? 'idea' : channel_id + '.tool'}/navigate/reference?project=${parts[0]}&path=web/${parts.slice(1).join('/').split('.')[0]}.jsp`);}, "g");
})();
