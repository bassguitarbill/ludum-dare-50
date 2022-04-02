export interface Point {
  x: number;
  y: number;
}

export function pointDist(p1: Point, p2: Point) {
  const x = p1.x - p2.x;
  const y = p1.y - p2.y;
  return Math.sqrt((x * x) + (y * y));
}

export function lerp(p1: Point, p2: Point, percentage: number) {
  const y = (p2.y - p1.y) * percentage;
  const x = (p2.x - p1.x) * percentage;
  return { x: x + p1.x, y: y + p1.y };
  return p1;
}
