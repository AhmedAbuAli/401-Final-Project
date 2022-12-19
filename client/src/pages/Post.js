import React from 'react';
import {useEffect , useState , useContext} from "react";
import {useParams} from "react-router-dom";
import './Posts.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import { AuthContext } from '../helpers/AuthContext';


function Post() {
  
    let {id} = useParams();
    const [postObject , setPostObject] = useState({})
    const [ comments , SetComments] = useState([])
    const [newComment , setNewComment] = useState ("")
    const {authState} = useContext(AuthContext)

    useEffect(()=>{
      axios.get(`http://localhost:3001/posts/byid/${id}`).then((response) => {
        setPostObject(response.data)
        console.log(response.data)
    })


    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      SetComments(response.data)
  })

    } , [])
const addComment = () => {
  const TODAY = new Date();
  axios.post("http://localhost:3001/Comments" , { commentBody: newComment, PostId : id , date : TODAY } , 
  
  { headers : { 
    accessToken : localStorage.getItem("accessToken")
  }}
  ).then((response) => { 
    if (response.data.error){
      Swal.fire({
        title: "Please Login First to comment",
        icon: 'error',
        showCloseButton: true ,
        footer: '<a href="http://localhost:3000/login"> Go to Login</a>'
      })
    }
    else{
    Swal.fire({
      title: "Comment  Added !",
      icon: 'success',
      showCloseButton: true
    }).then(() => {  window.location.reload(false);  })
  }
  })
}

const deleteComment = (id) => {
  Swal.fire({
    title: 'Are you sure you want to delete this comment ?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Yes Delete it',
    denyButtonText: `Dont Delete`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      axios.delete(`http://localhost:3001/Comments/${id}` , { headers : {
        accessToken : localStorage.getItem("accessToken")}
      })
        window.location.reload(false);
  
    } else if (result.isDenied) {
      Swal.fire('Comment was not deleted', '', 'info')
    }
  })
}

return (
    postObject != null && (
      <>
    <div className="postPage">
        <div className="leftSide">
          <div className="post" id="individual"></div>
      <Card>
      <Card.Header className="title" >{postObject.title}</Card.Header>
      <Card.Body>
        <blockquote className="body">
          {postObject.postText}
        </blockquote>


        <footer  className="footer">
         - {postObject.username} - 
         </footer>

         <footer  className="footer">
          {postObject.date}
         </footer>
         
      </Card.Body>
    </Card>
    <br/>
   <div id='CommentSection'>
      <Row  className='Row'>
        <Col className='rightSide'>
        <div className='addCommentContainer'>
            <div className='addComment'>
                <Form
                 style={{width : "80%"  , color : "black" , margin:"auto" , marginTop : "5vh"}}>
            <Form.Group className="mb-3" >
                <Form.Label>What Do you think about this post ?</Form.Label>
                <Form.Control
                 onChange={(event)=> {setNewComment(event.target.value)} }
                 as="textarea"
                  placeholder="Leave a comment here"
                style={{ height: '20vh'  , color : "black"}}
              />              
              </Form.Group>
              <Button variant="dark"  onClick={addComment} className='btn-lg'>
              Submit 
            </Button>
        </Form>
            </div>

           </div>
        </Col>
        <Col className='LeftSide'>

        <div className='listOfComments'>
            {comments.map((comment , key) =>{
               return <div  key={key} className='comment'> 
               <div>

               <h3>{comment.username  }</h3>
                <h4>{comment.commentBody}</h4>
                <h6 className='Date'>{comment.date}</h6>
                {/* Only show the button on comment that this user has created*/}
               
                { authState.username === comment.username &&   <Button variant="dark" onClick={() => {deleteComment(comment.id)}} className='btn-lg'>  Delete   </Button>}
               </div>
             </div>}
            )}
          </div>
        </Col>
      </Row>
    </div>
    </div>  
    </div>


  </>
))}

export default Post
