import en from './en.json';
import it from './it.json';

export type Locale = 'en' | 'it';

export const languages = {
  en: { path: '/', name: 'English', code: 'EN', switchLabel: 'Read in English' },
  it: { path: '/it/', name: 'Italiano', code: 'IT', switchLabel: 'Leggi in italiano' },
} as const;

const translations: Record<Locale, typeof en> = { en, it };

export function getContent(locale: Locale) {
  return translations[locale];
}

// Official credential names and their status are shared across languages.
export const certifications = [
  { name: 'AWS Certified Solutions Architect - Associate', active: true },
  { name: 'GitLab Solutions Architect Core Verified Associate', active: true },
  { name: 'CKS: Certified Kubernetes Security Specialist', active: false },
  { name: 'CKA: Certified Kubernetes Administrator', active: false },
  { name: 'CKAD: Certified Kubernetes Application Developer', active: false },
  { name: 'KCNA: Kubernetes and Cloud Native Associate', active: false },
  { name: 'KCSA: Kubernetes and Cloud Native Security Associate', active: false },
];
