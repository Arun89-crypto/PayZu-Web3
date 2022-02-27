import React, { useState, useEffect } from 'react';
import { contractABI, contractAddress } from '../lib/constants';
import { ethers } from 'ethers'
export const TransactionContext = React.createContext();

let Eth;

if (typeof window !== undefined) {
    Eth = window.ethereum
}



// Function to get contract
const EthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(Eth);
    const signer = provider.getSigner();

    const TransactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );

    return TransactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState();
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: ''
    })
    const [userData, setUserData] = useState({ user: { name: '' } });
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0.0);

    window.ethereum.on('accountsChanged', async (accounts) => {
        // Time to reload your interface with accounts[0]!
        try {
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error);
        }
    })
    // function to check for wallet connection
    const checkWalletConnection = async (Metamask = Eth) => {
        try {
            if (!Metamask) return alert("Please install metamask");
            const accounts = await Metamask.request({ method: 'eth_requestAccounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log("Wallet is connected");
                getTransactions();
                getAccountBalance();
            }
        } catch (error) {
            console.log(error);
            throw new Error('No etherium object');
        }
    }

    const getAccountBalance = async (Metamask = Eth) => {
        try {
            if (!Metamask) return alert("Please install metamask");
            const balance = await Metamask.request({ method: 'eth_getBalance', params: [currentAccount, 'latest'] });
            setBalance(ethers.utils.formatEther(balance));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkWalletConnection();
    }, [currentAccount])

    const connectWallet = async (Metamask = Eth) => {
        try {
            if (!Metamask) return alert("Please install metamask")
            const accounts = await Metamask.request({ method: 'eth_requestAccounts' })
            setCurrentAccount(accounts[0]);
            getTransactions();
            getAccountBalance();
        } catch (error) {
            console.log(error);
            throw new Error('No etherium object');
        }
    }

    const handleChange = (e, name) => {
        setFormData((prev_state) => ({ ...prev_state, [name]: e.target.value }))
    }

    const sendTransaction = async (Metamask = Eth, connectedAccount = currentAccount) => {
        try {
            if (!Metamask) return alert("Please install metamask");
            const { addressTo, amount } = formData;
            const TransactionContract = EthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await Metamask.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: connectedAccount,
                        to: addressTo,
                        gas: '0x7EF40',
                        value: parsedAmount._hex
                    }
                ]
            })

            const transactionHash = await TransactionContract.sendTransaction(
                addressTo,
                parsedAmount,
                `Transferring ETH ${parsedAmount} to ${addressTo}`,
                'TRANSFER'
            )


            await transactionHash.wait()

            await addTransaction(transactionHash.hash, connectedAccount, addressTo, parseFloat(amount), new Date(Date.now()).toISOString())

        } catch (error) {
            console.log(error);
        }
    }

    // -------------------------------
    // Database Functions
    // -------------------------------

    const URL = "http://localhost:8000"

    const getAccount = async () => {
        const response = await fetch(`${URL}/api/auth/getData`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ address: currentAccount })
        })
        const res = await response.json();
        setUserData(res)
    }

    const changeUserName = async (name) => {
        const response = await fetch(`${URL}/api/auth/changeUsername/${userData.user._id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ newuname: name })
        })
        const res = await response.json();
        setUserData(res);
    }

    const getTransactions = async () => {
        const response = await fetch(`${URL}/api/trans/getTransactions`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ address: currentAccount })
        })
        const res = await response.json();
        setTransactions(res);
    }

    const addTransaction = async (transactionHash, fromAddress, toAddress, amount, timestamp) => {
        const response = await fetch(`${URL}/api/trans/addTransaction`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ transactionHash, fromAddress, toAddress, amount, timestamp })
        })
        const res = await response.json();
        setTransactions(res);
    }

    const deleteTransactions = async () => {
        const response = await fetch(`${URL}/api/trans/deletealltransactions`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ address: currentAccount })
        })
        const res = await response.json();
        console.log(res);
        getTransactions();
    }

    return (
        <TransactionContext.Provider value={{
            currentAccount,
            connectWallet,
            handleChange,
            formData,
            sendTransaction,
            userData,
            getAccount,
            changeUserName,
            transactions,
            deleteTransactions,
            balance
        }}>
            {children}
        </TransactionContext.Provider>
    )
}