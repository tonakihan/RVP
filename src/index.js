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
// @grant        none
// @run-at       document-end
// ==/UserScript==

const DefaultPlayer = {
  /** Each method in the object should return
  a DOM element if it exist otherwise null */
  MethodsForDetectionThirdPartyPlayer: {
    playerjs() {
      // TODO
      console.info("Detect PlayerJS");
      alert("Works");
      return "))))";
    },
  },

  queryFirst() {
    const player = this._detectThirdPartyPlayer();
    return 0;
  },

  _detectThirdPartyPlayer() {
    const listNameMethods = Object.getOwnPropertyNames(
      this.MethodsForDetectionThirdPartyPlayer,
    );

    for (let method of listNameMethods) {
      console.debug("method is:", method);
      const res = this.MethodsForDetectionThirdPartyPlayer[method]();
      if (res) return res;
    }

    console.info("Not found third party player");
    return null;
  },
};

(function () {
  "use strict";
  console.info("Launch userscript RVP");

  try {
    // Может быть множество...
    const defaultPlayer = DefaultPlayer.queryFirst();
    while (defaultPlayer) {
      defaultPlayer = DefaultPlayer.queryFirst();
    }
  } catch (e) {
    console.error(e);
  }
  // Захватить видео.
})();
