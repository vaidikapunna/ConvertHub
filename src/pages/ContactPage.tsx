import { useState } from 'react';
import { Seo } from '../components/seo/Seo';
import { PageFrame } from '../components/layout/PageFrame';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useNotifications } from '../hooks/useNotifications';
import { siteName } from '../utils/site';

const supportEmail = 'support@project-flow.local';

export default function ContactPage() {
  const { pushNotification } = useNotifications();
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('Project Flow inquiry');

  const copyEmail = async () => {
    await navigator.clipboard.writeText(supportEmail);
    pushNotification({
      title: 'Email copied',
      description: 'The support address is ready to paste.',
      tone: 'success',
    });
  };

  return (
    <>
      <Seo
        title={`${siteName} | Contact`}
        description="Get in touch with the Project Flow team for support, feedback, or partnership questions."
        path="/contact"
      />

      <PageFrame className="pb-20 pt-10 lg:pt-16">
        <SectionHeading
          eyebrow="Contact"
          title="Talk to the team"
          description="This frontend-only build uses simple contact surfaces instead of a server-side form backend."
        />

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Card className="space-y-4">
            <p className="text-lg font-semibold text-slate-950 dark:text-white">Support</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              For feedback, support, or roadmap questions, use the email address below.
            </p>
            <a className="block rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-cyan-600 dark:border-slate-800 dark:text-cyan-400" href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={copyEmail}>
                Copy email
              </Button>
              <Button type="button" variant="secondary" as="a" href={`mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}>
                Open mail client
              </Button>
            </div>
          </Card>

          <Card className="space-y-4">
            <p className="text-lg font-semibold text-slate-950 dark:text-white">Quick message</p>
            <div className="space-y-3">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject</span>
                <Input value={subject} onChange={(event) => setSubject(event.target.value)} />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={6}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  placeholder="Tell us what you need or what you’d like to improve."
                />
              </label>
              <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                This form stays local and only pre-fills an email client. No server submission is included.
              </p>
            </div>
          </Card>
        </div>
      </PageFrame>
    </>
  );
}
