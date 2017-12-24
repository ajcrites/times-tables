export const CircleNumberDot = ({
  ctx,
  angle,
  radius,
}: {
  ctx: CanvasRenderingContext2D;
  angle: number;
  radius: number;
}) => {
  const canvas = ctx.canvas;
  const angleRadians = angle * Math.PI / 180;

  ctx.beginPath();
  const x = Math.sin(angleRadians) * radius + canvas.width / 2;
  const y = Math.cos(angleRadians) * radius + canvas.height / 2;
  ctx.rect(x, y, 1, 1);

  ctx.lineWidth = 10;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'blue';
  ctx.stroke();

  return null;
};
