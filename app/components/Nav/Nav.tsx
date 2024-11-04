import style from './Nav.module.css'
import React, { Dispatch, SetStateAction } from "react";

const Nav = () =>
{
    return (<nav className={`${style.nav_component} px-5 py-3`}>
        <img src='Logo.png' width={"40vh"}></img> 
        <h1>Online Simple Pascal Compiler With Steps</h1>
        </nav>);
}
export default Nav;