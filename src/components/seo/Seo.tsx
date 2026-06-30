import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  structuredData?: Record<string, unknown>;
}

export function Seo({ title, description, path = '/', structuredData }: SeoProps) {
  useEffect(() => {
    document.title = title;

    const ensureMeta = (attribute: 'name' | 'property', key: string, value: string) => {
      let tag = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;

      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.append(tag);
      }

      tag.content = value;
    };

    ensureMeta('name', 'description', description);
    ensureMeta('property', 'og:title', title);
    ensureMeta('property', 'og:description', description);
    ensureMeta('property', 'og:url', `https://project-flow.local${path}`);
    ensureMeta('property', 'twitter:card', 'summary_large_image');

    const canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = `https://project-flow.local${path}`;
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = `https://project-flow.local${path}`;
      document.head.append(link);
    }

    let jsonLd = document.head.querySelector('script[data-seo-jsonld="true"]') as HTMLScriptElement | null;
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.type = 'application/ld+json';
      jsonLd.dataset.seoJsonld = 'true';
      document.head.append(jsonLd);
    }

    jsonLd.textContent = JSON.stringify(
      structuredData ?? {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: "ConvertHub",
        url: `https://convert-hub-six.vercel.app${path}`,
        description,
      },
    );
  }, [description, path, structuredData, title]);

  return null;
}
