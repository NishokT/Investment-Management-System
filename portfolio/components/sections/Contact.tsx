import { ContactForm } from '@/components/ContactForm';
import { contact, site } from '@/content/site';
import { delayStyle } from '@/lib/browser';

export function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <p className="section-label" data-reveal>
          <span>06</span>
          {contact.eyebrow}
        </p>

        <h2 id="contact-title" className="mega" data-reveal style={delayStyle(100)}>
          {contact.title}
        </h2>

        <a className="mega-link" href={`mailto:${site.email}`} data-reveal style={delayStyle(200)}>
          {site.email}
          <span aria-hidden="true">↗</span>
        </a>

        <p className="section-lead" data-reveal style={delayStyle(260)}>
          {contact.lead} {site.location} · Working with clients worldwide.
        </p>

        <div data-reveal style={delayStyle(320)}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
