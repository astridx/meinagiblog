import React from 'react'
import { Link } from 'gatsby'
import floppy from '../../content/thumbnails/eye.png'

export default function Nav() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="flex">
          <div>
            <Link to="/" className="brand">
              <span className="emoji">
                <img src={floppy} alt="Floppy Diskette" />
              </span>{' '}
              Agi Grün
            </Link>
          </div>
          <div className="flex">
            <Link to="/blog">Articles</Link>
            <Link to="/guides">Guides</Link>
            <Link to="/me">About</Link>
            <button
              id="dark-mode-button"
              onClick={(event) => {
                const theme =
                  typeof window !== 'undefined' && localStorage.getItem('theme')

                if (theme === 'dark') {
                  typeof window !== 'undefined' &&
                    localStorage.removeItem('theme')
                  const link = document.querySelectorAll('#dark-mode')

                  if (link) {
                    link.forEach((el) => el.remove())
                    event.target.textContent = '🌙'
                  }
                } else {
                  typeof window !== 'undefined' &&
                    localStorage.setItem('theme', 'dark')
                  event.target.textContent = '☀️'
                  const head = document.getElementsByTagName('head')[0]
                  const link = document.createElement('link')
                  link.rel = 'stylesheet'
                  link.id = 'dark-mode'
                  link.href = '../dark.css'

                  head.appendChild(link)
                }
              }}
            >
              {typeof window !== 'undefined' &&
              localStorage.getItem('theme') === 'dark'
                ? '☀️'
                : '🌙'}
            </button>
          </div>
        </div>
        <div className="flex">
          <Link to="/dottergelb">
            <strong className="dottergelb">d</strong>ottergelb
            <small>.wohnen</small>
          </Link>
          <Link to="/immergruen">
            <strong className="immergrün">i</strong>mmergrün
            <small>.leben</small>
          </Link>
          <Link to="/mobil">
            <strong className="mobil">m</strong>obil<small>.fahren</small>
          </Link>
          <Link to="/neunmalklug">
            <strong className="neunmalklug">n</strong>eunmalklug
            <small>.schreiben</small>
          </Link>
          <Link to="/achtsam">
            <strong className="achtsam">a</strong>chtsam<small>.sein</small>
          </Link>
        </div>
      </div>
    </nav>
  )
}
