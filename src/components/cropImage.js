import { createCanvas } from 'canvas';

export const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
  const canvas = createCanvas(pixelCrop.width, pixelCrop.height);
  const ctx = canvas.getContext('2d');

  const image = await new Promise((resolve) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => resolve(img);
  });

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.save();
  ctx.translate(pixelCrop.width / 2, pixelCrop.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(
    image,
    pixelCrop.x - pixelCrop.width / 2,
    pixelCrop.y - pixelCrop.height / 2,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );
  ctx.restore();

  return canvas.toDataURL()
};
