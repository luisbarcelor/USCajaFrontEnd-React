import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PersonalInfo from "./components/PersonalInfo";
import BankOperations from "./components/BankOperations";
import {useEffect, useState} from "react";
import SignUp from "./components/SignUp";
import Admin from "./components/Admin";

export function AppRouter() {
    const [local, setLocal] = useState("")

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("isAuth").toString() === "true") {
            setIsAuthenticated(true)
        } else {
            setLocal(local + "l")
        }
    },[local])

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route index element={isAuthenticated ? (<Dashboard />) : (<Navigate to="/login" replace />)} />
                <Route path="/personal-info" element={isAuthenticated ? (<PersonalInfo />) : (<Navigate to="/login" replace />)} />
                <Route path="/bank-operations" element={isAuthenticated ? (<BankOperations />) : (<Navigate to="/login" replace />)} />
                <Route path="/admin" element={isAuthenticated ? (<Admin />) : (<Navigate to="/login" replace />)} />
                <Route path="*" element={isAuthenticated ? (<NotFound />) : (<Navigate to="/login" replace />)} />
            </Routes>
        </Router>
    );
}