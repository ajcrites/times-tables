import * as React from 'react';

import glamorous from 'glamorous';

const ControlsContainer = glamorous.div({
  position: 'fixed',
  bottom: 0,
  right: 0,
  backgroundColor: 'gray',
  whiteSpace: 'nowrap',
});

export interface TimesTableControlsProps {
  timesTableValue: number;
  pointCountValue: number;
  changeTable: Function;
  changePoints: Function;
  play: Function;
  pause: Function;
}

export class TimesTableControls extends React.Component<
  TimesTableControlsProps
> {
  state = { playing: false };

  constructor(props: TimesTableControlsProps) {
    super(props);
  }

  play() {
    this.setState({ playing: true });
    this.props.play();
  }

  pause() {
    this.setState({ playing: false });
    this.props.pause();
  }

  render() {
    return (
      <ControlsContainer>
        <button onClick={() => this.play()} hidden={this.state.playing}>
          ►
        </button>
        <button onClick={() => this.pause()} hidden={!this.state.playing}>
          ❚ ❚
        </button>
        <label>
          Times Table:{' '}
          <input
            type="range"
            min=".1"
            max="100"
            step=".1"
            defaultValue="2"
            onInput={ev => this.props.changeTable(ev)}
          />
          {this.props.timesTableValue.toFixed(1)}
        </label>
        <label>
          Number of Points:{' '}
          <input
            type="range"
            min="2"
            max="300"
            step="1"
            defaultValue="10"
            onInput={ev => this.props.changePoints(ev)}
          />
          {this.props.pointCountValue}
        </label>
      </ControlsContainer>
    );
  }
}
