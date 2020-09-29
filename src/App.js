import React, { useState, useEffect, useContext } from "react";
import "./styles/styles.css";
import {
  useFirestore,
  useFirestoreCollectionData
} from "reactfire";
import { BasketContext } from "./BasketProvider";

import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import Header from "./components/Header";
import Product from "./components/Product";

export default function App() {
  const [products, setProducts] = useState([]); //products from firestore
  const [showModal, setShowModal] = useState(false); //show the ADD ITEM modal
  const [showCart, setShowCart] = useState(false); //show the cart
  const [showCheckout, setShowCheckout] = useState(false); //show the checkout page
  const [basket, dispatch, sum] = useContext(BasketContext); //the Basket context
  const [done, setDone] = useState(false); //if the order is SUBMITTED or not
  const [product, setProduct] = useState(null); //Product object to show in details panel
  //GET the products list from firestore
  const prods = useFirestoreCollectionData(
    useFirestore().collection("products")
  );

  useEffect(() => setProducts(prods), [prods]);



  //handle the animation and the reset of the app after submitting the order
  const handleDone = () => {
    dispatch({ type: "EMPTY" });
    setShowCheckout(false);
    setShowCart(false);
    setDone(true); //show the FINISH MESSAGE
  };

  return (
    <div className="App">
    {product && <Product handleDone={()=>{
                  //Show ADD ITEM modal for 2s and add the item to the Basket
                  setShowModal(true);
                  setTimeout(() => {
                    setShowModal(false);
                  }, 2000);
                }} handleClose={() => setProduct(null)} prod={product} />}
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
     <Header />
      <div className="products">
        {products
          .map((prod) => (
            <div
              className="productbox"
              key={prod.name}
              onDoubleClick={
                () => {
                  //Show ADD ITEM modal for 2s and add the item to the Basket
                  setShowModal(true);
                  dispatch({ type: "ADD", payload: { ...prod } });
                  setTimeout(() => {
                    setShowModal(false);
                  }, 2000);
                }
              }
            >
               
              <img
                alt={prod.name}
                className="product_img"
                src={prod.imageUrl}
              />
              <div className="details">
               <p>
                    {prod.price.slice(0, prod.price.indexOf("."))}
                    <span>
                      {prod.price.slice(prod.price.indexOf("."))}
                    </span>
                    DT
                </p>
                <p className="showDetails"onClick={()=> setProduct(prod) }>ADD TO CART</p>
              </div>
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
