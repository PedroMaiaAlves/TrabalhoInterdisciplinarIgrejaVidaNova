import { Container } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import InputText from '../components/InputText';
import { PrimaryButtonStyled } from '../components/styles/ButtonStyled';
import { LinkTextStyled, MainTextStyled, SecondTextStyled } from '../components/styles/TextStyled';
import api from '../axiosConfig';

const Login = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    api.post('/login/', {
      email: email,
      password: password
    }).then(response => {
        const decodedToken = jwtDecode(response.data.access_token);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('userId', JSON.stringify(decodedToken.userId));
        localStorage.setItem('userEmail', JSON.stringify(decodedToken.email));
        localStorage.setItem('roles', JSON.stringify(decodedToken.roles));
    }).then(() => {
      window.location.href = '/';
    }).catch(error => {
        console.error('Login error:', error);
        alert('Email ou senha inválidos');
      }
    );
  }

  return (
    <>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        maxWidth: '100vw', 
        margin: '6em 8em', 
        }}
      >
        <div item style={{marginRight: '10em'}}>
          <MainTextStyled>Bem-vindo!</MainTextStyled>
          <SecondTextStyled
            style={{
              maxWidth: '400px',
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Ac placerat fringilla consectetur commodo.
            </SecondTextStyled>
          <InputText 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            type="email" 
            placeholder="contato@igrejavidanova.com.br" 
            label="E-mail"
          />
          <InputText 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            type="password" 
            placeholder="*******" 
            label="Senha"
          />
          <div
            style={{
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <LinkTextStyled href="/cadastrar" marginTop="34px">Ainda não tem cadastro?</LinkTextStyled>
            <PrimaryButtonStyled 
              marginTop="26px" 
              onClick={handleLogin}
            >
              Entrar
            </PrimaryButtonStyled>
          </div>
        </div>
        <div
          style={{
            height: '100%',
            width: '100%',
            minWidth: '400px',
            maxWidth: '700px',
          }}
        >
          <img 
            src="https://igreja-vida-nova.s3.us-east-2.amazonaws.com/images/plano-fundo-login.png" 
            alt="Login" 
            style={{
              borderRadius: '40px'
            }} 
          />
        </div>
      </div>
    </>
  );
};

export default Login;
