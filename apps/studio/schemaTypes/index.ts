import { seo } from './seo';
import { post } from './post';
import { siteSettings } from './siteSettings';
import { page } from './page';
import { homePage } from './homePage';
import { service } from './service';
import { doctorProfile } from './doctorProfile';
import { heroSection } from './sections/heroSection';
import { featuresSection } from './sections/featuresSection';
import { ctaSection } from './sections/ctaSection';

export const schemaTypes = [
  seo,
  post,
  service,
  doctorProfile,
  siteSettings,
  page,
  homePage,
  heroSection,
  featuresSection,
  ctaSection,
];
