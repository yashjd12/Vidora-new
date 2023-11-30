import React, { useState } from 'react';
import logo from '../../images/vidora-logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const loginURL = "https://zssol18ta8.execute-api.us-east-1.amazonaws.com/prod/login";

const LoginForm = ({ toggleForm }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);


    const submitHandler = (event) => {
        event.preventDefault();
        if (username.trim() === ' ' || password.trim === ' ') {
            setErrorMessage("All fields are required!");
            return;
        }
        setErrorMessage(null);
        console.log(username + " " + password);

        const requestConfig = {
            headers: {
                'x-api-key': 'e4IMhcRDSu6Ggu1Ff7zs74QXLVULIbZT2R2U02D1'
            }
        }

        const requestBody = {
            username: username,
            password: password
        }

        axios.post(loginURL, requestBody, requestConfig).then(response => {
            localStorage.setItem('token', response.data.token);
            console.log('Login Successful!');
            // setErrorMessage('Login Successful!');
            navigate("/");
            // setUserSession(response.data.user, response.data.token);
            // props.history.push('/premium-content');
            // navigate('/premium-content');
        }).catch(error => {
            if (error.response.status === 401 || error.response.status === 403) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Sorry.... backend server is down!');
            }
        })
        console.log("submited");
    }

    return (
        <section className='loginform-main'>
            <form className='form-submit' onSubmit={submitHandler}>
                <img src={logo} alt='logo' width={200} height={100} />
                <h1>Log In</h1>
                {/* ... */}
                <input
                    className="email"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <input
                    className="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                {/* ... */}
                <button type="submit" className="signin-button btn btn-danger" >
                    SIGN IN
                </button>
                {/* <p>
          <a href="#signUp" onClick={toggleForm}>
            Sign Up
          </a>
        </p> */}
                {errorMessage && <p className='message'>{errorMessage}</p>}
            </form>
        </section>
    );
};

export default LoginForm;
