const BuildinPlayer = {
  /** Each method in the object should return
  a DOM element if it exist otherwise null */
  MethodsForDetectionThirdPartyPlayer: {
    byId(node?: HTMLElement) {
      let player: HTMLElement | null = null;
      if (node) {
        if (node.id === "player") player = node;
      } else {
        player = document.getElementById("player");
      }

      player && console.info("Detect element with id=player");
      return player;
    },
  } as { [key: string]: (arg0?: HTMLElement) => HTMLElement | null },

  /** Returned a player of the video element if is has. */
  findWrapperPlayer(video: HTMLVideoElement): HTMLElement | null {
    let crrNode = video.parentNode! as HTMLElement;
    while (crrNode.nodeName !== "BODY") {
      if (this._isThirdPartyPlayer(crrNode)) {
        return crrNode;
      }
      crrNode = crrNode.parentNode! as HTMLElement;
    }
    return null;
  },

  /** Returned boolean value. Checked if the element is match a property of player. */
  _isThirdPartyPlayer(node: HTMLElement): boolean {
    const listNameMethods = Object.getOwnPropertyNames(
      this.MethodsForDetectionThirdPartyPlayer,
    );

    for (let method of listNameMethods) {
      const res = this.MethodsForDetectionThirdPartyPlayer[method]();
      if (res) return true;
    }

    console.info("Not found third party player");
    return false;
  },
};
