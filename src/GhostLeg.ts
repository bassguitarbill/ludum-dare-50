import {Point} from "./util.js";

export default class GhostLeg {
  crossings: Array<Crossing> = [];
  constructor(
    readonly numColumns: number,
    readonly height: number,
    readonly width: number,
    readonly position: Point
  ) {}

  generate(numCrossings: number) {
    this.crossings = [];
    for (let i = 0; i < numCrossings; i++) {
      const gap = Math.floor(Math.random() * (this.numColumns - 1));
      let height = i * (this.height / numCrossings);
      height *= 0.9;
      height += 0.05 * this.height;
      this.crossings.push(new Crossing(gap, height));
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.numColumns; i++) this.drawColumn(ctx, i);
    for (let i = 0; i < this.crossings.length; i++) {
      this.drawCrossing(ctx, this.crossings[i]);
    }
  }

  drawCrossing(ctx: CanvasRenderingContext2D, c: Crossing) {
    ctx.beginPath();
    ctx.strokeStyle = 'orange';
    const colGap = this.width / (this.numColumns - 1);
    ctx.moveTo(this.position.x + (c.gap * colGap), this.position.y + c.height);
    ctx.lineTo(this.position.x + ((c.gap + 1) * colGap), this.position.y + c.height);
    ctx.stroke();
    
  }

  drawColumn(ctx: CanvasRenderingContext2D, colNum: number) {
    ctx.beginPath();
    ctx.strokeStyle = 'orange';
    const colGap = this.width / (this.numColumns - 1);
    ctx.moveTo(this.position.x + (colNum * colGap), this.position.y);
    ctx.lineTo(this.position.x + (colNum * colGap), this.position.y + this.height);
    ctx.stroke();
  }
}

class Crossing {
  constructor (readonly gap: number, readonly height: number) {}
}
