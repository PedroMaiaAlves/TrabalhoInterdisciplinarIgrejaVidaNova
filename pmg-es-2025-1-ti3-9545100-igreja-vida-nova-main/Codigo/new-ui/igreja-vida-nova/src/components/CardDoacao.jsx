import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ModalDoar from './ModalDoar';
import { PrimaryButtonStyled } from './styles/ButtonStyled';
import { MainTextStyled, SecondTextStyled } from './styles/TextStyled';

const CardDoacao = (props) => {
    const [openModalDoar, setOpenModalDoar] = React.useState(false);

    const handleCloseModalDoar = () => {
        setOpenModalDoar(false);
        props.getDoacoes();
    };

    return (
        <div
            style={{
                backgroundColor: '#FFFFFF',
                width: '342px',
                padding: '16px',
                borderRadius: '12px',
            }}
        >
            <img
                src={
                    props.doacao.fotoBase64
                        ? `data:image/jpeg;base64,${props.doacao.fotoBase64}`
                        : 'https://igreja-vida-nova.s3.us-east-2.amazonaws.com/images/backgroundImage.png'
                }
                alt={props.doacao.titulo}
                style={{
                    width: '311px',
                    height: '186px',
                    marginBottom: '14px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <MainTextStyled color="#030B16" fontSize="16px">
                    {props.doacao.titulo}
                </MainTextStyled>
            </div>
            <div style={{ marginTop: '25px' }}>
                <SecondTextStyled fontSize="14px">Descrição: {props.doacao.descricao}</SecondTextStyled>
                <SecondTextStyled fontSize="14px">Meta de Arrecadação: R${props.doacao.meta}</SecondTextStyled>
            </div>
            <div style={{ marginTop: '20px' }}>
                <div
                    style={{
                        backgroundColor: '#E0E0E0',
                        width: '100%',
                        height: '10px',
                        borderRadius: '5px',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            width: `${Math.min((props.doacao.valorArrecadado / props.doacao.meta) * 100, 100)}%`,
                            height: '100%',
                            backgroundColor: '#4CAF50',
                        }}
                    ></div>
                </div>
                <SecondTextStyled
                    fontSize="12px"
                    style={{ marginTop: '5px', color: '#333' }}
                >
                    R$ {props.doacao.valorArrecadado} arrecadado de R$ {props.doacao.meta}
                </SecondTextStyled>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <PrimaryButtonStyled
                    backgroundColor="#F4C400"
                    backgroundColorHover="#CDA502"
                    color="black"
                    width="60%"
                    height="40px"
                    fontSize="24px"
                    marginTop="10px"
                    onClick={() => setOpenModalDoar(true)}
                >
                    Doar!
                </PrimaryButtonStyled>

                <ModalDoar
                    open={openModalDoar}
                    handleClose={handleCloseModalDoar}
                    doacaoId={props.doacao.id}
                />
            </div>

            {props.isPastor && (
                <div
                    style={{
                        marginTop: '10px',
                    }}
                >
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{
                            color: 'black',
                            fontSize: '25px',
                            marginRight: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={props.handleOpenModalEdit}
                    />
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                            color: 'red',
                            fontSize: '25px',
                            cursor: 'pointer',
                        }}
                        onClick={props.handleDelete}
                    />
                </div>
            )}
        </div>
    );
};

export default CardDoacao;