// ==UserScript==
// @name         Replace-Video-Player
// @namespace    http://tampermonkey.net/
// @version      Alpha-v1
// @description  Can replace the default video player to custom in HTML5
// @author       tonakihan
// @match        http*://**/*
// @exclude      http*://*youtube.com/*
// @exclude      http*://music.yandex.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      http://localhost:4000/BuildinPlayer.js
// @grant        none
// @run-at       document-end
// ==/UserScript==
"use strict";

async function main() {
  console.info("Launch userscript RVP");

  // Может быть множество...
  // TODO: window.frames - если оно там, то удалить все элементы кроме видео (крч как обычно).
  for (let video of document.getElementsByTagName("video")) {
    let defaultPlayer = BuildinPlayer.findWrapperPlayer(video);
    console.log("ОТЛАДКА:", defaultPlayer);
  }
  // Захватить видео.
}
main().catch((e) => console.log(e));
