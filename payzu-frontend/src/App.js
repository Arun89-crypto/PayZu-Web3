import React from 'react'
import './App.css';
import Header from './Components/Header';
import PaymentWindow from './Components/PaymentWindow';

function App() {
    return (
        <div className="App display__flex space__between flex__down">
            <Header />
            <PaymentWindow />
            <p className='footer'>Made By yopiter._.kick :)</p>
        </div>
    );
}

export default App;
