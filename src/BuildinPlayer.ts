const BuildinPlayer = {
  // WARN: Не используется
  /** Methods should find in DOM element by properties.
    Each method in the object should return a DOM element
    if it exist otherwise null. */
  MethodsForDetectionThirdPartyPlayer: {
    byId() {
      let player = document.getElementById("player");

      if (player?.nodeName === "VIDEO") {
        console.info(
          "Detect element with id=player but this is a video element",
        );
        return null;
      }

      if (player) console.info("Detect element with id=player");
      return player;
    },
  } as { [key: string]: () => HTMLElement | null },

  /** Methods checked the DOM node is player or not.
    Each method in the object should return a boolean value. */
  MethodsNodeIsThirtPartyPlayer: {
    byId(node) {
      //console.debug("Input byId:\n", node, "\nnode.id:\n", node.id);

      if (node.id.toLowerCase().includes("player")) {
        console.info("Detect the element with an id that contains a 'player'");
        return true;
      }

      return false;
    },
  } as { [key: string]: (arg0: HTMLElement) => boolean },

  // TODO: Переписать - сделать цикл в котором при нахождении элемента -
  // результат сохраняется и ищется дальше, если нет. То возвращается То
  // что нарыли
  /** Returned a player of the video element if is has. */
  findWrapperPlayer(video: HTMLVideoElement): HTMLElement | null {
    let crrNode = video.parentNode! as HTMLElement;
    let expectedPlayer;
    while (crrNode.nodeName != "BODY") {
      if (this._isThirdPartyPlayer(crrNode)) {
        expectedPlayer = crrNode;
      }

      crrNode = crrNode.parentNode! as HTMLElement;
    }

    if (expectedPlayer) {
      return expectedPlayer;
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
