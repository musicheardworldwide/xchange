import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
        <a href="/contact-us">Contact Us</a>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} SecureXchange. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
