import { Seo } from '../components/seo/Seo';
import { PageFrame } from '../components/layout/PageFrame';
import { SectionHeading } from '../components/ui/SectionHeading';
import { MergePdfTool } from '../components/tools/MergePdfTool';
import { siteName } from '../utils/site';
import { Card } from '../components/ui/Card';

export default function MergePdfPage() {
  return (
    <>
      <Seo
        title={`${siteName} | Merge PDF`}
        description="Merge multiple PDF files locally in the browser with drag-and-drop ordering and instant download."
        path="/merge-pdf"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${siteName} | Merge PDF`,
          url: 'https://project-flow.local/merge-pdf',
          description: 'Browser-only PDF merge tool with drag-and-drop ordering and download.',
        }}
      />

      <PageFrame className="pb-20 pt-10 lg:pt-16">
        <SectionHeading
          eyebrow="PDF tools"
          title="Merge multiple PDFs locally in your browser"
          description="Upload PDF files, reorder them by drag-and-drop, remove any files you do not need, and download a single merged PDF."
        />

        <MergePdfTool />

        <div className="pt-20">
          <Card className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">SEO ready</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              This route has its own metadata so search engines and link previews can distinguish the merge workflow from the rest of the app.
            </p>
          </Card>
        </div>
      </PageFrame>
    </>
  );
}
