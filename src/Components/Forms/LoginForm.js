import React, {useCallback, useState} from 'react';
import Button from '../Utils/Button';
import Form from '../Utils/Form';
import Input from '../Utils/Input';
import { useNavigate } from "react-router-dom";
import getApiClient from "../../api_client/getApiClient";

const LoginForm = () => {
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const togglePassword = useCallback(() => {
        setPasswordShown(!passwordShown);
    }, [passwordShown]);

    const authLogin = useCallback(() => {
        getApiClient().login(username, password)
          .then(response => {
              if (response.data.success) navigate('/home');
          }).catch(error => console.log(error));
    }, [username, password]);

    return (
        <div align='center'>
            <Form onSubmit={event => { event.preventDefault(); }}>
                <h1 style={{ padding: '1rem' }}>Log-In</h1>
                <Input onChange={event => { setUsername(event.target.value); }} placeholder='Username' />
                <Input type={passwordShown ? "text" : "password"}
                       onChange={event => { setPassword(event.target.value); }} placeholder='Password' />
                <Button onClick={togglePassword}>Show Password</Button>
                <Button onClick={authLogin}>Log-In</Button>
            </Form>
        </div>
    );
}

export default LoginForm;
