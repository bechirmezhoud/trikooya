import React, {useContext, useState} from "react";
import "../styles/product.css";

import { BasketContext } from "../BasketProvider";


export default function Product({prod, handleClose, handleDone}){
    const [basket, dispatch] = useContext(BasketContext); //the Basket context
    const [size, setSize] = useState("S");//Selected Size
    const [qte, setQte] = useState(1); //Quantite 
    const qtes = Object.keys(prod.Qte);


    return (
    <div className="outer">
    <div className="productDetails">
    <div className="closebtn" onClick={handleClose}>
          +
        </div>
      <img src={prod.imageUrl} alt="product" />
      <div className="infos">
        <div>Price : {prod.price}</div>
        <div className="grp"> 
            <label>SIZE :</label>
            <select onChange={(e) => setSize(e.target.value)}>
              {
                qtes.map((k) => <option value={k}>{k}</option>)
              }

            </select>
        </div>
        <input type="number" value={qte} onChange={(e) => setQte(e.target.value)} />
        <div className="btngrp">
            <button className="checkoutbtn" onClick={() => {dispatch({ type: "ADD", payload: { ...prod, size, QteC : parseInt(qte, 10) }}); handleClose(); handleDone();}}>
            ADD TO CART
            </button>
            <div className="underbtn" />
        </div>
      </div>
    </div>
  </div>
  )
}