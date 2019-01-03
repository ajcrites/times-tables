import * as React from 'react';

import styled from '@emotion/styled';

import { TimesTable } from './visualization/TimesTable';
import { TimesTableControls } from './TimesTableControls';
import { About } from './About';

import { random } from 'lodash';

//tslint:disable
function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
// tslint:enable

const ForkImage = styled.a`
  position: fixed;
  top: 0;
  right: 0;
  @media(max-width: 480px) {
    display: none;
  },
`;

/**
 * Main app container. Renders the About information, the times table itself,
 * and the times table controls
 */
export class TimesTableApp extends React.Component {
  playInterval: number;

  state: {
    pointCount: number;
    timesTable: number;
    lineColor: string;
    playing: boolean;
  } = {
    pointCount: 10,
    timesTable: 2,
    lineColor: '#000000',
    playing: false,
  };

  pause = () => {
    clearInterval(this.playInterval);
    this.setState({ playing: false });
  };

  getVibrantColor() {
    return hslToHex(random(0, 360), random(70, 100), random(35, 55));
  }

  play = () => {
    this.playInterval = window.setInterval(() => {
      let timesTable = this.state.timesTable + 0.1;
      let lineColor = this.state.lineColor;
      if ('5' === timesTable.toFixed(1).split('.')[1]) {
        lineColor = this.getVibrantColor();
      }

      if (timesTable > 100) {
        timesTable = 100;
        this.pause();
      }

      this.setState({
        timesTable,
        lineColor,
      });
    }, 100);

    this.setState({
      lineColor: this.getVibrantColor(),
      playing: true,
    });
  };

  changeValue = valueName => value => this.setState({ [valueName]: value });

  render() {
    return (
      <main>
        <TimesTable
          pointCount={this.state.pointCount}
          timesTable={this.state.timesTable}
          lineColor={this.state.lineColor}
        />
        <TimesTableControls
          timesTableValue={this.state.timesTable}
          pointCountValue={this.state.pointCount}
          changeTable={this.changeValue('timesTable')}
          changePoints={this.changeValue('pointCount')}
          changeColor={this.changeValue('lineColor')}
          colorValue={this.state.lineColor}
          play={this.play}
          pause={this.pause}
          playing={this.state.playing}
        />
        <About />
        <ForkImage href="https://github.com/ajcrites/times-tables">
          {/* tslint:disable:max-line-length */}
          <img
            src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
          />
          {/* tslint:enable */}
        </ForkImage>
      </main>
    );
  }
}
