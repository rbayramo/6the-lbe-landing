import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [theme, setTheme] = useState('light')

  // Initialise theme from localStorage / system
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('thelbe-theme')
      if (stored === 'light' || stored === 'dark') {
        setTheme(stored)
      } else if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setTheme('dark')
      }
    } catch {
      // ignore
    }
  }, [])

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    try {
      window.localStorage.setItem('thelbe-theme', theme)
    } catch {
      // ignore
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="app-shell">
      <SiteHeader theme={theme} onToggleTheme={toggleTheme} />
      <main className="app-main">
        <Hero />
        <BenefitsSection />
        <NumbersSection />
        <CalmSection />
        <SystemFlow />
        <ProcessSection />
        <TestimonialsSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}

function SiteHeader({ theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile menu on desktop breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const logoLong =
    theme === 'light' ? '/logo-light-long.jpg' : '/logo-dark-long.jpg'
  const logoShort =
    theme === 'light' ? '/logo-light-short.jpg' : '/logo-dark-short.jpg'

  const toggleMobile = () => setMobileOpen((v) => !v)
  const closeMobile = () => setMobileOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#hero" className="brand" onClick={closeMobile}>
          <img
            src={logoShort}
            alt="The LBE"
            className="brand-logo brand-logo-short"
          />
          <img
            src={logoLong}
            alt="The LBE"
            className="brand-logo brand-logo-long"
          />
        </a>

        <nav className="nav-links">
          <a href="#benefits">Benefits</a>
          <a href="#numbers">Numbers</a>
          <a href="#system">System</a>
          <a href="#process">Process</a>
          <a href="#owners">Owners</a>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={toggleMobile}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen ? 'true' : 'false'}
          >
            <span className="mobile-menu-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="menu-svg">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </button>

          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle dark / light mode"
          >
            {theme === 'light' ? (
              <span className="theme-icon">
                {/* Moon */}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="theme-svg"
                >
                  <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
                </svg>
              </span>
            ) : (
              <span className="theme-icon">
                {/* Sun */}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="theme-svg"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path
                    d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            )}
          </button>

          <a href="#contact" className="btn-primary header-cta">
            Book a Revenue Booster Call
          </a>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-nav-wrap">
          <div className="container mobile-nav-panel">
            <a href="#benefits" onClick={closeMobile}>Benefits</a>
            <a href="#numbers" onClick={closeMobile}>Numbers</a>
            <a href="#system" onClick={closeMobile}>System</a>
            <a href="#process" onClick={closeMobile}>Process</a>
            <a href="#owners" onClick={closeMobile}>Owners</a>
            <a
              href="#contact"
              onClick={closeMobile}
              className="btn-primary mobile-nav-cta"
            >
              Book a Revenue Booster Call
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="hero" className="section hero-section">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="eyebrow">REVENUE BOOSTER SYSTEM</p>
          <h1 className="hero-title">Turn one-time buyers into regulars.</h1>
          <p className="hero-sub">
            A simple, done-for-you two-week setup that brings customers back,
            builds reviews, and grows monthly revenue using the tools you
            already have.
          </p>

          <div className="hero-chips">
            <span className="chip chip-ghost">More repeat customers</span>
            <span className="chip chip-ghost">Automated follow-ups</span>
            <span className="chip chip-ghost">More 5-star reviews</span>
            <span className="chip chip-ghost">Referral momentum</span>
          </div>

          <div className="hero-cta-row">
            <a href="#contact" className="btn-primary">
              Book a Revenue Booster Call
            </a>
            <a href="#benefits" className="btn-ghost">
              See the wins
            </a>
          </div>
          <p className="hero-footnote">
            We do not replace your POS. We make its customer data work harder
            for you.
          </p>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit">
            <div className="orbit-core">
              <span className="orbit-core-title">2-Week Revenue Booster</span>
              <span className="orbit-core-sub">Repeat customers · Reviews · Win-back</span>
            </div>

            <div className="orbit-ring orbit-ring-one" />
            <div className="orbit-ring orbit-ring-two" />
              <div className="orbit-pill orbit-pill-one">
                <span className="pill-label">More repeat customers</span>
                <span className="pill-value">Thank-you + reactivation live</span>
              </div>
              <div className="orbit-pill orbit-pill-two">
                <span className="pill-label">Google reviews on autopilot</span>
                <span className="pill-value">Requests tied to real visits</span>
              </div>
              <div className="orbit-pill orbit-pill-three">
                <span className="pill-label">Win-back campaigns</span>
                <span className="pill-value">Runs without extra work</span>
              </div>

          </div>
        </div>
      </div>
    </section>
  )
}

function BenefitsSection() {
  return (
    <section id="benefits" className="section big-three-section">
      <div className="container">
        <h2 className="section-title center">
          Three wins owners feel right away.
        </h2>
        <p className="section-sub center">
          A tight, revenue-first system that makes follow-up effortless and
          repeat visits predictable.
        </p>
        <div className="big-three-layout">
          <div className="big-three-row">
            <div className="benefit-block">
              <div className="benefit-icon">🧲</div>
              <div className="benefit-heading">More repeat customers</div>
              <div className="benefit-mini">
                We organize your list, segment it, and set up thank-you and
                reactivation flows.
              </div>
              <div className="benefit-bar-chart">
                <div className="bar-labels">
                  <span>New</span>
                  <span>Returning</span>
                </div>
                <div className="bar-row">
                  <div className="bar bar-new" />
                  <div className="bar bar-returning" />
                </div>
                <span className="benefit-tag">
                  Typical repeat lift: 10 to 25 percent
                </span>
              </div>
            </div>

            <div className="benefit-block">
              <div className="benefit-icon">🌐</div>
              <div className="benefit-heading">A review engine that runs itself</div>
              <div className="benefit-mini">
                Automatic Google review requests tied to real visits and simple
                incentives.
              </div>
              <div className="benefit-google-card">
                <div className="google-name-row">
                  <span className="google-name">Your Place · Calgary</span>
                  <span className="google-status">Open ⋅ Closes 9pm</span>
                </div>
                <div className="google-rating-row">
                  <span className="google-stars">★★★★☆</span>
                  <span className="google-rating">4.8</span>
                  <span className="google-count">132 reviews</span>
                </div>
                <div className="google-pill">32 new reviews this month</div>
              </div>
            </div>
          </div>

          <div className="big-three-row big-three-row-bottom">
            <div className="benefit-block wide">
              <div className="benefit-icon">⚡</div>
              <div className="benefit-heading">
                Promotions that stay consistent and easy
              </div>
              <div className="benefit-mini">
                Birthday, anniversary, seasonal and new-product messages ready
                to run without extra effort.
              </div>
              <div className="planning-board">
                <div className="planning-column">
                  <div className="planning-title">Campaigns</div>
                  <div className="planning-item planning-item-ok">
                    Thank-you after purchase
                  </div>
                  <div className="planning-item planning-item-ok">
                    We miss you at 30 days
                  </div>
                  <div className="planning-item planning-item-soon">
                    Birthday and anniversary
                  </div>
                </div>
                <div className="planning-column">
                  <div className="planning-title">Signals</div>
                  <div className="planning-badge planning-badge-green">
                    VIP segment ready
                  </div>
                  <div className="planning-badge planning-badge-amber">
                    Inactive list growing slowly
                  </div>
                  <div className="planning-badge planning-badge-muted">
                    Next seasonal promo draft
                  </div>
                </div>
              </div>
              <div className="benefit-footnote">
                The owner does not need to learn software. We set it up and
                hand over a simple playbook.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function NumbersSection() {
  return (
    <section id="numbers" className="section numbers-section">
      <div className="container numbers-inner">
        <div className="numbers-text">
          <p className="eyebrow">CLEAR REVENUE SIGNALS</p>
          <h2 className="section-title">
            Know what brings customers back.
          </h2>
          <p className="section-sub">
            One simple daily view: repeat momentum, review growth, and the next
            best action for revenue.
          </p>
          <ul className="numbers-list">
            <li>Repeat customer trend without digging through reports.</li>
            <li>Which segments are ready for the next offer.</li>
            <li>Review requests that convert into visible social proof.</li>
          </ul>
        </div>
        <div className="numbers-visual">
          <div className="numbers-dashboard">
            <div className="dash-header">
              <span>Today · Revenue Booster</span>
              <span className="dash-date">Wed · 7:42 pm</span>
            </div>
            <div className="dash-main">
              <div className="dash-today">
                <span className="dash-label">Repeat-driven revenue today</span>
                <span className="dash-value">CA$ 4,260</span>
                <span className="dash-delta">
                  Stronger than last Wednesday
                </span>
              </div>
              <div className="dash-chart">
                <div className="dash-chart-bars">
                  <div className="dash-bar dash-bar-1" />
                  <div className="dash-bar dash-bar-2" />
                  <div className="dash-bar dash-bar-3" />
                  <div className="dash-bar dash-bar-4" />
                  <div className="dash-bar dash-bar-5" />
                  <div className="dash-bar dash-bar-6" />
                  <div className="dash-bar dash-bar-7" />
                </div>
                <div className="dash-chart-labels">
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>
                </div>
              </div>
            </div>
            <div className="dash-bottom">
              <div className="dash-products">
                <div className="dash-products-title">Segments to activate</div>
                <div className="dash-product-row">
                  <span>VIP regulars</span>
                  <span className="dash-chip">ready</span>
                </div>
                <div className="dash-product-row">
                  <span>New customers</span>
                  <span className="dash-chip">welcome flow</span>
                </div>
                <div className="dash-product-row">
                  <span>Inactive 60 days</span>
                  <span className="dash-chip dash-chip-muted">win-back</span>
                </div>
              </div>
              <div className="dash-next">
                <div className="dash-next-label">Suggested focus</div>
                <div className="dash-next-main">
                  Send a gentle win-back offer to the 60-day group.
                </div>
                <div className="dash-next-sub">
                  Based on recent visit patterns.
                </div>
              </div>
            </div>
          </div>
          <div className="numbers-stat-row">
            <div className="numbers-stat">
              <span className="numbers-stat-value">2 to 4 hrs/week</span>
              <span className="numbers-stat-label">
                Owner marketing time saved
              </span>
            </div>
            <div className="numbers-stat">
              <span className="numbers-stat-value">More predictable months</span>
              <span className="numbers-stat-label">
                Less dependency on walk-ins
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CalmSection() {
  return (
    <section id="calm" className="section calm-section">
      <div className="container calm-inner">
        <div className="calm-text">
          <p className="eyebrow">DAY-TO-DAY REALITY</p>
          <h2 className="section-title">Stop relying on memory to sell.</h2>
          <p className="section-sub">
            The Revenue Booster System turns follow-up into a calm rhythm your
            team can run without constant owner effort.
          </p>
        </div>
        <div className="calm-visual">
          <div className="calm-before-after">
            <div className="calm-column calm-before">
              <div className="calm-label">Before</div>
              <div className="calm-item">
                <span className="calm-time">Late evening</span>
                <span className="calm-text-item">
                  Hoping last week&apos;s customers remember you.
                </span>
              </div>
              <div className="calm-item">
                <span className="calm-time">Next day</span>
                <span className="calm-text-item">
                  No structured thank-you or return invite.
                </span>
              </div>
              <div className="calm-item">
                <span className="calm-time">Monthly</span>
                <span className="calm-text-item">
                  Promotions feel random and inconsistent.
                </span>
              </div>
            </div>
            <div className="calm-column calm-after">
              <div className="calm-label">After</div>
              <div className="calm-item">
                <span className="calm-time">Same day</span>
                <span className="calm-text-item">
                  Thank-you flow runs automatically after purchase.
                </span>
              </div>
              <div className="calm-item">
                <span className="calm-time">30 to 90 days</span>
                <span className="calm-text-item">
                  Win-back messages bring quiet customers back.
                </span>
              </div>
              <div className="calm-item">
                <span className="calm-time">Always-on</span>
                <span className="calm-text-item">
                  Review and referral prompts build your presence.
                </span>
              </div>
              <div className="calm-saved">
                <span className="calm-saved-pill">
                  You get predictable follow-up.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SystemFlow() {
  return (
    <section id="system" className="section system-section">
      <div className="container">
        <p className="eyebrow center">HOW IT ALL CONNECTS</p>
        <h2 className="section-title center">
          We do not add another app. We connect what you already use.
        </h2>
        <p className="section-sub center system-sub">
          POS → Customer list → Smart segments → Automated follow-ups → Reviews
          and referrals → Repeat revenue.
        </p>
        <div className="system-flow">
          <div className="system-node system-node-tools">
            <div className="system-node-title">Tools</div>
            <div className="system-node-row">
              <span className="system-pill">POS</span>
              <span className="system-pill">Online orders</span>
              <span className="system-pill">Email</span>
              <span className="system-pill">SMS</span>
              <span className="system-pill">Google Business</span>
            </div>
          </div>
          <div className="system-arrow">clean customer data</div>
          <div className="system-node system-node-data">
            <div className="system-node-title">Segments</div>
            <div className="system-table">
              <div className="system-table-header">
                <span>Group</span>
                <span>Size</span>
                <span>Last seen</span>
                <span>Goal</span>
              </div>
              <div className="system-table-row">
                <span>VIP regulars</span>
                <span>48</span>
                <span>This week</span>
                <span>Loyalty</span>
              </div>
              <div className="system-table-row">
                <span>New customers</span>
                <span>120</span>
                <span>Recent</span>
                <span>Second visit</span>
              </div>
              <div className="system-table-row">
                <span>Inactive</span>
                <span>86</span>
                <span>60 days</span>
                <span>Win-back</span>
              </div>
            </div>
          </div>
          <div className="system-arrow">automated follow-up</div>
          <div className="system-node system-node-auto">
            <div className="system-node-title">Campaigns</div>
            <div className="system-timeline">
              <div className="system-timeline-item">
                <span className="system-dot" />
                <div className="system-timeline-text">
                  <div>After purchase</div>
                  <div className="system-timeline-sub">
                    Thank-you message with a soft return invite
                  </div>
                </div>
              </div>
              <div className="system-timeline-item">
                <span className="system-dot" />
                <div className="system-timeline-text">
                  <div>30 to 90 days idle</div>
                  <div className="system-timeline-sub">
                    We miss you offer tailored to your shop
                  </div>
                </div>
              </div>
              <div className="system-timeline-item">
                <span className="system-dot" />
                <div className="system-timeline-text">
                  <div>Birthdays</div>
                  <div className="system-timeline-sub">
                    A simple celebration promo that feels personal
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="system-arrow">calm rhythm</div>
          <div className="system-node system-node-routines">
            <div className="system-node-title">Owner rhythm</div>
            <div className="system-routines">
              <div className="routine-group">
                <div className="routine-label">Weekly</div>
                <div className="routine-pill routine-pill-done">
                  Review segments
                </div>
                <div className="routine-pill routine-pill-done">
                  Approve next promo
                </div>
              </div>
              <div className="routine-group">
                <div className="routine-label">Monthly</div>
                <div className="routine-pill">Light campaign refresh</div>
                <div className="routine-pill">Insights recap</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section id="process" className="section process-section">
      <div className="container">
        <p className="eyebrow center">HOW WE WORK</p>
        <h2 className="section-title center">
          From first call to running revenue system.
        </h2>
        <p className="section-sub center">
          A focused two-week delivery that builds repeat-customer momentum
          without adding complexity.
        </p>
        <div className="process-timeline">
          <div className="process-step">
            <div className="process-circle">1</div>
            <div className="process-body">
              <div className="process-title">Kickoff and data access</div>
              <div className="process-text">
                We map your journey, export customer data from POS, and collect
                access to Google, email and messaging tools.
              </div>
            </div>
          </div>
          <div className="process-step">
            <div className="process-circle">2</div>
            <div className="process-body">
              <div className="process-title">Build and configure</div>
              <div className="process-text">
                CRM setup, cleanup and import, VIP and inactive segments,
                thank-you, win-back, birthday, and review flows.
              </div>
            </div>
          </div>
          <div className="process-step">
            <div className="process-circle">3</div>
            <div className="process-body">
              <div className="process-title">Test, launch and handover</div>
              <div className="process-text">
                We test triggers, refine templates, train your team briefly, and
                deliver a one-page owner playbook.
              </div>
            </div>
          </div>
        </div>
        <div className="process-cta-row">
          <a href="#contact" className="btn-primary">
            Map my Revenue Booster
          </a>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section id="owners" className="section testimonials-section">
      <div className="container">
        <p className="eyebrow center">OWNERS LIKE YOU</p>
        <h2 className="section-title center">
          “We finally have repeat revenue on autopilot.”
        </h2>
        <p className="section-sub center">
          Short, honest comments from the kind of Calgary businesses we&apos;re
          built for.
        </p>
        <div className="testimonials-row">
          <figure className="testimonial">
            <div className="testimonial-avatar">S</div>
            <blockquote>
              “We stopped guessing. Customers now get a thank-you and a reason
              to return, and we can feel the difference each week.”
            </blockquote>
            <figcaption>Sarah · Café owner</figcaption>
          </figure>
          <figure className="testimonial">
            <div className="testimonial-avatar">M</div>
            <blockquote>
              “The review requests are finally consistent. Our Google presence
              started climbing without us chasing people.”
            </blockquote>
            <figcaption>Michael · Salon owner</figcaption>
          </figure>
          <figure className="testimonial">
            <div className="testimonial-avatar">A</div>
            <blockquote>
              “They worked with our POS and made the follow-up simple. I did not
              have to learn a new system to get results.”
            </blockquote>
            <figcaption>Ayesha · Boutique owner</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section id="contact" className="section final-cta-section">
      <div className="container final-cta-inner">
        <div className="final-cta-text">
          <p className="eyebrow">GET STARTED</p>
          <h2 className="section-title">Book your Revenue Booster Call.</h2>
          <p className="section-sub">
            We&apos;ll review your customer follow-up gaps and show exactly what
            we would set up in two weeks to increase repeat customers, reviews,
            and monthly revenue.
          </p>
          <div className="pricing-mini">
            <div className="pricing-pill">
              <span className="pricing-label">Two-week setup</span>
              <span className="pricing-value">CA$ 1,999</span>
            </div>
            <div className="pricing-pill pricing-pill-muted">
              <span className="pricing-label">Optional monthly support</span>
              <span className="pricing-value">CA$ 199</span>
            </div>
          </div>
        </div>
        <form
          className="final-cta-form"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Book a Revenue Booster Call"
        >
          <div className="form-row">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" placeholder="Jane Doe" />
          </div>
          <div className="form-row">
            <label htmlFor="business">Business name</label>
            <input
              id="business"
              name="business"
              type="text"
              placeholder="Neighbourhood Café"
            />
          </div>
          <div className="form-row form-row-inline">
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="(587) 718-5627"
              />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="business-type">What kind of business?</label>
            <input
              id="business-type"
              name="business-type"
              type="text"
              placeholder="Café, bakery, salon, shop..."
            />
          </div>
          <div className="form-row">
            <label htmlFor="headache">Biggest headache right now</label>
            <textarea
              id="headache"
              name="headache"
              rows="4"
              placeholder="For example: customers do not return, not enough reviews, promotions feel random..."
            />
          </div>
          <button type="submit" className="btn-primary btn-full">
            Book my Revenue Booster Call
          </button>
          <div className="form-footnote">
            <span>Prefer to call? +1 (587) 718-5627</span>
            <span>Typical response: within 1 business day.</span>
          </div>
        </form>
      </div>
    </section>
  )
}

function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="footer-brand">The LBE</div>
          <div className="footer-text">
            LBE Inc. · Local Business Enablement · Calgary, Alberta
          </div>
        </div>
        <div className="footer-right">
          <a href="#hero">Back to top</a>
          <a href="#contact">Contact</a>
          <a href="mailto:info@elnarm.ca">info@elnarm.ca</a>
        </div>
      </div>
      <div className="footer-bottom">
        © {year} LBE Inc. All rights reserved.
      </div>
    </footer>
  )
}

export default App
