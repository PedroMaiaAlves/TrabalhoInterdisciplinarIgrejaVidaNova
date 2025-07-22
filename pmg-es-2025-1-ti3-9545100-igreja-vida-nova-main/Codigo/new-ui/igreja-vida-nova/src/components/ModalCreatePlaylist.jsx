import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import api from '../axiosConfig';
import InputText from '../components/InputText';
import { PrimaryButtonStyled } from './styles/ButtonStyled';
import { MainTextStyled } from './styles/TextStyled';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#F6F6F6',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
};


const ModalCreatePlaylist = (props) => {

    const [link , setLink] = React.useState("");


    const handleCriarPlaylist = () => {
        const playlist = {
            link
        };

        api.post('/playlist/cadastrar', playlist)
            .then(() => {
                props.handleClose();
            })
            .catch(error => {
    if (error.response) {
        console.error('Erro ao criar Playlist:', error.response.data);
        alert(`Erro ao criar Playlist: ${error.response.data}`);
    } else if (error.request) {
        console.error('Sem resposta do servidor. Verifique a conexão ou se o backend está rodando.');
        alert('Não foi possível conectar ao servidor. Verifique sua internet ou o backend.');
    } else {
        console.error('Erro ao configurar a requisição:', error.message);
        alert(`Erro inesperado: ${error.message}`);
    }
});
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            >
            <Box sx={style}>
                <MainTextStyled color='#030B16' fontSize='34px' fontWeight='bold' style={{textAlign: 'center'}}>Adicionar música</MainTextStyled>
                <div 
                    style={{
                        backgroundColor: '#FFFFFF',
                        margin: '19px 62px',
                        borderRadius: '20px',
                        padding: '38px',
                    }}
                >
                    <InputText
                        label= 'Adicione o link da música' 
                        type='text'
                        value={link} 
                        onChange={(e) => setLink(e.target.value)}
                        placeholder='URL do vídeo'
                        width='300px'
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <PrimaryButtonStyled width='180px' backgroundColor='#F4C400' backgroundColorHover='#CDA502' color='black' onClick={handleCriarPlaylist}>
                        Criar!
                    </PrimaryButtonStyled>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalCreatePlaylist;
