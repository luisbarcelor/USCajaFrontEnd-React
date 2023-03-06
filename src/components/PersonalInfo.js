import React, {useEffect, useState} from "react";
import axios from "axios";
import "./styles/personalInfo.css"
import NavBar from "./NavBar";

function PersonalInfo() {
    const dni = localStorage.getItem("dni").toString()
    const [message, setMessage] = useState("")
    const [updated, setUpdated] = useState(false)
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthYear, setBirthYear] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")

    const [info, setInfo] = useState([])
    const urlApi = "http://localhost:8080/api"

    useEffect( () => {
        axios.get(urlApi + "/users/get", {params: {dni}})
            .then(response => {
                setInfo(response.data)
            })

        setUpdated(false)
    }, [updated]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            dni,
            name,
            lastName,
            birthYear,
            phone,
            address,
            email
        }

        setName("")
        setEmail("")
        setLastName("")
        setBirthYear("")
        setAddress("")
        setPhone("")

        const response = await axios.put(urlApi + "/users/update", data)

        setMessage(response.data.message)
        setUpdated(true)
    }

    return(
        <>
            <NavBar></NavBar>
            <div id="main">
                <div id="container">
                    <div id="innerContainer">
                        <div id="dataDiv">
                            <h1>Tu Información</h1>
                            <ul id="infoList">
                                <li>DNI: {info.dni}</li>
                                <li>Nombre: {info.name}</li>
                                <li>Apellidos: {info.lastName}</li>
                                <li>Año de nacimiento: {info.birthYear}</li>
                                <li>Telefono: {info.phone}</li>
                                <li>Dirección: {info.address}</li>
                                <li>Email: {info.email}</li>
                            </ul>
                        </div>


                        <form className="row g-3">
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
                                <input type="text" className="form-control" id="inputAddress" value={birthYear} onChange={e => setBirthYear(e.target.value)}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress2" className="form-label">Teléfono</label>
                                <input type="text" className="form-control" id="inputAddress2"
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
                            <div id="submitBt">
                                <button id="persBt" type="button" onClick={handleSubmit} className="btn btn-primary">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PersonalInfo;
