/*
 * All of the site's words live here. Edit this file to make the portfolio yours;
 * the components only handle layout and motion.
 *
 * Placeholders to replace: names, email, URL, stats, projects, testimonials.
 */

/** Part of a headline. `accent` gives it the gradient; `break` starts a new line after it. */
export type Segment = { text: string; accent?: boolean; break?: boolean };
export type Tone = 'blue' | 'violet' | 'midnight';
export type IconName = 'web' | 'ux' | '3d';

export type Project = {
  title: string;
  tags: string[];
  summary: string;
  /** Colour of the preview panel when there is no screenshot yet */
  tone: Tone;
  /** Optional screenshot in public/, e.g. "/projects/cafe.jpg" */
  image?: string;
  caseStudy: string;
};

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
  availability: 'Available for new projects',
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
    { text: 'Websites', break: true },
    { text: 'that ' },
    { text: 'work.', accent: true },
  ] satisfies Segment[],
  lead: 'I design and build fast, polished websites and brands for small businesses and startups, from first sketch to launch.',
  stats: [
    { value: 'XX+', label: 'Projects delivered' },
    { value: 'X+', label: 'Years of experience' },
    { value: 'XX%', label: 'Clients who come back' },
  ],
  status: [
    { label: 'Response time', value: 'Within 24 hours' },
    { label: 'Based in', value: site.location },
    { label: 'Working', value: 'Remote, worldwide' },
  ],
} as const;

/** The two crossed bands that scroll sideways under the hero. */
export const marquee = {
  primary: ['Web design', 'Development', 'Interface design', '3D & motion', 'Brand identity', 'UX strategy'],
  secondary: ['Figma', 'TypeScript', 'React', 'Next.js', 'Three.js', 'Tailwind CSS', 'Node.js', 'Git', 'Framer', 'Blender'],
};

export const about = {
  label: 'About',
  // Large statement that lights up word by word as it scrolls into view
  statement:
    'I partner with founders and small teams to design and build websites that look sharp, load fast and turn visitors into customers. Every project starts with your goals and ends with something you are proud to show.',
  paragraphs: [
    "I'm Your Name, a freelance designer and developer based in [City]. [Add one or two sentences about how you got started and what you care about.]",
    "I work closely with founders and small teams. Every project starts with your goals and ends with something you're proud to show.",
  ],
  toolsLabel: 'Tools I work with',
  tools: ['Figma', 'TypeScript', 'React', 'Next.js', 'Three.js', 'Tailwind CSS', 'Node.js', 'Git'],
} as const;

export const services: {
  label: string;
  title: string;
  items: { title: string; icon: IconName; summary: string }[];
} = {
  label: 'Services',
  title: 'How I can help',
  items: [
    {
      title: 'Website design & development',
      icon: 'web',
      summary: 'Responsive websites built for speed, search visibility and easy updates.',
    },
    {
      title: 'Interface & UX design',
      icon: 'ux',
      summary: 'Clear layouts and flows that make it obvious what visitors should do next.',
    },
    {
      title: 'Immersive 3D & motion',
      icon: '3d',
      summary: 'Interactive 3D and subtle animation that make a memorable first impression.',
    },
  ],
};

export const work: { label: string; title: string; lead: string; items: Project[] } = {
  label: 'Selected work',
  title: 'Recent projects',
  lead: "A few examples of how I've helped clients. Replace these with your own case studies.",
  items: [
    {
      title: 'Café Website Redesign',
      tags: ['Web design', 'Development'],
      summary: 'Mobile-first site with an updated menu and online booking. Add the client, your role and the result.',
      tone: 'blue',
      caseStudy: '#contact',
    },
    {
      title: 'Fintech Dashboard',
      tags: ['UI/UX', 'Product design'],
      summary: 'Simplified an analytics dashboard so key reports are faster to find. Add the measurable outcome.',
      tone: 'violet',
      caseStudy: '#contact',
    },
    {
      title: 'Studio Brand Identity',
      tags: ['Branding', '3D'],
      summary: 'Logo, colour system and a 3D brand world for a creative studio. Add the result here.',
      tone: 'midnight',
      caseStudy: '#contact',
    },
  ],
};

export const approach = {
  label: 'How I work',
  title: 'A simple, transparent process',
  steps: [
    { title: 'Discover', summary: 'We talk through your goals, audience and what success looks like.' },
    { title: 'Plan', summary: 'I outline scope, timeline and price before any work starts.' },
    { title: 'Build', summary: "Design and development with regular previews, so you're never guessing." },
    { title: 'Launch', summary: 'I test on every device, go live and hand over everything you need.' },
  ],
} as const;

export const testimonials = {
  label: 'Kind words',
  title: 'What clients say',
  items: [
    {
      quote:
        'Replace this with a real quote from a client. Specific results, like faster load times or more enquiries, land best.',
      name: 'Client Name',
      role: 'Founder, Company',
      initials: 'CN',
    },
    {
      quote:
        'Replace this with a second client quote. Keep it short, honest and about the working experience as well as the result.',
      name: 'Client Name',
      role: 'Marketing Lead, Company',
      initials: 'CN',
    },
  ],
} as const;

export const contact = {
  title: "Let's build something great together",
  lead: 'Tell me a little about your project. I usually reply within one working day.',
  projectTypes: ['Website', 'Web app', 'UI/UX design', 'Branding', '3D / motion', 'Something else'],
  budgets: ['Under $1,000', '$1,000 – $3,000', '$3,000 – $10,000', '$10,000+', 'Not sure yet'],
  note: 'Your email app will open with the message ready to send.',
} as const;
