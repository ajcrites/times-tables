import * as React from 'react';

import { TimesTable } from './TimesTable';
import { TimesTableControls } from './TimesTableControls';
import { About } from './About';

export class TimesTableApp extends React.Component {
  state: {
    pointCount: number;
    timesTable: number;
  } = {
    pointCount: 10,
    timesTable: 2,
  };

  render() {
    return (
      <main>
        <TimesTable
          pointCount={this.state.pointCount}
          timesTable={this.state.timesTable}
        />
        <TimesTableControls
          changeTable={(ev: any) =>
            this.setState({ timesTable: +ev.target.value })}
          changePoints={(ev: any) =>
            this.setState({ pointCount: +ev.target.value })}
        />
        <About />
      </main>
    );
  }
}
