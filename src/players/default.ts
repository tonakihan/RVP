(function (video: HTMLVideoElement, stockPlayer: HTMLElement) {
  // Marks the video as processed
  video.dataset.RVP_status = "processed";

  replaceToUpperElement(video, stockPlayer);
  video.controls = true;

  // Fix style
  video.style.width = "100%";
  video.style.height = "100%";
}) as TPlayerFunction;
