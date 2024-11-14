import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero">
        <h1>Welcome to SecureXchange</h1>
        <p>Your secure platform for file sharing and AI summarization.</p>
        <div className="cta-buttons">
          <Link to="/register-provider" className="cta-button">Sign Up as Provider</Link>
          <Link to="/register-user" className="cta-button">Sign Up as User</Link>
        </div>
      </section>
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <i className="icon-ai"></i>
            <h3>AI Summarization</h3>
            <p>Get a summary of the file content without revealing the full details.</p>
          </div>
          <div className="feature-item">
            <i className="icon-secure"></i>
            <h3>Secure Payments</h3>
            <p>Process payments securely using Stripe.</p>
          </div>
          <div className="feature-item">
            <i className="icon-share"></i>
            <h3>Easy File Sharing</h3>
            <p>Upload and share files with ease.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
