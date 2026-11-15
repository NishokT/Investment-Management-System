'use client';

import { useState, type FormEvent } from 'react';
import { contact, site } from '@/content/site';

/**
 * Opens the visitor's email app with their message filled in. No server is needed.
 * To receive messages without an email app, point this form at a service such as
 * Formspree and remove the handler (see README.md).
 */
export function ContactForm() {
  const [status, setStatus] = useState<string>(contact.note);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const projectType = String(data.get('type') ?? '');
    const budget = String(data.get('budget') ?? '');
    const message = String(data.get('message') ?? '').trim();

    const subject = `Project enquiry from ${name}`;
    const body = [`Name: ${name}`, `Email: ${email}`, `Project type: ${projectType}`, `Budget: ${budget}`, '', message].join('\n');

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('Opening your email app. Thanks for reaching out!');
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="type">Project type</label>
          <select id="type" name="type" defaultValue={contact.projectTypes[0]}>
            {contact.projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="budget">Budget</label>
          <select id="budget" name="budget" defaultValue={contact.budgets[0]}>
            {contact.budgets.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required placeholder="What are you looking to build, and by when?" />
      </div>

      <button className="btn btn-primary" type="submit">
        Send message
      </button>
      <p className="form-note" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
