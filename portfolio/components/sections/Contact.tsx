import { ContactForm } from '@/components/ContactForm';
import { SpotlightGrid } from '@/components/SpotlightGrid';
import { contact, site } from '@/content/site';

export function Contact() {
  return (
    <section id="contact" className="container section" aria-labelledby="contact-title">
      <SpotlightGrid className="bento">
        <div className="tile tile-contact" data-reveal>
          <div className="contact-copy">
            <p className="pill">
              <span className="dot" aria-hidden="true" />
              {site.availability}
            </p>
            <h2 id="contact-title" className="contact-title">
              {contact.title}
            </h2>
            <p className="lead">{contact.lead}</p>
            <a className="contact-email" href={`mailto:${site.email}`}>
              {site.email} <span aria-hidden="true">↗</span>
            </a>
            <p className="muted small">{site.location} · Working with clients worldwide</p>
          </div>
          <ContactForm />
        </div>
      </SpotlightGrid>
    </section>
  );
}
