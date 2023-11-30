import axios from 'axios';
import React, { FormEvent, useRef } from 'react';

function Login() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (usernameRef.current && passwordRef.current) {
            var userForm = { username: usernameRef.current.value, password: passwordRef.current.value };
            axios.post("http://localhost:5174/users", userForm)
                .then((response) => {
                    console.log(response);
                    sessionStorage.setItem("token", response.data.token);
                }).catch(error => {
                    console.error(error);
                });
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input ref={usernameRef} type="text" id="inputUsername" />
                <label>Password:</label>
                <input ref={passwordRef} type="password" id="inputPassword" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;