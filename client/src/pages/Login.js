import React  , {useState , useContext} from 'react'
import {useNavigate} from "react-router-dom";  
import axios from "axios";
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from './Logo.png'; 
import { AuthContext } from '../helpers/AuthContext';
import './LoginStyle.css';


function Login() {

  
  let navigate  = useNavigate()

  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")
  const {setAuthState} = useContext(AuthContext)
  const login = () =>{
    const data = {
      username : username , 
      password : password
    }
    axios.post("http://localhost:3001/auth/login"  , data).then((response) =>{
      if (response.data.error ) {
        Swal.fire({
          title: response.data.error,
          icon: 'error',
        })      
      }
      else {
        localStorage.setItem("accessToken" , response.data)
        setAuthState(true)
        let timerInterval
Swal.fire({
  title: 'Loggin in ',
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
  },
  willClose: () => {
    clearInterval(timerInterval)
    navigate('/')
  }
})
        
        

      }
    }
    )
    }
  return(
  <div id='loginPage'>
    <img src={Logo} alt="Logo"  id='logo'/>;
    <div id='header'>
    <h1>Welcome to BloGO </h1>
    <h4>The best place to share your ideas</h4>
    </div>
  <Form   id='loginForm'>
  
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" onChange={(event) =>{
      setUsername(event.target.value)
    }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  onChange={(event) =>{
      setPassword (event.target.value)
    }}/>
      </Form.Group>
      <Button onClick={login} variant="dark btn-lg" >
        Submit
      </Button>
    </Form>

















  </div>
  )
}

export default Login
