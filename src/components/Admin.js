import React, {useEffect, useState} from "react";
import "./styles/admin.css"
import NavBar from "./NavBar";
import axios from "axios";

function Admin() {
    const urlApi = "http://localhost:8080/api"
    const [updated, setUpdated] = useState(false)
    const [message, setMessage] = useState("")

    const [userList, setUserList] = useState([])
    const [accountList, setAccountList] = useState([])
    const [toShow, setToShow] = useState("")

    const showAccounts = (dni) => {
        setToShow(dni)
        setUpdated(true)
    }

    const addAccount = async (dni) => {
        const user = {
            dni
        }

        const response = await axios.post(urlApi + "/bank-accounts/create", user)

        setMessage(response.data.message)
        setUpdated(true)
    }

    useEffect(() => {
        axios.get(urlApi + "/users/list")
            .then(response => {
                setUserList(response.data)
            })

        axios.get(urlApi + "/bank-accounts/list/by-user/" + toShow.toString())
            .then(response => {
                setAccountList(response.data)
            })

        setUpdated(false)
    },[updated])

    return(
        <>
            <NavBar></NavBar>
            <div id="admin">
                <h1>Área de Administración</h1>
                <h3>Usuarios del US-Caja</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Año de Nacimiento</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map(user => {
                            let html = <></>

                            if (user.dni !== "") {
                                html = (
                                    <tr>
                                        <td>{user.dni}</td>
                                        <td>{user.name}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.birthYear}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.address}</td>
                                        <td>{user.email}</td>
                                        <td><button type="button" onClick={() => showAccounts(user.dni)} className="btn btn-primary">Mostrar Cuentas</button></td>
                                        <td><button type="button" onClick={() => addAccount(user.dni)} className="btn btn-primary">Agregar Cuenta</button></td>
                                    </tr>
                                )
                            }

                            return html;
                        })}
                    </tbody>
                </table>

                <div id="perUserAccounts">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Cuenta Bancaria</th>
                            <th>Fecha de creación</th>
                            <th>Saldo</th>
                        </tr>
                        </thead>
                        <tbody>
                            {accountList.map(account => {
                                return(
                                    <tr>
                                        <td>{account.accountNumber}</td>
                                        <td>{account.creationDate}</td>
                                        <td>{Math.round(account.balance * 100) / 100}€</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>


    );
}

export default Admin;