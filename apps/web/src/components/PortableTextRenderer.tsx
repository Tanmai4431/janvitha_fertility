import React from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { urlFor } from '../utils/sanity';
import { getSanityImageProps } from '../utils/image';

interface PortableTextRendererProps {
  value: any[];
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">{children}</p>,
    h1: ({ children }) => <h1 className="font-outfit font-extrabold text-4xl md:text-5xl tracking-tight text-slate-900 dark:text-white mt-12 mb-6">{children}</h1>,
    h2: ({ children }) => <h2 className="font-outfit font-bold text-2xl md:text-3xl tracking-tight text-slate-900 dark:text-white mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="font-outfit font-bold text-xl md:text-2xl tracking-tight text-slate-900 dark:text-white mt-8 mb-4">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-lg text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 py-4 pr-4 rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-700 dark:text-slate-300">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 space-y-2 mb-6 text-slate-700 dark:text-slate-300">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-slate-900 dark:text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => <code className="px-1.5 py-0.5 font-mono text-sm rounded bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-pink-400">{children}</code>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a 
          href={value?.href} 
          target={target} 
          rel={target ? 'noopener noreferrer' : undefined} 
          className="text-primary hover:underline font-medium transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageProps = getSanityImageProps(value, 800);
      if (!imageProps) return null;
      return (
        <figure className="my-10 rounded-card overflow-hidden border border-border bg-background">
          <img 
            src={imageProps.src} 
            srcSet={imageProps.srcset}
            sizes="(max-width: 800px) 100vw, 800px"
            alt={value.alt || 'Blog illustration'} 
            className="w-full h-auto object-cover"
            width={imageProps.width}
            height={imageProps.height}
            style={{ aspectRatio: `${imageProps.aspectRatio}` }}
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="px-6 py-3 text-center text-sm text-secondary border-t border-border bg-surface font-sans">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    videoEmbed: ({ value }) => {
      if (!value?.url) return null;
      return (
        <figure className="my-10 rounded-card overflow-hidden border border-border bg-primary">
          <video 
            src={value.url} 
            controls 
            playsInline 
            className="w-full max-h-[500px] object-cover"
          />
          {value.caption && (
            <figcaption className="px-6 py-3 text-center text-sm text-secondary border-t border-border bg-surface font-sans">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    videoFile: ({ value }) => {
      const url = value?.asset?.url || value?.url;
      if (!url) return null;
      return (
        <figure className="my-10 rounded-card overflow-hidden border border-border bg-primary">
          <video 
            src={url} 
            controls 
            playsInline 
            className="w-full max-h-[500px] object-cover"
          />
        </figure>
      );
    },
  },
};

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
