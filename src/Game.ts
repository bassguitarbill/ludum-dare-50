import Centipede from "./Centipede.js";

export default class Game {
  state: GameState;
  lastTimestamp: number;
  dt: number = 0;
  cent: Centipede;

  constructor(readonly ctx: CanvasRenderingContext2D) {
    this.state = GameState.RUNNING;
    this.lastTimestamp = 0;
    this.run = this.run.bind(this);

    this.cent = new Centipede(this, {x: 200, y: 200});
    this.cent.path.addPoint({ x:400, y:200 })
    this.cent.path.addPoint({ x:400, y:300 })
    this.cent.path.addPoint({ x:500, y:400 })
    this.cent.path.addPoint({ x:500, y:100 })
    this.cent.path.addPoint({ x:100, y:100 })
  }

  run(time: number) {
    const dt = time - this.lastTimestamp;
    this.dt = dt;
    this.lastTimestamp = time;
    this.cent.tick(dt);
    this.draw();
    window.requestAnimationFrame(this.run);
  }

  draw() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.cent.draw(this.ctx);
  }
}

enum GameState {
  RUNNING,
}

