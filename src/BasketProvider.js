import React, { createContext, useReducer } from "react";

export const BasketContext = createContext();

function sum(basket) {
  let aux = 0;
  basket.forEach((prod) => {
    aux += prod.QteC;
  });
  return aux;
}

function reducer(state, action) {
  let nS = state;
  switch (action.type) {
    //ADD PRODUCT TO BASKET if it dosn't exist else add 1 to QteC
    case "ADD":
      if (
        nS.filter(
          (basketprod) =>
            basketprod.name === action.payload.name &&
            basketprod.size === action.payload.size
        ).length === 0
      ) {
        nS.push(action.payload);
      } else {
        nS[
          state.findIndex(
            (prodaux) =>
              prodaux.name === action.payload.name &&
              prodaux.size === action.payload.size
          )
        ].QteC+=action.payload.QteC;
      }
      return nS;

    //DELETE A PRODUCT FROM BASKET
    case "DELETE":
      return state.filter((prod) => prod !== action.payload);

    //SYNC QTEC IN BASKET TO THE INPUT IN CART COMPONENT
    case "UPDATE_QTEC":
      nS = state.map((prod) => {
        if (prod === action.payload.prod)
          prod.QteC = parseInt(action.payload.QteC, 10);
        return prod;
      });
      return nS;

    //EMPTY THE BASKET AFTER CHECKOUT
    case "EMPTY":
      return [];

    default:
      throw new Error();
  }
}

export const BasketProvider = (props) => {
  const [basket, dispatch] = useReducer(reducer, []);

  return (
    <BasketContext.Provider value={[basket, dispatch, sum]}>
      {props.children}
    </BasketContext.Provider>
  );
};
