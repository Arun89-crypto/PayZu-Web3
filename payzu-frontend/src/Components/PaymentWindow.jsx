import React from "react";
import Ethereum from "../assets/ethereum.png";
import Metamask from "../assets/metamask.png";

const PaymentWindow = () => {
  return (
    <div className="payment__window__main">
      <h1>Pay Now 🚀</h1>
      <br></br>
      <div className="input__box display__flex">
        <input
          className="payment__input"
          placeholder="Address : 0x37...."
        ></input>
        <img src={Metamask} className="eth__logo" alt="eth__logo"></img>
      </div>
      <div className="input__box display__flex">
        <input className="payment__input" placeholder="0.0"></input>
        <img src={Ethereum} className="eth__logo" alt="eth__logo"></img>
      </div>
      <button className="button__primary payment__button">Pay Now</button>
    </div>
  );
};

export default PaymentWindow;
