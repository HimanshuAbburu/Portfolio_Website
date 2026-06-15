/**
 * Single source of truth for all portfolio content.
 * Edit this file to update the site — no other files need to change.
 */
const DATA = {
  about: {
    name: "Himanshu Abburu",
    summary:
      "Software engineer with 3+ years' experience designing and scaling backend systems across AWS, Azure and Java. Strong background in API design, financial data integration and secure cloud-native architectures. Known for balancing technical depth with business outcomes — from automating financial workflows to improving developer experience.",
  },

  links: {
    phone: "+44 7983876715",
    email: "himanshuabburu@gmail.com",
    linkedin: "https://www.linkedin.com/in/himanshuabburu",
    github: "https://github.com/HimanshuAbburu",
    portfolio: "https://himanshu-abburu.netlify.app/",
  },

  projects: [
    {
      title: "Humble Donations Charity Website",
      subtitle: "Full-stack marketplace",
      desc: "Full-stack digital marketplace modelled on Amazon's e-commerce experience.",
      explain:
        "A feature-rich platform for exchange of goods integrating real-time database functionality and seamless user authentication. Designed with user experience principles in mind, targeting zero downtime through peak hours.",
      tags: ["Node.js", "React", "Express.js", "MongoDB", "Firebase"],
      code: "https://github.com/HimanshuAbburu/HumbleDonations_Frontend",
      demo: "https://humbledonations.netlify.app/",
    },
    {
      title: "Nano-GPT2",
      subtitle: "Transformer from scratch",
      desc: "Production-ready GPT-2 architecture built with PyTorch and Clean Architecture.",
      explain:
        "Implemented a GPT-2 transformer using PyTorch, applying SOLID principles and Clean Architecture for modularity. Built a custom CLI for training and inference with multi-head self-attention and character-level tokenization for large-scale text datasets.",
      tags: ["Python", "PyTorch", "Transformers", "ML"],
      code: "https://github.com/HimanshuAbburu/gpt-2",
    },
    {
      title: "Luhn Algorithm Validator",
      subtitle: "Financial security",
      desc: "High-performance credit card validator to cut unnecessary API calls to payment processors.",
      explain:
        "Engineered a Python-based implementation of the Luhn checksum formula to validate credit card formatting, reducing unnecessary API calls to payment processors. Focused on catching typos and transposed digits for efficient handling of sensitive financial data.",
      tags: ["Python", "Algorithms", "Security"],
      code: "https://github.com/HimanshuAbburu/Luhn_Algo",
    },
  ],

  skills: [
    {
      area: "Languages & APIs",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      items: ["Java", "Python", "Node.js", "REST API", "OpenAPI/Swagger"],
    },
    {
      area: "Frameworks",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
      items: ["Spring Boot", "Express.js", "React"],
    },
    {
      area: "Cloud",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
      items: ["AWS (Lambda, S3, CodeBuild, CloudFormation)", "Azure (LogicApps, APIM)"],
    },
    {
      area: "Databases",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
      items: ["Azure SQL", "MongoDB", "PostgreSQL"],
    },
    {
      area: "DevOps & IaC",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
      items: ["Git", "Azure DevOps", "AWS CodePipeline", "AWS CodeBuild", "Terraform", "CloudFormation"],
    },
    {
      area: "Security",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      items: ["IAM", "RBAC", "OAuth2", "JWT"],
    },
  ],

  experience: [
    {
      role: "Integration Designer & Developer - 3",
      company: "Glue Reply · London",
      companyUrl: "https://www.reply.com/glue-reply/en/",
      dates: "Aug 2025 – Present",
      bullets: [
        "Architected and implemented CI/CD using AWS CodeCommit, CodeBuild, CodePipeline, and EventBridge. Assigned role-based access control across AWS infrastructure for a public sector client.",
        "Led the development of AI-driven automation using RAG-based AI assistants to assess and enhance MuleSoft code, enforce best practices, and reduce code review time by 45%.",
        "Convinced a prospective client to sign up for a new solution after demonstrating deep technical knowledge in discussions.",
      ],
    },
    {
      role: "Integration Designer & Developer - 2",
      company: "Glue Reply · London",
      companyUrl: "https://www.reply.com/glue-reply/en/",
      dates: "Jul 2023 – Aug 2025",
      bullets: [
        "Built financial APIs for ERP and invoicing systems, reducing manual reconciliation by 60% and ensuring more reliable reporting.",
        "Automated complex operational processes using Azure DevOps pipelines, increasing task efficiency and eliminating repetitive manual tasks by up to 50%.",
        "Led the integration of over 40 APIs across nine Azure SQL databases using Azure Logic Apps and API Management to ensure seamless and reliable data synchronisation.",
        "Conceptualised proof-of-concepts leveraging AWS Lambda, S3, and Terraform, enabling a shift from legacy systems to modernised cloud infrastructure.",
      ],
    },
    {
      role: "Integration Developer & Consultant - 1",
      company: "Glue Reply · London",
      companyUrl: "https://www.reply.com/glue-reply/en/",
      dates: "Aug 2022 – Jul 2023",
      bullets: [
        "Automated onboarding processes via Azure DevOps pipelines, cutting processing time by 80%.",
        "Identified and resolved critical operational issues under high-pressure scenarios, preserving system stability and minimising downtime.",
        "Conducted rigorous testing procedures resulting in zero post-deployment errors across all integrations delivered during tenure.",
        "Conducted extensive QA on API implementations, ensuring optimal performance and alignment with stakeholder expectations.",
      ],
    },
    {
      role: "Application Engineering Intern",
      company: "Bosch Rexroth Ltd. · Glenrothes",
      companyUrl: "https://www.boschrexroth.com/en/gb/",
      dates: "Aug 2020 – Aug 2021",
      bullets: [
        "Reengineered internal tools using MATLAB, JavaScript, HTML, and CSS, achieving 100% user adoption and improved usability.",
        "Designed and implemented Java-based ETL applications to automate data aggregation, reducing manual workloads by 70% and improving data accuracy.",
        "Enhanced the R&D Test Tracker by introducing streamlined workflows, intuitive UI components, and new data visualisation features.",
        "Created and distributed a course management system across seven departments, streamlining CSV data processing and improving team access to educational resources.",
      ],
    },
  ],

  education: {
    title: "BSc (Hons) Computer Science with Placement Year — First Class",
    place: "De Montfort University, Leicester, UK",
    list: [],
  },

  certifications: [
    {
      label: "AWS Certified Developer – Associate",
      url: "https://www.credly.com/badges/fc828e0e-99b5-4ade-82a9-ebf42d9d38c6/linked_in_profile",
    },
    {
      label: "AWS Certified AI Practitioner",
      url: "https://www.credly.com/badges/02098d6a-803d-4530-8035-1fe658ea5803/linked_in_profile",
    },
    {
      label: "Data Science & Programming Fundamentals",
      url: "https://www.codecademy.com/profiles/HimanshuAbburu/certificates/5701108f64cd4a02981c161085ccc50e",
    },
    {
      label: "Microsoft Certified: Azure Fundamentals (AZ-900)",
      url: "https://learn.microsoft.com/en-us/users/himanshuabburu-8565/transcript/drzxt0mlwwr3yl7?source=docs",
    },
    {
      label: "Core Java Certification",
      url: "https://www.linkedin.com/in/himanshuabburu/details/certifications/",
    },
  ],
};
