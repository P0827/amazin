import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  setSessionCurrency,
  updateCurrencyRates,
} from "../../../Controllers/productActions";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { pipe } from "../../../utils";
import "./currencyScreen.css";
import { userUpdateProfileActions } from "../UserSlice";
import { updateUserProfile } from "../../../Controllers/userActions";

export default function CurrencyScreen({}) {
  const { cType } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const { success } = useSelector((state) => state.currencyType);
  const [currency, setCurrency] = useState(cType || pipe.currency);

  const submitHandler = () => {
    setSessionCurrency(currency);
    localStorage.setItem("currency", currency);
    pipe.setCurrency(currency);
    dispatch(updateCurrencyRates());
    if (userInfo)
      dispatch(
        updateUserProfile({
          userId: userInfo._id,
          currency,
        })
      );
    console.log("currencyScreen   ");
    console.log(
      "userInfo ",
      userInfo?.currency,
      { currency },
      "pipe ",
      pipe.currency
    );
  };

  useEffect(() => {
    setCurrency(cType || pipe.currency);
    if (!userInfo) {
      dispatch(userUpdateProfileActions._RESET());
    }
  }, [cType, dispatch, userInfo?._id]);

  return (
    <div className="c-screen currency">
      <header className="container flex">
        <div className="col-50p">
          <h2 className="title">Language Settings</h2>
          <p className="sub-title">
            Select the language you prefer for browsing, shopping, and
            communications.
          </p>
          <div className="languages">
            <ul className="max-30">
              <li className="language active">
                <div className="sprite__wrapper">
                  <div className="sprite circle"></div>
                  <span>
                    English - EN - <i>Translation</i>
                  </span>
                </div>
              </li>
              <li className="separator"></li>
              {[
                ["Deutsch", "DE", "Übersetzen"],
                ["Nederlands", "NL", "Vertaling"],
                ["Polski", "PL", "Tłumaczenie"],
                ["Türkçe", "TR", "Çeviri"],
                ["Čeština", "CS", "Překlad"],
              ].map(([label, short, text], id) => (
                <li key={id} className="language disabled">
                  <div className="sprite__wrapper">
                    <div className="sprite circle"></div>
                    <span>
                      {label} - {short} - <i>{text}</i>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <br />
          </div>
        </div>
        <div className="col-50p">
          <b>Translation</b>
          <p className="disabled">
            We'll translate the most important information for your browsing,
            shopping, and communications.
          </p>
        </div>
      </header>
      <div className="divider-inner"></div>
      <div className="container currencies">
        <section className="col-50p">
          <h2 className="title"> Currency Settings</h2>
          <p>Select the currency you want to shop with.</p>
          {success && (
            <MessageBox variant="success">
              Currency Setting has been changed
            </MessageBox>
          )}
          <select
            id="currency"
            className="col-50p"
            value={currency}
            onChange={(e) => {
              e.stopPropagation();
              setCurrency(e.target.value);
            }}
          >
            <legend htmlFor="currency">Select Currency</legend>
            {pipe.currencies.map((c) => (
              <option value={c}>
                {pipe.getSymbol(c)} - {c} - {pipe.getName(c)}
              </option>
            ))}
          </select>
          {currency !== "EUR" && (
            <p>
              {`Note: You will be shown prices in ${pipe.getSymbol(
                currency
              )} - ${currency} - ${pipe.getName(
                currency
              )} on Amazin as a reference only. You may or may not be able to pay in ${pipe.getSymbol(
                currency
              )} - ${currency} - ${pipe.getName(
                currency
              )} see more details during checkout.`}
            </p>
          )}
        </section>
        <div className="col-50p"></div>
      </div>

      <div className="divider-inner"></div>
      <div className="container p-1">
        <Link to={localStorage.getItem("backToHistory")}>
          <button className="btn--xs">Cancel</button>
        </Link>
        <Link to={localStorage.getItem("backToHistory")}>
          <button className="btn primary btn--xs" onClick={submitHandler}>
            Save Changes
          </button>
        </Link>
      </div>
    </div>
  );
}
