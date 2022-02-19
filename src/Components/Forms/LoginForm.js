import React, {useCallback, useState} from 'react';
import Button from '../Utils/Button';
import Form from '../Utils/Form';
import Input from '../Utils/Input';
import { useNavigate } from "react-router-dom";
import NavBar from "../Utils/Navbar";

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authLogin = useCallback(() => {
        if (username === 'admin' && password === 'password') {
            window.localStorage.setItem('username', 'admin');
            window.localStorage.setItem('password', 'password');
            navigate('/home');
            window.location.reload();
        } else alert('Username and Password do not match');
    }, [navigate, username, password]);

    return (
        <div align='center'>
            <NavBar />
            <Form onSubmit={event => { event.preventDefault(); }}>
                <h1 style={{ padding: '1rem' }}>Log-In</h1>
                <Input onChange={event => { setUsername(event.target.value); }} placeholder='Username' />
                <Input type='password'
                       onChange={event => { setPassword(event.target.value); }}
                       placeholder='Password' />
                <Button onClick={authLogin}>Log-In</Button>
            </Form>
        </div>
    );
}

export default LoginForm;
