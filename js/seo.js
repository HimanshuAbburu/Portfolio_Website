/**
 * Injects structured data (JSON-LD) into <head> at runtime.
 * Keeping this here rather than inline in HTML separates concerns
 * and lets us reference it as an external file.
 */
const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Himanshu Abburu",
  jobTitle: "Software Engineer (Backend & Integration)",
  email: "mailto:himanshuabburu@gmail.com",
  url: "https://himanshu-abburu.netlify.app/",
  sameAs: [
    "https://www.linkedin.com/in/himanshuabburu",
    "https://github.com/HimanshuAbburu",
  ],
};

const schemaScript = document.createElement("script");
schemaScript.type = "application/ld+json";
schemaScript.textContent = JSON.stringify(PERSON_SCHEMA);
document.head.appendChild(schemaScript);
