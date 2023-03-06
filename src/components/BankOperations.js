import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import axios from "axios";
import "./styles/bankOperations.css"

function BankOperations() {
    const dni = localStorage.getItem("dni").toString()
    const urlApi = "http://localhost:8080/api"

    const [updated, setUpdated] = useState(false)
    const [message, setMessage] = useState("")
    const [accountList, setAccountList] = useState([])
    const [transactionsFrom, setTransactionsFrom] = useState([])
    const [transactionsTo, setTransactionsTo] = useState([])
    const [toShow, setToShow] = useState(0)

    const [amount, setAmount] = useState("")
    const [sourceAccount, setSourceAccount] = useState("")
    const [destinationAccount, setDestinationAccount] = useState("")
    const [transactionType, setTransactionType] = useState("")

    const showOperations = (account) => {
        setToShow(account)
        setUpdated(true)
    }

    const makeTransaction = async () => {
        const transaction = {
            amount,
            sourceAccount: {"accountNumber": sourceAccount},
            destinationAccount: {"accountNumber": destinationAccount},
            transactionType,
            involvedUser: {"dni": dni}
        }

        const response = await axios.post(urlApi + "/transactions/create", transaction)

        setUpdated(true)
        setMessage(response.data.message)
    }

    useEffect(() => {
        axios.get(urlApi + "/bank-accounts/list/by-user/" + dni.toString())
            .then(response => {
                setAccountList(response.data)
            })

        axios.get(urlApi + "/bank-accounts/list/transactions-from", {params: {account: toShow}})
            .then(response => {
                setTransactionsFrom(response.data)
            })

        axios.get(urlApi + "/bank-accounts/list/transactions-to", {params: {account: toShow}})
            .then(response => {
                setTransactionsTo(response.data)
            })

        setUpdated(false)
    }, [updated]);

    return (
        <>
            <NavBar></NavBar>
            <div id="boMainContainer">
                <div id="tAccounts">
                    <h1>Cuentas Bancarias</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Número de Cuenta</th>
                            <th>Saldo</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {accountList.map(account => {
                            return (
                                <tr>
                                    <td>{account.accountNumber}</td>
                                    <td>{Math.round(account.balance * 100) / 100}€</td>
                                    <td>
                                        <button onClick={() => showOperations(account.accountNumber)} className="btn bg-primary btn-primary">Mostrar Operaciones</button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                <div>
                    <form id="makeTransaction">
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput"
                                   placeholder="Cuenta de Origen" value={sourceAccount} onChange={e => setSourceAccount(e.target.value)}/>
                                <label htmlFor="floatingInput">Cuenta de Origen</label>
                        </div>
                        <div className="form-floating">
                            <input type="number" className="form-control" id="floatingPassword"
                                   placeholder="Cuenta de Destino" value={destinationAccount} onChange={e => setDestinationAccount(e.target.value)}/>
                                <label htmlFor="floatingPassword">Cuenta de Destino</label>
                        </div>
                        <select className="form-select" aria-label="Default select example" value={transactionType} onChange={e => setTransactionType(e.target.value)}>
                            <option selected>Tipo de Transacción</option>
                            <option value="Top Up">Ingreso</option>
                            <option value="Withdrawal">Retiro</option>
                            <option value="Transfer">Transferencia</option>
                        </select>
                        <div className="form-floating">
                            <input type="number" className="form-control" id="floatingPassword"
                                   placeholder="Cantidad" value={amount} onChange={e => setAmount(e.target.value)}/>
                            <label htmlFor="floatingPassword">Cantidad</label>
                        </div>
                        <label>{message}</label>
                        <button className="btn btn-primary" type="button" onClick={makeTransaction}>Hacer Transacción</button>
                    </form>
                </div>

                {transactionsFrom.length !== 0 || transactionsTo.length !== 0 ?
                    <div id="transactions">
                        <div id="transactionsFrom">
                            <h2>Operaciones Locales</h2>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Transacción</th>
                                    <th>Fecha</th>
                                    <th>Cantidad</th>
                                    <th>Cuenta de Origen</th>
                                    <th>Cuenta de Destino</th>
                                    <th>Usuario Involucrado</th>
                                </tr>
                                </thead>
                                <tbody>
                                {transactionsFrom.map(transaction => {
                                    return(
                                        <tr>
                                            <td>{transaction.transactionType}</td>
                                            <td>{transaction.date}</td>
                                            <td>{transaction.amount}€</td>
                                            <td>{transaction.sourceAccount.accountNumber}</td>
                                            {transaction.destinationAccount === null ?
                                                <td>----</td> :
                                                <td>{transaction.destinationAccount.accountNumber}</td>
                                            }
                                            <td>{transaction.involvedUser.dni}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                        <div id="transactionsTo">
                            <h2>Operaciones Externas</h2>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Transacción</th>
                                    <th>Fecha</th>
                                    <th>Cantidad</th>
                                    <th>Cuenta Origen</th>
                                    <th>Cuenta Destino</th>
                                    <th>Usuario Involucrado</th>
                                </tr>
                                </thead>
                                <tbody>
                                {transactionsTo.map(transaction => {
                                    return(
                                        <tr>
                                            <td>{transaction.transactionType}</td>
                                            <td>{transaction.date}</td>
                                            <td>{transaction.amount}€</td>
                                            <td>{transaction.sourceAccount.accountNumber}</td>
                                            <td>{transaction.destinationAccount.accountNumber}</td>
                                            <td>{transaction.involvedUser.dni}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div> : <></>
                }
            </div>
        </>
    );
}

export default BankOperations;