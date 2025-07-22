import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import InputSelect from './InputSelect';
import { PrimaryButtonStyled } from './styles/ButtonStyled';
import { MainTextStyled } from './styles/TextStyled';
import api from '../axiosConfig';

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

const ModalAddObreiro = (props) => {

    const [membros, setMembros] = React.useState([]);
    const [membroSelecionado, setMembroSelecionado] = React.useState("");

    const getMembros = () => {
        api.get('/membros/listar')
                .then(response => {
                    setMembros(response.data);
                })
                .catch(error => {
                    console.error('Erro ao buscar eventos:', error);
                });
    }

    const handleAdicionarObreiro = () => {
        api.put(`/membros/promoverObreiro/${membroSelecionado}`)
            .then(() => {
                props.handleClose();
                getMembros();
            })
            .catch(error => {
                console.error('Erro ao transformar membro em obreiro:', error);
            });
    }

    React.useEffect(() => {
        getMembros();
    }, []);
    
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            >
            <Box sx={style}>
                <MainTextStyled color='#030B16' fontSize='34px' fontWeight='bold' style={{textAlign: 'center'}}>Adicionar Obreiro</MainTextStyled>
                <div 
                    style={{
                        backgroundColor: '#FFFFFF',
                        margin: '19px 62px',
                        borderRadius: '20px',
                        padding: '38px',
                    }}
                >
                    <InputSelect 
                        label= 'Selecionar Membro'
                        value={membroSelecionado}
                        options={membros}
                        getOptionLabel={(opt) => opt.fullName}
                        getOptionValue={(opt) => opt.id}
                        onChange={(e) => setMembroSelecionado(e.target.value)}
                        width='400px'
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <PrimaryButtonStyled width='400px' backgroundColor='#F4C400' backgroundColorHover='#CDA502' color='black' onClick={() => handleAdicionarObreiro()}>
                        Transformar em Obreiro!
                    </PrimaryButtonStyled>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalAddObreiro;
