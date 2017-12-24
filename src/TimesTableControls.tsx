import * as React from 'react';

import glamorous from 'glamorous';

const ControlsContainer = glamorous.div({
  position: 'fixed',
  bottom: 0,
  right: 0,
  backgroundColor: '#DDDDDD',
  whiteSpace: 'nowrap',
  padding: '5px',
  boxSizing: 'border-box',
  '@media(max-width: 480px)': {
    width: '100%',
  },
});

const BlockLabel = glamorous.label<{ hideOnPhone?: boolean }>(
  {
    display: 'block',
    marginTop: '8px',
  },
  ({ hideOnPhone }) => ({
    '@media(max-width: 480px)': {
      display: hideOnPhone ? 'none' : 'block',
    },
  }),
);

const LabelText = glamorous.span({
  display: 'inline-block',
  width: '150px',
});

const SliderInput = glamorous.input({
  verticalAlign: 'middle',
  marginRight: '10px',
});

export interface TimesTableControlsProps {
  timesTableValue: number;
  pointCountValue: number;
  changeTable: Function;
  changePoints: Function;
  changeColor: Function;
  play: Function;
  pause: Function;
  playing: boolean;
}

/**
 * Controls that allow you to set the times table as well as the number of
 * points as well as play/pause functionality.
 */
export class TimesTableControls extends React.Component<
  TimesTableControlsProps
> {
  constructor(props: TimesTableControlsProps) {
    super(props);
  }

  play() {
    this.props.play();
  }

  pause() {
    this.props.pause();
  }

  render() {
    return (
      <ControlsContainer>
        <button onClick={() => this.play()} hidden={this.props.playing}>
          ►
        </button>
        <button onClick={() => this.pause()} hidden={!this.props.playing}>
          ❚ ❚
        </button>
        <BlockLabel>
          <LabelText>Times Table: </LabelText>
          <SliderInput
            type="range"
            min=".1"
            max="100"
            step=".1"
            defaultValue="2"
            onInput={ev => this.props.changeTable(ev)}
          />
          {this.props.timesTableValue.toFixed(1)}
        </BlockLabel>
        <BlockLabel>
          <LabelText>Number of Points: </LabelText>
          <SliderInput
            type="range"
            min="2"
            max="300"
            step="1"
            defaultValue="10"
            onInput={ev => this.props.changePoints(ev)}
          />
          {this.props.pointCountValue}
        </BlockLabel>
        <BlockLabel hideOnPhone>
          <LabelText>Color:</LabelText>
          <input type="color" onInput={ev => this.props.changeColor(ev)} />
        </BlockLabel>
      </ControlsContainer>
    );
  }
}
