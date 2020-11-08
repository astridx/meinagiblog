import React from 'react'
import { Link } from 'gatsby'

export default function Footer() {
  return (
    <footer className="footer flex">
      <section className="container">
        <nav className="footer-links">
          <Link to="/blog">Articles</Link>
          <Link to="/guides">Guides</Link>
          <a
            href="https://xxxxxx.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Newsletter
          </a>
          <a
            href="https://twitter.com/xxxxxx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <Link to="/rss.xml">RSS</Link>
        </nav>
        <nav className="flex justify-center"></nav>
      </section>
    </footer>
  )
}
