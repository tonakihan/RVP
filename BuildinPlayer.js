"use strict";
const BuildinPlayer = {
    // WARN: Не используется
    /** Methods should find in DOM element by properties.
      Each method in the object should return a DOM element
      if it exist otherwise null. */
    MethodsGetThirdPartyPlayer: {
        byId() {
            let player = document.getElementById("player");
            if (player?.nodeName === "VIDEO") {
                console.info("Detect element with id=player but this is a video element");
                return null;
            }
            if (player)
                console.info("Detect element with id=player");
            return player;
        },
    },
    /** Methods checked the DOM node is player or not.
      Each method in the object should return a boolean value. */
    MethodsNodeIsThirtPartyPlayer: {
        bySize({ node, video }) {
            if (node.tagName == "VIDEO") {
                console.log("Entering element is video.");
                return true;
            }
            let coordinatesNode = node.getBoundingClientRect();
            let coordinatesVideo = video.getBoundingClientRect();
            const widthAccuracy = (video.offsetWidth / 100) * config._setting.BuildinPlayer.diffWidth;
            const heightAccuracy = (video.offsetHeight / 100) * config._setting.BuildinPlayer.diffWidth;
            if (coordinatesVideo.top - coordinatesNode.top <= heightAccuracy &&
                coordinatesNode.bottom - coordinatesVideo.bottom <= heightAccuracy &&
                coordinatesVideo.left - coordinatesNode.left <= widthAccuracy &&
                coordinatesNode.right - coordinatesVideo.right <= widthAccuracy) {
                console.log("Element 'player' detected by same size as video");
                return true;
            }
            return false;
        },
        byId({ node }) {
            //console.debug("Input byId:\n", node, "\nnode.id:\n", node.id);
            if (node.id.toLowerCase().includes("player")) {
                console.info("Detect the element with an id that contains a 'player'");
                return true;
            }
            return false;
        },
    },
    /** Returned a player of the video element if is has. */
    findWrapperPlayer(video) {
        let crrNode = video.parentNode;
        let expectedPlayer;
        while (crrNode.nodeName != "BODY") {
            if (this._isThirdPartyPlayer({ node: crrNode, video })) {
                expectedPlayer = crrNode;
            }
            crrNode = crrNode.parentNode;
        }
        if (expectedPlayer) {
            return expectedPlayer;
        }
        console.info("Not found third party player");
        return null;
    },
    /** Returned boolean value. Checked if the element is match a property of player. */
    _isThirdPartyPlayer(params) {
        const listNameMethods = Object.getOwnPropertyNames(this.MethodsNodeIsThirtPartyPlayer);
        for (let method of listNameMethods) {
            if (this.MethodsNodeIsThirtPartyPlayer[method](params)) {
                return true;
            }
        }
        return false;
    },
    /** Returned true if in element was detect another content as
    example - image */
    // TODO: Не используется. Удалить
    _checkOnAnotherContent(node) {
        // List of tags where may be contains another content
        const match = [
            "video",
            "img",
            "p",
            "svg",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
        ];
        for (const tagName of match) {
            const listNodes = node.getElementsByTagName(tagName);
            if (tagName == "video" && listNodes.length > 1) {
                console.debug("Detect another content in", listNodes);
                return true;
            }
            else if (tagName != "video" && listNodes.length > 0) {
                console.debug("Detect another content in", listNodes);
                return true;
            }
        }
        return false;
    },
};
