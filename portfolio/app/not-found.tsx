import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="not-found container">
      <p className="eyebrow">404</p>
      <h1>This page has wandered off.</h1>
      <p className="lead">The link may be out of date, or the page may have moved.</p>
      <Link className="btn btn-primary" href="/">
        Back to home
      </Link>
    </main>
  );
}
