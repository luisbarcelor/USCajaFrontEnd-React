import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import axios from "axios";
import "./styles/dashboard.css"

function Dashboard() {
    let dni = localStorage.getItem("dni").toString()
    const urlApi = "http://ec2-35-181-43-92.eu-west-3.compute.amazonaws.com:8080/api"

    const [updated, setUpdated] = useState(false)
    const [message, setMessage] = useState("")
    const [delMessage, setDelMessage] = useState("")
    const [accountList, setAccountList] = useState([])
    const [accountNumber, setAccountNumber] = useState([])
    const [ownerList, setOwnerList] = useState([])
    const [dniTitular, setDniTitular] = useState("")
    const [toAddAccNum, setToAddAccNum] = useState("")

    const showOwners = () => {
        setUpdated(true)
    }

    const addOwner = () => {
        axios.post(urlApi + "/bank-accounts/add-owner/" + dniTitular.toString(), {}, {params: {account: toAddAccNum}})
            .then(response => {
                setMessage(response.data.message)
            })

        setUpdated(true)
    }

    const deleteOwner = (dni) => {
        axios.delete(urlApi + "/bank-accounts/remove-owner/" + dni.toString(), {params: {account: accountNumber}})
            .then(response => {
                setDelMessage(response.data.message)
            })

        setUpdated(true)
    }

    useEffect( () => {
        axios.get(urlApi + "/bank-accounts/list/by-user/" + dni.toString())
            .then(response => {
                setAccountList(response.data)
            })

        axios.get(urlApi + "/bank-accounts/" + accountNumber.toString() + "/owners")
            .then(response => {
                setOwnerList(response.data)
            })

        setUpdated(false)
    }, [updated]);

    return (
        <>
            <NavBar></NavBar>
            <div id="uaTitle">
                <h1>Cuentas a tu Nombre</h1>
                <table className="table" id="account" >
                    <thead>
                        <tr>
                            <th>Cuenta Bancaria</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                    {accountList.map(account => {
                        return (
                        <tr>
                            <td>{account.accountNumber}</td>
                            <td>{Math.round(account.balance * 100) / 100}€</td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>

                <div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="floatingInput"
                               placeholder="Número de Cuenta" value={accountNumber} onChange={e => setAccountNumber(e.target.value)}/>
                            <label htmlFor="floatingInput">Número de Cuenta</label>
                    </div>
                    <button className="btn btn-primary" type="botton" data-bs-toggle="collapse"
                            data-bs-target="#collapseExample" onClick={showOwners} aria-expanded="false" aria-controls="collapseExample">
                        Mostrar Titulares
                    </button>
                </div>
                <div className="collapse" id="collapseExample">
                    <div className="card card-body">
                        {ownerList.map(owner => {
                            return(
                                <div>
                                    <div>
                                        <div>{owner.dni}</div>
                                        <div>{owner.name + " " + owner.lastName}</div>
                                        <div>{owner.phone}</div>
                                        <div>{owner.address}</div>
                                    </div>
                                    <button onClick={() => deleteOwner(owner.dni)} className="btn bg-danger">Delete</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <div className="mb-3">
                        <label htmlFor="account" className="form-label">Número de Cuenta</label>
                        <input type="number" className="form-control" id="account" value={toAddAccNum} onChange={e => setToAddAccNum(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dniTitular" className="form-label">DNI del Nuevo Titular</label>
                        <input type="text" className="form-control" id="dniTitular" value={dniTitular} onChange={e => setDniTitular(e.target.value)}/>
                    </div>
                    <div>
                        <label>{message}</label>
                    </div>
                    <button type="button" onClick={addOwner} className="btn btn-primary">Agregar Titular</button>
                </div>
            </div>

        </>

    );
}

export default Dashboard;