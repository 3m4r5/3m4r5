// ==UserScript==
// @homepageURL https://github.com/3m4r5/3m4r5/tree/main/scripts/open_in_idea
// @updateURL   https://raw.githubusercontent.com/3m4r5/3m4r5/main/scripts/open_in_idea/open_in_idea.user.js
// @downloadURL https://raw.githubusercontent.com/3m4r5/3m4r5/main/scripts/open_in_idea/open_in_idea.user.js
// @icon        https://raw.githubusercontent.com/JetBrains/logos/refs/heads/master/web/intellij-idea/intellij-idea.svg
// @name        Open In Idea
// @description Open Current jsp Page In Intellij Idea project
// @namespace   Violentmonkey Scripts
// @match       http://localhost*/*
// @match       http://192.168.2.*/*
// @grant       GM_registerMenuCommand
// @version     1.0
// @author      3m4r5
// ==/UserScript==
(function() {
  'use strict';
  const channel_id = '';
  const parts      = Array.from(document.querySelectorAll('form')).at(-1).getAttribute('action').slice(1).split('/');
  GM_registerMenuCommand("Open in Idea", function (){window.open(`jetbrains://${channel_id == '' ? 'idea' : channel_id + '.tool'}/navigate/reference?project=${parts[0]}&path=web/${parts.slice(1).join('/').split('.')[0]}.jsp`);}, "g");
})();
