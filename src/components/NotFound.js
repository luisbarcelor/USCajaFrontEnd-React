import React from "react";
import notfound from "../assets/404.jpg";
import "./styles/notfound.css"
import NavBar from "./NavBar";

function NotFound() {
    return (
        <>
            <NavBar></NavBar>
            <div>
                <img id="image" src={notfound} alt="404 NOT FOUND"/>
            </div>
        </>

    );
}

export default NotFound;