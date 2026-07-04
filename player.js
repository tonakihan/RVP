"use strict";
const playerMap = new Map([
    [
        "default",
        (video, stockPlayer) => {
            // Marks the video as processed
            video.dataset.RVP_status = "processed";
            replaceToUpperElement(video, stockPlayer);
            video.controls = true;
            // Fix style
            video.style.width = "100%";
            video.style.height = "100%";
        },
    ],
]);
// For custom players
if (window.RVP_players) {
    window.RVP_players.forEach((el) => {
        playerMap.set(el.name, el.function);
    });
}
