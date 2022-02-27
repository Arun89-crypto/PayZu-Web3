import React from 'react'
import './App.css';
import Header from './Components/Header';
import PaymentWindow from './Components/PaymentWindow';
import { TransactionProvider } from './context/TransactionContext';
function App() {
    return (
        <TransactionProvider>
            <div className="App display__flex space__between flex__down">
                <Header />
                <PaymentWindow />
                <p className='footer'>Made By yopiter._.kick :)</p>
            </div>
        </TransactionProvider>
    );
}

export default App;
