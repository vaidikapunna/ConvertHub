import { PDFDocument, degrees } from 'pdf-lib';

export async function mergePdfs(files: File[]) {
  const merged = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const source = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(source, source.getPageIndices());

    pages.forEach((page) => merged.addPage(page));
  }

  const result = await merged.save({ useObjectStreams: true });
  const blobPart = result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength) as ArrayBuffer;
  return new Blob([blobPart], { type: 'application/pdf' });
}

export async function reorderPdfPages(file: File, order: number[]) {
  const bytes = await file.arrayBuffer();
  const source = await PDFDocument.load(bytes);
  const reordered = await PDFDocument.create();
  const pages = await reordered.copyPages(source, order.map((pageNumber) => pageNumber - 1));

  pages.forEach((page) => reordered.addPage(page));
  const result = await reordered.save({ useObjectStreams: true });
  const blobPart = result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength) as ArrayBuffer;
  return new Blob([blobPart], { type: 'application/pdf' });
}

export async function splitPdfPages(file: File, pageNumbers: number[]) {
  const bytes = await file.arrayBuffer();
  const source = await PDFDocument.load(bytes);
  const split = await PDFDocument.create();
  const pages = await split.copyPages(source, pageNumbers.map((pageNumber) => pageNumber - 1));

  pages.forEach((page) => split.addPage(page));
  const result = await split.save({ useObjectStreams: true });
  const blobPart = result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength) as ArrayBuffer;
  return new Blob([blobPart], { type: 'application/pdf' });
}

export async function rotatePdfPages(file: File, pageNumbers: number[], rotation: 90 | 180 | 270) {
  const bytes = await file.arrayBuffer();
  const document = await PDFDocument.load(bytes);

  pageNumbers.forEach((pageNumber) => {
    const page = document.getPage(pageNumber - 1);
    page.setRotation(degrees(rotation));
  });

  const result = await document.save({ useObjectStreams: true });
  const blobPart = result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength) as ArrayBuffer;
  return new Blob([blobPart], { type: 'application/pdf' });
}
