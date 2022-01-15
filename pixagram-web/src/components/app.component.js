import React from "react";
import Header from "./Common/Header/Header.component";
import Home from "./Home/Homepage/Home.controller";
import './style.css'
export default function App(){
    return (
        <div className="main">
            <Header />
            <Home />
        </div>
    )
}