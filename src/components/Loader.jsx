import React from "react";
import "../styles/loader.css";

export default function Loader() {
  return (
    <div className="loader">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
      <h1 className="text">STAY HIGH</h1>
    </div>
  );
}
