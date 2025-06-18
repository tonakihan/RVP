const BuildinPlayer = {
  // WARN: Не используется
  /** Methods should find in DOM element by properties.
    Each method in the object should return a DOM element
    if it exist otherwise null. */
  MethodsForDetectionThirdPartyPlayer: {
    byId() {
      let player = document.getElementById("player");

      if (player) console.info("Detect element with id=player");
      return player;
    },
  } as { [key: string]: () => HTMLElement | null },

  /** Methods checked the DOM node is player or not.
    Each method in the object should return a boolean value. */
  MethodsNodeIsThirtPartyPlayer: {
    byId(node) {
      //console.debug("Input byId:\n", node, "\nnode.id:\n", node.id);

      if (node.id === "player") {
        console.info("Detect element with id=player");
        return true;
      }

      return false;
    },
  } as { [key: string]: (arg0: HTMLElement) => boolean },

  /** Returned a player of the video element if is has. */
  findWrapperPlayer(video: HTMLVideoElement): HTMLElement | null {
    let crrNode = video.parentNode! as HTMLElement;
    while (crrNode.nodeName != "BODY") {
      if (this._isThirdPartyPlayer(crrNode)) {
        //console.info("Found player");
        return crrNode;
      }

      crrNode = crrNode.parentNode! as HTMLElement;
    }

    console.info("Not found third party player");
    return null;
  },

  /** Returned boolean value. Checked if the element is match a property of player. */
  _isThirdPartyPlayer(node: HTMLElement): boolean {
    const listNameMethods = Object.getOwnPropertyNames(
      this.MethodsNodeIsThirtPartyPlayer,
    );

    for (let method of listNameMethods) {
      if (this.MethodsNodeIsThirtPartyPlayer[method](node)) {
        return true;
      }
    }
    return false;
  },
};
