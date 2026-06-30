import { PDFDocument, degrees } from 'pdf-lib';
import type { ImageItem, Orientation, PageSizeOption } from '../../types/converter';
import { rotateFileImage } from '../../utils/image';
import { resolvePageSize } from '../../utils/pdf';

export interface ImageToPdfSettings {
  pageSize: PageSizeOption;
  orientation: Orientation;
  margin: number;
}

async function embedImage(document: PDFDocument, file: File) {
  const bytes = await file.arrayBuffer();

  if (file.type === 'image/png') {
    return document.embedPng(bytes);
  }

  return document.embedJpg(bytes);
}

async function getProcessedImage(file: File, rotation: number) {
  if (rotation % 360 === 0) {
    return file;
  }

  return rotateFileImage(file, rotation);
}

export async function generateImagePdf(
  items: ImageItem[],
  settings: ImageToPdfSettings,
  onProgress?: (progress: number) => void,
) {
  const pdf = await PDFDocument.create();
  const total = items.length;

  for (let index = 0; index < total; index += 1) {
    const item = items[index];
    const processedImage = await getProcessedImage(item.file, item.rotation);
    const image = await embedImage(pdf, processedImage);
    const pageSize = resolvePageSize(settings.pageSize, settings.orientation, image.width, image.height);
    const margin = settings.margin;
    const availableWidth = pageSize.width - margin * 2;
    const availableHeight = pageSize.height - margin * 2;
    const fittedScale = Math.min(availableWidth / image.width, availableHeight / image.height);
    const drawWidth = image.width * fittedScale;
    const drawHeight = image.height * fittedScale;
    const page = pdf.addPage([pageSize.width, pageSize.height]);
    const x = (pageSize.width - drawWidth) / 2;
    const y = (pageSize.height - drawHeight) / 2;

    page.drawImage(image, {
      x,
      y,
      width: drawWidth,
      height: drawHeight,
      rotate: degrees(0),
    });
    onProgress?.(((index + 1) / total) * 100);
  }

  const bytes = await pdf.save({ useObjectStreams: true });
  const blobPart = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  return new Blob([blobPart], { type: 'application/pdf' });
}
