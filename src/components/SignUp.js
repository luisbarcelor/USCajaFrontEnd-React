import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./styles/signUp.css"
import axios from "axios";

function SignUp() {
    const [message, setMessage] = useState("")
    const [updated, setUpdated] = useState(false)
    const [dni, setDni] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthYear, setBirthYear] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")

    const urlApi = "http://localhost:8080/api"

    const signUp = async (event) => {
        event.preventDefault();
        const newUser = {
            dni,
            name,
            lastName,
            birthYear,
            phone,
            address,
            email,
            username: null,
            password: null
        }

        const response = await axios.post(urlApi + "/auth/sign-up", newUser)
        setMessage(response.data.message)
    }

    return(
        <div id="mainSUP">
            <div id="containerSUP">
                <div id="innerContainerSUP">
                    <form className="row g-3" onSubmit={signUp}>
                        <div className="col-md-7">
                            <label htmlFor="inputPassword" className="form-label">DNI</label>
                            <input type="text" className="form-control" id="inputPassword" value={dni} onChange={e => setDni(e.target.value)}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="inputPassword" value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Apellidos</label>
                            <input type="text" className="form-control" id="inputPassword4" value={lastName} onChange={e => setLastName(e.target.value)}/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">Año de nacimiento</label>
                            <input type="number" className="form-control" id="inputAddress" value={birthYear} onChange={e => setBirthYear(e.target.value)}/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress2" className="form-label">Teléfono</label>
                            <input type="number" className="form-control" id="inputAddress2"
                                   value={phone} onChange={e => setPhone(e.target.value)}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Dirección</label>
                            <input type="text" className="form-control" id="inputCity" value={address} onChange={e => setAddress(e.target.value)}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input id="inputEmail" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div><label>{message}</label></div>
                        <div id="buttonsSUP">
                            <div id="submitBt" className="col-12">
                                <button type="submit" className="btn btn-primary">Registrarse</button>
                                <Link type="button" to="/login" className="btn btn-primary">Atrás</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;