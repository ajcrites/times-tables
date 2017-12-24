export const CircleNumberDot = ({
  ctx,
  x,
  y,
}: {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
}) => {
  ctx.beginPath();
  ctx.rect(x, y, 1, 1);

  ctx.lineWidth = 10;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'blue';
  ctx.stroke();

  return null;
};
