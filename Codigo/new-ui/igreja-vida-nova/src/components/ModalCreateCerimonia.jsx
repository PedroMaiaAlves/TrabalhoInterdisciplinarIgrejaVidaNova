import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import * as React from 'react';
import InputText from './InputText';
import InputSelect from './InputSelect';
import { MainTextStyled } from './styles/TextStyled';
import { PrimaryButtonStyled } from './styles/ButtonStyled';
import { Alert } from '@mui/material';
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


const ModalCreateCerimonia = (props) => {

    const [tipoCerimonia, setTipoCerimonia] = React.useState('BATIZADO');
    const [descricao, setDescricao] = React.useState("");
    const [data, setData] = React.useState("");
    const [quantidadeDeConvidados, setQuantidadeDeConvidados] = React.useState(0);

    const handleEventType = (value) => {
        setTipoCerimonia(value);
    }

    React.useEffect(() => {
        setDescricao("");
        setData("");
        setQuantidadeDeConvidados(0);
    }, [props.open]);

    const handleCriarEvento = () => {
        const userId = localStorage.getItem('userId');
        const cerimonia = {
            cerimoniaType: tipoCerimonia,
            quantidadeConvidados: quantidadeDeConvidados,
            data: data,
            descricao: descricao,
        };
        api.post(`/cerimonia/cadastrar/${userId}`, cerimonia)
            .then(() => {
                props.handleClose();
            })
            .catch(error => {
                console.error('Erro ao criar cerimonia:', error.response);
                alert('Erro ao criar cerimonia: ' + error.response.data);
                setDescricao("");
                setData("");
                setQuantidadeDeConvidados(0);
            });
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            >
            <Box sx={style}>
                <MainTextStyled color='#030B16' fontSize='34px' fontWeight='bold' style={{textAlign: 'center'}}>
                    Solicitar Cerimonia
                </MainTextStyled>
                <div 
                    style={{
                        backgroundColor: '#FFFFFF',
                        margin: '19px 62px',
                        borderRadius: '20px',
                        padding: '38px',
                    }}
                >
                    <InputSelect 
                        label= 'Tipo de Cerimonia'
                        value={tipoCerimonia}
                        options={['BATIZADO', 'CASAMENTO']}
                        onChange={(e) => handleEventType(e.target.value)}
                        width='300px'
                    />
                    <InputText
                        label= 'Descrição' 
                        type='text'
                        value={descricao} 
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder='Casamento tradicional na igreja'
                        width='300px'
                    />
                    <InputText
                        label= 'Data' 
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        type='date'
                        width='300px'
                    />
                    <InputText
                        label= 'Quantidade de Convidados'
                        type='number' 
                        value={quantidadeDeConvidados}
                        onChange={(e) => setQuantidadeDeConvidados(e.target.value)}
                        width='300px'
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <PrimaryButtonStyled width='180px' backgroundColor='#F4C400' backgroundColorHover='#CDA502' color='black' onClick={handleCriarEvento}>
                        Solicitar!
                    </PrimaryButtonStyled>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalCreateCerimonia;
