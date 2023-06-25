// import React from "react";
import '../styles/Header.css';
import {ReactComponent as Bell} from "../assets/bell-solid.svg";
import {ReactComponent as Gear} from "../assets/gear-solid.svg";

export default function Header(){
    return (
        <header>
            
            <div className="header-main">
                <div className="sub_header">
                    <div>Home</div>
                    <div>Finances</div>
                    <div>Send and Request</div>
                    <div>Deals</div>
                    <div>Wallet</div>
                    <div className='active'>Activity</div>
                    <div>Help</div>

                </div>
                <div className="sub_header">
                    <div className="btn">
                        <Bell/>
                    </div>
                    <div className="btn">
                        <Gear/>
                    </div>
                    
                    <div>LOG OUT</div>
                </div>
            </div>
      </header>
    );
}