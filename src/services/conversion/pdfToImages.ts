import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import type { ImageOutputFormat } from '../../types/converter';

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export interface PdfToImageSettings {
  format: ImageOutputFormat;
  scale: number;
}

export interface PdfImageFile {
  pageNumber: number;
  file: File;
  width: number;
  height: number;
}

async function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality = 0.92) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Could not create image.'));
          return;
        }

        resolve(blob);
      },
      type,
      quality,
    );
  });
}

export async function renderPdfPages(
  file: File,
  settings: PdfToImageSettings,
  onProgress?: (progress: number) => void,
  selectedPages?: number[],
) {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = getDocument({ data: arrayBuffer });
  const pdfDocument = await loadingTask.promise;
  const pages = selectedPages?.length ? selectedPages : Array.from({ length: pdfDocument.numPages }, (_, index) => index + 1);
  const results: PdfImageFile[] = [];

  for (let index = 0; index < pages.length; index += 1) {
    const pageNumber = pages[index];
    const page = await pdfDocument.getPage(pageNumber);
    const viewport = page.getViewport({ scale: settings.scale });
    const canvas = globalThis.document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Canvas rendering is unavailable in this browser.');
    }

    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);

    await page.render({ canvasContext: context, viewport }).promise;

    const mimeType = settings.format === 'png' ? 'image/png' : 'image/jpeg';
    const blob = await canvasToBlob(canvas, mimeType);
    const extension = settings.format;
    const fileName = `${file.name.replace(/\.pdf$/i, '')}-page-${pageNumber}.${extension}`;

    results.push({
      pageNumber,
      file: new File([blob], fileName, { type: mimeType, lastModified: Date.now() }),
      width: canvas.width,
      height: canvas.height,
    });

    onProgress?.(((index + 1) / pages.length) * 100);
  }

  return results;
}
