import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';  
const Register = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [authCode,setAuthCode]=useState("");
    const navigate=useNavigate()
    const PORT=process.env.PORT || 3001
    const backendAPIUrl = `http://localhost:${PORT}/`;
    const registrationEndpoint = '/register';
    const auth='Admin@432'
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(process.env); 
        if(name=="" || email=="" || password=="" || authCode==""){
          swal("Please enter all the fields!");  
          return
        }  
        if (authCode != auth) {
          swal("Oops!","You are not an authorised user",'error');
          console.log("Auth"+auth)
          console.log("auth code"+authCode)
          return;
        }            
        const userData ={
          name: name,
          email: email,
          password: password,
          authCode: authCode
        }
        console.log(userData)
        // const res=axios.post('http://localhost:3001/register',userData,{headers:{"Content-Type" : "application/json"}})

        // // })
        // // axios.post('http://localhost:3001/register',userData)
        // // .then(res=>console.log(res))
        // // .catch(err=>console.log(err.res.data))
        // // try{
        // //   res=await axios({

        // //   })
        // // }
        let options ={
          method:"POST",
          headers:{
              "Content-type":"application/json"
          },
          body: JSON.stringify(userData)
        }
        try{
          let p= await fetch(`${backendAPIUrl}${registrationEndpoint}`,options)
          let response=await p.json()
          swal("Yeah!", "You have successfully registered!", "success")
          navigate('/login')
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
          <h2 className="mb-4"><u>Register</u></h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="authCode" className="form-label">
                Authorisation Code
              </label>
              <input type="text" className="form-control" id="authCode" 
              onChange={(e)=>{
                setAuthCode(e.target.value)
              }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input type="text" className="form-control" id="username" 
              onChange={(e)=>{
                setName(e.target.value)
              }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" id="password" 
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email"       
              onChange={(e)=>{
                setEmail(e.target.value)
              }}/>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
          <p>Already have an account</p>
          <Link to="/login" className="btn btn-primary">
              Login
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;