type TPlayerName = IConfig["player"];

type TPlayerFunction = (
  video: HTMLVideoElement,
  stockPlayer: HTMLElement,
  playerSettings: Object,
) => void;
