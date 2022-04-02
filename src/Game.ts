class Game {
  state: GameState;
  lastTimestamp: number;
  dt: number = 0;
  constructor() {
    this.state = GameState.RUNNING;
    this.lastTimestamp = 0;
    this.run = this.run.bind(this);
  }

  run(time: number) {
    const dt = time - this.lastTimestamp;
    this.dt = dt;
    this.lastTimestamp = time;
    window.requestAnimationFrame(this.run);
  }
}

enum GameState {
  RUNNING,
}

export default Game;

