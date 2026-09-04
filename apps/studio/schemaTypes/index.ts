import { seo } from './seo';
import { post } from './post';
import { siteSettings } from './siteSettings';
import { page } from './page';
import { homePage } from './homePage';
import { heroSection } from './sections/heroSection';
import { featuresSection } from './sections/featuresSection';
import { ctaSection } from './sections/ctaSection';

export const schemaTypes = [
  seo,
  post,
  siteSettings,
  page,
  homePage,
  heroSection,
  featuresSection,
  ctaSection,
];
