import React, {useState} from "react";
import Logo from  "../assets/logo.png";

import Cover1 from "../assets/cover1.png";

import "../styles/header.css";

export default function Header(){
    const [open, setOpen] = useState(false);

    return (
    <header>
        {open && (<div className="sidebar">
            {open && <div className="close" onClick={() => setOpen(false)}>X</div>}
            <ul>
                <li className="active">HOME</li>
                <li>ABOUT</li>
                <li>CONTACT</li>
            </ul>
        </div>)}
        <nav>
            <div className="logo" >
                <img src={Logo} alt="T'RIKOOYA" />
                <h1>T'RIKOOYA <br/><span>STAY HIGH</span></h1>
                
            </div>
            <ul>
                <li className="active">HOME</li>
                <li>ABOUT</li>
                <li>CONTACT</li>
            </ul>
            <svg onClick={() => setOpen(true)} width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.625 27.75H32.375V24.6667H4.625V27.75ZM4.625 20.0417H32.375V16.9583H4.625V20.0417ZM4.625 9.25V12.3333H32.375V9.25H4.625Z" fill="#000"/>
            </svg>
        </nav>
        <img className="slideshow" src={Cover1} alt="slideshow" />
        <button onClick={() => window.scrollTo({top:window.outerHeight, behavior:"smooth"})}>SHOP NOW</button>
    </header>
    )
}