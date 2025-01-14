// userDetails.js
import React, { useState, useEffect } from 'react';

function UserDetails() {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/banking-system-3c21a/databases/(default)/documents/Account');
      const data = await response.json();
      setUserDetails(data.documents);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{textAlign:'center',color:'white'}}>User Details</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {userDetails.map((user, index) => (
            <li key={index}>
              <strong>Name:</strong> {user.fields.name.stringValue} <br />
              <strong>Balance:</strong> {user.fields.balance.doubleValue} <br />
              <strong>customerId:</strong> {user.fields.customerId.stringValue} <br />
              <strong>accountNumber:</strong> {user.fields.accountNumber.integerValue} <br />
              <strong>age:</strong> {user.fields.age.integerValue} <br />
              <strong>PhoneNumber:</strong> {user.fields.phoneNumber.stringValue} <br />
              <strong>email:</strong> {user.fields.email.stringValue} <br />
              
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserDetails;
