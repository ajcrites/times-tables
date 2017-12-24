import * as React from 'react';

import { TimesTable } from './TimesTable';
import { About } from './About';

export class TimesTableApp extends React.Component {
  render() {
    return (
      <main>
        <TimesTable />
        <About />
      </main>
    );
  }
}
