import React, { useState, useEffect } from 'react';
import '../Styles/maincustomer.css';
import { Link } from 'react-router-dom';


const CustomerPageMain = () => {
  // State to hold customer details
  const [customerDetails, setCustomerDetails] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch customer details
  const fetchCustomerDetails = async (accountNumber) => {
    try {
      // Make a fetch request to retrieve customer details from Firestore
      const response = await fetch('https://firestore.googleapis.com/v1/projects/banking-system-3c21a/databases/(default)/documents/Account');
      if (!response.ok) {
        throw new Error('Failed to fetch customer details');
      }
      const data = await response.json();

      // Iterate over each document to find the matching account number
      let matchedDocument = null;
      for (const doc of data.documents) {
        const fields = doc.fields;
        if (fields && fields.accountNumber && parseInt(fields.accountNumber.integerValue) === parseInt(accountNumber)) {
          matchedDocument = doc;
          break; // Exit loop if a match is found
        }
      }

      if (matchedDocument) {
        // Extract necessary details from the matched document
        const accountNumber = matchedDocument.fields.accountNumber.integerValue;
        const customerName = matchedDocument.fields.name ? matchedDocument.fields.name.stringValue : 'N/A';
        const email = matchedDocument.fields.email ? matchedDocument.fields.email.stringValue : 'N/A';
        const balance = matchedDocument.fields.balance ? matchedDocument.fields.balance.doubleValue : 0;
        const phone = matchedDocument.fields.phoneNumber ? matchedDocument.fields.phoneNumber.stringValue : 'N/A';
        const loan = matchedDocument.fields.Loan ? matchedDocument.fields.Loan.booleanValue : false;

        // Update the state with the details of the matched document
        setCustomerDetails({
          accountNumber,
          customerName,
          email,
          balance,
          phone,
          loan // Include loan field in the state
          // Add more fields as needed
        });
      } else {
        setError('Customer details not found');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // Retrieve account number from local storage
    const loggedInAccountNumber = localStorage.getItem('accountNumber');

    if (loggedInAccountNumber) {
      // Fetch customer details using the account number
      fetchCustomerDetails(loggedInAccountNumber);
    } else {
      setError('Account number not found in local storage');
    }
  }, []);

  // Function to handle loan button click
  const handleLoanClick = () => {
    // Implement loan functionality here
    console.log('Requesting loan...');
  };

  // Function to handle transaction history button click
  const handleTransactionHistoryClick = () => {
    // Implement transaction history functionality here
    console.log('Fetching transaction history...');
  };

  // Function to handle bank transfer button click
  const handleBankTransferClick = () => {
    // Implement bank transfer functionality here
    console.log('Initiating bank transfer...');
  };

  // Function to handle deposit button click
  const handleDepositClick = () => {
    // Implement deposit functionality here
    console.log('Initiating deposit...');
  };

  return (
  //   <div className="maincustomer">
  //   <div className="customer-details">
  //     <h1>Welcome {customerDetails && customerDetails.customerName}</h1>
  //     {error && <p>{error}</p>}
  //     {customerDetails && (
  //       <div>
  //         <h2>Customer Details</h2>
  //         <p className="account-number">Account Number: {customerDetails.accountNumber}</p>
  //         <p className="customer-name">Customer Name: {customerDetails.customerName}</p>
  //         <p className="email">Email: {customerDetails.email}</p>
  //         <p className="balance">Balance: {customerDetails.balance}</p>
  //         <p className="phone-number">Phone Number: {customerDetails.phone}</p>
  //         <p className="loan-status">Loan: {customerDetails.loan ? 'Yes' : 'No'}</p>
  //         {/* Add more fields as needed */}
  //         <div className="buttons">
            
  //           <Link to="/ApplyLoan">
  //         <button className="loan-button">Loan</button>
  //       </Link>
  //       <Link to="/transactionsCustomer">
  //         <button className="transaction-button">Transactions</button>
  //       </Link>
  //       <Link to="/bank-transfer">
  //         <button className="BankTransfer-button">Bank Transfer</button>
  //       </Link>
  //       <Link to="/deposit-details">
  //         <button className="Deposit-button">deposit</button>
  //       </Link>
  //       <Link to="/loan-deposits">
  //         <button className="Deposit-button">Loan deposit</button>
  //       </Link>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // </div>
  <div className="maincustomer">
    <div className="customer-details">
        <h1>Welcome {customerDetails && customerDetails.customerName}</h1>
        {error && <p>{error}</p>}
        {customerDetails && (
            <div>
                <h2>Customer Details</h2>
                <p className="account-number">Account Number: {customerDetails.accountNumber}</p>
                <p className="customer-name">Customer Name: {customerDetails.customerName}</p>
                <p className="email">Email: {customerDetails.email}</p>
                <p className="balance">Balance: {customerDetails.balance}</p>
                <p className="phone-number">Phone Number: {customerDetails.phone}</p>
                <p className="loan-status">Loan: {customerDetails.loan ? 'Yes' : 'No'}</p>
                {/* Add more fields as needed */}
            </div>
        )}
        <div className="buttons">
            <Link to="/ApplyLoan" className="loan-button">Loan</Link>
            <Link to="/transactionsCustomer" className="transaction-button">Transactions</Link>
            <Link to="/bank-transfer" className="BankTransfer-button">Bank Transfer</Link>
            <Link to="/deposit-details" className="Deposit-button">Deposit</Link>
            <Link to="/loan-deposits" className="LoanDeposit-button">Loan Deposit</Link>
        </div>
    </div>
    <div className="offers">
        <h2>Special Offers(Coming soon)</h2>
        <ul>
            <li>Cashback Rewards: Earn cashback on everyday purchases like groceries, gas, and dining when you use our debit or credit cards.</li>
            <li>Referral Program: Invite friends and family to join our bank and receive rewards when they sign up and meet certain requirements.</li>
            <li>Financial Education Resources: Access free financial literacy tools, workshops, and resources to help you make smarter money decisions and plan for the future</li>
            {/* Add more offers as needed */}
        </ul>
        <h2>Loan Features</h2>
        <ul>
            <li>Instant Account Opening: Open your account online in minutes with just a few simple steps, no need to visit a branch.</li>
            <li>24/7 Customer Support: Get assistance anytime, anywhere with our round-the-clock customer support team available via phone, chat, or email.</li>
            <li>Mobile Banking App: Manage your accounts, transfer funds, pay bills, and more conveniently from your smartphone with our intuitive mobile app.</li>
            {/* Add more loan features as needed */}
        </ul>
    </div>
</div>
  );
};

export default CustomerPageMain;

// import React, { useState, useEffect } from 'react';
// import '../Styles/maincustomer.css';
// import { Link } from 'react-router-dom';
// import Deposit from './Deposit';
 
// const CustomerPageMain = () => {
//   // State to hold customer details
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [showDeposit, setShowDeposit] = useState(false);
 
//   // Function to fetch customer details
//   const fetchCustomerDetails = async (accountNumber) => {
//     try {
//       // Make a fetch request to retrieve customer details from Firestore
//       const response = await fetch(`https://firestore.googleapis.com/v1/projects/arunn-bank/databases/(default)/documents/customerAccounts`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch customer details');
//       }
//       const data = await response.json();
 
//       // Iterate over each document to find the matching account number
//       let matchedDocument = null;
//       for (const doc of data.documents) {
//         const fields = doc.fields;
//         if (fields && fields.accountNumber && parseInt(fields.accountNumber.integerValue) === parseInt(accountNumber)) {
//           matchedDocument = doc;
//           break; // Exit loop if a match is found
//         }
//       }
 
//       if (matchedDocument) {
//         // Extract necessary details from the matched document
//         const accountNumber = matchedDocument.fields.accountNumber.integerValue;
//         const customerName = matchedDocument.fields.name ? matchedDocument.fields.name.stringValue : 'N/A';
//         const email = matchedDocument.fields.email ? matchedDocument.fields.email.stringValue : 'N/A';
//         const balance = matchedDocument.fields.balance ? matchedDocument.fields.balance.doubleValue : 0;
//         const phone = matchedDocument.fields.phoneNumber ? matchedDocument.fields.phoneNumber.stringValue : 'N/A';
//         const loan = matchedDocument.fields.Loan ? matchedDocument.fields.Loan.booleanValue : false;
 
//         // Update the state with the details of the matched document
//         setCustomerDetails({
//           accountNumber,
//           customerName,
//           email,
//           balance,
//           phone,
//           loan // Include loan field in the state
//           // Add more fields as needed
//         });
//       } else {
//         setError('Customer details not found');
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };
 
//   useEffect(() => {
//     // Retrieve account number from local storage
//     const loggedInAccountNumber = localStorage.getItem('accountNumber');
 
//     if (loggedInAccountNumber) {
//       // Fetch customer details using the account number
//       fetchCustomerDetails(loggedInAccountNumber);
//     } else {
//       setError('Account number not found in local storage');
//     }
//   }, []);
 
//   // Function to handle loan button click
//   const handleLoanClick = () => {
//     // Implement loan functionality here
//     console.log('Requesting loan...');
//   };
 
//   // Function to handle transaction history button click
//   const handleTransactionHistoryClick = () => {
//     // Implement transaction history functionality here
//     console.log('Fetching transaction history...');
//   };
 
//   // Function to handle bank transfer button click
//   const handleBankTransferClick = () => {
//     // Implement bank transfer functionality here
//     console.log('Initiating bank transfer...');
//   };
 
//   // Function to handle deposit button click
//   const handleDepositClick = () => {
//     setShowDeposit(true);

//     // Implement deposit functionality here
//     console.log('Initiating deposit...');
//   };
 
//   return (
//     <div className="maincustomer">
//     <div className="customer-details">
//       <h1>Welcome {customerDetails && customerDetails.customerName}</h1>
//       {error && <p>{error}</p>}
//       {customerDetails && (
//         <div>
//           <h2>Customer Details</h2>
//           <p className="account-number">Account Number: {customerDetails.accountNumber}</p>
//           <p className="customer-name">Customer Name: {customerDetails.customerName}</p>
//           <p className="email">Email: {customerDetails.email}</p>
//           <p className="balance">Balance: {customerDetails.balance}</p>
//           <p className="phone-number">Phone Number: {customerDetails.phone}</p>
//           <p className="loan-status">Loan: {customerDetails.loan ? 'Yes' : 'No'}</p>
//           {/* Add more fields as needed */}
//           <div className="buttons">
//             <button onClick={handleLoanClick}>Apply for Loan</button>
//             <button onClick={handleTransactionHistoryClick}>View Transaction History</button>
//             <button onClick={handleBankTransferClick}>Bank Transfer</button>
           
//             <button onClick={handleDepositClick}>Deposit</button>
           
//           </div>
//         </div>
//       )}
//       {/* Render Deposit component if showDeposit state is true */}
//       {showDeposit && <Deposit />}
 
//     </div>
//   </div>
//   );
// };
 
// export default CustomerPageMain;
 