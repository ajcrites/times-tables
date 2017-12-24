import * as React from 'react';

import { Circle } from './Circle';
import { CircleNumberDot } from './CircleNumberDot';

class App extends React.Component {
  canvas: HTMLCanvasElement;
  state: {
    ctx?: CanvasRenderingContext2D;
    pointCount: number;
    timesTable: number;
  } = {
    pointCount: 10,
    timesTable: 2,
  };

  componentDidMount() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.setState({
      ctx: this.canvas.getContext('2d') as CanvasRenderingContext2D,
    });
  }

  render() {
    let circle;
    let dots;
    if (this.state.ctx) {
      const radius =
        this.canvas.width > this.canvas.height
          ? this.canvas.height * 0.4
          : this.canvas.width * 0.4;
      circle = <Circle ctx={this.state.ctx} radius={radius} />;
      dots = new Array(this.state.pointCount).fill(1).map((_, idx) => {
        return (
          <CircleNumberDot
            key={idx}
            ctx={this.state.ctx as CanvasRenderingContext2D}
            angle={360 / this.state.pointCount * idx - 90}
            radius={radius}
          />
        );
      });
      // const table = [];
      // const uniqueAxes = {};
      let counter = 0;
      do {
        const val = counter % this.state.pointCount;
        const angle = 360 / this.state.pointCount * val - 90;
        const angleRadians = angle * Math.PI / 180;
        const startX = Math.sin(angleRadians) * radius + this.canvas.width / 2;
        const startY = Math.cos(angleRadians) * radius + this.canvas.height / 2;

        const endVal = val * this.state.timesTable;
        const endAngle = 360 / this.state.pointCount * endVal - 90;
        const endAngleRadians = endAngle * Math.PI / 180;
        const endX = Math.sin(endAngleRadians) * radius + this.canvas.width / 2;
        const endY =
          Math.cos(endAngleRadians) * radius + this.canvas.height / 2;

        this.state.ctx.beginPath();
        this.state.ctx.strokeStyle = 'black';
        this.state.ctx.moveTo(startX, startY);
        this.state.ctx.lineTo(endX, endY);
        this.state.ctx.stroke();

        counter++;
      } while (counter < this.state.pointCount);
    }
    return (
      <canvas ref={ref => (this.canvas = ref as HTMLCanvasElement)}>
        {circle}
        {dots}
      </canvas>
    );
  }
}

export default App;
