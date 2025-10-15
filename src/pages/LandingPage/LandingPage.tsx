import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '@utils/routes'
import './LandingPage.scss'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate(routes.auth)
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Sound</h1>
          <p className="hero-subtitle">
            Create, manage, and share your music collection with Soundify. The
            ultimate platform for music lovers.
          </p>
          <button className="cta-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Soundify?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎵</div>
              <h3>Organize Your Music</h3>
              <p>
                Create albums, manage songs, and build your perfect collection.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎧</div>
              <h3>Stream Anywhere</h3>
              <p>Access your music library from any device, anytime.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎼</div>
              <h3>Create Playlists</h3>
              <p>Curate custom playlists and discover new music.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Musical Journey?</h2>
          <p>Join thousands of music enthusiasts already using Soundify.</p>
          <button className="cta-button secondary" onClick={handleGetStarted}>
            Join Now
          </button>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="disclaimer">
        <div className="container">
          <p>
            This project is developed as a school educational project and is
            non-profit. It is intended for learning and demonstration purposes
            only.
          </p>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
