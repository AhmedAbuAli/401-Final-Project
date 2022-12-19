import axios from 'axios'; 
import React, {useEffect , useState} from "react";
import {useNavigate} from "react-router-dom";  


function Home() {

    const [listOfPosts , setListOfPosts] = useState([])
    let navigate  = useNavigate()

  useEffect(() => {

    // printing all the retrived data from the posts rout 
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data)
    })
  } , [])

  return (
    <div>

{listOfPosts.map((value , key) => {
    return (

  <div className="row" onClick={ () =>{navigate(`/post/${value.id}`)}} key={key}>
    <div className="card" >
      <h2 className='title' >{value.title}</h2>
      <p className='body'>{value.postText}</p>
      <h4 className='footer' >- {value.username} -</h4>
    </div>
  </div>

  )
  }

  )}
      
    </div>
  )
}

export default Home
