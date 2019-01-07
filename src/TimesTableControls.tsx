import * as React from 'react';

import styled from '@emotion/styled';

import { TimesTableContext } from './TimesTableContext';
import { getVibrantColor } from './getVibrantColor';

const { useRef, useContext, useState } = React;

const ControlsContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #dddddd;
  white-space: nowrap;
  padding: 5px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const BlockLabel = styled.label<{ hideOnPhone?: boolean }>(
  {
    display: 'block',
    marginTop: '8px',
  },
  ({ hideOnPhone }) => ({
    '@media(max-width: 480px)': {
      visibility: hideOnPhone ? 'hidden' : 'visible',
    },
  }),
);

const LabelText = styled.span`
  display: inline-block;
  width: 150px;
`;

const SliderInput = styled.input`
  vertical-align: middle;
  margin-right: 10px;
`;

const ValueSpan = styled.span`
  width: 40px;
  text-align: right;
  display: inline-block;
`;

/**
 * Controls that allow you to set the times table as well as the number of
 * points as well as play/pause functionality.
 */
export const TimesTableControls = () => {
  const playTimer = useRef(null);
  const {
    timesTable,
    lineColor,
    pointCount,

    setPointCount,
    setTimesTable,
    setLineColor,
  } = useContext(TimesTableContext);

  const [playing, setPlaying] = useState(false);

  const pause = () => {
    clearInterval(playTimer.current);
    setPlaying(false);
  };

  const play = () => {
    setPlaying(true);
    playTimer.current = setInterval(() => {
      setTimesTable(prevTimesTable => {
        let nextTimesTable = prevTimesTable + 0.1;
        if (nextTimesTable > 100) {
          pause();
          nextTimesTable = 100;
        }

        setLineColor(prevLineColor => {
          let nextLineColor = prevLineColor;
          if ('5' === nextTimesTable.toFixed(1).split('.')[1]) {
            nextLineColor = getVibrantColor();
          }

          return nextLineColor;
        });

        return nextTimesTable;
      });
    }, 100);
  };

  const onTableInput = ({ target: { value } }) => setTimesTable(+value);
  const onPointsInput = ({ target: { value } }) => setPointCount(+value);
  const onColorInput = ({ target: { value } }) => setLineColor(value);

  const formatTimesTableValue = (value: number) => {
    const displayValue = value.toFixed(1);
    if ('0' === displayValue.split('.')[1]) {
      return value.toFixed(0);
    }
    return displayValue;
  };

  return (
    <ControlsContainer className="iphonex-bottom">
      <button onClick={play} hidden={playing}>
        ►
      </button>
      <button onClick={pause} hidden={!playing}>
        ❚ ❚
      </button>
      <BlockLabel>
        <LabelText>Times Table: </LabelText>
        <SliderInput
          type="range"
          min=".1"
          max="100"
          step=".1"
          value={timesTable}
          onChange={onTableInput}
        />
        <ValueSpan>{formatTimesTableValue(timesTable)}</ValueSpan>
      </BlockLabel>
      <BlockLabel>
        <LabelText>Number of Points: </LabelText>
        <SliderInput
          type="range"
          min="2"
          max="300"
          step="1"
          defaultValue="10"
          onChange={onPointsInput}
        />
        <ValueSpan>{pointCount}</ValueSpan>
      </BlockLabel>
      <BlockLabel hideOnPhone>
        <LabelText>Color:</LabelText>
        <input type="color" onChange={onColorInput} value={lineColor} />
      </BlockLabel>
    </ControlsContainer>
  );
};
