import { Injectable } from '@angular/core';
import JSConfetti from 'js-confetti';

const colorScales = {
  rosados: ['#ff0a54', '#ff477e', '#ff7096'],
  verdes: ['#00FF00', '#00CC00', '#009900'],
  azules: ['#0000FF', '#0000CC', '#000099'],
  morados: ['#800080', '#9932CC', '#8A2BE2', '#9400D3'],
  naranjas: ['#FFA500', '#FF8C00', '#FF7F50'],
  grises: ['#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#DCDCDC'],
  amarillos: ['#FFFF00', '#FFD700', '#FFA07A'],
  rojos: ['#FF0000', '#DC143C', '#B22222', '#8B0000'],
  marrones: ['#A52A2A', '#8B4513', '#D2691E'],
  celestes: ['#87CEEB', '#00BFFF', '#1E90FF', '#5F9EA0'],
  purpuras: ['#4B0082', '#8A2BE2', '#9400D3', '#9932CC', '#BA55D3'],
  ocres: ['#CC7722', '#DAA520', '#B8860B', '#8B4513', '#A0522D'],
  violetas: ['#EE82EE', '#DDA0DD', '#DA70D6', '#D8BFD8', '#FF00FF'],
  marronesOscuros: ['#654321', '#3D2B1F', '#5C4033', '#8B4513', '#704214'],
  fiestaColorida: [ '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8F00FF'],
  coloresPatrios: ['#FF0000', '#FFFFFF', '#0000FF'],
  playaTropical: ['#00FF7F', '#FFD700', '#FF4500', '#1E90FF', '#00BFFF'],
  otoño: ['#FF8C00', '#D2691E', '#8B4513', '#A0522D', '#CD853F'],
  invierno: ['#00CED1', '#4682B4', '#B0E0E6', '#5F9EA0', '#1E90FF'],
  primavera: ['#FF69B4', '#FFB6C1', '#87CEFA', '#32CD32', '#FFD700'],
  verano: ['#FF6347', '#FFA07A', '#FFFFE0', '#FFE4B5', '#FFDAB9'],
  turquesas: ['#40E0D0', '#48D1CC', '#00CED1'],
  coral: ['#FF7F50', '#FF6F61', '#F88379'],
  dorados: ['#FFD700', '#FFC300', '#FFB700'],
  plateados: ['#C0C0C0', '#B0C4DE', '#D3D3D3'],
  berenjenas: ['#4B0082', '#800080', '#8A2BE2'],
  champañas: ['#F7E7CE', '#FDE910', '#FFFACD'],
  menta: ['#98FF98', '#3EB489', '#00FA9A'],
  cereza: ['#DE3163', '#E30B5C', '#FF007F'],
  oliva: ['#808000', '#6B8E23', '#556B2F'],
  jade: ['#00A86B', '#00CC99', '#5EFB6E'],
  carmín: ['#960018', '#D70040', '#FF0038'],
  lavanda: ['#E6E6FA', '#D8BFD8', '#CCCCFF'],
  índigo: ['#4B0082', '#6A5ACD', '#483D8B'],
  arcilla: ['#D2691E', '#A0522D', '#8B4513'],
  rubí: ['#E0115F', '#9B111E', '#D10056'],
  esmeralda: ['#50C878', '#2E8B57', '#046307'],
  zafiro: ['#0F52BA', '#082567', '#536878'],
  granate: ['#7B1113', '#8D0226', '#800000'],
  topacio: ['#FFC87C', '#FFCC00', '#FFD700'],
  turmalina: ['#30D5C8', '#0F4D92', '#4682B4'],
  amatista: ['#9966CC', '#663399', '#8A2BE2'],
  perla: ['#EAE0C8', '#FDEAA8', '#FFF9E3'],
  canela: ['#D2691E', '#E97451', '#C76114'],
  oro: ['#FFD700', '#FFC300', '#FFB700'],
  bronce: ['#CD7F32', '#B87333', '#8C7853'],
  champán: ['#F7E7CE', '#FDE910', '#FFFACD'],
  arena: ['#C2B280', '#DEB887', '#E3DAC9'],
  aguamarina: ['#7FFFD4', '#66CDAA', '#2E8B57'],
  alabastro: ['#EDEAE0', '#F0EAD6', '#FAF0E6'],
  crema: ['#FFFDD0', '#FFFACD', '#F5FFFA'],
  azafrán: ['#F4C430', '#FF9933', '#FF4F00'],
  caramelo: ['#D2691E', '#A0522D', '#8B4513'],
  antracita: ['#293133', '#353839', '#43464B'],
  fucsia: ['#FF00FF', '#FF77FF', '#FF1493'],
  pistacho: ['#93C572', '#6DBD64', '#A2C523'],
  lima: ['#00FF00', '#32CD32', '#9ACD32'],
  caoba: ['#C04000', '#A52A2A', '#800000'],
  malva: ['#E0B0FF', '#C9A0DC', '#967BB6'],
  ocre: ['#CC7722', '#DAA520', '#B8860B'],
  nogal: ['#5D3A1A', '#654321', '#7C4030'],
  lirio: ['#C8A2C8', '#E0B0FF', '#DB7093'],
  lila: ['#C8A2C8', '#E0B0FF', '#DB7093'],
  mostaza: ['#FFDB58', '#FFDD44', '#FFD700'],
  vainilla: ['#F3E5AB', '#F5DEB3', '#FDFD96'],
  almendra: ['#EFDECD', '#D2B48C', '#FFEBCD'],
  melocotón: ['#FFDAB9', '#FFE5B4', '#FFCBA4'],
  berilo: ['#9BCCB4', '#56A3A6', '#1C7C7D'],
  granada: ['#DC143C', '#9B111E', '#800000'],
  zarzamora: ['#301934', '#47243C', '#61223D'],
  hierba: ['#7CFC00', '#7FFF00', '#32CD32'],
  manzana: ['#8DB600', '#7CFC00', '#ADFF2F'],
  océano: ['#0077BE', '#009ACD', '#00CED1'],
  espumaMarina: ['#E0FFFF', '#98FF98', '#00FF7F'],
  azulAcero: ['#4682B4', '#5F9EA0', '#6A5ACD'],
  grisPerla: ['#C0C0C0', '#D3D3D3', '#B0C4DE'],
  azulCielo: ['#87CEEB', '#00BFFF', '#1E90FF'],
  escarlata: ['#FF2400', '#FF4D00', '#FF6347'],
  ámbar: ['#FFBF00', '#FFBF40', '#FFBF60'],
  bronceado: ['#D2B48C', '#C19A6B', '#CD853F'],
  coralVivo: ['#FF7F50', '#FF4040', '#F08080'],
  turquesa: ['#40E0D0', '#48D1CC', '#00CED1'],
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
