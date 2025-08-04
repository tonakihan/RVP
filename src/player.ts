const players: Map<TPlayerName, TPlayerFunction> = new Map();

// For custom players
if (window.RVP_players) {
  window.RVP_players.forEach((el) => {
    players.set(el.name, el.function);
  });
}

players.set("default", (video, stockPlayer) => {
  // Marks the video as processed
  video.dataset.RVP_status = "processed";

  replaceToUpperElement(video, stockPlayer);
  video.controls = true;

  // Fix style
  video.style.width = "100%";
  video.style.height = "100%";
});
