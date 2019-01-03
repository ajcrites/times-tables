import * as React from 'react';

import { Circle } from './Circle';
import { CircleNumberDot } from './CircleNumberDot';
import { LineValue } from './LineValue';

export interface TimesTableProps {
  pointCount: number;
  timesTable: number;
  lineColor: string;
}

export interface TimesTableState {
  ctx?: CanvasRenderingContext2D;
}

/**
 * Times Table visualization. Renders the canvas and all components that
 * draw to the canvas. Does the calculations for the properties to render.
 */
export class TimesTable extends React.Component<
  TimesTableProps,
  TimesTableState
> {
  canvas: HTMLCanvasElement;

  constructor(props: TimesTableProps) {
    super(props);
    this.state = {};
  }

  /**
   * When the component mounts, the canvas has been rendered in the DOM.
   * Set the canvas context to the state so we can operate on it.
   */
  componentDidMount() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.setState({
      ctx: this.canvas.getContext('2d'),
    });

    window.addEventListener('resize', this.redraw.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.redraw.bind(this));
  }

  redraw() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.setState(this.state);
  }

  /**
   * Clear the canvas any time new values are recieved (times table / point count).
   * Otherwise the new diagram will be drawn over the previous one.
   */
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

    // We need the canvas to be rendered before we operate on it.
    if (this.state.ctx) {
      // Radius of the circle part of the diagram. This takes up about 80% of
      // the screen but is clamped to width or height (whichever is smaller).
      const radius =
        this.canvas.width > this.canvas.height
          ? this.canvas.height * 0.4
          : this.canvas.width * 0.4;
      circle = <Circle ctx={this.state.ctx} radius={radius} />;

      // The number of points and lines drawn for the diagram
      const entries = Array(+this.props.pointCount).fill(1);

      /*
       * Here we create a function to calculate the x,y coordinate of a point
       * on the canvas based on a value -- typically the index value or
       * starting point of the times table numbers, or the corresponding ending
       * value which is that index multiplied by the times table value.
       *
       * Points are calculated based on the angle formed between a designated
       * starting point (0, r) and an arc. The arc is the distance between the
       * starting point and 360° divided by the total number of points times
       * the current point value/index (starting from 0 to total points - 1).
       * This makes the points equidistant.
       *
       * Once we have the angle (converted to radians), we can get the (x,y)
       * coordinate of the point by taking the sine and cosine of the angle
       * times radius
       *
       * The radius is the radius of the circle above which is 40% of the size
       * of the canvas' smaller dimension.
       *
       *   x = r sin(θ)
       *   y = r cos(θ)
       *
       * We subtract 90° from the arc angle because we consider our starting
       * point 0 to be on the left-center of the circle. The geometric starting
       * point, (0,r) is at the top-center of the circle and is considered to
       * be 0°
       *
       * Finally, we also have to add half the canvas width to the x coordinate
       * and half the canvas height to the y coordinate because the circle for
       * the diagram has its midpoint in the center of the canvas, not 0,0 which
       * is the very top left of the canvas.
       */
      const calculatePoint = (value: number) => {
        const angle =
          (((360 / this.props.pointCount) * value - 90) * Math.PI) / 180;
        return [
          Math.sin(angle) * radius + this.canvas.width / 2,
          Math.cos(angle) * radius + this.canvas.height / 2,
        ];
      };

      // starting point / dot values
      const dotPoints = entries.map((_, idx) => calculatePoint(idx));

      // Ending points. This is calculated from the corresponding start point
      // value (its index) multiplied by the times table value
      const lineEndPoints = entries.map((_, idx) =>
        calculatePoint(idx * this.props.timesTable),
      );

      dots = dotPoints.map(([x, y], idx) => (
        <CircleNumberDot key={idx} ctx={this.state.ctx} x={x} y={y} />
      ));

      lines = lineEndPoints.map(([endX, endY], idx) => (
        <LineValue
          key={idx}
          ctx={this.state.ctx}
          startX={dotPoints[idx][0]}
          startY={dotPoints[idx][1]}
          endX={endX}
          endY={endY}
          color={this.props.lineColor}
        />
      ));
    }

    return (
      <canvas ref={ref => (this.canvas = ref)}>
        {circle}
        {dots}
        {lines}
      </canvas>
    );
  }
}
