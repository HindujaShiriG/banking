// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const LoanDeposit = () => {
//   const [accountNumber, setAccountNumber] = useState('');
//   const [depositAmount, setDepositAmount] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [loanDocument, setLoanDocument] = useState(null);

//   // Function to check if the loan document with the provided account number exists
//  // Function to check if the loan document with the provided account number exists
// const checkAccountExists = async (accountNumber) => {
//     try {
//       const response = await fetch(`https://firestore.googleapis.com/v1/projects/banking-system-3c21a/databases/(default)/documents/Loan?orderBy="accountNumber"&equalTo=${accountNumber}`);
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch loan details');
//       }
//       const data = await response.json();
  
//       return data.documents.length > 0; // If any loan documents are found, return true, otherwise false
//     } catch (error) {
//       console.error('Error checking account existence:', error);
//       return false; // Return false in case of error
//     }
//   };
  

//   const handleDeposit = async () => {
//     try {
//       // Check if the loan document exists for the provided account number
//       const accountExists = await checkAccountExists(accountNumber);
//       if (!accountExists) {
//         setError('Loan details not found for the entered account number');
//         return;
//       }

//       // Fetch loan details based on the entered account number
//       const response = await fetch(`https://firestore.googleapis.com/v1/projects/banking-system-3c21a/databases/(default)/documents/Loan?orderBy="accountNumber"&equalTo=${accountNumber}`);

//       if (!response.ok) {
//         throw new Error('Failed to fetch loan details');
//       }
//       const data = await response.json();
      
//       // Find the loan document matching the entered account number
//       const foundLoanDocument = data.documents.find(doc => doc.fields.accountNumber && doc.fields.accountNumber.integerValue === parseInt(accountNumber));
//       if (!foundLoanDocument) {
//         setError('Loan details not found for the entered account number');
//         return;
//       }

//       setLoanDocument(foundLoanDocument);

//       // Extract the sanctioned amount from the loan document
//       const sanctionedAmount = foundLoanDocument.fields.sanctionedAmount.integerValue;

//       // Check if the entered deposit amount is valid
//       const deposit = parseFloat(depositAmount);
//       if (isNaN(deposit) || deposit <= 0 || deposit > sanctionedAmount) {
//         setError('Invalid deposit amount');
//         return;
//       }

//       // Calculate the updated sanctioned amount after deposit
//       const updatedSanctionedAmount = sanctionedAmount - deposit;

//       // Update the loan document with the new sanctioned amount
//       await fetch(`https://firestore.googleapis.com/v1/projects/banking-system-3c21a/databases/(default)/documents/Loan/${foundLoanDocument.name.split('/').pop()}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           fields: {
//             sanctionedAmount: { integerValue: updatedSanctionedAmount },
//             // Include other fields to prevent deletion
//             // For example, if you have a 'status' field, include it like this:
//             status: { stringValue: foundLoanDocument.fields.status.stringValue }
//           }
//         })
//       });

//       setSuccess(true);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Loan Deposit</h2>
//       <input type="text" placeholder="Enter Account Number" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
//       <input type="number" placeholder="Enter Deposit Amount" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} />
//       <button onClick={handleDeposit}>Deposit</button>
//       {error && <p>{error}</p>}
//       {success && <p>Loan deposited successfully!</p>}
//       {loanDocument && (
//         <div>
//           <h3>Loan Details</h3>
//           <p>Account Number: {loanDocument.fields.accountNumber.integerValue}</p>
//           {/* Include other relevant fields */}
//         </div>
//       )}
//       <Link to="/customer">Go Back</Link>
//     </div>
//   );
// };

// export default LoanDeposit;

import React, { useState } from 'react';
 
function LoanDeposit() {
  const [accountNumber, setAccountNumber] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
 
  const handleDeposit = () => {
    // Check if all fields are filled
    if (!accountNumber  || !amount) {
      setMessage('Please fill in all fields.');
      return;
    }
 
     // Type of deposit
 const depositType="loan-deposit";
    // Create transaction object
  const transactionData = {
    fields: {
      accountNumber: { integerValue: parseInt(accountNumber) },
    //   name: { stringValue: name },
      amount: { doubleValue: parseFloat(amount) },
      type: { stringValue: depositType },
      timestamp: { timestampValue: new Date().toISOString() }
    }
  };
    // Fetch the account details from Firestore API
    fetch(`https://firestore.googleapis.com/v1/projects/banking-system-3c21a/databases/(default)/documents/Loan`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch account details.');
        }
        return response.json();
      })
      .then(data => {
        // Find the document with the matching account number in the Account collection
        const matchedDocument = data.documents.find(doc => {
          const fields = doc.fields;
          return fields && fields.accountNumber && parseInt(fields.accountNumber.integerValue) === parseInt(accountNumber);
        });
 
        if (!matchedDocument) {
          throw new Error('Account not found.');
        }
 
        // Extract the document ID from the response
         const docId = matchedDocument.fields;
        const accountData = matchedDocument.fields;
 
       
 
        // Calculate new balance for the Account collection
        const currentBalance = parseFloat(accountData.sanctionedAmount.doubleValue);
        const depositAmount = parseFloat(amount);
        const newBalance = currentBalance - depositAmount;
 
        // Update the balance field in the existing account data for the Account collection
        const updatedAccountData = {
          ...accountData,
          sanctionedAmount : { doubleValue: newBalance }
        };
 
        // Perform deposit by updating the balance field only for the Account collection
        return fetch(`https://firestore.googleapis.com/v1/projects/banking-system-3c21a/databases/(default)/documents/Loan/${docId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: updatedAccountData
          })
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Deposit unsuccessful. Please try again.');
        }
        // Fetch the customer account details from Firestore API
        return fetch(`https://firestore.googleapis.com/v1/projects/banking-system-3c21a/databases/(default)/documents/Loan`);
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch customer account details.');
        }
        return response.json();
      })
      .then(data => {
        // Find the document with the matching account number in the customerAccounts collection
        const matchedDocument = data.documents.find(doc => {
          const fields = doc.fields;
          return fields && fields.accountNumber && parseInt(fields.accountNumber.integerValue) === parseInt(accountNumber);
        });
 
        if (!matchedDocument) {
          throw new Error('Customer account not found.');
        }
 
        // Extract the document ID from the response
        const docId = matchedDocument.accountNumber;
        const accountData = matchedDocument.fields;
 
        // Calculate new balance for the customerAccounts collection
        const currentBalance = parseFloat(accountData.sanctionedAmount.doubleValue);
        const newBalance = currentBalance + parseFloat(amount);
 
        // Update the balance field in the existing account data for the customerAccounts collection
        const updatedAccountData = {
          ...accountData,
          sanctionedAmount: { doubleValue: newBalance }
        };
 
        // Perform deposit by updating the balance field only for the customerAccounts collection
        return fetch(`https://firestore.googleapis.com/v1/projects/banking-system-3c21a/databases/(default)/documents/Loan/${docId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: updatedAccountData
          })
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Deposit unsuccessful. Please try again.');
        }
 
       
      // Transaction successful, now store transaction details
      return fetch(`https://firestore.googleapis.com/v1/projects/banking-system-3c21a/databases/(default)/documents/Transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
      });
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Transaction details not stored.');
      }
      setMessage('Deposit successful!');
    })
      .catch(error => {
        setMessage(error.message);
      });
  };
 
  return (
    <div>
      <h2>Make a Deposit</h2>
      <div>
        <label>Account Number:</label>
        <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
      </div>
      
      <div>
        <label>Amount:</label>
        <input type="text" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <button onClick={handleDeposit}>Deposit</button>
      {message && <p>{message}</p>}
    </div>
  );
}
 
export default LoanDeposit;