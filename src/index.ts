import Game from './Game.js';


let canvas: HTMLCanvasElement;

window.addEventListener('load', async () => {
  canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  sizeCanvas();

  const game = new Game();
  game.run(0);

});

function sizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // canvas.getContext('2d')!.imageSmoothingEnabled = false;
  // By default, pixelated images will get smoothed
  // Enable this to get those crisp, clean pixels
}

window.addEventListener('resize', sizeCanvas)
