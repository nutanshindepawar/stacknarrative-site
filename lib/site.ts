// Site-wide constants used for links, SEO and structured data.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://stacknarrative.com").replace(/\/$/, "");
export const SITE_NAME = "StackNarrative";
export const SITE_TAGLINE = "The content engine for B2B tech, specializing in travel & hotel tech";
export const SITE_DESCRIPTION =
  "StackNarrative turns market intelligence, founder expertise and product knowledge into positioning, thought leadership and sales content for B2B tech companies, specializing in travel and hotel tech, run on AI-powered content operations.";
export const CONTACT_EMAIL = "nutan@stacknarrative.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/nutanstrategist/";
export const TOOLBOOK_URL = `${SITE_URL}/AI-content-ops-guide`;
export const TOOLBOOK_CONTRIBUTE_URL = `${TOOLBOOK_URL}/contribute`;
export const FOUNDER = { name: "Nutan Pawar", jobTitle: "Founder, StackNarrative", linkedin: LINKEDIN_URL };

// Google Apps Script web app (apps-script/contact-form.gs). Public by design: it only accepts form posts.
export const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbxdnuOXLGkIiu-OliRlWUDa3rlCsIiVzT-QhLZDVYlzko6sPauoSwE0C9doNZpj7g/exec";

export const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`);
