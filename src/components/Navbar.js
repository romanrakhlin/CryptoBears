import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-logo">
                    Crypto Bears
                </Link>

                <ul className={"nav-menu"}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links">
                            Homepage
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/bears-factory" className="nav-links">
                            Bears Factory
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;