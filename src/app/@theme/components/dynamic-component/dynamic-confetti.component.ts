import { Component, OnDestroy, ViewChild } from '@angular/core';
import JSConfetti from 'js-confetti';

@Component({
  standalone: true,
  selector: 'dynamic',
  template: `
    <canvas
      #canvas
      style="height: 100vh; width: 100vw; z-index: 1000;"
      class="fixed inset-0 rounded-xl  flex flex-row items-center justify-center bg-slate-800 bg-opacity-60 z-40"
    >
    </canvas>
  `,
})
export class ConfettiComponent implements OnDestroy {
  @ViewChild('canvas') canvas: any;
  animacion!: JSConfetti;

  colorScales = [
    ['#ff0a54', '#ff477e', '#ff7096'], // Escala de colores rosados
    ['#00FF00', '#00CC00', '#009900'], // Escala de colores verdes
    ['#0000FF', '#0000CC', '#000099'], // Escala de colores azules
  ];

  constructor() {
    this.animacion = new JSConfetti({ canvas: this.canvas });

    for (let index = 1; index <= 3; index++) {
      this.animacion.addConfetti({
        confettiColors: this.colorScales[index],
        confettiRadius: 6,
        confettiNumber: 500,
      });
    }
  }

  ngOnDestroy(): void {
    this.animacion?.destroyCanvas();
  }
}
