import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import InputSelect from '../components/InputSelect';
import ModalVincularObreiro from '../components/ModalVincularObreiro';
import { PrimaryButtonStyled } from '../components/styles/ButtonStyled';
import { MainTextStyled, SecondTextStyled } from '../components/styles/TextStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../axiosConfig';

const GerenciarObreirosEvento = () => {
    const [eventoObreiro, setEventoObreiro] = useState([]);
    const [funcoes, setFuncoes] = useState([]);
    const [funcoesSelecionadas, setFuncoesSelecionadas] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const { id } = useParams();

    const fetchObreiros = () => {
        api.get(`/eventoObreiro/listaDeEventoObreiro/${id}`)
            .then((res) => {
                setEventoObreiro(res.data);
                const selecionadas = {};
                res.data.forEach((evento) => {
                    selecionadas[evento.obreiro.id] = evento.funcao.id;
                });
                setFuncoesSelecionadas(selecionadas);
            })
            .catch((error) => {
                console.error('Erro ao buscar obreiros:', error);
            });
    };

    const getFuncoes = () => {
        api.get('/funcao/listar')
            .then(response => {
                setFuncoes(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar funções:', error);
            });
    };

    const handleFuncao = (evento, funcaoId) => {
        api.put(`/eventoObreiro/alterarFuncao/${evento.id}`, {
            idDaFuncao: funcaoId
        }).then(() => {
                alert('Funções atualizadas com sucesso!');
                fetchObreiros();
            })
            .catch(error => {
                console.error('Erro ao atualizar funções:', error);
            });
        setFuncoesSelecionadas(prev => ({
            ...prev,
            [evento.obreiro.id]: funcaoId
        }));
    };

    const handleDelete = (id) => {
        api.delete(`/eventoObreiro/${id}`)
            .then(() => {
                alert('Obreiro removido com sucesso!');
                fetchObreiros();
            })
            .catch(error => {
                console.error('Erro ao remover obreiro:', error);
            });
    }

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
        setOpenModal(false);
        fetchObreiros();
        getFuncoes();
    };

    useEffect(() => {
        fetchObreiros();
        getFuncoes();
    }, []);

    return (
        <div style={{ margin: '35px' }}>
            {eventoObreiro.length > 0 && eventoObreiro[0].evento?.tema && (
                <>
                    <MainTextStyled style={{ textAlign: 'center' }}>
                        {eventoObreiro[0].evento.tema}
                    </MainTextStyled>
                    <SecondTextStyled style={{ textAlign: 'center' }}>
                        Obreiros designados
                    </SecondTextStyled>
                </>
            )}

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                    marginBottom: '20px',
                }}
            >
                <PrimaryButtonStyled
                    backgroundColor='#1E984F'
                    color='white'
                    width='160px'
                    height='32px'
                    fontSize='16px'
                    fontWeight='bold'
                    style ={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={handleOpenModal}
                >
                    Vincular Obreiro
                </PrimaryButtonStyled>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {eventoObreiro.map((evento) => (
                    evento.obreiro && (
                        <div
                            key={evento.obreiro.id}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '16px',
                                backgroundColor: '#F5F5F5',
                                borderRadius: '8px',
                                gap: '16px',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faTrash}
                                style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }}
                                onClick={() => handleDelete(evento.id)}
                            />

                            <MainTextStyled fontSize="24px">Nome:</MainTextStyled>
                            <SecondTextStyled fontSize="24px">{evento.obreiro.fullName}</SecondTextStyled>

                            <MainTextStyled fontSize="24px">Função atual:</MainTextStyled>
                            <SecondTextStyled fontSize="24px">{evento.funcao.nomeFuncao}</SecondTextStyled>

                            <InputSelect
                                label='Nova função'
                                value={funcoesSelecionadas[evento.obreiro.id] || ''}
                                options={funcoes}
                                onChange={(e) => handleFuncao(evento, e.target.value)}
                                width='300px'
                                getOptionLabel={(opt) => opt.nomeFuncao}
                                getOptionValue={(opt) => opt.id}
                            />
                        </div>
                    )
                ))}
            </div>

            <ModalVincularObreiro
                open={openModal}
                handleClose={handleCloseModal}
            />
        </div>
    );
};

export default GerenciarObreirosEvento;
