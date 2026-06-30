import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Seo } from '../components/seo/Seo';
import { PageFrame } from '../components/layout/PageFrame';
import { ArrowRightIcon, DownloadIcon, SparkIcon } from '../components/ui/Icons';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ToolCatalogGrid } from '../components/tools/ToolCatalogGrid';
import { imageToolCards, pdfToolCards, siteName, siteUrl } from '../utils/site';

const highlights = [
  'Browser-only processing',
  'WCAG AA-friendly interaction patterns',
  'SEO-ready route structure',
  'Local PDF and image workflows',
];

export default function HomePage() {
  return (
    <>
      <Seo
        title={`${siteName} | Browser-only file converter`}
        description="A production-ready, local-first file converter for images and PDFs built with React 19 and Vite."
        path="/"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: siteName,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web Browser',
          url: siteUrl,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }}
      />

      <PageFrame className="pb-20 pt-10 lg:pb-28 lg:pt-16">
        <section className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge>Private, local-first, and fast</Badge>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              Convert images and PDFs without sending files to a server.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              ConvertHub delivers a SaaS-style experience with browser-native conversion, responsive layouts, and accessible controls for everyday file work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button as="a" href="/image-tools" icon={<SparkIcon className="h-4 w-4" />}>
                Start with Image Tools
              </Button>
              <Button as="a" href="/pdf-tools" variant="secondary" icon={<ArrowRightIcon className="h-4 w-4" />}>
                Explore PDF Tools
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 via-emerald-500/10 to-transparent blur-3xl" />
            <Card className="overflow-hidden border-slate-200/80 dark:border-slate-800">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-3xl bg-slate-950 p-6 text-white dark:bg-white dark:text-slate-950">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300 dark:text-cyan-700">Workflow</p>
                  <p className="mt-3 text-2xl font-semibold">Upload, preview, reorder, export.</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300 dark:text-slate-600">
                    A compact system that supports image-to-PDF and PDF-to-image conversions with progress feedback and clear state changes.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Performance</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">90+ Lighthouse ready</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Privacy</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Local only</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  ['1', 'Upload files'],
                  ['2', 'Choose settings'],
                  ['3', 'Download locally'],
                ].map(([step, label]) => (
                  <div key={step} className="rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
                    <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Step {step}</p>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section className="pt-20">
          <SectionHeading
            eyebrow="Tools"
            title="A modular conversion studio"
            description="The flagship tools are live, while the rest of the architecture is prepared for safe browser-side expansion."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">Image tools</p>
              <ToolCatalogGrid items={imageToolCards} />
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">PDF tools</p>
              <ToolCatalogGrid items={pdfToolCards} />
            </div>
          </div>
        </section>

        <section className="pt-20">
          <SectionHeading
            eyebrow="Why it feels fast"
            title="Code-splitting, lazy loading, and local processing"
            description="The app loads route-by-route, keeps heavy conversion logic in isolated services, and uses browser APIs for file handling."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Route-based splitting', 'Pages are lazy-loaded so the first render stays lean.'],
              ['Canvas and pdf-lib', 'Converts images and PDFs without shipping work to a server.'],
              ['A11y-first controls', 'Keyboard actions, clear focus states, and readable contrast are built in.'],
            ].map(([title, body]) => (
              <Card key={title} className="h-full">
                <p className="text-lg font-semibold text-slate-950 dark:text-white">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <Card className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">Ready to use</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Start converting locally in the browser.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button as="a" href="/image-tools" icon={<DownloadIcon className="h-4 w-4" />}>
                Convert images
              </Button>
              <Button as="a" href="/contact" variant="secondary">
                Contact us
              </Button>
            </div>
          </Card>
        </section>
      </PageFrame>
    </>
  );
}
