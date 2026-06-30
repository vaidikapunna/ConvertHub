import { ImageOutputFormat } from '../types/converter';

export async function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to load image.'));
    image.src = src;
  });
}

export async function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Unable to create image blob.'));
          return;
        }

        resolve(blob);
      },
      type,
      quality,
    );
  });
}

export async function rotateFileImage(file: File, rotation: number, targetFormat?: ImageOutputFormat) {
  if (rotation % 360 === 0 && !targetFormat) {
    return file;
  }

  const sourceUrl = URL.createObjectURL(file);
  const image = await loadImage(sourceUrl);
  const radians = (rotation * Math.PI) / 180;
  const swapSize = rotation % 180 !== 0;
  const canvas = document.createElement('canvas');

  canvas.width = swapSize ? image.height : image.width;
  canvas.height = swapSize ? image.width : image.height;

  const context = canvas.getContext('2d');
  if (!context) {
    URL.revokeObjectURL(sourceUrl);
    throw new Error('Canvas is not available.');
  }

  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate(radians);
  context.drawImage(image, -image.width / 2, -image.height / 2);

  URL.revokeObjectURL(sourceUrl);

  const mimeType = targetFormat === 'jpg' ? 'image/jpeg' : file.type || 'image/png';
  const blob = await canvasToBlob(canvas, mimeType, 0.92);
  return new File([blob], file.name.replace(/\.[^.]+$/, `.${mimeType === 'image/jpeg' ? 'jpg' : 'png'}`), {
    type: mimeType,
    lastModified: Date.now(),
  });
}
