import * as React from 'react';
import styled from '@emotion/styled';
import { isFunction } from 'lodash';

import { TimesTable } from './visualization/TimesTable';
import { TimesTableControls } from './TimesTableControls';
import { About } from './About';
import { getVibrantColor } from './getVibrantColor';
import { TimesTableContextProps, TimesTableContext } from './TimesTableContext';

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

  changeValue = valueName => value => {
    if (isFunction(value)) {
      this.setState({ [valueName]: value(this.state[valueName]) });
    } else {
      this.setState({ [valueName]: value });
    }
  };

  state: TimesTableContextProps = {
    pointCount: 10,
    timesTable: 2,
    lineColor: '#000000',

    setPointCount: this.changeValue('pointCount'),
    setTimesTable: this.changeValue('timesTable'),
    setLineColor: this.changeValue('lineColor'),
  };

  play = () => {
    this.playInterval = window.setInterval(() => {
      let timesTable = this.state.timesTable + 0.1;
      let lineColor = this.state.lineColor;
      if ('5' === timesTable.toFixed(1).split('.')[1]) {
        lineColor = getVibrantColor();
      }

      if (timesTable > 100) {
        timesTable = 100;
      }

      this.setState({
        timesTable,
        lineColor,
      });
    }, 100);

    this.setState({
      lineColor: getVibrantColor(),
    });
  };

  render() {
    return (
      <main>
        <TimesTableContext.Provider value={this.state}>
          <TimesTable
            pointCount={this.state.pointCount}
            timesTable={this.state.timesTable}
            lineColor={this.state.lineColor}
          />
          <TimesTableControls />
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
        </TimesTableContext.Provider>
      </main>
    );
  }
}
