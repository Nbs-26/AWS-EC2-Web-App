import React from 'react'
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import swal from 'sweetalert';
const Login = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [authCode,setAuthCode]=useState("");
  const navigate = useNavigate(); // Initialize the navigate function
  const PORT=process.env.PORT || 3001
  const backendAPIUrl=`http://localhost:${PORT}`
  const handleSubmit=async (e)=>{
      e.preventDefault();
      if(email=="" || password=="" || authCode==""){
        swal("Please enter all the fields!")
        return
      }
      const userData ={
        email: email,
        password: password,
        authCode:authCode
      }
      let options ={
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(userData)
      }
      try{
        let p= await fetch(`${backendAPIUrl}/login`,options)
        let response=await p.json()
        console.log(response)
        if(response === "Success"){
          console.log('Navigating...')
          swal("Yeah!", "Verified", "success")
          navigate('/dashboard')
        }
        else if(response=='Not an authorized user'){
          swal("Oops!","You are not an authorised user",'error');
        }
        else if(response=='User not found'){
          swal("You are n't a registered user!",'Please register')
          navigate('/register')
        }
        else if(response=='Password is incorrect'){
          swal("Oops...", "Incorrect password", "error");
        }
        console.log(response) 
      }
      catch(err){
        console.log(err)
      }

    }
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="mb-4"><u>Login</u></h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="authCode" className="form-label">
                  Authorisation Code
                </label>
                <input type="text" className="form-control" id="authCode"
                onChange={(e)=>{setAuthCode(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control" id="email"
                onChange={(e)=>{setEmail(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control" id="password" 
                onChange={(e)=>{setPassword(e.target.value)}}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
            <p>Are you a new user?</p>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  };
  

export default Login
