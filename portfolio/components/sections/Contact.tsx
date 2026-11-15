import { ContactForm } from '@/components/ContactForm';
import { contact, site } from '@/content/site';
import { delayStyle } from '@/lib/browser';

export function Contact() {
  return (
    <section className="section alt" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 id="contact-title">{contact.title}</h2>
          <p className="lead">{contact.lead}</p>

          <ul className="contact-list">
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>{site.location} · Working with clients worldwide</li>
          </ul>
        </div>

        <div data-reveal style={delayStyle(150)}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
