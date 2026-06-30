import { Seo } from '../components/seo/Seo';
import { PageFrame } from '../components/layout/PageFrame';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PdfToImageTool } from '../components/tools/PdfToImageTool';
import { ToolCatalogGrid } from '../components/tools/ToolCatalogGrid';
import { pdfToolCards, siteName } from '../utils/site';
import { Card } from '../components/ui/Card';

export default function PdfToolsPage() {
  return (
    <>
      <Seo
        title={`${siteName} | PDF Tools`}
        description="Preview PDF pages locally, export them as JPG or PNG, and prepare for future PDF workflows."
        path="/pdf-tools"
      />

      <PageFrame className="pb-20 pt-10 lg:pt-16">
        <SectionHeading
          eyebrow="PDF tools"
          title="Preview PDF pages and export them as images"
          description="Load a PDF, review thumbnails, select any pages you want, and export to JPG or PNG with local ZIP generation."
        />

        <PdfToImageTool />

        <div className="pt-20">
          <SectionHeading
            eyebrow="Planned PDF workflows"
            title="A scalable PDF architecture is already in place"
            description="Merge, split, reorder, rotate, extract images, and compress workflows are mapped into the service layer for future activation."
          />
          <ToolCatalogGrid items={pdfToolCards} />
        </div>

        <div className="pt-20">
          <Card className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">Local rendering</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              The app uses pdf.js in the browser for rendering and JSZip for packaging multi-page exports, keeping the workflow private and fast.
            </p>
          </Card>
        </div>
      </PageFrame>
    </>
  );
}
