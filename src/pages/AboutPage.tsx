import { Seo } from '../components/seo/Seo';
import { PageFrame } from '../components/layout/PageFrame';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { siteName } from '../utils/site';

export default function AboutPage() {
  return (
    <>
      <Seo
        title={`${siteName} | About`}
        description="Learn how ConvertHub keeps file conversion private, accessible, and browser-native."
        path="/about"
      />

      <PageFrame className="pb-20 pt-10 lg:pt-16">
        <SectionHeading
          eyebrow="About"
          title="Built to feel like a modern SaaS product, but run like a local tool"
          description="ConvertHub combines route-based code splitting, lightweight browser APIs, and a clean design system to create a private conversion workspace."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-3">
            <p className="text-lg font-semibold text-slate-950 dark:text-white">Why local-first matters</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              The app keeps image and PDF operations in the browser whenever possible so users can work on sensitive files without upload risk or waiting on a backend.
            </p>
          </Card>
          <Card className="space-y-3">
            <p className="text-lg font-semibold text-slate-950 dark:text-white">How it scales</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Shared UI primitives, conversion services, and route-level lazy loading make it straightforward to add future document and media workflows.
            </p>
          </Card>
          <Card className="space-y-3">
            <p className="text-lg font-semibold text-slate-950 dark:text-white">Accessibility</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              The interface is built with keyboard navigation, clear labels, visible focus rings, and sufficient color contrast in both themes.
            </p>
          </Card>
          <Card className="space-y-3">
            <p className="text-lg font-semibold text-slate-950 dark:text-white">SEO and performance</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Each route gets unique metadata and the app is structured for lazy loading, code splitting, and quick first paint performance.
            </p>
          </Card>
        </div>
      </PageFrame>
    </>
  );
}
