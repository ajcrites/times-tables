import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TimesTableApp } from './TimesTableApp';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<TimesTableApp />, document.getElementById(
  'root',
) as HTMLElement);
registerServiceWorker();
