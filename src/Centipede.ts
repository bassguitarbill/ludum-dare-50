import Game from './Game.js';
import GameObject from './GameObject.js';
import { lerp, Point, pointDist } from './util.js';
export default class Centipede implements GameObject{
  path: Path;
  segments: Array<number> = [];
  constructor(readonly game: Game, readonly startPos: Point) {
    this.path = new Path(startPos);
    for (let x = 0; x < 100; x++) {
      this.segments.push(-x * 10);
    }
  }

  tick(dt: number): void {
    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i] += dt / 10;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.path.draw(ctx);
    for (let i = 0; i < this.segments.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = 'green';
      const pos = this.path.positionOnPath(this.segments[i]);
      ctx.arc(pos.x, pos.y, 15, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}

export class Path {
  points: Array<Point> = [];
  distances: Array<number> = [];
  length = 0;

  constructor(startPoint: Point) {
    this.points.push(startPoint);
  }

  addPoint(p: Point) {
    const dist = pointDist(p, this.endPoint)
    this.points.push(p);
    this.distances.push(dist);
    this.length += dist;
  }

  get endPoint(): Point {
    return this.points[this.points.length - 1];
  }

  get startPoint(): Point {
    return this.points[0];
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    this.points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
  }

  positionOnPath(distance: number): Point {
    if (distance > this.length) return this.endPoint;
    if (distance < 0)           return this.startPoint;

    let i = 0;
    while (distance - this.distances[i] > 0) {
      distance -= this.distances[i];
      i++;
    }
    return lerp(this.points[i], this.points[i+1], distance / this.distances[i]);
  }
}
