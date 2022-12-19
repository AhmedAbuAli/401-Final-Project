import React from "react";
import './CreatePosts.css';
import {useNavigate} from "react-router-dom";  
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from 'sweetalert2'



function CreatePost() {
  const TODAY = new Date();
  const initialValues = {
    title: "",
    postText: "",
    username: "",
    date : TODAY
  };

  let navigate  = useNavigate()
    const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    
    axios.post("http://localhost:3001/posts", data).then((response) => {
      Swal.fire({
        title: "Post Added !",
        icon: 'success',
        showCloseButton: true
      })
      navigate('/')
    });
  };
  return (
    <div className="createPostPage">

      <h1 style={{color:"black" , padding : "5vh" , marginLeft : "-10vh"}}>Create Your Post Here </h1>
      <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        
        <Form>
                    <br/>          <br/>          <br/>        
          <ErrorMessage className="erorrM" name="title" component="span" />
          <Field
          style={{width : "20%" , float : "right" , marginRight : "83vh" }}
          className="formInput"
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <br/>          <br/>          <br/>          
          <ErrorMessage  className="erorrM" name="postText" component="span" />
          <Field
          style={{width : "20%" , float : "right" , marginRight : "83vh"}}
          className="formInput"
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            as = "textarea"
            placeholder="(Ex. Post...)"
          />
          <br/>          <br/>          <br/>          <br/> 
          <ErrorMessage  className="erorrM" name="username" component="span"  />
          <Field
          style={{width : "20%" ,  float : "right" , marginRight : "83vh"}} 
          className="formInput"
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="NickName"
          />

          <button  style={{width : "20%" ,  float : "right" , marginRight : "83vh"}}  className="formButton" type="submit"> Create Post</button>
          
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;