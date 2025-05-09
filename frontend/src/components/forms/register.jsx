import React, { use } from 'react'
import './form.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import  {registerUser}  from '../../redux/apiCalls/authApiCall'
import { ClipLoader } from "react-spinners";
import swal from 'sweetalert2'

function Register() {

  const dispatch = useDispatch()
  const {registerMessage, loading} = useSelector((state) => state.auth);

  const navigate = useNavigate()

  const [username, SetUsername] = useState("")
  const [email, SetEmail] = useState("")
  const [password, SetPassword] = useState("")


  const handleSubmit = (e) => {
      console.log({username, email, password})
      e.preventDefault()
      if(username.trim() === "" || email.trim() === "" || password.trim() === "") {
          swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please fill in all fields!',
          })
          return;
      }
      dispatch(registerUser({name: username, email, password}));
  }


    // Only navigate if registerMessage is updated
  if (registerMessage) {
    swal.fire({
      title: registerMessage,
      icon: 'success',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login');
      }
    });
  }

  return (
    <>
      {loading && 
        <div className="fullscreen-loader">
            <ClipLoader
            color="#3a86ff"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
            />
        </div>
        }
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-header">Register</div>
          <div className="form-body">
            <label htmlFor="userName">User name</label>
            <input id="userName" type="text" 
                value={username}
                onChange={(e) => SetUsername(e.target.value)} />

            <label htmlFor="email">Email</label>
            <input id="email" type="email"
              value={email}
              onChange={(e)=> SetEmail(e.target.value)} />

            <label htmlFor="password">Password</label>
            <input id="password" type="password"
                value={password} 
                onChange={(e) => SetPassword(e.target.value)} />

          </div>
          <button className="form-btn" type="submit">Submit</button>
        </form>
      </>
  );
}

export default Register