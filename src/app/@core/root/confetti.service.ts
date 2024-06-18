import { Injectable } from '@angular/core';
import JSConfetti from 'js-confetti';

const colorScales = {
  rosados: ['#ff0a54', '#ff477e', '#ff7096'],
  verdes: ['#00FF00', '#00CC00', '#009900'],
  azules: ['#0000FF', '#0000CC', '#000099'],
};

export type colorScalesKey = keyof typeof colorScales;

@Injectable({
  providedIn: 'root',
})
export class ConfettiService {
  /**
   * Show confetti animated
   * @param colorRange
   */
  show(colorRange: colorScalesKey = 'verdes') {
    if (this.animate) return;

    this.animate = new JSConfetti();

    const confettiSettings = {
      confettiColors: colorScales[colorRange],
      confettiRadius: this.confettiRadius,
      confettiNumber: this.confettiNumber,
    };

    this.animate.addConfetti(confettiSettings);

    setTimeout(() => this._destroy(), 2000);
  }

  /**
   * Destroy canvas element and clean property animate;
   */
  private _destroy() {
    this.animate?.clearCanvas();
    this.animate?.destroyCanvas();
    this.animate = undefined;
  }

  private confettiRadius?: number = 6;
  private confettiNumber?: number = 500;

  private animate: JSConfetti | undefined;
}
