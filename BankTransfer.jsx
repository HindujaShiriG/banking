import React, { useState } from 'react';
 
function BankTransfer() {
  const loggedInAccountNumber = localStorage.getItem('accountNumber');
  const [confirmedAccountNumber, setConfirmedAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setConfirmationDialogOpen(false); // Close confirmation dialog
 
    try {
      // Fetch data from Firestore using the provided IFSC code as document ID
      const response = await fetch(`https://firestore.googleapis.com/v1/projects/common-bank-db/databases/(default)/documents/bank/${ifscCode}`);
      const data = await response.json();
 
      if (!data.fields) {
        setError('Bank details not found for the provided IFSC code.');
        return;
      }
 
      const domain = data.fields.domain_name.stringValue;
 
      // Fetch sender's account data using the retrieved domain
      const senderAccountResponse = await fetch(`https://firestore.googleapis.com/v1/projects/banking-system-3c21a/databases/(default)/documents/Account`);
      const senderAccountData = await senderAccountResponse.json();
 
      // Search for the sender's account number within the documents
      senderAccountData.documents.forEach(async doc => {
        const accountNumberField = doc.fields.accountNumber;
        if (accountNumberField) {
          const fieldValue = accountNumberField.integerValue || accountNumberField.stringValue;
          if (parseInt(fieldValue) === parseInt(loggedInAccountNumber)) {
            // Update the sender's balance
            const senderNewBalance = parseFloat(doc.fields.balance.doubleValue) - parseFloat(amount);
            await fetch(`https://firestore.googleapis.com/v1/${doc.name}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                fields: {
                  ...doc.fields,
                  balance: {
                    doubleValue: senderNewBalance
                  }
                }
              })
            });
 
            // Add transaction to sender's transaction history
            await fetch(`https://firestore.googleapis.com/v1/projects/banking-system-3c21a/databases/(default)/documents/Transactions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                fields: {
                  senderAccountNumber: {
                    integerValue: parseInt(loggedInAccountNumber)
                  },
                  receiverAccountNumber: {
                    integerValue: parseInt(confirmedAccountNumber)
                  },
                  type: {
                    stringValue: 'Debit'
                  },
                  amount: {
                    doubleValue: parseFloat(amount)
                  },
                  timestamp: {
                    timestampValue: new Date().toISOString()
                  }
                }
              })
            });
          }
        }
      });
 
      // Fetch receiver's account data using the retrieved domain
      const receiverAccountResponse = await fetch(`https://firestore.googleapis.com/v1/projects/${domain}/databases/(default)/documents/Account`);
      const receiverAccountData = await receiverAccountResponse.json();
 
      // Search for the receiver's account number within the documents
      receiverAccountData.documents.forEach(async doc => {
        const accountNumberField = doc.fields.accountNumber;
        if (accountNumberField) {
          const fieldValue = accountNumberField.integerValue || accountNumberField.stringValue;
          if (parseInt(fieldValue) === parseInt(confirmedAccountNumber)) {
            // Update the receiver's balance
            const receiverNewBalance = parseFloat(doc.fields.balance.doubleValue) + parseFloat(amount);
            await fetch(`https://firestore.googleapis.com/v1/${doc.name}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                fields: {
                  ...doc.fields,
                  balance: {
                    doubleValue: receiverNewBalance
                  }
                }
              })
            });
 
            // Add transaction to receiver's transaction history
            await fetch(`https://firestore.googleapis.com/v1/projects/${domain}/databases/(default)/documents/Transactions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                fields: {
                  senderAccountNumber: {
                    integerValue: parseInt(loggedInAccountNumber)
                  },
                  receiverAccountNumber: {
                    integerValue: parseInt(confirmedAccountNumber)
                  },
                  type: {
                    stringValue: 'Credit'
                  },
                  amount: {
                    doubleValue: parseFloat(amount)
                  },
                  timestamp: {
                    timestampValue: new Date().toISOString()
                  }
                }
              })
            });
          }
        }
      });
 
      // Show success message if the transaction succeeds
      setSuccessMessage('Transaction successful!');
    } catch (error) {
      // Show error message if the transaction fails
      setError('Transaction failed.');
    } finally {
      // Reset form fields and error state
      setConfirmedAccountNumber('');
      setIfscCode('');
      setAmount('');
    }
  };
 
  const handleConfirmedAccountNumberChange = (event) => {
    setConfirmedAccountNumber(event.target.value);
  };
 
  const handleIfscCodeChange = (event) => {
    setIfscCode(event.target.value);
  };
 
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
 
  const handleConfirmTransaction = async () => {
    try {
      // Proceed with the transaction
      await handleSubmit();
    } catch (error) {
      // Show error message if the transaction fails
      setError('Transaction failed.');
    }
  };
 
  return (
    <div>
      <h1>Bank Transfer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="confirmedAccountNumber">Account Number:</label>
          <input
            type="text"
            id="confirmedAccountNumber"
            value={confirmedAccountNumber}
            onChange={handleConfirmedAccountNumberChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ifscCode">IFSC Code:</label>
          <input
            type="text"
            id="ifscCode"
            value={ifscCode}
            onChange={handleIfscCodeChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {confirmationDialogOpen && (
          <div>
            <p>Are you sure you want to transfer?</p>
            <button onClick={handleConfirmTransaction}>Yes</button>
            <button onClick={() => setConfirmationDialogOpen(false)}>No</button>
          </div>
        )}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
 
export default BankTransfer;