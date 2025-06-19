export {};

declare global {
  interface HTMLVideoElement {
    dataset: {
      /** Used for marks element as processed. */
      RVP_status?: "processed";
    };
  }
}
