import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';
import '../index.css';
 
const SignupWrapper = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            var errorMessage = error.message;
         
            console.log(errorCode, errorMessage);
            setError(errorCode);
            // ..
        });
 
   
    }
 
  return (
    <div className="height-full">
                <div className="row height-full">
                    {/* left side */}
                    <div className="left-column flex flex-column height-full justify-center items-center">
                        <h1 className="welcoming-title">Hello</h1>
                        <form className="form" autoComplete="off">
                            <label htmlFor="email" className="label">Email</label>
                            <input type="email" name="email" id="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}  className="input" required />

                            <label htmlFor="password" className="label">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />

                            <button
                                onClick={onSubmit}
                                type="submit"
                                className="button regular-button pink-background cta-btn"
                            >
                                Sign up
                            </button>
                            {error && 
                                <div className="error-message">
                                    <p>{error}</p>
                                </div>
                            }
                        </form>
                        <p className="login-prompt">
                            Already have an account?
                            <a onClick={() => navigate(-1)} className="log-in-link">Log in</a>
                        </p>
                    </div>
                    {/* right side */}
                    <div className="right-column"></div>
                </div>
            </div>
  )
}


export default SignupWrapper;
