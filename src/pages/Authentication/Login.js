import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './login.css';

const Login = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };

    return (
        <>
            <div className="login-main">
                <div id="main-container" className="container">
                    <div id="form-container" className="form">
                        {isLoginForm ? (
                            <LoginForm toggleForm={toggleForm} />
                        ) : (
                            <SignUpForm toggleForm={toggleForm} />
                        )}
                    </div>
                    <div id="landing-page" className="landing-page">

                        <button onClick={toggleForm}>
                            {isLoginForm ? 'Create a new account?' : 'Already have an account?'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
