import projectsData from "../../content/projects/projects.json";
import blogsData from "../../content/blogs/blogs.json";

/**
 * Written content for the site.
 *
 * Projects and blog posts are edited as JSON under `content/` — see
 * `content/projects/schema.json` and `content/blogs/schema.json` for the
 * shape of each entry. Everything else lives in this file.
 */

/* ------------------------------------------------------------------ About */

export const bio: string[] = [
  "I'm Aman — an SAP Technical Lead with around nine years of consulting experience across multiple SAP verticals and systems. Day to day that means architecting solutions, shaping scope, and carrying project deliverables through to something that actually works in production.",
  "Most of my depth is in ABAP on HANA and the SAP Business Technology Platform: RAP and Cloud ABAP, CDS views and AMDP, and BTP services like Integration Suite, HANA Cloud and Event Mesh. A good chunk of my work has been integration — getting SAP to talk cleanly to other SAP systems and to third parties like Salesforce and AWS, then keeping that conversation observable when it breaks.",
  "Lately I've been pulling AI into that same territory, which is where side projects like SupplyMindIQ come from. I write about what I learn and take on selected contract and freelance engagements — if you're working on something that sounds like a fit, I'd like to hear about it.",
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "ABAP Development",
    items: [
      "ABAP on HANA",
      "OO ABAP",
      "SAP RAP",
      "Cloud ABAP",
      "CDS Views",
      "AMDP",
      "OData",
      "WRICEF",
      "BAPI / BAdI",
      "Workflows",
      "IDocs",
      "Adobe Forms",
    ],
  },
  {
    category: "SAP BTP",
    items: [
      "Integration Suite",
      "HANA Cloud",
      "Cloud Foundry",
      "ABAP Environment",
      "Build Process Automation",
      "Event Mesh",
      "Build WorkZone",
    ],
  },
  {
    category: "Systems",
    items: [
      "S/4HANA On-Premise",
      "S/4HANA Cloud, Public",
      "S/4HANA Cloud, Private",
      "SAP SRM",
      "SAP ECC 6.0",
      "SAP EWM",
    ],
  },
  {
    category: "Integration & Cloud",
    items: [
      "SAP CPI",
      "Groovy Scripts",
      "Open Connectors",
      "Salesforce",
      "AWS S3",
      "AWS Lambda",
      "AWS SageMaker",
    ],
  },
  {
    category: "Business Processes",
    items: ["Sales & Distribution", "Material Management", "Embedded Warehouse Management"],
  },
  {
    category: "Tools",
    items: ["SAP BAS", "Eclipse", "VS Code", "SAP UI5", "Git"],
  },
];

/* --------------------------------------------------------- Work history */

export type TimelineEntry = {
  id: string;
  organization: string;
  role: string;
  /** "YYYY" or "YYYY-MM". */
  start: string;
  /** "YYYY", "YYYY-MM", or "present". */
  end: string;
  location?: string;
  summary?: string;
};

/**
 * Order does not matter — the timeline sorts chronologically.
 * Entries are grouped per employer; promotions within one company are noted in
 * the summary rather than drawn as separate overlapping bars.
 */
export const timeline: TimelineEntry[] = [
  {
    id: "percipere",
    organization: "Percipere",
    role: "SAP Lead Consultant",
    start: "2022-12",
    end: "present",
    location: "New Delhi, India",
    summary:
      "Joined as Technical Consultant, promoted to Senior in 2023 and to Lead in 2024.",
  },
  {
    id: "collabera",
    organization: "Collabera Inc.",
    role: "Product Developer",
    start: "2021-10",
    end: "2022-11",
    location: "Bengaluru, India",
  },
  {
    id: "ey",
    organization: "EY",
    role: "SAP Technical Consultant",
    start: "2021-05",
    end: "2021-09",
    location: "Noida, India",
  },
  {
    id: "invenio",
    organization: "Invenio Business Solutions",
    role: "Associate SAP Technical Consultant",
    start: "2017-09",
    end: "2021-04",
    location: "Noida, India",
    summary:
      "Implementation, migration and support projects across supply chain modules.",
  },
];

/* ------------------------------------------------------------- Projects */

export type Project = {
  name: string;
  tagline?: string;
  description: string;
  image: string;
  repo: string;
  demo?: string;
  tags?: string[];
  featured?: boolean;
};

/** Edit `content/projects/projects.json`. Featured entries float to the top. */
export const projects: Project[] = [
  ...(projectsData.projects as Project[]),
].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));

/* ---------------------------------------------------------------- Blogs */

export type BlogPost = {
  title: string;
  url: string;
  date: string;
  excerpt: string;
  tags?: string[];
  readingTime?: string;
};

/** Edit `content/blogs/blogs.json`. Sorted newest first. */
export const blogPosts: BlogPost[] = [
  ...(blogsData.posts as BlogPost[]),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
