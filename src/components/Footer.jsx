
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2023 Your Mobile Store. All rights reserved.</p>
      <p>Free Shipping on Orders Over $50</p>
      <p>
        <a href="/terms" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>{' '}
        |{' '}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </p>
      <p>
        Made with <span role="img" aria-label="heart">❤️</span> by{' '}
        <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
          Your Brand
        </a>
      </p>
    </div>
  );
};

export default Footer;
