import React, { useState } from 'react';
import Button from '../Utils/Button';
import Form from '../Utils/Form';
import Input from '../Utils/Input';
import ProtectedRoutes from "../../ProtectedRoutes";

const RegistrationForm = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <div align='center'>
            <Form onSubmit={event => { event.preventDefault(); }}>
                <h1 style={{ padding: '1rem' }}>Log-In</h1>
                <Input onChange={event => { setUsername(event.target.value); }} placeholder='Username' />
                <Input type={passwordShown ? "text" : "password"}
                       onChange={event => { setPassword(event.target.value); }} placeholder='Password' />
                <Button onClick={togglePassword}>Show Password</Button>
                <Button onClick={() => ProtectedRoutes(username, password)}>Log-In</Button>
            </Form>
        </div>
    );
}

export default RegistrationForm;
