// ==UserScript==
// @name         RVP path: animevost
// @source       https://github.com/tonakihan/RVP/tree/main/paths%20for%20specific%20sites/animevost.user.js
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Path for RVP for site animevost.org
// @author       tonakihan
// @match        http*://animevost.org/*
// @include      http*://v*.vost.pw/*
// @icon         https://img.icons8.com/?size=100&id=h1ELI6ISswGD&format=png&color=000000
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  const topBarOfPlayer = document.getElementById("knpki");
  if (topBarOfPlayer) {
    topBarOfPlayer.style.top = 0;
  }
})();
