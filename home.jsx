import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/home.css'; // Import custom CSS styles

const HomePage = () => {
  return (
    <div className="container">
      <header className="header" style={{backgroundColor:'black'}}>
        <div className="header-left" style={{right:'10px'}}>
          <h1>HINDUJA BANK</h1>
        </div>
        <div className="header-right">
          <Link to="/signup" className="signup-link">Sign Up</Link>
        </div>
      </header>
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-left">
            <div className="bg-image"></div>
          </div>
          <div className="hero-right">
            <h2>Welcome to Our Bank</h2>
            <p>
            Welcome to HINDUJA BANK, where your financial needs are our top priority. At HINDUJA BANK, we strive to provide exceptional banking services tailored to your unique requirements. With a commitment to integrity, innovation, and customer satisfaction, we aim to be your trusted financial partner every step of the way.
            </p>
            <p className="quote">
              BE PART OF SOMETHING BIGGER AND BETTER !
            </p>
            <p className="quote">
              For every financial need,we'll meet you at the moment
            </p>
          </div>
        </section>
        <section className="photo-section">
          <div className="photo-grid">
            {/* Include your photo components here */}
            {/* Example: <img src="photo1.jpg" alt="Photo 1" /> */}
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <h3>Contact Us</h3>
          <p>Email: info@hindujabank.com</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
