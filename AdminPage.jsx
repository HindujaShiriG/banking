import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/admin.css'; // Import CSS file for admin page styles

function AdminPage() {
  return (
    <div className="admin-container" style={{ padding: '20px' }}>
      <h1 style={{ color: '' }}>Welcome Admin!</h1>
      <div className="button-container">
        <Link to="/approve-accounts">
          <button className="admin-button">Approval of Accounts</button>
        </Link>
        <Link to="/transactions">
          <button className="admin-button">Transactions Done</button>
        </Link>
        
        <Link to="/Loan-details">
          <button className="admin-button">Loan Details</button>
        </Link>
        <Link to="/user-details">
          <button className="admin-button">user Details</button>
        </Link>
        <Link to="/bankadd-details">
          <button className="admin-button">Addbank Details</button>
        </Link>
      </div>
      <div className="quote-container">
        <p className="quote">
          "Amidst the chaos of finance, the bank admin is the beacon of organization."
        </p>
        {/* <p className="author">- HINDUJA</p> */}
      </div>
    </div>
  );
}

export default AdminPage;
