export type ThemeMode = 'light' | 'dark';

export type PageSizeOption = 'auto' | 'a4' | 'letter' | 'legal';

export type Orientation = 'portrait' | 'landscape';

export type ImageOutputFormat = 'jpg' | 'png';

export interface ConversionNotification {
  id: string;
  title: string;
  description: string;
  tone: 'success' | 'error' | 'info';
}

export interface ImageItem {
  id: string;
  file: File;
  url: string;
  rotation: number;
}

export interface PdfPageSelection {
  pageNumber: number;
  selected: boolean;
  thumbnail: string;
}

export interface ToolCard {
  title: string;
  description: string;
  href: string;
  status: 'ready' | 'planned';
}
