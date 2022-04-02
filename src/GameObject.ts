export default interface GameObject {
  tick(dt: number): void;
  draw(ctx: CanvasRenderingContext2D): void;
}
