# Project Flow

Project Flow is a frontend-only file converter built with React 19, Vite, TypeScript, Tailwind CSS, React Router, pdf-lib, pdfjs-dist, JSZip, Framer Motion, and the Browser Canvas API.

## Features

- Local image-to-PDF conversion with multiple uploads, drag ordering, rotation, and page sizing
- Local PDF-to-image export with page previews, selection, JPG/PNG output, and ZIP downloads
- Responsive SaaS-style UI with dark mode and accessible interactions
- SEO metadata, Open Graph tags, robots.txt, sitemap.xml, and structured data
- Clean architecture prepared for future document-to-PDF workflows

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview the production build:
   ```bash
   npm run preview
   ```

## Notes

- Image and PDF conversions run locally in the browser whenever the feature is supported.
- Future Word, Excel, and PowerPoint to PDF support is scaffolded in the service layer.
- Theme preference is stored locally in the browser.

## Project Structure

- `src/components` reusable UI and layout pieces
- `src/pages` routed pages
- `src/layouts` application shells
- `src/hooks` state and interaction hooks
- `src/services` conversion logic
- `src/utils` shared helpers
- `src/types` TypeScript definitions
- `src/assets` static assets
- `src/styles` global styling
