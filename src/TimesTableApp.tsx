import * as React from 'react';

import { TimesTable } from './visualization/TimesTable';
import { TimesTableControls } from './TimesTableControls';
import { About } from './About';

import { random } from 'lodash';

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

  play() {
    this.playInterval = window.setInterval(() => {
      let playing = true;
      let timesTable = this.state.timesTable + 0.1;
      let lineColor = this.state.lineColor;
      if ('5' === timesTable.toFixed(1).split('.')[1]) {
        lineColor = `hsl(${random(0, 360)},${random(70, 100)}%,${random(
          35,
          55,
        )}%)`;
      }

      if (timesTable > 100) {
        timesTable = 100;
        playing = false;
        this.pause();
      }

      this.setState({
        timesTable,
        lineColor,
        playing,
      });
    }, 100);
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
          changeTable={(ev: any) =>
            this.setState({ timesTable: +ev.target.value })}
          changePoints={(ev: any) =>
            this.setState({ pointCount: +ev.target.value })}
          changeColor={(ev: any) =>
            this.setState({ lineColor: ev.target.value })}
          play={() => this.play()}
          pause={() => this.pause()}
          playing={this.state.playing}
        />
        <About />
      </main>
    );
  }
}
