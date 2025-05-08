import { useState } from "react";
import styled from "styled-components";

import Dropzone from "react-dropzone";
import { FaTimes } from "react-icons/fa";
import { postArquivo } from "../../servico/arquivos";
import { postAtividadeRealizada } from "../../servico/atividades";
import ButtonModal from "../Button/ButtonModal";
import DropContainer from "../DropContainer/DropContainer";
import FileList from "../FileList/FileList";
import TextArea from "../TextArea/TextArea";
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
  @media all and (max-width: 600px) {
    left: 0;
  }
`;
const Modal = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;

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
  height: 95%;
  border-radius: 10px;

  @media all and (max-width: 600px) {
    width: 90%;
    height: 95%;  
  }

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
`;
const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 50% 30%;
  gap: 10px;

  justify-content: space-evenly;
  align-items: center;
`;
const Iframe = styled.iframe`
  display: none;
  cursor: pointer;
`;
const DropMessage = styled.p`
  display: flex;
  justify-content: center;
  padding: 15px 0;
`;

const Tracejado = styled.div`
    border: 2px dotted black;
    border-radius: 50%;
    height:  0;
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
    padding-right: 10%;
  `;

export default function ModalAtividade(props: {
  isOpen: boolean;
  close: any;
  postagen: any;
  screen: any;
}) {
  console.log(props.postagen);
  var matricula = localStorage.getItem("matricula");
  const urlDownload = "http://localhost:8080/arquivos?arquivo=";
  const [download, setDownload] = useState("");
  const [count, setCount] = useState(0);
  const [arquivo, setArquivo] = useState([]);
  const [arquivoEscolido, setArquivoEscolido] = useState(false);
  const [body, setBody] = useState({
    IDatividade: 0,
    matricula: 0,
    texto: "",
    arquivo: "",
  });
  const testaArquivo = (caminho: string) => {
    if (caminho !== "undefined") {
      return (
        <p style={{cursor:"pointer"}}
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
  const limpaArquivos = () => {
    setArquivoEscolido(false);
    setArquivo([]);
  };

  const mostraArquivo = () => {
    if (arquivoEscolido) {
      return (
        <FileList file={arquivo[0]} limpaArquivos={limpaArquivos}></FileList>
      );
    }
    return "";
  };
  const renderDragMessage = (isDragActive: boolean) => {
    if (!isDragActive) {
      return <DropMessage>Arraste um Arquivo aqui</DropMessage>;
    }
    return <DropMessage>Solte o Arquivo aqui</DropMessage>;
  };
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let nomeArquivo;
    try {
      nomeArquivo = await postArquivo(arquivo[0]);
    } catch {}
    console.log(matricula);
    if (matricula !== null) {
      const dadosAtividade = {
        IDatividade: props.postagen.IDpostagem,
        matricula: parseInt(matricula),
        texto: body.texto,
        arquivo: nomeArquivo,
      };
      postAtividadeRealizada(dadosAtividade);
      window.location.reload();
    }
  };
  const mostraBotao = () => {
    if(props.screen == -1){
      return(<></>);
    }else{
      return(<ButtonModal type="submit">Devolver</ButtonModal>);
    }
  }

  if (props.isOpen) {
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
              <Titulo>{props.postagen.titulo}</Titulo>
              <div className="dataHeader">
                <div className="nomeProf">Autor: {props.postagen.nomeProf}</div>
                <div className="dataPostagem">
                  Entrega: {props.postagen.Datavencimento}
                </div>
              </div>
            </Header>

            <Linha></Linha>

            <Desc>{props.postagen.texto}</Desc>
          </p>

          <div>
            <label className="arquivo">arquivo:</label>
            {testaArquivo(props.postagen.caminhoArquivo)}
            {download && <Iframe src={download + "&c=" + count} />}

            <Tracejado></Tracejado>

            <form
              onSubmit={(event) => {
                submit(event);
              }}
            >
              <label></label>
              <Container>
                <div className="dropZone">
                  <Dropzone
                    onDropAccepted={(files: any) => {
                      setArquivo(files);
                      setArquivoEscolido(true);
                    }}
                  >
                    {({
                      getRootProps,
                      getInputProps,
                      isDragActive,
                      isDragReject,
                    }) => (
                      <DropContainer
                        {...getRootProps()}
                        isDragActive={isDragActive}
                      >
                        <input {...getInputProps()} />
                        {renderDragMessage(isDragActive)}
                      </DropContainer>
                    )}
                  </Dropzone>
                  {mostraArquivo()}
                </div>

                <div className="textArea">
                  <label>descricao da resposta:</label>
                  <TextArea
                    cols={30}
                    rows={3}
                    maxLength={45}
                    placeholder="Limite de 45 caracteres"
                    onChange={(event) =>
                      setBody({ ...body, texto: event.target.value })
                    }
                    required
                  />
                </div>
              </Container>

              <p>
                {mostraBotao()}   
              </p>
            </form>
          </div>
        </Modal>
      </BackGroundModal>
    );
  }
  return null;
}
