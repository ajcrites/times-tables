import { random } from 'lodash';
import * as convert from 'color-convert';

export const getVibrantColor = () => {
  return '#' + convert.hsl.hex(random(0, 360), random(70, 100), random(35, 55));
};
