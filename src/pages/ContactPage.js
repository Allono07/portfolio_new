export default function ContactPage() {
  return (
    <section className="page">
      <p className="page-kicker">Contact</p>
      <h1 className="page-title">Lets Catch Up!</h1>
      <p className="page-lead">
        If you would like to talk about mobile engineering, backend systems,
        product thinking, or writing quietly useful software, these are the
        fastest ways to reach me.
      </p>

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
    </section>
  );
}
