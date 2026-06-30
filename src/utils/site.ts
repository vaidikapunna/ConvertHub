import type { ToolCard } from '../types/converter';

export const siteName = "ConvertHub";
export const siteUrl = 'https://project-flow.local';

export const imageToolCards: ToolCard[] = [
  {
    title: 'Image to PDF',
    description: 'Combine JPG, JPEG, and PNG files into a polished PDF with local drag-and-drop ordering.',
    href: '/image-tools',
    status: 'ready',
  },
  {
    title: 'WEBP ↔ JPG/PNG',
    description: 'Future-ready browser transforms for modern image formats.',
    href: '/image-tools',
    status: 'planned',
  },
  {
    title: 'Resize, Compress, Crop, Rotate',
    description: 'A modular image utility lane prepared for canvas-based editing workflows.',
    href: '/image-tools',
    status: 'planned',
  },
];

export const pdfToolCards: ToolCard[] = [
  {
    title: 'PDF to Image',
    description: 'Preview pages, select specific pages, and export them as JPG or PNG with ZIP support.',
    href: '/pdf-tools',
    status: 'ready',
  },
  {
    title: 'Merge, Split, Reorder, Rotate',
    description: 'Prepared with local pdf-lib adapters for the next wave of PDF workflows.',
    href: '/pdf-tools',
    status: 'planned',
  },
  {
    title: 'Extract Images, Compress',
    description: 'Structured for future enhancements without changing the product architecture.',
    href: '/pdf-tools',
    status: 'planned',
  },
];

export const documentToolCards: ToolCard[] = [
  {
    title: 'Word to PDF',
    description: 'Planned browser-safe pipeline for DOCX to PDF conversion.',
    href: '/document-tools',
    status: 'planned',
  },
  {
    title: 'Excel to PDF',
    description: 'Architecture prepared for spreadsheet rendering and conversion.',
    href: '/document-tools',
    status: 'planned',
  },
  {
    title: 'PowerPoint to PDF',
    description: 'Presentation conversion slots ready for future integration.',
    href: '/document-tools',
    status: 'planned',
  },
];
