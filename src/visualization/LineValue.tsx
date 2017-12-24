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
  color,
}: {
  ctx: CanvasRenderingContext2D;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
}) => {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);

  ctx.stroke();

  return null;
};
