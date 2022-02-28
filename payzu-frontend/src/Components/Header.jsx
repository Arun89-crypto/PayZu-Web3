import React, { useState, useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Header = () => {
  const [transactionShow, setTransactionShow] = useState(false);
  const [accountOptions, setAccountOptions] = useState(false);
  const [userName, setUserName] = useState("");
  const {
    connectWallet,
    currentAccount,
    getAccount,
    userData,
    changeUserName,
    transactions,
    deleteTransactions,
  } = useContext(TransactionContext);
  const [name, setName] = useState("");

  useEffect(() => {
    if (currentAccount !== undefined) {
      getAccount();
      setUserName(
        `${currentAccount.slice(0, 7)}...${currentAccount.slice(40)}`
      );
    }
    // eslint-disable-next-line
  }, [currentAccount]);

  useEffect(() => {
    setName(userData.user.name);
    // eslint-disable-next-line
  }, [accountOptions]);

  return (
    <div className="header__main display__flex space__between">
      <div className="header__left">
        <h1>PayZu.</h1>
      </div>
      <div className="header__right display__flex">
        {userName ? (
          <div className="button__primary header__buttons">{userName}</div>
        ) : (
          <button
            className=" button__primary header__buttons"
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </button>
        )}
        <button
          className="button__secondary header__buttons"
          onClick={() => setTransactionShow(true)}
        >
          Transactions
        </button>
        <div className="avatar">
          <div
            className="avatar__logo display__flex"
            onClick={() => setAccountOptions(true)}
            style={{
              background: `${
                currentAccount !== undefined
                  ? "linear-gradient(204deg,rgba(255, 70, 151, 1) 0%,rgba(0, 116, 255, 1) 100%)"
                  : "rgb(204, 204, 204)"
              }`,
              color: `${currentAccount !== undefined ? "#fff" : "#000"}`,
              fontWeight: "bold",
            }}
          >
            {name[0]}
          </div>
          <AccountOptions
            accountOptions={accountOptions}
            setAccountOptions={setAccountOptions}
            name={name}
            setName={setName}
            changeUserName={changeUserName}
            deleteTransactions={deleteTransactions}
          />
        </div>
      </div>
      <TransactionHistory
        transactionShow={transactionShow}
        setTransactionShow={setTransactionShow}
        transactions={transactions}
      />
    </div>
  );
};

const AccountOptions = ({
  accountOptions,
  setAccountOptions,
  name,
  setName,
  changeUserName,
  deleteTransactions,
}) => {
  return (
    <div
      className={
        accountOptions ? "account__options" : "account__options closed"
      }
    >
      <div className="display__flex space__between header__sidebar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="close__button"
          onClick={() => setAccountOptions(false)}
        >
          <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
        </svg>
        <h1>Settings</h1>
      </div>
      <br></br>
      <p>Your username :</p>
      <div className="input__box display__flex">
        <input
          className="setting__input"
          placeholder="UserName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <br></br>
      <button
        className="button__primary account__button"
        onClick={() => changeUserName(name)}
      >
        Save
      </button>
      <br></br>
      <br></br>
      <button
        className="button__secondary account__button"
        onClick={() => deleteTransactions()}
      >
        Clear Transactions
      </button>
    </div>
  );
};

const TransactionHistory = ({
  transactionShow,
  setTransactionShow,
  transactions,
}) => {
  return (
    <div
      className={
        transactionShow
          ? "transactions__history"
          : "transactions__history closed"
      }
    >
      <div className="display__flex space__between header__sidebar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="close__button"
          onClick={() => setTransactionShow(false)}
        >
          <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
        </svg>
        <h1>Transactions</h1>
      </div>
      <div className="transaction__info__cont">
        {transactions.length !== 0 ? (
          transactions.map((transaction) => {
            const { transactionHash, toAddress, amount } = transaction;
            return (
              <div className="transaction__info" key={transaction._id}>
                <p>
                  <b>{amount} Eth</b>
                  {" to "}
                  <span className="t_addr">{toAddress}</span>
                </p>
                <a
                  href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}
                  className="transac__link"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  Check this Transaction ➡️
                </a>
              </div>
            );
          })
        ) : (
          <p>No transactions for this address</p>
        )}
      </div>
    </div>
  );
};

export default Header;
