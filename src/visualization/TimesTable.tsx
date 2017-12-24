import * as React from 'react';

import { Circle } from './Circle';
import { CircleNumberDot } from './CircleNumberDot';
import { LineValue } from './LineValue';

export interface TimesTableProps {
  pointCount: number;
  timesTable: number;
}

export interface TimesTableState {
  ctx?: CanvasRenderingContext2D;
}

export class TimesTable extends React.Component<
  TimesTableProps,
  TimesTableState
> {
  canvas: HTMLCanvasElement;

  constructor(props: TimesTableProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.setState({
      ctx: this.canvas.getContext('2d') as CanvasRenderingContext2D,
    });
  }

  componentWillReceiveProps() {
    if (this.state.ctx) {
      this.state.ctx.clearRect(
        0,
        0,
        this.state.ctx.canvas.width,
        this.state.ctx.canvas.height,
      );
    }
  }

  render() {
    let circle;
    let dots;
    let lines;
    if (this.state.ctx) {
      const radius =
        this.canvas.width > this.canvas.height
          ? this.canvas.height * 0.4
          : this.canvas.width * 0.4;
      circle = <Circle ctx={this.state.ctx} radius={radius} />;
      const entries = new Array(+this.props.pointCount).fill(1);
      const calculatePoint = (value: number) => {
        const angle =
          (360 / this.props.pointCount * value - 90) * Math.PI / 180;
        return [
          Math.sin(angle) * radius + this.canvas.width / 2,
          Math.cos(angle) * radius + this.canvas.height / 2,
        ];
      };
      const dotPoints = entries.map((_, idx) => calculatePoint(idx));
      const lineEndPoints = entries.map((_, idx) =>
        calculatePoint(idx * this.props.timesTable),
      );

      dots = dotPoints.map(([x, y], idx) => (
        <CircleNumberDot
          key={idx}
          ctx={this.state.ctx as CanvasRenderingContext2D}
          x={x}
          y={y}
        />
      ));

      lines = lineEndPoints.map(([endX, endY], idx) => (
        <LineValue
          key={idx}
          ctx={this.state.ctx as CanvasRenderingContext2D}
          startX={dotPoints[idx][0]}
          startY={dotPoints[idx][1]}
          endX={endX}
          endY={endY}
        />
      ));
    }

    return (
      <canvas ref={ref => (this.canvas = ref as HTMLCanvasElement)}>
        {circle}
        {dots}
        {lines}
      </canvas>
    );
  }
}
