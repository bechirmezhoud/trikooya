import React, { useState, useEffect, useContext } from "react";
import "./styles/styles.css";
import {
  useStorage,
  useFirestore,
  useFirestoreCollectionData
} from "reactfire";
import { BasketContext } from "./BasketProvider";

import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";

export default function App() {
  const [src, setSrc] = useState(null); //contain the cover image link
  const [size, setSize] = useState(null); //the current selected size
  const [products, setProducts] = useState([]); //products from firestore
  const [showModal, setShowModal] = useState(false); //show the ADD ITEM modal
  const [showCart, setShowCart] = useState(false); //show the cart
  const [showCheckout, setShowCheckout] = useState(false); //show the checkout page
  const [basket, dispatch, sum] = useContext(BasketContext); //the Basket context
  const [done, setDone] = useState(false); //if the order is SUBMITTED or not
  const [added, setadded] = useState(null); //handle add product animation
  const [srclogo, setSrclogo] = useState(null); //SRC logo from DB

  //GET the products list from firestore
  const prods = useFirestoreCollectionData(
    useFirestore().collection("products")
  );

  useEffect(() => setProducts(prods), [prods]);

  //imprort the cover from firebase
  useStorage()
    .ref("images/cover.jpg")
    .getDownloadURL()
    .then((url) => setSrc(url));

  //import LOGO
  //imprort the cover from firebase
  useStorage()
    .ref("images/logo.png")
    .getDownloadURL()
    .then((url) => setSrclogo(url));

  //handle the animation and the reset of the app after submitting the order
  const handleDone = () => {
    dispatch({ type: "EMPTY" });
    setShowCheckout(false);
    setShowCart(false);
    setDone(true); //show the FINISH MESSAGE
  };

  return (
    <div className="App">
      {showModal && <div className="modal">ITEM ADDED</div>}
      {done && (
        <div className="outer">
          <div className="thanks">
            <p>
              <span>ORDER RECEIVED</span> THANK YOU FOR TRUSTING OUR SERVICE THE
              ORDER SHOULD BE DELIVERED IN A FEW DAYS SO PLEASE KEEP YOUR PHONE
              AVAILABLE
            </p>
            <div className="btngrp">
              <button className="checkoutbtn" onClick={() => setDone(false)}>
                OKEY !
              </button>
              <div className="underbtn" />
            </div>
          </div>
        </div>
      )}
      {basket.length > 0 && showCheckout && (
        <CheckOut
          handleDone={handleDone}
          handleClose={() => setShowCheckout(false)}
        />
      )}
      {basket.length > 0 && showCart && (
        <Cart handleCheckout={() => setShowCheckout(true)} />
      )}
      <img className="logoT" alt="logo" src={srclogo} />
      <div style={{ background: `url(${src})` }} className="cover" />

      <h1>DOUBLE TAP ON THE PRODUCT YOU LIKE.</h1>
      <h3>TO ADD IT TO YOUR CART </h3>
      <h3 className="selectSize">SELECT YOUR SIZE.</h3>
      <div className={!size ? "size warning" : "size"}>
        <div
          className={`choix S ${size === "S" ? "active" : ""} `}
          onClick={() => setSize("S")}
        >
          S
        </div>
        <div
          className={`choix M ${size === "M" ? "active" : ""} `}
          onClick={() => setSize("M")}
        >
          M
        </div>
        <div
          className={`choix L ${size === "L" ? "active" : ""} `}
          onClick={() => setSize("L")}
        >
          L
        </div>
        <div
          className={`choix XL ${size === "XL" ? "active" : ""} `}
          onClick={() => setSize("XL")}
        >
          XL
        </div>
        <div
          className={`choix XXL ${size === "XXL" ? "active" : ""} `}
          onClick={() => setSize("XXL")}
        >
          XXL
        </div>
      </div>
      <div className="products">
        {products
          .filter((prod) => (size ? prod.Qte[size] > 0 : true))
          .map((prod) => (
            <div
              className="productbox"
              key={prod.name}
              onDoubleClick={
                size && //CHECK IF A SIZE WAS SELECTED
                (() => {
                  //Show ADD ITEM modal for 2s and add the item to the Basket
                  setShowModal(true);
                  setadded(prod.name);
                  dispatch({ type: "ADD", payload: { ...prod, size } });
                  setTimeout(() => {
                    setShowModal(false);
                    setadded(null);
                  }, 2000);
                })
              }
            >
              <div className="AddStuff">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={added === prod.name ? "added" : ""}
                >
                  <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                </svg>
                <div className="product_price">
                  <span
                    className="plus_prod"
                    onClick={
                      size && //CHECK IF A SIZE WAS SELECTED
                      (() => {
                        //Show ADD ITEM modal for 2s and add the item to the Basket
                        setShowModal(true);
                        setadded(prod.name);
                        dispatch({ type: "ADD", payload: { ...prod, size } });
                        setTimeout(() => {
                          setShowModal(false);
                          setadded(null);
                        }, 2000);
                      })
                    }
                  >
                    +
                  </span>
                  <p>
                    {prod.price.slice(0, prod.price.indexOf("."))}
                    <span className="frac">
                      {prod.price.slice(prod.price.indexOf("."))}
                    </span>
                    DT
                  </p>
                </div>
              </div>
              <img
                alt={prod.name}
                className="product_img"
                src={prod.imageUrl}
              />
            </div>
          ))}
      </div>
      <div className="cart" onClick={() => setShowCart(!showCart)}>
        <div className="carticon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
          </svg>
        </div>
        <div className="cartNb">
          <div className="itemsNb">{sum(basket)}</div>
        </div>
      </div>
      <footer>
        <h6>
          WE FEEL COMFORTABLE IN BLACK <br />
          <span> &copy; 2020 T'RIKOOYA</span>
        </h6>
      </footer>
    </div>
  );
}
