import React from 'react'
import './form.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/apiCalls/authApiCall'
import { toast } from 'react-toastify'
import { ClipLoader } from "react-spinners";

function Login() {

    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");

    const {loading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleSubmit = (e)=> {
        e.preventDefault();

        if(email.trim() === "" || password.trim() === "")
        {
            return toast.error("Complete you data");
        }
        
        // toast.success("Logged in successfully");
        dispatch(loginUser({email, password}))
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
            <div className="form-header">Welcome Back</div>
            <div className="form-body">
                <label htmlFor="email">Email</label>
                <input id="email" type="email"
                    value={email} 
                    onChange={(e) => SetEmail(e.target.value)}
                    />
                <label htmlFor="password">Password</label>
                <input id="password" type="password"
                    value={password} 
                    onChange={(e) => SetPassword(e.target.value)} 
                    />
            </div>
            <button className="form-btn" type="submit">Continue</button>
        </form>
        </>
   );
}

export default Login