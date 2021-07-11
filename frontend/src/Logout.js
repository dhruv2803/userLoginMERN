import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from './App';
function Logout() {

    const {state,dispatch} = useContext(UserContext)

    const history = useHistory()
    useEffect(()=>{
        fetch('/logout',{
            method: "GET",
            headers:{
                Accept: 'appllication/json',
                "Content-Type":"application/json"
            },
            credentials:"same-origin"
        }).then((res)=>{
            dispatch({type:'USER',payload:false})
            history.push('/login',{})
            
            if(res.status!==200){
                const error = new Error(res.error)
                throw error
            }
        }).catch((err)=>{
            console.log(err)
        })
    })
    return (
        <>
            
        </>
    )
}

export default Logout
