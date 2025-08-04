export {};

declare global {
  interface Window {
    // Used for connection another custom players
    RVP_players?: [
      {
        name: TPlayerName;
        function: TPlayerFunction;
      },
    ];
  }
}
