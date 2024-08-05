import React, {useContext, useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Login.css';  // Ensure you create this CSS file or use the existing Register.css
import AuthContext from '../../context/authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const auth = useContext(AuthContext)
  const [errorMsg, setErrorMsg] = useState(null);
  const onSubmit = async (data) => {
    try {
      const backendURILogin = process.env.REACT_APP_BACKEND_URL + "/login";
      await axios.post(backendURILogin, data);
      await auth.fetchUser();
      navigate("/")
      // Handle successful login, e.g., redirect to another page
    } catch (e) {
        setErrorMsg(e.response?.data?.message || e.message);
      // Handle login error, e.g., display error message to the user
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
        {errorMsg}
      <div className='m-2'>
        <label>Username or Email</label>
        <input {...register('usernameOrEmail')} />
      </div>

      <div className='m-2'>
        <label>Password</label>
        <input type="password" {...register('password')} />
      </div>

      <button type="submit" className="btn btn-primary me-3 btn-lg rounded-pill py-3 px-4 m-2">Login</button>
    </form>
    <div className='text-center'>
      <span>Not Registered? click here to register: </span>
      <span><button onClick={()=>navigate("/register")} className="btn btn-secondary me-3 btn-sm rounded-pill px-2">Register</button></span>
    </div>
    </>
    
  );
};

export default Login;
