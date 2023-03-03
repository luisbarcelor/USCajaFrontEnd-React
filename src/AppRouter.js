import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";

function AppRouter() {
    return (
        <Router>
            <NavBar></NavBar>
            <Routes>
                <Route index element={<Dashboard />}></Route>
                <Route path="/nav" element={<NavBar />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </Router>
    );
}

export default AppRouter;