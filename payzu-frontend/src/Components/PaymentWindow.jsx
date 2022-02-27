import React from "react";
import { useContext } from "react";
import Ethereum from "../assets/ethereum.png";
import Metamask from "../assets/metamask.png";
import { TransactionContext } from "../context/TransactionContext";

const PaymentWindow = () => {
  const { formData, handleChange, sendTransaction, balance } =
    useContext(TransactionContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { addressTo, amount } = formData;

    if (!addressTo || !amount) return;
    sendTransaction();
  };

  return (
    <div className="payment__window__main">
      <h1>Pay Now 🚀</h1>
      <br></br>
      <h3>Balance : ETH {balance}</h3>
      <br></br>
      <div className="input__box display__flex">
        <input
          className="payment__input"
          placeholder="Address : 0x37...."
          type={"text"}
          onChange={(e) => handleChange(e, "addressTo")}
        ></input>
        <img src={Metamask} className="eth__logo" alt="eth__logo"></img>
      </div>
      <div className="input__box display__flex">
        <input
          className="payment__input"
          placeholder="0.0"
          pattern="^[0-9]*[.,]?[0-9]*$"
          type={"text"}
          onChange={(e) => handleChange(e, "amount")}
        ></input>
        <img src={Ethereum} className="eth__logo" alt="eth__logo"></img>
      </div>
      <button
        className="button__primary payment__button"
        onClick={(e) => handleSubmit(e)}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentWindow;
