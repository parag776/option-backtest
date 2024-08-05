import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import "./Register.css"
import axios from "axios";
import AuthContext from '../../context/authentication/AuthContext';
axios.defaults.withCredentials = true;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-z0-9]+$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(nameRegex, 'Please fill a valid name')
    .max(50, 'Name cannot be more than 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Please enter a valid email address')
    .min(5, 'Please enter a valid email address')
    .max(254, 'Please enter a valid email address'),
  username: yup
    .string()
    .required('Username is required')
    .matches(usernameRegex, 'Username can only contain lowercase letters and numbers')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot be more than 20 characters'),
  password: yup
    .string()
    .required('Password is required')
    .matches(passwordRegex, 'Password must be 8-20 characters long, include letters, numbers, and special characters'),
});



const Register = () => {

  const auth = useContext(AuthContext)

  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async function(data){
    try{
        const backendURI = process.env.REACT_APP_BACKEND_URL+"/register";
        await axios({url: backendURI, method: 'POST', data});
        await auth.fetchUser();
        navigate("/")
    } catch(e){
      setErrorMsg(e.response?.data?.message || e.message);
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
        {errorMsg}
      <div className='m-2'>
        <label>Name</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      
      <div className='m-2'>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className='m-2'>
        <label>Username</label>
        <input {...register('username')} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div className='m-2'>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary me-3 btn-lg rounded-pill py-3 px-4 m-2">Register</button>
    </form>
    
    <div className='text-center'>
      <span>Already Registered? click here to login: </span>
      <span><button onClick={()=>navigate("/login")} className="btn btn-secondary me-3 btn-sm rounded-pill px-2">Login</button></span>
    </div>
    </>
  );
};

export default Register;
