// ==UserScript==
// @name         RVP
// @homepage     https://github.com/tonakihan/RVP
// @source       http://localhost:4000/
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Can replace the default video player to custom in HTML5
// @author       tonakihan
// @match        http*://**/*
// @exclude      http*://*youtube.com/*
// @exclude      http*://music.yandex.ru/*
// @exclude      http*://rutube.ru/*
// @icon         https://img.icons8.com/?size=100&id=h1ELI6ISswGD&format=png&color=000000
// @require      http://localhost:4000/BuildinPlayer.js
// @require      http://localhost:4000/utils.js
// @require      http://localhost:4000/player.js
// @connect      localhost
// @grant        none
// @run-at       document-end
// ==/UserScript==
"use strict";

const config: IConfig = {
  /**
    For observer. Limit count of run this script after launch. It script
    will triggered when changed body of the HTML document. You can set as Infinity.
  */
  limit_count_run: 10,
  /**
    For observer. Value in ms.
  */
  delay_between_exec: 1000,
  /**
    Your set player wich used instad of build-in player on site.
    Avaleble next value: default.
  */
  player: "default",

  /**
    Not for manualy change. This config set a behavior code.
  */
  _setting: {
    BuildinPlayer: {
      /** Apply value in percent. Not recomended for change. TODO... */
      diffWidth: 5,
      diffHeight: 5,
    },
  },
};
//
main().catch((e) => console.log(e));

async function main() {
  console.info("Launch userscript RVP");

  /*
    userscript, а именно tampermonkey запускает автоматом и в iframes.
    Так, что реализация для iframes не требуется.
  */

  replaceVideoPlayer();

  // Это нужно для хитрых - когда видео добавляется из скрипта.
  let limitCountRun = config.limit_count_run || 10;
  const observer = new MutationObserver(() => {
    //console.debug("observer is triggered");

    setTimeoutWithIgnore(() => {
      console.debug("Exec observer after timeout");
      replaceVideoPlayer();

      limitCountRun--;
      if (limitCountRun <= 0) {
        console.debug("observer was disconnected");
        observer.disconnect();
      }
    }, config.delay_between_exec);
  });

  observer.observe(document.body, {
    subtree: true,
    childList: true,
  });
}

function replaceVideoPlayer() {
  console.debug("replaceVideoPlayer: into DOCUMENT.body:\n", document.body);
  //console.debug("replaceVideoPlayer: HTML of body:\n", document.body.innerHTML);

  for (let video of document.getElementsByTagName("video")) {
    if (video.dataset.RVP_status === "processed") {
      console.info("Exit. Video marked as processed.");
      return;
    }

    // TODO: if used stock in browser contol panel
    let stockPlayer = BuildinPlayer.findWrapperPlayer(video);

    // DEBUG
    // For a visual accent, the video elements are handled.
    //video.style.border = "10px solid CornflowerBlue";
    /*console.debug(
      "replaceVideoPlayer: foundPlayer:\n",
      stockPlayer,
      "\nvideo:\n",
      video,
    );*/

    if (stockPlayer) {
      // Replace with config.player
      console.info("Replace player with", config.player);

      // FIXME: Как то обработать blob
      /* [default, CVP] the players supprted blob link that they don't create a new video element */
      if (isBlobSource(video.src) && config.player !== "default") {
        confirm(
          "Detected Blob source. Use a 'default' player or keep the built-in one?",
        ) && players.get("default")!(video, stockPlayer, {});
        return;
      }

      try {
        players.get(config.player)!(video, stockPlayer, {});
      } catch {
        alert(`Can't get or launch the player ${config.player}`);
        throw new Error(`Can't get or launch the player ${config.player}`);
      }
    } else {
      console.info("Not found player. Nothing to do.");
    }
  }
}

function isBlobSource(link: string): boolean {
  return link.startsWith("blob:");
}
