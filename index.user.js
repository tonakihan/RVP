// ==UserScript==
// @name         RVP
// @homepage     https://github.com/tonakihan/RVP
// @source       https://raw.githubusercontent.com/tonakihan/RVP/refs/heads/releases/
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Can replace the default video player to custom in HTML5
// @author       tonakihan
// @match        http*://**/*
// @exclude      http*://*youtube.com/*
// @exclude      http*://music.yandex.ru/*
// @exclude      http*://rutube.ru/*
// @icon         https://img.icons8.com/?size=100&id=h1ELI6ISswGD&format=png&color=000000
// @require      https://raw.githubusercontent.com/tonakihan/RVP/refs/heads/releases/BuildinPlayer.js
// @require      https://raw.githubusercontent.com/tonakihan/RVP/refs/heads/releases/utils.js
// @require      https://raw.githubusercontent.com/tonakihan/RVP/refs/heads/releases/player.js
// @connect      localhost
// @grant        none
// @run-at       document-end
// ==/UserScript==
"use strict";
const config = {
    /**
      For observer.
      Limit runs of the script. The script triggered after changing of the document.
      @example Infinity | 5
    */
    retry_limit: 5,
    /**
      For observer.
      Value in ms.
    */
    retry_delay: 1000,
    /**
      The player to be use instad of build-in player on site.
      Install addition player (see README.md).
      @example "default" | "OPlayer"
    */
    player: "default",
    /**
      Not for manualy change. This config set a behavior code.
    */
    _setting: {
        BuildinPlayer: {
            /** Applying the value in percent. Not recomended for change. TODO... */
            diffWidth: 5,
            diffHeight: 5,
        },
    },
};
//
main();
async function main() {
    console.info("Launch userscript RVP");
    console.log("Configured player: ", config.player);
    replaceVideoPlayer();
    // Это нужно для хитрых - когда видео добавляется из скрипта.
    let retryLimit = config.retry_limit || 5;
    const observer = new MutationObserver(() => {
        //console.debug("observer is triggered");
        setTimeoutWithIgnore(() => {
            console.debug("Exec observer after timeout");
            replaceVideoPlayer();
            retryLimit--;
            if (retryLimit <= 0) {
                console.debug("observer was disconnected");
                observer.disconnect();
            }
        }, config.retry_delay);
    });
    observer.observe(document.body, {
        subtree: true,
        childList: true,
    });
}
async function replaceVideoPlayer() {
    //console.debug("replaceVideoPlayer: into DOCUMENT.body:\n", document.body);
    //console.debug("replaceVideoPlayer: HTML of body:\n", document.body.innerHTML);
    for (let video of document.getElementsByTagName("video")) {
        if (video.dataset.RVP_status === "processed") {
            console.info("Exit. The video marked as processed.");
            return;
        }
        // TODO: if used stock in browser contol panel
        let player = BuildinPlayer.findWrapperPlayer(video);
        // DEBUG
        // Visual accent the video element are processed
        //video.style.border = "10px solid CornflowerBlue";
        /*console.debug(
          "replaceVideoPlayer: foundPlayer:\n",
          player,
          "\nvideo:\n",
          video,
        );*/
        if (player) {
            // Blob case
            // FIXME: Как то обработать blob
            /* [default, CVP]: the players supprt 'blob' links because it's useing exist video element */
            if (isBlobSource(video.src) && config.player !== "default") {
                confirm("Detected Blob source. Use a 'default' player or keep the built-in one?") && playerMap.get("default")(video, player, {});
                return;
            }
            // Default case
            try {
                const maxAttempts = 5;
                const delayMs = 200;
                let newPlayer = playerMap.get(config.player);
                for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                    if (newPlayer instanceof Function) {
                        newPlayer(video, player, {});
                        break;
                    }
                    else {
                        await delay(delayMs);
                        newPlayer = playerMap.get(config.player);
                    }
                }
            }
            catch {
                alert(`Can't load the player ${config.player}`);
                throw new Error(`Can't get or launch the player ${config.player}`);
            }
        }
        else {
            console.info("Not found player. Nothing to do.");
        }
    }
}
