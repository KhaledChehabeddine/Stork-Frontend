import React, {useCallback, useEffect, useState} from 'react';
import Button from '../Utils/Button';
import Form from '../Utils/Form';
import Input from '../Utils/Input';
import { useNavigate } from "react-router-dom";
import "../../Styles/LoginPageStyle.css"
import getApiClient from "../../api_client/getApiClient";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (window.localStorage.getItem('email')) {
      navigate('/home');
    }
  }, [navigate]);

  const authLogin = useCallback(() => {
    const response = getApiClient().authenticateUser(username, password);
    //  .then(response => {
          window.localStorage.setItem('name', response.data.name);
          window.localStorage.setItem('email', response.data.email);
          navigate('/home');
          window.location.reload();
    //  }).catch(error => console.log(error));
  }, [navigate, username, password]);

  return (
    <>
      <div className="login-page full-height full-width">
        <div className="login-brand full-height" style={{width:'50%', float:'left'}}>
          <div className="login-brand full-width" style={{height:'60%', float:'left', borderRight:'0.5px solid white' }}>
            <a style={{fontSize:'80px', color:'white'}} href="/" className="login-logo">STOЯK</a>
          </div>
        </div>
        <div className="login-box full-height" style={{ width:'50%', float:'right' }}>
          <Form style={{width:'50%'}} className = "login-form" onSubmit={event => { event.preventDefault(); }}>
            <div >
              <h1 style={{textAlign:'center'}} className = "login-header">Log In</h1>
              <Input className = "login-input" onChange={event => { setUsername(event.target.value); }} placeholder='Username' />
              <Input className = "login-input" type='password' onChange={event => { setPassword(event.target.value); }} placeholder='Password' />
              <a style={{float:'right'}} className = "login-reset" href="/resetpassword">Forgot Password?</a>
              <Button style={{width:'100%', margin:'15px 0 15px 0'}} className = "login-button" onClick={authLogin}>Sign In</Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}



export default LoginForm;
