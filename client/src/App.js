import './App.css';
import Home from "./pages/Home"
import CreatePosts from './pages/CreatePosts';
import React from 'react';
import { BrowserRouter as Router , Routes, Route  } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Post from './pages/Post';
import Login from './pages/Login';
import Registeration from './pages/Registeration';
import { AuthContext } from './helpers/AuthContext';
import { useState  , useEffect} from 'react';
import axios from 'axios';



function App() {


  const [authState , setAuthState] = useState({
    username: "" , 
    id : 0 , 
    status : false 
  })

  useEffect(() =>{
    axios.get("http://localhost:3001/auth/auth" , {headers : {
      accessToken : localStorage.getItem("accessToken")
    }}).then((response) =>{
      if (response.data.error) {
        setAuthState({...authState , status : false } )
      }
      else {
        setAuthState({
          username: response.data.username , 
          id :response.data.id , 
          status : true 
        })
      }
    })
  })

  const logout = () =>{
    localStorage.removeItem("accessToken")
    setAuthState(false)
  }


  return <div className="App">
    <AuthContext.Provider value={{ authState , setAuthState}}>
    <Navbar bg="light" expand="lg" style={{fontWeight : 'bold'}}>
      <Container>
        <Navbar.Brand href="#home">BloGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
            { !authState.status ? (
            <>

            <Nav.Link href='/login'>Log in </Nav.Link>
            <Nav.Link href='/registeration'> Join Us </Nav.Link>

            </>
            ) : (
              <>
               <Nav.Link href='/createPost'>Create a new post</Nav.Link>
              <Nav.Link href='/login' onClick={logout}> Logout </Nav.Link>
              <Nav.Link id='username' >  Welcome {authState.username} </Nav.Link>
              </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/createPost' element={<CreatePosts />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='/registeration' element={<Registeration />} />
          <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
    </AuthContext.Provider>
  </div>;
}

export default App;
 