import React from "react";
import './styles/navbar.css'
import logo from '../assets/icons/favicon.svg'
import {Link} from "react-router-dom";

function NavBar() {
    return (
        <nav id="menuCont" className="navbar navbar-expand-lg bg-light">
            <div id="menu" className="container-fluid">
                <Link id="logo" className="navbar-brand" to="/"><img
                    src={logo} alt={"Missing"}/>Tech World Updates</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul id="menuList" className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/featured">Destacado</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tips">Tips</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">Sobre Nosotros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/recent-operations">Calculadora API</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;