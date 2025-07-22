import { Container } from '@mui/material';
import React from 'react';
import api from '../axiosConfig';
import InputText from '../components/InputText';
import { PrimaryButtonStyled } from '../components/styles/ButtonStyled';
import { MainTextStyled, SecondTextStyled } from '../components/styles/TextStyled';

const Cadastro = () => {

    const [fullName, setFullName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [birthDate, setBirthDate] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleRegister = () => {
        api.post('/membros/cadastrar', {
            fullName: fullName,
            birthday: birthDate,
            username: username,
            email: email,
            password: password
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(response => {
            console.log('Cadastro realizado com sucesso:', response.data);
            alert('Cadastro realizado com sucesso!');
            window.location.href = '/';
        }).catch(error => {
            console.error('Erro ao cadastrar:', error);
            alert('Erro ao cadastrar. Tente novamente.');
        });
    }

    return (
        <>
            <Container disableGutters maxWidth={false} sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' , width: '100vw', height: '100vh'}}>
                <Container item sx={{ ml: '154px', mr: '126px'}}>
                  <MainTextStyled>Cadastre-se</MainTextStyled>
                  <SecondTextStyled>Lorem ipsum dolor sit amet consectetur. Ac placerat fringilla consectetur commodo.</SecondTextStyled>
                </Container>
                <Container item sx={{ margin: '40px 16px 40px 0px'}}>
                    <InputText 
                        id="fullName" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)}
                        type="text" 
                        placeholder="Nome completo" 
                        label="Nome Completo"
                    />
                    <InputText 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        type="text" 
                        placeholder="Apelido" 
                        label="Apelido"
                    />
                    <InputText 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        type="e-mail" 
                        placeholder="contato@igrejavidanova.com.br" 
                        label="E-mail"
                    />
                    <InputText 
                        id="birthDate" 
                        value={birthDate} 
                        onChange={(e) => setBirthDate(e.target.value)}
                        type="date" 
                        placeholder="contato@igrejavidanova.com.br" 
                        label="Data de Aniversário"
                    />
                    <InputText 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        placeholder="*******" 
                        label="Senha"
                    />
                    <PrimaryButtonStyled 
                        marginTop="26px" 
                        onClick={handleRegister}
                    >
                    Cadastrar
                    </PrimaryButtonStyled>
                </Container>
            </Container>
        </>
    )
}

export default Cadastro;