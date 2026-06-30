import { Seo } from '../components/seo/Seo';
import { PageFrame } from '../components/layout/PageFrame';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ImageToPdfTool } from '../components/tools/ImageToPdfTool';
import { ToolCatalogGrid } from '../components/tools/ToolCatalogGrid';
import { imageToolCards, siteName } from '../utils/site';
import { Card } from '../components/ui/Card';

export default function ImageToolsPage() {
  return (
    <>
      <Seo
        title={`${siteName} | Image Tools`}
        description="Convert images locally in the browser, including image-to-PDF workflows and future-ready image utilities."
        path="/image-tools"
      />

      <PageFrame className="pb-20 pt-10 lg:pt-16">
        <SectionHeading
          eyebrow="Image tools"
          title="Create PDFs from images with total control"
          description="Upload multiple images, drag to reorder, rotate pages, adjust margins, and download the PDF automatically."
        />

        <ImageToPdfTool />

        <div className="pt-20">
          <SectionHeading
            eyebrow="Planned image workflows"
            title="The image suite is architected for expansion"
            description="Additional image transforms are mapped into the product structure and can be enabled without reworking the layout."
          />
          <ToolCatalogGrid items={imageToolCards} />
        </div>

        <div className="pt-20">
          <Card className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">Accessibility</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              The upload area, ordering controls, and conversion actions are all keyboard reachable and maintain strong focus states for WCAG AA use.
            </p>
          </Card>
        </div>
      </PageFrame>
    </>
  );
}
