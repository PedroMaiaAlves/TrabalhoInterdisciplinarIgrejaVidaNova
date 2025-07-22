import React, { useState, useEffect } from 'react'
import api from '../axiosConfig';
import InputText from '../components/InputText';
import { PrimaryButtonStyled } from '../components/styles/ButtonStyled';
import { MainTextStyled } from '../components/styles/TextStyled';

const PedirOracao = () => {

    const separarData = (date) => {
        const [data] = date.split("T");
        return data;
    };

    const separarHorario = (date) => {
        const [, horarioCompleto] = date.split("T");
        return horarioCompleto.slice(0, 5);
    };

    const [pedidos, setPedidos] = React.useState([]);
    const [isPastor, setIsPastor] = useState(false);
    const [evento, setEvento] = React.useState();
    const [descricao, setDescricao] = React.useState();

    const getPedidos = () => {
        api.get('/pedidoOracao/listar')
            .then((res) => {
                setPedidos(res.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar pedidos:', error);
            });
    };


    const getEscopos = () => {
        const roles = JSON.parse(localStorage.getItem('roles'));
        if (roles) {
            const isPastor = roles.some(role => role === 'PASTOR');
            setIsPastor(isPastor);
        }
    };

    const getNextEvent = () => {
        api.get(`/evento/proximoCulto`)
            .then((res) => {
                setEvento(res.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar proximo evento:', error);
            });
    }

    const sendPedido = () => {
        api.post(`/pedidoOracao/cadastrar/${evento.id}`, {
            id: evento.id,
            descricao: descricao
        })
            .then((res) => {
                alert("Pedido de oração enviado!");
                setDescricao('');
                getPedidos();
            })
            .catch((error) => {
                console.error('Erro ao executar pedido de oração:', error);
            });
    }

    React.useEffect(() => {
        getNextEvent();
        getEscopos();
    }, []);

    React.useEffect(() => {
        if (isPastor) {
            getPedidos();
        }
    }, [isPastor]);

    return (
        <>
            <MainTextStyled style={{ textAlign: 'center', fontSize: '36px', marginTop: '20px' }}>
                Solicitar Pedido De Oração
            </MainTextStyled>
            <div
                style={{
                    backgroundColor: '#F6F6F6',
                    margin: '69px auto',
                    width: '80%',
                    borderRadius: '20px',
                    padding: '38px'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <InputText
                        label={evento && evento.tema}
                        value={evento?.data || ''}
                        read-only
                        type="datetime-local"
                        width="100%"
                    />
                    <label htmlFor="descricao" style={{ fontSize: '20px', color: '#0F6D47', marginTop: '20px', fontWeight: 'bold' }}>
                        Descrição do Pedido
                    </label>
                    <textarea
                        style={{
                            marginTop: '5px',
                            backgroundColor: '#E8EDF5',
                            color: '#0F6D47',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            fontSize: '24px',
                            outline: 'none'
                        }}
                        placeholder="Descrição do Pedido"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                    <PrimaryButtonStyled
                        width='120px'
                        backgroundColor='#F4C400'
                        backgroundColorHover='#CDA502'
                        color='black'
                        onClick={() => sendPedido()}
                        style={{
                            marginTop: '20px'
                        }}
                    >
                        Enviar
                    </PrimaryButtonStyled>
                </div>
            </div>
            {isPastor && pedidos.length > 0 && (
                <div style={{
                    backgroundColor: '#F6F6F6',
                    margin: '69px auto',
                    width: '80%',
                    borderRadius: '20px',
                    padding: '38px'
                }}>
                    <p style={{ fontSize: '20px', color: '#0F6D47', marginTop: '20px', fontWeight: 'bold' }}>
                        Olá, pastor, estes são os pedidos de oração para o culto:
                    </p>
                    <ul>
                        {pedidos.map(pedido => (
                            <div style={{
                                backgroundColor: '#E8EDF5',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                                margin: '16px',
                            }}>
                                <li key={pedido.id} style={{ fontSize: '18px', color: '#0F6D47', marginTop: '10px' }}>
                                    <strong>Culto:</strong> {pedido.evento.tema} <br />
                                    <strong>Data:</strong> {separarData(pedido.evento.data)} <br />
                                    <strong>Horário:</strong> {separarHorario(pedido.evento.data)} <br />
                                    <strong>Descrição:</strong> {pedido.descricao}
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}


export default PedirOracao;