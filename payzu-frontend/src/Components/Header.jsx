import React from "react";
import { useState } from "react";

const Header = () => {
  const [transactionShow, setTransactionShow] = useState(false);
  const [accountOptions, setAccountOptions] = useState(false);
  return (
    <div className="header__main display__flex space__between">
      <div className="header__left">
        <h1>PayZu</h1>
      </div>
      <div className="header__right display__flex">
        <button className=" button__primary header__buttons">
          Connect Wallet
        </button>
        <button
          className="button__secondary header__buttons"
          onClick={() => setTransactionShow(true)}
        >
          Transactions
        </button>
        <div className="avatar">
          <div
            className="avatar__logo"
            onClick={() => setAccountOptions(true)}
          ></div>
          <AccountOptions
            accountOptions={accountOptions}
            setAccountOptions={setAccountOptions}
          />
        </div>
      </div>
      <TransactionHistory
        transactionShow={transactionShow}
        setTransactionShow={setTransactionShow}
      />
    </div>
  );
};

const AccountOptions = ({ accountOptions, setAccountOptions }) => {
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
        <input className="setting__input" placeholder="UserName"></input>
      </div>
      <br></br>
      <button className="button__primary account__button">Save</button>
      <br></br>
      <br></br>
      <button className="button__secondary account__button">
        Clear Transactions
      </button>
    </div>
  );
};

const TransactionHistory = ({ transactionShow, setTransactionShow }) => {
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
      <div className="transaction__info">
        <p>
          <b>0.01 Eth</b>
          {" to "}
          <span className="t_addr">0x819189182983hfwef7r45h2</span>
        </p>
        <a href="https://" className="transac__link">
          Check this Transaction ➡️
        </a>
      </div>
      <div className="transaction__info">
        <p>
          <b>2.00 Eth</b>
          {" to "}
          <span className="t_addr">0x81918918298900ef7r45h2s</span>
        </p>
        <a href="https://" className="transac__link">
          Check this Transaction ➡️
        </a>
      </div>
    </div>
  );
};

export default Header;
