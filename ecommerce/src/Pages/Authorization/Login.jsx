import React, { useState } from "react";
import Layout from "../../Component/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context API/Auth";
import "../../Style/AuthStyle.css";

const Login = () => {
    const [auth, setAuth]= useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const location = useLocation()
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/login`,
          { email, password }
        );
        if(res.data.success){
          toast.success(res.data.message)
          setAuth({
            ...auth,
            user: res.data.user,
            token:res.data.token
          })
          localStorage.setItem('auth', JSON.stringify(res.data))
          navigate(location.state ||"/");
        }
        else{
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went Wrong");
      }
    };
  return (
    <Layout>
      <div className="form-container" style={{minHeight:"90vh"}}>
        <h1>LOGIN FORM</h1>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label  className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              
              placeholder="Enter Your Email"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label  className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              
              placeholder="Enter Your Password"
              required
            />
          </div>
          
          <div className="mb-3">
          <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
            Forget Password
          </button>
          </div>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
    
  )
}

export default Login
