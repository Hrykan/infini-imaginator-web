import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteUrl = "https://imaginator.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/icon.svg",
  },

  title: {
    default: "Infini Imaginator Tech | AI Automation & Business Intelligence Consulting",
    template: "%s | Infini Imaginator Tech",
  },
  description:
    "Enterprise AI automation and business intelligence consulting. 9+ years, 500+ BI reports, $500K in actionable insights. We build AI agents, n8n workflows, Snowflake pipelines, and executive dashboards that deliver measurable ROI.",

  keywords: [
    "AI automation consulting",
    "business intelligence consulting",
    "data analytics consulting",
    "n8n workflow automation",
    "AI agents for business",
    "Snowflake consulting",
    "enterprise data engineering",
    "executive dashboards",
    "Tableau consulting",
    "Qlik Sense consulting",
    "ETL pipeline development",
    "AI strategy consulting",
    "data warehouse consulting",
    "OpenAI API integration",
    "LangChain consulting",
    "React Native development",
    "Informatica ETL",
    "SQL Server BI",
    "Mukul Kulkarni consultant",
    "Infini Imaginator Tech",
    "imaginator.in",
  ],

  authors: [{ name: "Mukul Kulkarni", url: "https://www.linkedin.com/in/mukul-kulkarni/" }],
  creator: "Mukul Kulkarni",
  publisher: "Infini Imaginator Tech",
  category: "technology",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Infini Imaginator Tech",
    title: "Infini Imaginator Tech | AI Automation & Business Intelligence Consulting",
    description:
      "Enterprise AI automation and BI consulting with 9+ years of experience. We build AI agents, data pipelines, and executive dashboards that drive measurable business outcomes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Infini Imaginator Tech — AI Automation & Business Intelligence Consulting",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Infini Imaginator Tech | AI Automation & BI Consulting",
    description:
      "9+ years enterprise consulting. AI automation, n8n workflows, Snowflake, executive dashboards. $500K in actionable insights delivered.",
    images: ["/og-image.png"],
    creator: "@mukulk",
  },
};

// ── JSON-LD Structured Data (SEO + AEO) ─────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#organization`,
  name: "Infini Imaginator Tech",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  email: "mkulkarni.work@gmail.com",
  description:
    "AI automation and business intelligence consulting firm specialising in n8n workflow automation, Snowflake data engineering, executive dashboards, and AI strategy for enterprises.",
  founder: {
    "@type": "Person",
    "@id": `${siteUrl}/#founder`,
    name: "Mukul Kulkarni",
    jobTitle: "Founder & Principal Consultant",
    url: "https://www.linkedin.com/in/mukul-kulkarni/",
    email: "mkulkarni.work@gmail.com",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Pace University",
      address: { "@type": "PostalAddress", addressLocality: "New York", addressCountry: "US" },
    },
    knowsAbout: [
      "Business Intelligence",
      "AI Automation",
      "Data Engineering",
      "Snowflake",
      "n8n Workflows",
      "ETL Pipelines",
      "Tableau",
      "Qlik Sense",
      "OpenAI API",
      "LangChain",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "Master of Science in Information Systems",
      credentialCategory: "degree",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "Pace University" },
    },
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI & Data Consulting Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Automation & Integration",
          description:
            "Eliminate repetitive workflows with intelligent automation using n8n, AI agents, API orchestration, and custom AI tool pipelines.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Intelligence & Analytics",
          description:
            "Executive dashboards, 500+ BI reports, ETL pipeline design with Informatica, Snowflake data warehousing, and workforce analytics using Tableau, Qlik Sense, and Sigma Computing.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Strategy & Transformation",
          description:
            "GenAI readiness assessments, technology modernisation roadmaps, legacy system AI integration, and ROI framework consulting.",
        },
      },
    ],
  },
  sameAs: ["https://www.linkedin.com/in/mukul-kulkarni/"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Infini Imaginator Tech",
  description: "AI Automation & Business Intelligence Consulting",
  publisher: { "@id": `${siteUrl}/#organization` },
  potentialAction: {
    "@type": "ContactAction",
    target: `mailto:mkulkarni.work@gmail.com`,
    name: "Schedule a Free Consultation",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does Infini Imaginator Tech offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Infini Imaginator Tech offers three core services: AI Automation & Integration (n8n workflows, AI agents, API orchestration), Business Intelligence & Analytics (executive dashboards, Snowflake, ETL pipelines, Tableau/Qlik/Sigma reporting), and AI Strategy & Transformation (GenAI readiness, modernisation roadmaps, ROI frameworks).",
      },
    },
    {
      "@type": "Question",
      name: "Who is Mukul Kulkarni?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mukul Kulkarni is the founder and principal consultant at Infini Imaginator Tech. He has 9+ years of enterprise data experience across Accenture India and Embrace Home Loans in the US. He holds an MS in Information Systems from Pace University (3.88 GPA) and specialises in business intelligence, AI automation, data engineering, and product development.",
      },
    },
    {
      "@type": "Question",
      name: "What is Infini Imaginator Tech's experience with Snowflake?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Infini Imaginator Tech has 3+ years of production Snowflake experience, including data warehouse architecture, ETL pipeline design, and integration with BI tools like Sigma Computing and Tableau.",
      },
    },
    {
      "@type": "Question",
      name: "How much does AI automation consulting cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Infini Imaginator Tech offers a free initial consultation with no commitment and no sales pressure. Pricing is scoped based on project requirements. Contact mkulkarni.work@gmail.com to start a conversation.",
      },
    },
    {
      "@type": "Question",
      name: "What is n8n and how does Infini Imaginator use it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "n8n is an open-source workflow automation platform. Infini Imaginator Tech uses n8n to build custom business automation workflows, connecting APIs, databases, and AI models to eliminate repetitive manual processes for clients.",
      },
    },
    {
      "@type": "Question",
      name: "Does Infini Imaginator Tech build AI products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Infini Imaginator Tech has built production AI products including Yuga Odysseys (a scenario-based personal growth platform with 588 challenges across 24 life domains) and an AI-powered Research Assistant that automates competitive intelligence gathering. Products are built using React Native, Next.js, TypeScript, OpenAI API, and Supabase.",
      },
    },
    {
      "@type": "Question",
      name: "What results has Infini Imaginator Tech delivered for clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Key results include: identifying $500K in data tolerance issues through executive dashboards at Embrace Home Loans, contributing to 25% faster loan processing time, achieving 40% lower labour costs, managing 500+ BI reports, and building 111 ETL pipelines at Accenture.",
      },
    },
    {
      "@type": "Question",
      name: "What BI tools does Infini Imaginator Tech work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Infini Imaginator Tech works with Tableau, Qlik Sense, Sigma Computing, SSRS, and custom executive dashboard development. They specialise in connecting these tools to Snowflake, SQL Server, and PostgreSQL data warehouses.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <meta name="theme-color" content="#080808" />
        <meta name="color-scheme" content="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body
        className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
