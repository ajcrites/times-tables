/**
 * Draw the circle part of the times table diagram on the canvas.
 *
 * We put this in the very center -- its midpoint is width/2,height/2 and
 * its radius is calculated by TimesTable.
 */
export const Circle = ({
  ctx,
  radius,
}: {
  ctx: CanvasRenderingContext2D;
  radius: number;
}) => {
  const canvas = ctx.canvas;
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);

  ctx.lineWidth = 3;
  ctx.strokeStyle = 'red';
  ctx.stroke();
  return null;
};
