import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { UserContext } from './App';
function Navbar() {
    const {state,dispatch} = useContext(UserContext)

    const RenderNav = ()=>{
        if (state) {
            return(
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                </>
            )
        } else{
            return(
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">Signup</NavLink>
                    </li>
                </>
            )
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                    <RenderNav />
                    </ul>
                    
                </div>
                </nav>
        </>
    )
}

export default Navbar
