import React, { useContext, useState, useEffect } from "react";
import "../styles/cart.css";
import { BasketContext } from "../BasketProvider";

export default function Cart({ handleCheckout }) {
  const [basket, dispatch] = useContext(BasketContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let res = 0;
    basket.forEach((prod) => {
      res += prod.price * prod.QteC;
    });
    setTotal(res);
  }, [basket, setTotal]);

  return (
    <div className="cartPage">
      <h1 className="cartTitle">YOUR CART</h1>
      <div className="prodsList">
        {basket.map((product, index) => (
          <div className="prod" key={index}>
            <div style={{ flex: 0.4, padding: 0 }}>{product.name}</div>
            <div>{product.size}</div>
            <input
              type="number"
              className="QteC"
              value={product.QteC}
              onChange={(e) => {
                //update the QteC ordered
                dispatch({
                  type: "UPDATE_QTEC",
                  payload: { prod: product, QteC: e.target.value }
                });
              }}
            />
            <div style={{ flex: 0.15, padding: 0 }}>
              {parseFloat(product.QteC * product.price).toFixed(2)}
            </div>
            <div
              className="Deletebtn"
              onClick={() =>
                //remove the item from the Basket
                dispatch({ type: "DELETE", payload: product })
              }
            >
              +
            </div>
          </div>
        ))}
        <div className="total">{total.toFixed(2)}DT</div>
      </div>
      <div className="btngrp">
        <button className="checkoutbtn" onClick={handleCheckout}>
          CHECKOUT
        </button>
        <div className="underbtn" />
      </div>
    </div>
  );
}
