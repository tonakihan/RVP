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

const config = {
  /*
    For ovserver. Count of run this script after launch. It script
    will triggered when changed body of the HTML document.
  */
  countRun: 10,
};
//
main().catch((e) => console.log(e));

async function main() {
  console.info("Launch userscript RVP");

  console.debug("main: window:\n", window);

  // TODO: сделать задержку (отложенное выполнение), что бы не грузить браузер
  // Это нужно для хитрых - когда видео добавляется из скрипта.
  let countRun = config.countRun || 10;
  const observer = new MutationObserver(() => {
    console.debug("observer is triggered");
    replaceVideoPlayer();

    countRun--;
    if (countRun <= 0) {
      console.debug("observer was disconnected");
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    subtree: true,
    childList: true,
  });

  /*
    userscript, а именно tampermonkey запускает автоматом и в iframes.
    Так, что реализация для iframes не требуется.
  */
  replaceVideoPlayer();
}

function replaceVideoPlayer() {
  console.debug("replaceVideoPlayer: DOCUMENT.body:\n", document.body);
  //console.debug("replaceVideoPlayer: HTML of body:\n", document.body.innerHTML);

  for (let video of document.getElementsByTagName("video")) {
    // TODO: if used stock in browser contol panel
    let stockPlayer = BuildinPlayer.findWrapperPlayer(video);

    // DEBUG
    // For a visual accent, the video elements are handled.
    //video.style.border = "10px solid CornflowerBlue";
    console.debug(
      "replaceVideoPlayer: foundPlayer:\n",
      stockPlayer,
      "\n video:\n",
      video,
    );

    //TODO: Cut the stockPlayer and insert my player
  }
}
