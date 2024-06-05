declare module "brightness" {
  interface Brightness {
    get: () => Promise<number>;
    set: (value: number) => Promise<void>;
  }

  const brightness: Brightness;
  export default brightness;
}
