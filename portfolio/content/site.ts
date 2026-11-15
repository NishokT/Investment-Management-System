/*
 * All of the site's words live here. Edit this file to make the portfolio yours;
 * the components only handle layout and motion.
 *
 * Placeholders to replace: names, email, URL, stats, projects, testimonials.
 */

export type Segment = { text: string; accent?: boolean };

export const site = {
  name: 'Your Name',
  initials: 'YN',
  role: 'Freelance Designer & Developer',
  // Your live domain. Used for SEO, Open Graph, the sitemap and canonical links.
  url: 'https://example.com',
  email: 'hello@example.com',
  location: '[City, Country]',
  description:
    'Freelance web designer and developer building fast, accessible and memorable websites and brands for small businesses and startups.',
  availability: 'Available for freelance projects',
  socials: [
    { label: 'GitHub', href: 'https://github.com/your-handle' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle' },
  ],
} as const;

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
] as const;

export const hero = {
  greeting: "Hi, I'm Your Name",
  headline: [
    { text: 'Websites that ' },
    { text: 'work.', accent: true },
  ] satisfies Segment[],
  lead: 'I design and build fast, clear websites and brands for small businesses and startups, from first sketch to live site.',
  stats: [
    { value: 'XX+', label: 'Projects delivered' },
    { value: 'X+', label: 'Years of experience' },
    { value: 'XX%', label: 'Clients who come back' },
  ],
  badges: [
    { label: 'Response time', value: 'Within 24 hours' },
    { label: 'Based in', value: site.location },
    { label: 'Working', value: 'Remote, worldwide' },
  ],
} as const;

export const marquee = [
  'Websites',
  'Interfaces',
  'Brand identity',
  'Motion',
  'Performance',
  'Accessibility',
] as const;

export const about = {
  eyebrow: 'About',
  title: 'A bit about me',
  paragraphs: [
    "I'm Your Name, a freelance designer and developer based in [City]. [Add one or two sentences about how you got started and what you care about.]",
    "I work closely with founders, marketers and small teams. Every project starts with understanding your goals and ends with something you're proud to show.",
  ],
  toolsTitle: 'Tools I work with',
  tools: ['Figma', 'TypeScript', 'React', 'Next.js', 'Three.js', 'Tailwind CSS', 'Node.js', 'Git'],
} as const;

export const services = {
  eyebrow: 'Services',
  title: 'How I can help',
  lead: 'Focused services that turn ideas into finished, working products.',
  items: [
    {
      title: 'Website design & development',
      summary: 'Custom, responsive websites built for speed, search visibility and easy updates.',
      points: ['Landing pages', 'Business websites', 'Portfolios & personal sites'],
    },
    {
      title: 'Interface & UX design',
      summary: 'Clear layouts and user flows that make it obvious what visitors should do next.',
      points: ['Wireframes & prototypes', 'Design systems', 'Usability reviews'],
    },
    {
      title: 'Immersive 3D & motion',
      summary: 'Interactive 3D scenes and animations that make a first impression and keep visitors exploring.',
      points: ['Three.js scenes', 'Product visualisations', 'Scroll-driven motion'],
    },
  ],
} as const;

export const work = {
  eyebrow: 'Selected work',
  title: 'Recent projects',
  lead: "A few examples of how I've helped clients. Replace these with your own case studies.",
  items: [
    {
      title: 'Café Website Redesign',
      tags: ['Web design', 'Development'],
      summary:
        'Mobile-first site with an updated menu and online table booking. Describe the client, your role and the result here.',
      caseStudy: '#contact',
    },
    {
      title: 'Fintech Dashboard',
      tags: ['UI/UX', 'Product design'],
      summary:
        'Simplified an analytics dashboard and cut the time to find key reports. Add the measurable outcome here.',
      caseStudy: '#contact',
    },
    {
      title: 'Studio Brand Identity',
      tags: ['Branding', '3D'],
      summary:
        'Logo, colour palette and a 3D brand world for a creative studio launching its first brand. Add the result here.',
      caseStudy: '#contact',
    },
  ],
} as const;

export const approach = {
  eyebrow: 'How I work',
  title: 'A simple, transparent process',
  steps: [
    { title: 'Discover', summary: 'We talk through your goals, audience and what success looks like.' },
    { title: 'Plan', summary: 'I outline scope, timeline and price before any work starts.' },
    { title: 'Build', summary: "Design and development with regular previews, so you're never guessing." },
    { title: 'Launch', summary: 'I test on every device, go live and hand over everything you need.' },
  ],
} as const;

export const testimonials = {
  eyebrow: 'Kind words',
  title: 'What clients say',
  items: [
    {
      quote:
        'Replace this with a real quote from a client. Specific results, like faster load times or more enquiries, land best.',
      name: 'Client Name',
      role: 'Founder, Company',
    },
    {
      quote:
        'Replace this with a second client quote. Keep it short, honest and about the working experience as well as the result.',
      name: 'Client Name',
      role: 'Marketing Lead, Company',
    },
  ],
} as const;

export const contact = {
  eyebrow: 'Contact',
  title: "Let's build something together",
  lead: 'Tell me a little about your project. I usually reply within one or two working days.',
  projectTypes: ['Website', 'Web app', 'UI/UX design', 'Branding', '3D / motion', 'Something else'],
  budgets: ['Under $1,000', '$1,000 – $3,000', '$3,000 – $10,000', '$10,000+', 'Not sure yet'],
  note: 'Your email app will open with the message ready to send.',
} as const;
