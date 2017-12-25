import * as React from 'react';

import glamorous from 'glamorous';

import { TimesTable } from './visualization/TimesTable';
import { TimesTableControls } from './TimesTableControls';
import { About } from './About';

import { random } from 'lodash';

const ForkImage = glamorous.a({
  position: 'fixed',
  top: 0,
  right: 0,
  '@media(max-width: 480px)': {
    display: 'none',
  },
});

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

  pause() {
    clearInterval(this.playInterval);
    this.setState({ playing: false });
  }

  getVibrantColor() {
    return `hsl(${random(0, 360)},${random(70, 100)}%,${random(35, 55)}%)`;
  }

  play() {
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
  }

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
          changeTable={(ev: { target: { value: string } }) =>
            this.setState({ timesTable: +ev.target.value })}
          changePoints={(ev: { target: { value: string } }) =>
            this.setState({ pointCount: +ev.target.value })}
          changeColor={(ev: { target: { value: string } }) =>
            this.setState({ lineColor: ev.target.value })}
          play={() => this.play()}
          pause={() => this.pause()}
          playing={this.state.playing}
        />
        <About />
        <ForkImage href="https://github.com/ajcrites/times-tables">
          <img
            src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
          />
        </ForkImage>
      </main>
    );
  }
}
