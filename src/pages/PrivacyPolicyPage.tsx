import { Seo } from '../components/seo/Seo';
import { PageFrame } from '../components/layout/PageFrame';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { siteName } from '../utils/site';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Seo
        title={`${siteName} | Privacy Policy`}
        description="Privacy policy for ConvertHub, a browser-only file conversion application."
        path="/privacy-policy"
      />

      <PageFrame className="pb-20 pt-10 lg:pt-16">
        <SectionHeading
          eyebrow="Privacy Policy"
          title="Your files stay in your browser whenever the tool supports it"
          description="This policy explains the frontend-only processing model and the limited information handled by the app."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-3">
            <p className="text-lg font-semibold text-slate-950 dark:text-white">File handling</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Supported conversions are performed locally in the browser. For the implemented tools, uploaded files are not sent to a server.
            </p>
          </Card>
          <Card className="space-y-3">
            <p className="text-lg font-semibold text-slate-950 dark:text-white">Analytics and cookies</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              This starter project does not include analytics, cookies, or tracking scripts. Any future telemetry should be disclosed before activation.
            </p>
          </Card>
          <Card className="space-y-3">
            <p className="text-lg font-semibold text-slate-950 dark:text-white">Storage</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Theme preference is stored locally in the browser. No account system or server-side storage is included in this frontend-only build.
            </p>
          </Card>
          <Card className="space-y-3">
            <p className="text-lg font-semibold text-slate-950 dark:text-white">Future updates</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              If future document adapters or additional features are introduced, the privacy policy should be updated to reflect any new processing behavior.
            </p>
          </Card>
        </div>
      </PageFrame>
    </>
  );
}
