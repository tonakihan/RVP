interface IConfig {
  /**
    For observer.
    Limit runs of the script. The script triggered after changing of the document.
    @example Infinity | 5
  */
  retry_limit: number;
  /**
    For observer. Value in ms.
  */
  retry_delay: number;
  /**
    The player to be use instad of build-in player on site.
    Install addition player (see README.md).
    @example "default" | "OPlayer"
  */
  player: "default" | "OPlayer";
  /** Not for manualy change. This config set a behavior the code. */
  _setting: {
    /** The list parametrs which used in BuildinPlayer.ts */
    BuildinPlayer: {
      /** Apply value in percent. For detection the build-in player element by its size.*/
      diffWidth: number;
      /** Apply value in percent. For detection the build-in player element by its size.*/
      diffHeight: number;
    };
  };
}
