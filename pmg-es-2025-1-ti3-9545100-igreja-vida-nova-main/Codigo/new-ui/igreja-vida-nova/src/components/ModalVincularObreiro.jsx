import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import api from '../axiosConfig';
import InputSelect from './InputSelect';
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


const ModalVincularObreiro = (props) => {

    const [obreiros, setObreiros] = React.useState([]);
    const [obreiroSelecionado, setObreiroSelecionado] = React.useState("");
    const { id } = useParams();

    const fetchObreiros = () => {
        api.get(`/eventoObreiro/listaObreiros/${id}`)
            .then((res) => {
                setObreiros(res.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar obreiros:', error);
            });
    };

    const handleAdicionarObreiro = () => {
        console.log('Obreiro selecionado:', id);

        api.post(`/eventoObreiro/criar`, {
            evento: {
                id: id,
            },
            obreiro: {
                id: obreiroSelecionado,
            },
            funcao: {
                id: 1,
            }
        })
        .then(() => {
            props.handleClose();
        })
        .catch(error => {
            console.error('Erro ao transformar membro em obreiro:', error);
        });
    }

    React.useEffect(() => {
        fetchObreiros();
    }, []);

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            >
            <Box sx={style}>
                <MainTextStyled color='#030B16' fontSize='34px' fontWeight='bold' style={{textAlign: 'center'}}>Atrelar Obreiro</MainTextStyled>
                <div 
                    style={{
                        backgroundColor: '#FFFFFF',
                        margin: '19px 62px',
                        borderRadius: '20px',
                        padding: '38px',
                    }}
                >
                    <InputSelect
                        label= 'Selecionar Obreiro'
                        value={obreiroSelecionado}
                        options={obreiros}
                        getOptionLabel={(opt) => opt.nome}
                        getOptionValue={(opt) => opt.id}
                        onChange={(e) => setObreiroSelecionado(e.target.value)}
                        width='400px'
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <PrimaryButtonStyled width='180px' backgroundColor='#F4C400' backgroundColorHover='#CDA502' color='black' onClick={handleAdicionarObreiro}>
                        Atrelar!
                    </PrimaryButtonStyled>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalVincularObreiro;
