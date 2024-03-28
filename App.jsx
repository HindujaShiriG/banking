// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AdminPage from './pages/AdminPage';
import ApproveAccountsPage from './pages/approveaccount';
import CustomerTransactions from './pages/CustomerTransactionsPage'; 
import BankTransfer from './pages/BankTransfer';
import ForgotPassword from './pages/forgotpassword';
import CustomerPage from './pages/CustomerPage';
import CreateAccountPage from './pages/createaccount';
import LoginPage from './pages/login';
import CustomerPageMain from './pages/customer-page-main';
import ApplyLoan from './pages/ApplyLoan';
import UserDetails from './pages/userDetails'; 
import DepositDetails from './pages/depositDetails';
import Addbank from './pages/Addbank';
import TransactionsDonePage from './pages/transactions';
import LoanDetails from './pages/LoanDetails';
import LoanDeposit from './pages/LoanDeposit';
import HomePage from './pages/home';


function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSignupSuccess = () => {
    setIsSignedUp(true);
  };

  return (
    <Router>
      <Routes>


        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup onSignupSuccess={handleSignupSuccess} />} />
        <Route path="/admin" element={<AdminPage />}/>
        <Route path="/approve-accounts" element={<ApproveAccountsPage />} />
        <Route path="/transactions" element={<TransactionsDonePage />} />
        <Route path="/bank-transfer" element={<BankTransfer />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/customer-page-main" element={<CustomerPageMain/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/ApplyLoan" element={< ApplyLoan/>}/>
        <Route path="/user-details" element={< UserDetails/>}/>
        <Route path="/deposit-details" element={< DepositDetails/>}/>
        <Route path="/bankadd-details" element={< Addbank/>}/>
        <Route path="/transactionsCustomer" element={<CustomerTransactions />}/>
        <Route path="/Loan-details" element={<LoanDetails />}/>
        <Route path="/loan-deposits" element={< LoanDeposit />}/>

        
        <Route path="*" element={<HomePage onSignupSuccess={handleSignupSuccess} />} />

      </Routes>
    </Router>
  );
}

export default App;
