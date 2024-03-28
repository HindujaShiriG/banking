// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/storage';
// import 'firebase/compat/firestore';
// import '../Styles/createaccount.css';

// // Initialize Firebase app
// const firebaseConfig = {
//   apiKey: "AIzaSyBeDhxnJfc2bYLT5uap6Gm89NmgYJwYJSw",
//   authDomain: "arunn-bank.firebaseapp.com",
//   projectId: "arunn-bank",
//   storageBucket: "arunn-bank.appspot.com",
//   messagingSenderId: "105654702421",
//   appId: "1:105654702421:web:5fd36bf21e4a4f3e09dfdc",
//   measurementId: "G-7M1DCVKTQF"
// };
// firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();

// function CreateAccountPage() {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [occupation, setOccupation] = useState('');
//   const [aadharCard, setAadharCard] = useState(null);
//   const [panCard, setPanCard] = useState(null);
//   const [voterId, setVoterId] = useState(null);
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [requestId, setRequestId] = useState(null);
//   const [status, setStatus] = useState(null);
//   const [accountNumber, setAccountNumber] = useState(null);

//   useEffect(() => {
//     const checkStatus = async () => {
//       try {
//         const docRef = await firebase.firestore().collection('customerAccounts').doc(requestId);
//         docRef.onSnapshot((doc) => {
//           if (doc.exists) {
//             const data = doc.data();
//             setStatus(data.status);
//             if (data.status === 'approved') {
//               setAccountNumber(data.accountNumber);
//             }
//           }
//         });
//       } catch (error) {
//         console.error('Error checking status:', error);
//       }
//     };

//     if (requestId) {
//       checkStatus();
//     }
//   }, [requestId]);

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleAgeChange = (e) => {
//     setAge(e.target.value);
//   };

//   const handleOccupationChange = (e) => {
//     setOccupation(e.target.value);
//   };

//   const handleAadharCardChange = (e) => {
//     setAadharCard(e.target.files[0]);
//   };

//   const handlePanCardChange = (e) => {
//     setPanCard(e.target.files[0]);
//   };

//   const handleVoterIdChange = (e) => {
//     setVoterId(e.target.files[0]);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePhoneNumberChange = (e) => {
//     setPhoneNumber(e.target.value);
//   };

//   const uploadFile = async (file) => {
//     if (!file) return null;
//     const storageRef = storage.ref();
//     const fileRef = storageRef.child(file.name);
//     await fileRef.put(file);
//     return fileRef.getDownloadURL();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Check if all fields are filled
//     if (!name || !age || !occupation || !aadharCard || !panCard || !voterId || !email || !phoneNumber) {
//       setErrorMessage('Please fill in all fields.');
//       return;
//     }
//     try {
//       const aadharCardUrl = await uploadFile(aadharCard);
//       const panCardUrl = await uploadFile(panCard);
//       const voterIdUrl = await uploadFile(voterId);

//       const docRef = await firebase.firestore().collection('customerAccounts').add({
//         name,
//         age: parseInt(age),
//         occupation,
//         aadharCardUrl,
//         panCardUrl,
//         voterIdUrl,
//         email,
//         phoneNumber,
//         status: 'pending' // Initial status
//       });

//       setIsSubmitted(true);
//       setErrorMessage('');
//       setRequestId(docRef.id);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setErrorMessage('Failed to submit. Please try again later.');
//     }
//   };

//   return (
//     <div className='create'>
//       <h1>Create an Account</h1>
//       <form onSubmit={handleSubmit}>
  
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input type="text" id="name" value={name} onChange={handleNameChange} />
//         </div>
//         <div>
//           <label htmlFor="age">Age:</label>
//           <input type="text" id="age" value={age} onChange={handleAgeChange} />
//         </div>
//         <div>
//           <label htmlFor="occupation">Occupation:</label>
//           <input type="text" id="occupation" value={occupation} onChange={handleOccupationChange} />
//         </div>
//         <div>
//           <label htmlFor="aadharCard">Aadhar Card:</label>
//           <input type="file" id="aadharCard" accept="image/*" onChange={handleAadharCardChange} />
//         </div>
//         <div>
//           <label htmlFor="panCard">PAN Card:</label>
//           <input type="file" id="panCard" accept="image/*" onChange={handlePanCardChange} />
//         </div>
//         <div>
//           <label htmlFor="voterId">Voter ID:</label>
//           <input type="file" id="voterId" accept="image/*" onChange={handleVoterIdChange} />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input type="email" id="email" value={email} onChange={handleEmailChange} />
//         </div>
//         <div>
//           <label htmlFor="phoneNumber">Phone Number:</label>
//           <input type="text" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       {status === 'approved' && (
//         <p>Your request is approved. Your account number is: {accountNumber}</p>
//       )}
//       {status === 'rejected' && <p>Your request is rejected.</p>}
//       {(status === 'pending' && isSubmitted) && <p>Your request is pending approval.</p>}
//       {errorMessage && <p>{errorMessage}</p>}
//     </div>
//   );
// }

// export default CreateAccountPage;
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import '../Styles/createaccount.css';
 
// Initialize Firebase app
const firebaseConfig = {
  apiKey: "AIzaSyCPycQrDC4z0ABJKDJs19Y7el4Voi5Kbl0",
  authDomain: "banking-system-3c21a.firebaseapp.com",
  projectId: "banking-system-3c21a",
  storageBucket: "banking-system-3c21a.appspot.com",
  messagingSenderId: "37016798196",
  appId: "1:37016798196:web:a6201592c84c9cde7a6fa1",
  measurementId: "G-QDEN9KGD2H"
};
firebase.initializeApp(firebaseConfig);
 
const storage = firebase.storage();
 
function CreateAccountPage() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [aadharCard, setAadharCard] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const [voterId, setVoterId] = useState(null);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [requestId, setRequestId] = useState(null);
  const [status, setStatus] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);
  const [customerId, setCustomerId] = useState(null);
 
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const docRef = await firebase.firestore().collection('customerAccounts').doc(requestId);
        docRef.onSnapshot((doc) => {
          if (doc.exists) {
            const data = doc.data();
            setStatus(data.status);
            setAccountNumber(data.accountNumber);
            setCustomerId(data.customerId);
          }
        });
      } catch (error) {
        console.error('Error checking status:', error);
      }
    };
 
    if (requestId) {
      checkStatus();
    }
  }, [requestId]);
 
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
 
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };
 
  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  };
 
  const handleAadharCardChange = (e) => {
    setAadharCard(e.target.files[0]);
  };
 
  const handlePanCardChange = (e) => {
    setPanCard(e.target.files[0]);
  };
 
  const handleVoterIdChange = (e) => {
    setVoterId(e.target.files[0]);
  };
 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
 
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
 
  const uploadFile = async (file) => {
    if (!file) return null;
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    return fileRef.getDownloadURL();
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all fields are filled
    if (!name || !age || !occupation || !aadharCard || !panCard || !voterId || !email || !phoneNumber) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    try {
      const aadharCardUrl = await uploadFile(aadharCard);
      const panCardUrl = await uploadFile(panCard);
      const voterIdUrl = await uploadFile(voterId);
 
      const docRef = await firebase.firestore().collection('customerAccounts').add({
        name,
        age: parseInt(age),
        occupation,
        aadharCardUrl,
        panCardUrl,
        voterIdUrl,
        email,
        phoneNumber,
        status: 'pending' // Initial status
      });
 
      // Get the generated document ID
      const requestId = docRef.id;
 
      // Generate account number
      const accountNumber = generateAccountNumber();
 
      // Update the customer account document with the account number and customer ID
      await firebase.firestore().collection('customerAccounts').doc(requestId).update({
        accountNumber,
        customerId: requestId // Use the document ID as the customer ID
      });
 
      setIsSubmitted(true);
      setErrorMessage('');
      setRequestId(requestId);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Failed to submit. Please try again later.');
    }
  };
 
  const generateAccountNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };
 
  return (
    <div className='create'>
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
 
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="text" id="age" value={age} onChange={handleAgeChange} />
        </div>
        <div>
          <label htmlFor="occupation">Occupation:</label>
          <input type="text" id="occupation" value={occupation} onChange={handleOccupationChange} />
        </div>
        <div>
          <label htmlFor="aadharCard">Aadhar Card:</label>
          <input type="file" id="aadharCard" accept="image/*" onChange={handleAadharCardChange} />
        </div>
        <div>
          <label htmlFor="panCard">PAN Card:</label>
          <input type="file" id="panCard" accept="image/*" onChange={handlePanCardChange} />
        </div>
        <div>
          <label htmlFor="voterId">Voter ID:</label>
          <input type="file" id="voterId" accept="image/*" onChange={handleVoterIdChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {status === 'approved' && (
        <p>Your request is approved. Your account number is: {accountNumber} and Customer ID is: {customerId}</p>
      )}
      {status === 'rejected' && <p>Your request is rejected.</p>}
      {(status === 'pending' && isSubmitted) && <p>Your request is pending approval.</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
 
export default CreateAccountPage;