interface IConfig {
  /**
    For observer. Limit count of run this script after launch. It script
    will triggered when changed body of the HTML document. You can set as Infinity.
  */
  limit_count_run: number;
  /**
    For observer. Value in ms.
  */
  delay_between_exec: number;
  /**
    Your set player wich used instad of build-in player on site.
  */
  player: "default";
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
