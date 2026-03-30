import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="page">
      <p className="page-kicker">404</p>
      <h1 className="page-title">That page is not on this device.</h1>
      <p className="page-lead">
        The route does not match any page in the current library.
      </p>
      <Link className="text-link" to="/">
        Return Home >
      </Link>
    </section>
  );
}
