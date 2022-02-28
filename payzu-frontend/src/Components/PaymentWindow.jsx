import React from "react";
import { useContext } from "react";
import Ethereum from "../assets/ethereum.png";
import Metamask from "../assets/metamask.png";
import { TransactionContext } from "../context/TransactionContext";
import { Triangle } from "react-loader-spinner";

const PaymentWindow = () => {
  const {
    formData,
    handleChange,
    sendTransaction,
    balance,
    Alert,
    message,
    loading,
  } = useContext(TransactionContext);

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
      <div className={Alert ? "alert" : "alert translated"}>
        <h1>Alert!!</h1>
        <h3>{message}</h3>
      </div>
      {loading && (
        <div className="loader display__flex">
          <div className="loader__main display__flex">
            <Triangle ariaLabel="loading-indicator" color="#000" />
            <p>Proccessing Payment</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentWindow;
