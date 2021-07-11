import React, { useContext, useState } from 'react'
import './Login.css';
import loginimg from './images/login.png'
import { NavLink,useHistory } from "react-router-dom"
import { UserContext } from './App';
function Login() {

    const {state,dispatch} = useContext(UserContext)


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()

    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const loginUser = async(e) =>{
        e.preventDefault()
        if(!validateEmail(email)){
            window.alert("please type proper email")
            return;
        }
        const res = await fetch('/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,password
            })
        })
        if (res.status===422) {
            window.alert('login failed')
        }
        else{
            dispatch({type:'USER',payload:true})
            window.alert('login success')
            history.push('/')
        }
    }
    
    return (
        <>
            <div className="login">
                <div className="login_img">
                    <img src={loginimg} alt="login img" className="image" />
                    <NavLink to="/register"><p className="login_reg">Create New Account</p></NavLink>
                </div>
                <div className="inp_form">
                    <div className="heading">
                        <h2>Sign In</h2>
                    </div>
                    <form method="POST">
                        <div className="inp-grp">
                            <label htmlFor="email">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill icon" viewBox="0 0 16 16">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                </svg>
                            </label>
                            <input type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="off" />
                        </div>
                        <div className="inp-grp">
                            <label htmlFor="password">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-lock-fill icon" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                                </svg>
                            </label>
                            <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                        </div>
                        <div className="inp-submit">
                            <button type="submit" className="button" onClick={(e)=>loginUser(e)}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
