import React, { useEffect } from 'react';
import api from '../axiosConfig';
import InputText from '../components/InputText';
import { PrimaryButtonStyled } from '../components/styles/ButtonStyled';
import { MainTextStyled } from '../components/styles/TextStyled';

const Perfil = () => {

    const [user, setUser] = React.useState({
        id: localStorage.getItem('userId'),
        fullName: '',
        username: '',
        birthday: '',
    });

    const [image, setImage] = React.useState(null);
    const [preview, setPreview] = React.useState(null);

    const getUserInfo = () => {
        api.get(`/membros/buscarPorId/${user.id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do usuário:', error);
            });
        api.get(`membros/obterImagem/${user.id}`, { responseType: 'blob' })
            .then(response => {
                const imgURL = URL.createObjectURL(response.data);
                setPreview(imgURL);
            })
            .catch(error => {
                console.error('Erro ao buscar imagem de perfil:', error);
            });
    }

    const updateUserInfo = () => {
        api.put(`/membros/atualizar/${user.id}`, user)
            .then(() => {
                if (image) {
                    const formData = new FormData();
                    formData.append('file', image);

                    api.patch(`/membros/inserirFoto/${user.id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then(() => {
                        alert('Dados e foto atualizados com sucesso!');
                        getUserInfo();
                    })
                    .catch(error => {
                        console.error('Erro ao enviar a imagem:', error);
                    });
                } else {
                    alert('Dados atualizados com sucesso!');
                    getUserInfo();
                }
            })
            .catch(error => {
                console.error('Erro ao atualizar dados do usuário:', error);
            });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div 
            style={{
                backgroundColor: '#F6F6F6',
                margin: '69px auto',
                width: '40%',
                borderRadius: '20px',
                padding: '38px',
            }}
        >
            <MainTextStyled color='#030B16' fontSize='34px' fontWeight='bold' style={{textAlign: 'center', marginBottom: '15px'}}>Editar Perfil</MainTextStyled>
            
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '20px'
                }}
            >
                {/* Foto de perfil */}
                {preview && (
                    <img 
                        src={preview} 
                        alt="Foto de perfil" 
                        style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px', objectFit: 'cover' }} 
                    />
                )}

                {/* Upload de nova foto */}
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ marginBottom: '20px' }}
                />

                <InputText 
                    id="fullName" 
                    value={user.fullName} 
                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                    type="text" 
                    label="Nome Completo"
                    width='400px'
                />
                <InputText 
                    id="userName" 
                    value={user.username} 
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    type="text" 
                    label="Apelido"
                    width='400px'
                />
                <InputText 
                    id="date" 
                    value={user.birthday} 
                    onChange={(e) => setUser({ ...user, birthday: e.target.value })}
                    type="date" 
                    label="Data de Aniversário"
                    width='400px'
                />

                <PrimaryButtonStyled 
                    width='200px' 
                    backgroundColor='#F4C400' 
                    backgroundColorHover='#CDA502' 
                    color='black' 
                    marginTop='30px' 
                    onClick={updateUserInfo}
                >
                    Salvar
                </PrimaryButtonStyled>
            </div>
        </div>
    );
}

export default Perfil;
