import React, { useEffect, useState } from 'react'
import './Signup.css';
import signupimg from './images/signup.png'
import { NavLink, useHistory } from 'react-router-dom';
import {Auth} from 'two-step-auth'
function Signup() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [otp,setOtp] = useState("")
    const [user,setUser] = useState({
        fname:'',mname:'',lname:'',mobileno:'',dob:'',education:'',hno:'',street:'',pincode:'',password:'',cpassword:'',otp:''
    })

    const [pos, setPos] = useState({
        city:'',state:'',country:''
    })

    const [photo, setPhoto] = useState("")

    useEffect(()=>{
        // console.log(user)
        const fetchUrl = async()=>{
            const url = `https://api.postalpincode.in/pincode/${user.pincode}`
            const rep = await fetch(url)
            const repJson = await rep.json()
            if(repJson[0].Status==="Success"){
                console.log( {city:repJson[0].PostOffice[0].District,state:repJson[0].PostOffice[0].State,country:repJson[0].PostOffice[0].Country})
                let city=repJson[0].PostOffice[0].District
                let state=repJson[0].PostOffice[0].State
                let country=repJson[0].PostOffice[0].Country
                setPos({...pos,city:city,state:state,country:country})
                
            }
            
        }
        fetchUrl()
        console.log(pos)
    },[user.pincode])

    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const sendOtp = async(e)=>{
        e.preventDefault();
        if(!validateEmail(email)){
            window.alert("please type proper email")
            return;
        }
        const res = await Auth(email);
        // console.log(res);
        // console.log(res.mail);
        // console.log(res.OTP);
        // console.log(res.success);
        setOtp(res.OTP);
      }
    let name,value
    function handleInps(e){
        name = e.target.name
        value = e.target.value
        // let newUser = user
        // newUser[name]= value
        setUser({...user,[name]:value})
        // console.log(user)
    }
    const postData = async(e)=>{
        
        e.preventDefault();
        // console.log(user)
        if (otp!=user.otp) {
            window.alert("invalid otp")
        }
        else{
            const {fname,mname,lname,mobileno,password,cpassword,dob,education,hno,street,pincode} = user
            const {city,state,country} = pos
            const emailval = email
            const photoval = photo
            const res = await fetch('/register',{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body :JSON.stringify({
                    name:`${fname} ${mname} ${lname}`,email:emailval,mobileno,password,cpassword,dob,education,address:`${hno} ${street}`,pincode,city,state,country,photo:photoval
                })
            })
            const data = await res.json()
            if (res.status===422 || !data) {
                alert("Registration fail")
            }
            else{
                
                alert("Registration Success")
                history.push('/login')
            }
        }
    } 

    return (
        <>
            <div className="signup">
                <div className="form_content">
                    <div className="heading">
                        <h2>Sign Up</h2>
                    </div>
                        <div className="otp_grp">
                        <div className="inp-grp">
                            <label htmlFor="email">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill icon" viewBox="0 0 16 16">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                </svg>
                            </label>
                            <input type="email" name="email" id="email" placeholder="Email" autoComplete="off" onChange={(e)=>setEmail(e.target.value)} 
                            value={email} />
                        </div>
                        <div className="inp-submit">
                            <button className="button" onClick={sendOtp}>Generate otp</button>
                        </div>
                        <div className="inp-grp">
                            <label htmlFor="otp">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-open-fill icon" viewBox="0 0 16 16">
                                    <path d="M8.941.435a2 2 0 0 0-1.882 0l-6 3.2A2 2 0 0 0 0 5.4v.313l6.709 3.933L8 8.928l1.291.717L16 5.715V5.4a2 2 0 0 0-1.059-1.765l-6-3.2zM16 6.873l-5.693 3.337L16 13.372v-6.5zm-.059 7.611L8 10.072.059 14.484A2 2 0 0 0 2 16h12a2 2 0 0 0 1.941-1.516zM0 13.373l5.693-3.163L0 6.873v6.5z"/>
                                </svg>
                            </label>
                            <input type="text" name="otp" id="otp" placeholder="Enter OTP" autoComplete="off" onChange={(e)=>handleInps(e)} />
                        </div>
                        </div>
                        <form method="POST">
                        <div className="inp-grp">
                            <label htmlFor="fname">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill icon" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </label>
                            <input type="text" name="fname" id="fname" placeholder="First Name" autoComplete="off"  
                            onChange={(e)=>handleInps(e)} 
                            value={user.fname}
                            />
                        </div>
                        <div className="inp-grp">
                            <label htmlFor="mname">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill icon" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </label>
                            <input type="text" name="mname" id="mname" placeholder="Middle Name" autoComplete="off" onChange={(e)=>handleInps(e)} 
                            value={user.mname} />
                        </div>
                        <div className="inp-grp">
                            <label htmlFor="lname">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill icon" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </label>
                            <input type="text" name="lname" id="lname" placeholder="Last Name" autoComplete="off" onChange={(e)=>handleInps(e)} 
                            value={user.lname} />
                        </div>
                        <div className="inp-grp">
                            <label htmlFor="mobileno">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-telephone-fill icon" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                                </svg>
                            </label>
                            <input type="number" name="mobileno" id="mobileno" placeholder="Mobile Number" autoComplete="off" onChange={(e)=>handleInps(e)} 
                            value={user.mobileno} />
                        </div>
                        <div className="lable">
                            Enter date of Birth:
                        </div>
                        <div className="inp-grp">
                            <label htmlFor="dob">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-calendar icon" viewBox="0 0 16 16">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                            </label>
                            <input type="date" name="dob" id="dob" placeholder="Date of Birth" autoComplete="off" onChange={(e)=>handleInps(e)} 
                            value={user.dob} />
                        </div>
                        <div className="inp-grp">
                            <label htmlFor="education">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-book-fill icon" viewBox="0 0 16 16">
                                    <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                </svg>
                            </label>
                            <select className="form-control dropdown" defaultValue="" id="education" name="education" onChange={(e)=>handleInps(e)} 
                            value={user.education}>
                                <option value=""  disabled="disabled">-- select Education --</option>
                                <option value="No formal education">No formal education</option>
                                <option value="Primary education">Primary education</option>
                                <option value="Secondary education">Secondary education or high school</option>
                                <option value="GED">GED</option>
                                <option value="Vocational qualification">Vocational qualification</option>
                                <option value="Bachelor's degree">Bachelor's degree</option>
                                <option value="Master's degree">Master's degree</option>
                                <option value="Doctorate or higher">Doctorate or higher</option>
                            </select> 
                        </div>
                        <div className="inp-grp">
                            <label htmlFor="hno">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-fill icon" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                    <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                                </svg>
                            </label>
                            <input type="text" name="hno" id="hno" placeholder="House No" autoComplete="off" onChange={(e)=>handleInps(e)} 
                            value={user.hno} />
                        </div>
                        <div className="inp-grp">
                            <label htmlFor="street">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt-fill icon" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                </svg>
                            </label>
                            <input type="text" name="street" id="street" placeholder="Street" autoComplete="off" onChange={(e)=>handleInps(e)} 
                            value={user.street} />
                        </div>
                        <div className="inp-grp">
                            <label htmlFor="pincode">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pin-map-fill icon" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
                                    <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
                                </svg>
                            </label>
                            <input type="text" name="pincode" id="pincode" placeholder="Pincode" autoComplete="off" onChange={(e)=>handleInps(e)} 
                            value={user.pincode} />
                        </div>
                        <div className="inp-grp">
                            {/* <select className="form-control dropdown" id="city" name="city" ></select> */}
                            <input type="text" name="city" id="city" placeholder="city" autoComplete="off" value={pos.city} />
                        </div>
                        <div className="inp-grp">
                            {/* <select className="form-control dropdown" id="state" name="state"></select>
                            <select className="form-control dropdown" id="country" name="country"></select> */}
                            <input type="text" name="state" id="state" placeholder="state" autoComplete="off" value={pos.state} />
                            <input type="text" name="country" id="country" placeholder="country" autoComplete="off" value={pos.country} />
                        </div>
                        <div className="lable">
                            Enter Profile Picture: (not required)
                        </div>
                        <div className="inp-grp">
                            <label htmlFor="photo">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-image-fill icon" viewBox="0 0 16 16">
                                    <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
                                </svg>
                            </label>
                            <input type="file" name="photo" id="photo" onChange={e=>{
                                
                                var file = e.target.files[0]
                                var reader = new FileReader();
                                reader.onloadend = function() {
                                    // console.log('RESULT', reader.result)
                                    setPhoto(reader.result)
                                }
                                reader.readAsDataURL(file);
                                // console.log(photo)
                                
                                
                                }} />
                        </div>
                        <div className="inp-grp">
                            <label htmlFor="password">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-lock icon" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                </svg>
                            </label>
                            <input type="password" name="password" id="password" placeholder="Password" onChange={(e)=>handleInps(e)} 
                            value={user.password} />
                        </div>
                        <div className="inp-grp">
                            <label htmlFor="cpassword">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-lock-fill icon" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                                </svg>
                            </label>
                            <input type="password" name="cpassword" id="cpassword" placeholder="Confirm Password" onChange={(e)=>handleInps(e)} 
                            value={user.cpassword} />
                        </div>
                        <div className="inp-submit">
                            <button type="submit" className="button" onClick={postData}>Register</button>
                        </div>
                        </form>
                </div>
                <div className = "form_img">
                    <img src={signupimg} alt="signuping" className="src_img" />
                    <NavLink to="/login"><p className="red_login">Already have an account?Sign in</p></NavLink>
                </div>
            </div>
        </>
    )
}

export default Signup
