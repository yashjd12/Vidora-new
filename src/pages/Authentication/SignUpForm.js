import React, { useState } from 'react';
import logo from '../../images/vidora-logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const registerURL = "https://zssol18ta8.execute-api.us-east-1.amazonaws.com/prod/register";

const SignUpForm = ({ toggleForm }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        if (name.trim() === '' || username.trim() === '' || email.trim() === '' || password.trim === '') {
            setMessage("All fields are required!");
            return;
        }

        setMessage(null);
        console.log(name + " " + username + " " + email + " " + password);

        const requestConfig = {
            headers: {
                'x-api-key': 'e4IMhcRDSu6Ggu1Ff7zs74QXLVULIbZT2R2U02D1'
            }
        }

        const requestBody = {
            name: name,
            email: email,
            username: username,
            password: password
        }

        axios.post(registerURL, requestBody, requestConfig).then(response => {
            localStorage.setItem('token', response.data.token);
            console.log('Registration Successful!');
            navigate("/");
            // setMessage('Registration Successful!');
        }).catch(error => {
            if (error.response.status === 401 || error.response.status === 403) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Sorry.... backend server is down!');
            }
        })
        console.log("submited");
    }

    return (
        <section className='loginform-main'>
            <form className='register-submit' id="signUp" onSubmit={submitHandler}>
                <img src={logo} alt='logo' width={200} height={100} />
                <h3>Sign Up</h3>
                <div className="registerDetails">
                    {/* ... */}
                    <input
                        className="nameName"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <input
                        className="EmailUser"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <input
                        className="userName"
                        type="text"
                        placeholder="UserName"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <input
                        className="passwordUser"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                {/* ... */}
                <button type="submit" className="signUp-button btn btn-danger">
                    SIGN UP
                </button>
                {message && <p className='message'>{message}</p>}
            </form>
        </section>
    );
};

export default SignUpForm;
