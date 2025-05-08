import { useState } from "react";
import styled from "styled-components";

import { FaTimes } from "react-icons/fa";
import Titulo from "../Titulo/Titulo";

const BackGroundModal = styled.div`
  color: black;
  position: fixed;
  top: 0;
  bottom: 0;
  //LEFT TAVA EM 0, CASO QUEIRA REVERTER
  left: 40%;
  right: 0;
  //SE QUISER, DESCOMENTA  O BACKGROUND COLOR E VOLTA O BLUR PRA 5PX
  //background-color: rgba(0,0,0,0.7);
  backdrop-filter: blur(1px);
  z-index: 1000;
`;
const Modal = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80% 20%;

  background-color: #84b6f4;

  //SOMBRA DA JANELA -> CASO QUEIRA TIRAR É SÓ APAGAR ISSO
  -webkit-box-shadow: 0px 0px 22px 13px rgba(0, 0, 0, 0.67);
  -moz-box-shadow: 0px 0px 22px 13px rgba(0, 0, 0, 0.67);
  box-shadow: 0px 0px 22px 13px rgba(0, 0, 0, 0.67);
  //FIM DA SOMBRA DA JANELA

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 90%;
  border-radius: 10px;

  text-align: center;

  svg {
    position: fixed;
    color: black;
    top: 2%;
    left: 2%;
    cursor: pointer;
    padding: 10px;

    transition: color 500ms;
    &:hover {
      color: red;
    }
  }
  label {
    cursor: pointer;
    background-color: #539bf38a;
  }
  label:hover {
    opacity: 0.7;
  }
`;
const Iframe = styled.iframe`
  display: none;
  cursor: pointer;
`;

const Tracejado = styled.div`
  border: 2px dotted black;
  border-radius: 50%;
  height: 0;
  margin-left: 5%;
  margin-right: 5%;
`;
const Linha = styled(Tracejado)`
  border: 2px solid black;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  .nomeProf {
    margin-left: 10%;
    text-align: start;
  }
  .dataPostagem {
    margin-right: 10%;
    text-align: end;
  }
  .dataHeader {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 1fr;
  }
`;

const Desc = styled.div`
  text-align: start;
  padding-left: 10%;
`;

export default function ModalAtividade(props: {
  isOpen: boolean;
  close: any;
  retorno: any;
}) {
  const urlDownload = "http://localhost:8080/arquivos?arquivo=";
  const [download, setDownload] = useState("");
  const [count, setCount] = useState(0);
  const testaArquivo = (caminho: string) => {
    if (caminho != "undefined") {
      return (
        <p
          className="arquivo"
          onClick={() => {
            if (count > 0) {
            }
            setDownload(urlDownload + caminho);
            setCount((c) => c + 1);
          }}
        >
          {" "}
          {caminho.substring(33)}
        </p>
      );
    }
    return <p className="arquivo">"Nao possui arquivo"</p>;
  };
  const closeModal = (close: any) => {
    close();
    setDownload("");
  };

  if (props.isOpen) {
    const dataRetorno = new Date(props.retorno.dataRetorno);

    // Extraia o dia, mês e ano
    const dia = dataRetorno.getDate();
    const mes = dataRetorno.getMonth() + 1; // Os meses são base 0, então some 1
    const ano = dataRetorno.getFullYear();
    const hora = dataRetorno.getHours();
    const minuto = dataRetorno.getMinutes();

    // Formate a data no formato desejado (adicionando zeros à esquerda, se necessário)
    const dataFormatada = `${dia.toString().padStart(2, "0")}/${mes
      .toString()
      .padStart(2, "0")}/${ano} ${hora}:${minuto.toString()
        .padStart(2, "0")}`;

    var dataRetornoString = dataFormatada;
    return (
      <BackGroundModal>
        <Modal>
          <FaTimes
            onClick={() => {
              closeModal(props.close);
            }}
          ></FaTimes>
          <p>
            <Header>
              <Titulo>{props.retorno.nomeAluno}</Titulo>
            </Header>
            <Linha></Linha>
            <Desc>
              <p className="dataRetorno"> devolvido em: {dataRetornoString}</p>
              <p className="texto">{props.retorno.texto}</p>
            </Desc>
          </p>
          <div>
            <Tracejado></Tracejado>
            <label className="arquivo">
              arquivo:{testaArquivo(props.retorno.arquivo)}
            </label>
            {download.substring(33) && (
              <Iframe src={download + "&c=" + count} />
            )}
          </div>
        </Modal>
      </BackGroundModal>
    );
  }
  return null;
}
