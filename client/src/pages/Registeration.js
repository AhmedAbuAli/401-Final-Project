import React from 'react';
import {useNavigate} from "react-router-dom";  
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './RegisertationStyle.css';
import Logo from './Logo.png'; 
import Swal from 'sweetalert2'


function Registeration() {
  const nav = useNavigate();

    const initialValues = {
        username: "",
         password : ""
      };
    
        const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
      });
    
    const onSubmit = (data)=>{  
      axios.post("http://localhost:3001/auth" , data ).then(
        () =>{
          let timerInterval
          Swal.fire({
            title: ' Creating a user',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            },
            willClose: () => {
              clearInterval(timerInterval)
              nav('/login')
            }
          })
          
        }
      )
    }
    
      return (
        <div id='RegPage'>
              <img src={Logo} alt="Logo"  id='logo'/>;
    <div id='header'>
    <h1>Join The BloGO Family </h1>
    <h4>Register with BloGo and share your ideas with all your friends</h4>
    </div>
           <Formik  
           id = "RegForm"
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form
            className="formContainer">
              <label  className="formLabel">Username </label>
              <Field
              className="formInput"
                autoComplete="off"
                name="username"
                placeholder="Username ..."
              />
              <label  className="formLabel">Password </label>
              <Field
              className="formInput"
              autoComplete="off"
                name="password"
                placeholder="Password"
                type="password"
              />
    
              <button className="formButton" type="submit"> Registerater </button>
              
            </Form>
          </Formik> 
        </div>
      )
}

export default Registeration
