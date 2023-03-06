import React, {useEffect, useState} from "react";
import "./styles/login.css"
import {Link} from "react-router-dom";

function Login() {
    // localStorage.setItem("isAuth", "false")
    const [dni, setDni] = useState("")
    const handleOnClick = () => {
        localStorage.setItem("isAuth", "true")
    }

    useEffect(() => {
        localStorage.setItem("dni", dni)
        console.log(localStorage.getItem("dni"))
    },[dni])

    return (
        <div id="mainLogin">
            <div id="containerLogin">
                <div id="innerContainerLogin">
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="Introduce tu DNI" value={dni} onChange={e => setDni(e.target.value)}/>
                            <label htmlFor="floatingInput">Introduce tu DNI</label>
                    </div>
                    <div className="buttons-divLogin">
                        <div>
                            <Link className="btn btn-primary" to="/sign-up" type="button">Registrarse</Link>
                        </div>
                        <div>
                            <Link className="btn btn-primary" onClick={handleOnClick} to="/" type="button">Entrar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;