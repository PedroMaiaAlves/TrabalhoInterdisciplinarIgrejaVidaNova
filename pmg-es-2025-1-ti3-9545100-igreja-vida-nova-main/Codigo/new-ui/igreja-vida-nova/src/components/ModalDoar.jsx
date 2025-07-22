import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputText from './InputText';
import { PrimaryButtonStyled } from './styles/ButtonStyled';
import { MainTextStyled } from './styles/TextStyled';
import axios from 'axios';
import api from '../axiosConfig';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#fff',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    width: 400,
};

const ModalDoar = ({ open, handleClose, doacaoId }) => {
    const [valor, setValor] = useState("");

    console.log("Valor doado:", doacaoId);

    const handleSelect = (v) => setValor(v);
    const handleConfirmar = () => {
        api.put(`/doacao/doarDinheiro/${doacaoId}`, {
            doacaoId: doacaoId,
            valor: parseFloat(valor)
        })
        .then(() => {
            handleClose();
        })
        .catch(err => {
            console.error("Erro ao doar:", err);
        });
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <MainTextStyled fontSize="24px" fontWeight="bold" style={{ textAlign: 'center' }}>
                    Escolha o valor da doação
                </MainTextStyled>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    {[10, 20, 50].map(v => (
                        <PrimaryButtonStyled
                            key={v}
                            width="100px"
                            height="40px"
                            fontSize="16px"
                            backgroundColor={valor == v ? '#CDA502' : '#F4C400'}
                            backgroundColorHover="#CDA502"
                            onClick={() => handleSelect(v)}
                        >
                            R$ {v}
                        </PrimaryButtonStyled>
                    ))}
                </div>

                <InputText
                    label="Valor personalizado"
                    placeholder="Digite outro valor"
                    type="number"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    width="100%"
                    style={{ marginTop: '20px' }}
                />

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <PrimaryButtonStyled
                        width='100%'
                        backgroundColor='#4CAF50'
                        backgroundColorHover='#388E3C'
                        color='white'
                        onClick={handleConfirmar}
                    >
                        Confirmar Doação
                    </PrimaryButtonStyled>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalDoar;
