import * as React from 'react';
import styled from '@emotion/styled';

import { TimesTable } from './visualization/TimesTable';
import { TimesTableControls } from './TimesTableControls';
import { About } from './About';
import { TimesTableContextProps, TimesTableContext } from './TimesTableContext';

const { useState } = React;

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
export const TimesTableApp = () => {
  const [pointCount, setPointCount] = useState(10);
  const [timesTable, setTimesTable] = useState(2);
  const [lineColor, setLineColor] = useState('#000000');

  const state: TimesTableContextProps = {
    pointCount,
    timesTable,
    lineColor,

    setPointCount,
    setTimesTable,
    setLineColor,
  };

  return (
    <main>
      <TimesTableContext.Provider value={state}>
        <TimesTable />
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
};
