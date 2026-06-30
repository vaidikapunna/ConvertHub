import { Seo } from '../components/seo/Seo';
import { PageFrame } from '../components/layout/PageFrame';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ToolCatalogGrid } from '../components/tools/ToolCatalogGrid';
import { documentToolCards, siteName } from '../utils/site';
import { Card } from '../components/ui/Card';

export default function DocumentToolsPage() {
  return (
    <>
      <Seo
        title={`${siteName} | Document Tools`}
        description="A future-ready document conversion hub prepared for Word, Excel, and PowerPoint to PDF workflows."
        path="/document-tools"
      />

      <PageFrame className="pb-20 pt-10 lg:pt-16">
        <SectionHeading
          eyebrow="Document tools"
          title="Prepared for office document conversion"
          description="The architecture is ready for browser-safe adapters that can convert Word, Excel, and PowerPoint files to PDF when the appropriate parser layer is added."
        />

        <ToolCatalogGrid items={documentToolCards} />

        <div className="pt-20 grid gap-6 lg:grid-cols-2">
          <Card className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">Adapter-ready design</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Document conversion is isolated behind service interfaces so browser-safe engines can be introduced without touching the UI or routes.
            </p>
          </Card>
          <Card className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">Future roadmap</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              When office file support is added, the same upload, preview, progress, and download UX used by the existing tools can be reused immediately.
            </p>
          </Card>
        </div>
      </PageFrame>
    </>
  );
}
