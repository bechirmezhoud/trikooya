import React, { useState, useContext } from "react";
import "../styles/checkout.css";
import { Gov } from "../Gov.js";
import { useForm } from "react-hook-form";
import { useFirestore } from "reactfire";
import { BasketContext } from "../BasketProvider";

export default function CheckOut({ handleDone, handleClose }) {
  const [gov, setGov] = useState("empty"); //the current choosen governorat
  const [basket] = useContext(BasketContext); //the Basket Context

  const { handleSubmit, register, errors } = useForm(); //Creting a form

  const firestore = useFirestore();

  //Submit the Order to the DB
  const onSubmit = ({ name, governorat, delegation, address, phone }) => {
    firestore
      .collection("orders")
      .add({
        name: name,
        address: governorat + " " + delegation + " " + address,
        delivered: false,
        phone,
        products: basket
      })
      .then(handleDone);
  };

  return (
    <div className="outer">
      <form className="checkoutPage" onSubmit={handleSubmit(onSubmit)}>
        <div className="closebtn" onClick={handleClose}>
          +
        </div>
        <h1 className="cartTitle">CHECKOUT</h1>
        <div className="CheckoutForm">
          <div className="inputgrp">
            <div className="label">NAME</div>
            <input
              type="text"
              name="name"
              ref={register({ required: "Required" })}
            />
          </div>
          {errors.name && <span>this field is required</span>}
          <div className="adressGrp">
            <div className="inputgrp">
              <div className="label">GOVERNORAT</div>
              <select
                name="governorat"
                onChange={(e) => setGov(e.target.value)}
                ref={register({
                  required: "Required",
                  validate: (value) => value !== "empty"
                })}
              >
                <option value="empty" selected>
                  Governorat
                </option>
                <option value="Ariana">Ariana</option>
                <option value="Béja">Béja</option>
                <option value="Ben Arous">Ben Arous</option>
                <option value="Bizerte">Bizerte</option>
                <option value="Gabès">Gabès</option>
                <option value="Gafsa">Gafsa</option>
                <option value="Jendouba">Jendouba</option>
                <option value="Kairouan">Kairouan</option>
                <option value="Kasserine">Kasserine</option>
                <option value="Gebili">Gebili</option>
                <option value="Kef">Kef</option>
                <option value="Mahdia">Mahdia</option>
                <option value="Manouba">Manouba</option>
                <option value="Medenine">Medenine</option>
                <option value="Monastir">Monastir</option>
                <option value="Nabeul">Nabeul</option>
                <option value="Sfax">Sfax</option>
                <option value="Sidi Bouzid">Sidi Bouzid</option>
                <option value="Siliana">Siliana</option>
                <option value="Sousse">Sousse</option>
                <option value="Tataouine">Tataouine</option>
                <option value="Tozeur">Tozeur</option>
                <option value="Tunis">Tunis</option>
                <option value="Zaghouan">Zaghouan</option>
              </select>
            </div>
            <div className="inputgrp">
              <div className="label">DELEGATION</div>
              <select
                name="delegation"
                ref={register({
                  required: "Required",
                  validate: (value) => value !== "empty"
                })}
              >
                <option value="empty">Delegation</option>
                {gov !== "empty" &&
                  Gov[gov].map((del) => <option value={del}>{del}</option>)}
              </select>
            </div>
          </div>
          {(errors.delegation || errors.governorat) && (
            <span>this field is required</span>
          )}
          <div className="inputgrp">
            <div className="label">ADDRESS</div>
            <input
              type="text"
              name="address"
              ref={register({ required: "Required" })}
            />
          </div>
          {errors.address && <span>this field is required</span>}
          <div className="inputgrp">
            <div className="label">PHONE</div>
            <input
              type="text"
              name="phone"
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[0-9]{8}/g,
                  message: "invalid Phone Number"
                }
              })}
            />
          </div>
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>
        <div className="btngrp">
          <button type="submit" className="checkoutbtn">
            SUBMIT
          </button>
          <div className="underbtn" />
        </div>
      </form>
    </div>
  );
}
