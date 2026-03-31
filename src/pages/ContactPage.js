import { useState } from 'react';

function encodeFormData(formData) {
  return new URLSearchParams(formData).toString();
}

export default function ContactPage() {
  const [submissionState, setSubmissionState] = useState('idle');

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const isLocalPreview =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    if (import.meta.env.DEV && isLocalPreview && window.location.port !== '8888') {
      setSubmissionState('local');
      return;
    }

    setSubmissionState('sending');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodeFormData(formData),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      form.reset();
      setSubmissionState('success');
    } catch (error) {
      setSubmissionState('error');
    }
  }

  return (
    <section className="page">
      <p className="page-kicker">Contact</p>
      <h1 className="page-title">Lets Catch Up!</h1>
      <p className="page-lead">
        If you would like to talk about mobile engineering, backend systems,
        product thinking, or writing quietly useful software, leave a message
        here and I&apos;ll get it in my inbox.
      </p>

      <section className="contact-section">
          <div className="contact-list" role="list">
          <p role="listitem">
            Email: <a className="text-link" href="mailto:allono.at@gmail.com">allono.at@gmail.com</a>
          </p>
          <p role="listitem">
            GitHub:{' '}
            <a className="text-link" href="https://github.com/Allono07" rel="noreferrer" target="_blank">
              github.com/Allono07
            </a>
          </p>
          <p role="listitem">
            LinkedIn:{' '}
            <a
              className="text-link"
              href="https://www.linkedin.com/in/allen-thomson-5b1309110/"
              rel="noreferrer"
              target="_blank"
            >
              allen-thomson-5b1309110
            </a>
          </p>
        </div>
        <form
          className="contact-form"
          data-netlify="true"
          method="POST"
          name="contact"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="subject" value="Portfolio contact submission" />

          <p className="contact-honeypot">
            <label>
              Don&apos;t fill this out if you&apos;re human:
              <input name="bot-field" type="text" tabIndex="-1" autoComplete="off" />
            </label>
          </p>

          <label className="contact-field">
            <span>Email</span>
            <input
              autoComplete="email"
              name="email"
              placeholder="your@email.com"
              required
              type="email"
            />
          </label>

          <label className="contact-field">
            <span>Message</span>
            <textarea
              name="message"
              placeholder="Write your message here."
              required
              rows="7"
            />
          </label>

          <button
            className="contact-submit text-button"
            disabled={submissionState === 'sending'}
            type="submit"
          >
            {submissionState === 'sending' ? 'Sending...' : 'Send Message >'}
          </button>

        {submissionState === 'success' ? (
          <p className="contact-status">
            Thank you. Your message has been sent successfully.
          </p>
        ) : null}

        {submissionState === 'local' ? (
          <p className="contact-status">
            Local Vite preview does not process Netlify Forms. Test this form on
            your deployed Netlify site or by running <code>netlify dev</code>.
          </p>
        ) : null}

        {submissionState === 'error' ? (
          <p className="contact-status contact-status--error">
            Something went wrong. Please try again or email me directly.
            </p>
          ) : null}
        </form>

      
      </section>
    </section>
  );
}
