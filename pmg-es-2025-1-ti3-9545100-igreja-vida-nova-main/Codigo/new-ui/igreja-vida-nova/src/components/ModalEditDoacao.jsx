import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import InputText from './InputText';
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
  maxHeight: '800px', overflowY: 'auto', scrollbarWidth: 'none'
};

const ModalEditDoacao = (props) => {
  const [doacao, setDoacao] = React.useState(props.doacao);
  const [foto, setFoto] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  React.useEffect(() => {
    setDoacao(props.doacao);
    setPreviewUrl(
      props.doacao?.fotoBase64
        ? `data:image/jpeg;base64,${props.doacao.fotoBase64}`
        : null
    );
    setFoto(null);
  }, [props.doacao]);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('titulo', doacao.titulo);
    formData.append('descricao', doacao.descricao);
    formData.append('meta', parseFloat(doacao.meta));
    if (foto) {
      formData.append('foto', foto);
    }

    api.put(`/doacao/atualizar/${doacao.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        props.handleClose();
      })
      .catch((error) => {
        console.error('Erro ao salvar doação:', error);
      });
  };

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={style}>
        <MainTextStyled
          color="#030B16"
          fontSize="34px"
          fontWeight="bold"
          style={{ textAlign: 'center' }}
        >
          Editar Doação
        </MainTextStyled>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            margin: '19px 62px',
            borderRadius: '20px',
            padding: '38px',
          }}
        >
          <InputText
            label="Título"
            value={doacao?.titulo || ''}
            onChange={(e) => setDoacao({ ...doacao, titulo: e.target.value })}
            width="400px"
          />
          <InputText
            label="Descrição"
            value={doacao?.descricao || ''}
            onChange={(e) => setDoacao({ ...doacao, descricao: e.target.value })}
            width="400px"
          />
          <InputText
            label="Meta (R$)"
            type="number"
            value={doacao?.meta || ''}
            onChange={(e) => setDoacao({ ...doacao, meta: e.target.value })}
            width="400px"
          />
          <InputText
            label="Valor Arrecadado (R$)"
            type="number"
            value={doacao?.valorArrecadado || ''}
            readOnly
            width="400px"
          />

          <div style={{ marginTop: '16px' }}>
            <label>Imagem da Doação:</label>
            <br />
            <input type="file" accept="image/*" onChange={handleImagemChange} />
          </div>

          {previewUrl && (
            <div
              style={{
                marginTop: '16px',
                textAlign: 'center',
              }}
            >
              <img
                src={previewUrl}
                alt="Preview da imagem"
                style={{
                  width: '200px',
                  height: 'auto',
                  borderRadius: '12px',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PrimaryButtonStyled
            width="180px"
            backgroundColor="#F4C400"
            backgroundColorHover="#CDA502"
            color="black"
            onClick={handleSave}
          >
            Salvar!
          </PrimaryButtonStyled>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalEditDoacao;
