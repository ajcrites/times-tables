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
  changeTable: Function;
  changePoints: Function;
  play?: Function;
  pause?: Function;
}

export class TimesTableControls extends React.Component<
  TimesTableControlsProps
> {
  timesTableInput: any = { value: 2 };
  pointsInput: any = { value: 10 };

  constructor(props: TimesTableControlsProps) {
    super(props);
  }

  render() {
    return (
      <ControlsContainer>
        <label>
          Times Table:{' '}
          <input
            ref={input => {
              this.timesTableInput = input;
            }}
            type="range"
            min=".1"
            max="100"
            step=".1"
            defaultValue="2"
            onInput={ev => this.props.changeTable(ev)}
          />
          {this.timesTableInput.value}
        </label>
        <label>
          Number of Points:{' '}
          <input
            ref={input => {
              this.pointsInput = input;
            }}
            type="range"
            min="2"
            max="300"
            step="1"
            defaultValue="10"
            onInput={ev => this.props.changePoints(ev)}
          />
          {this.pointsInput.value}
        </label>
      </ControlsContainer>
    );
  }
}
