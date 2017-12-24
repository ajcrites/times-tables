/**
 * Draw a line in the times table. The starting point is the index / operand
 * value, and the ending point is calculated based on said value multiplied
 * by the times table value.
 */
export const LineValue = ({
  ctx,
  startX,
  startY,
  endX,
  endY,
}: {
  ctx: CanvasRenderingContext2D;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}) => {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);

  ctx.stroke();

  return null;
};
