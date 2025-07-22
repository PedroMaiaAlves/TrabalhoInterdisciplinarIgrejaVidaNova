import React from 'react';
import api from '../axiosConfig';
import { MainTextStyled, SecondTextStyled } from '../components/styles/TextStyled';

const MinhasFuncoes = () => {

    const separarData = (date) => {
        const [data] = date.split("T");
        return data;
    };

    const separarHorario = (date) => {
        const [, horarioCompleto] = date.split("T");
        return horarioCompleto.slice(0, 5);
    };

    const [participacoes, setParticipacoes] = React.useState([]);

    const handlParticipacoes = () => {
        const id = JSON.parse(localStorage.getItem('userId'));
        api.get(`/eventoObreiro/participacoesObreiro/${id}`)
            .then((res) => {
                setParticipacoes(res.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar participações:', error);
            });
    }

    React.useEffect(() => {
        handlParticipacoes();
    }, []);

    return (
        <div>
            <MainTextStyled style={{ textAlign: 'center', fontSize: '36px', marginTop: '20px', marginBottom: '50px' }}>
                        Minhas Funções
            </MainTextStyled>
            {participacoes.map((participacao) => (
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >   
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '32px',
                                backgroundColor: '#F6F6F6',
                                padding: '20px',
                                borderRadius: '5px',
                                height: '60px',
                                width: '50%',
                                marginBottom: '20px',
                                boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
                            }}
                        >
                            <SecondTextStyled style={{ textAlign: 'center', fontSize: '24px',  width: '33%'}}>
                                {participacao.tema}
                            </SecondTextStyled>
                            <SecondTextStyled style={{ textAlign: 'center', fontSize: '24px', width: '33%'}}>
                                {separarData(participacao.data)}
                            </SecondTextStyled>
                            <SecondTextStyled style={{ textAlign: 'center', fontSize: '24px', width: '33%'}}>
                                {separarHorario(participacao.data)}
                            </SecondTextStyled>
                            <SecondTextStyled style={{ textAlign: 'center', fontSize: '24px', width: '33%'}}>
                                {participacao.funcaoEntity}
                            </SecondTextStyled>
                        </div>
                    </div>
                </>
            ))}
        </div>
    );
}

export default MinhasFuncoes;