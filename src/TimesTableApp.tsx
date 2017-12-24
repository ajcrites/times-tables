import * as React from 'react';

import { TimesTable } from './visualization/TimesTable';
import { TimesTableControls } from './TimesTableControls';
import { About } from './About';

/**
 * Main app container. Renders the About information, the times table itself,
 * and the times table controls
 */
export class TimesTableApp extends React.Component {
  playInterval: number;

  state: {
    pointCount: number;
    timesTable: number;
  } = {
    pointCount: 10,
    timesTable: 2,
  };

  pause() {
    clearInterval(this.playInterval);
  }

  play() {
    this.playInterval = window.setInterval(() => {
      this.setState({ timesTable: this.state.timesTable + 0.1 });
    }, 100);
  }

  render() {
    return (
      <main>
        <TimesTable
          pointCount={this.state.pointCount}
          timesTable={this.state.timesTable}
        />
        <TimesTableControls
          timesTableValue={this.state.timesTable}
          pointCountValue={this.state.pointCount}
          changeTable={(ev: any) =>
            this.setState({ timesTable: +ev.target.value })}
          changePoints={(ev: any) =>
            this.setState({ pointCount: +ev.target.value })}
          play={() => this.play()}
          pause={() => this.pause()}
        />
        <About />
      </main>
    );
  }
}
