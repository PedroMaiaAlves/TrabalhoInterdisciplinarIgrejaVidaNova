import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../axiosConfig";
import { PrimaryButtonStyled } from '../components/styles/ButtonStyled';
import {
  BirthdayBoxStyled,
  BirthdayRankingStyled,
  VersiculoBoxStyled
} from "../components/styles/HomeStyled";
import {
  MainTextStyled,
  SecondTextStyled,
} from "../components/styles/TextStyled";


const Home = () => {
  const [aniversariantes, setAniversariantes] = useState([]);
  const [isPastor, setIsPastor] = useState(false);
  const [isLoadingRelatorio, setIsLoadingRelatorio] = useState(false);

  const verifyAuth = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      window.location.href = "/login";
    }
  };

  const handleAniversariantes = () => {
    api
      .get("/membros/listar/aniversariantesDoMes")
      .then((response) => {
        setAniversariantes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar aniversariantes:", error);
      });
  };

  const getEscopos = () => {
    const roles = JSON.parse(localStorage.getItem('roles'));
    if (roles) {
      const isPastor = roles.some(role => role === 'PASTOR');
      setIsPastor(isPastor);
    }
  };

  const handleGenerateRelatorio = () => {
    setIsLoadingRelatorio(true);
    api
      .get("/relatorio", { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "relatorio_resumo_geral.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Erro ao gerar relatório:", error);
      })
      .finally(() => {
        setIsLoadingRelatorio(false);
      });
  };

  useEffect(() => {
    verifyAuth();
    handleAniversariantes();
    getEscopos();

    const script = document.createElement("script");
    script.src = "https://dailyverses.net/get/verse.js?language=arc";
    script.async = true;
    script.defer = true;

    document.getElementById("dailyVersesWrapper")?.appendChild(script);

    return () => {
      document.getElementById("dailyVersesWrapper")?.removeChild(script);
    };
  }, []);

  return (
    <>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#DADADA",
        }}
      >
        <Container item sx={{ margin: "75px 0px 0px 192px" }}>
          <MainTextStyled>O que somos?</MainTextStyled>
          <SecondTextStyled>
            De acordo com a ciência, somos descendentes de uma espécime primata,
            vinda dos Homos sapiens, através de uma evolução de milhões de anos.
            E ainda de acordo com a ciência, somos um emaranhado de compostos
            químicos. De acordo com a Bíblia, fomos formados do pó, aonde a
            ciência, acorda com a Bíblia. Somos a evolução do plano de Deus,
            para sermos uma criação perfeita, aonde a ciência concorda
            novamente, que chegamos no estágio final da evolução.
          </SecondTextStyled>
        </Container>

        <Container item sx={{ margin: "75px 192px 0px 0px" }}>
          {isPastor && (
            <PrimaryButtonStyled
              backgroundColor='#1E984F'
              color='white'
              height='32px'
              width='100%'
              fontSize='16px'
              fontWeight='bold'
              disabled={isLoadingRelatorio}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                opacity: isLoadingRelatorio ? 0.5 : 1,
                cursor: isLoadingRelatorio ? 'not-allowed' : 'pointer'
              }}
              onClick={handleGenerateRelatorio}
            >
              {isLoadingRelatorio ? 'Gerando Relatório...' : 'Relatório de Resumo Geral'}
            </PrimaryButtonStyled>
          )}

          <BirthdayBoxStyled>
            <SecondTextStyled
              color={"#030B16"}
              fontSize={"20px"}
              fontWeight={"bold"}
            >
              Aniversáriantes Do Mês
            </SecondTextStyled>
            {aniversariantes.map((aniversariante, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "16px",
                  gap: "39px",
                }}
              >
                <BirthdayRankingStyled>{index + 1}</BirthdayRankingStyled>
                <SecondTextStyled color={"#030B16"} fontSize={"16px"}>
                  {aniversariante.fullName}
                </SecondTextStyled>
                <SecondTextStyled color={"#858D95"} fontSize={"16px"}>
                  {aniversariante.birthday}
                </SecondTextStyled>
              </div>
            ))}
          </BirthdayBoxStyled>

          <VersiculoBoxStyled>
            <SecondTextStyled
              color={"#030B16"}
              fontSize={"20px"}
              fontWeight={"bold"}
            >
              Versículo do Dia
            </SecondTextStyled>
            <div
              id="dailyVersesWrapper"
              style={{ marginTop: "0px", fontSize: "20px", color: "#333" }}
            ></div>
          </VersiculoBoxStyled>
        </Container>
      </Container>
    </>
  );
};

export default Home;
