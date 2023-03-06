import React from "react";
import './styles/navbar.css'
import logo from '../assets/icons/bank.svg'
import {Link} from "react-router-dom";

function NavBar() {
    return (
        <nav id="menuCont" className="navbar navbar-expand-lg bg-light">
            <div id="menu" className="container-fluid">
                <Link id="logo" className="navbar-brand" to="/"><img
                    src={logo} alt={"Missing"}/>Banco US-Caja</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul id="menuList" className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Área de usuario</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/bank-operations">Operaciones Bancarias</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/personal-info">Informacion Personal</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">Área de Administración</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;