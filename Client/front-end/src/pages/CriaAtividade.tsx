import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";
import Button from "../components/Button/Button";
import DropContainer from "../components/DropContainer/DropContainer";
import FileList from "../components/FileList/FileList";
import InputType from "../components/InputType/InputType";
import ListaFuncionalidades from "../components/ListaFuncionalidades/ListaFuncionalidades";
import Nav from "../components/Nav/Nav";
import Placeholder from "../components/Placeholder/Placeholder";
import TextArea from "../components/TextArea/TextArea";
import Titulo from "../components/Titulo/Titulo";
import { postArquivo } from "../servico/arquivos";
import { postAtividade } from "../servico/atividades";
import {
  getAllAlunos,
  getAllTurmas,
  getTurmasFromProf,
} from "../servico/turmas";
const InputContaineric1 = styled.div`
  height: 50px;
  position: relative;
  width: 70%;
  margin-top: 30px;
  margin: auto;
`;

const ContainerForm = styled.div`
  background-color: #84b6f4;
  width: 50vw;
  height: auto;
  margin: 1%;
  padding: 30px;
  padding-left: 5vw;
  padding-right: 5vw;
  border-radius: 15px;
  color: black;
  @media all and (max-width: 600px) {
    width: 80vw;
  }
`;
const GridBotoes = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 30% 30% 30%;

  .selectAlunos {
    width: 50%;
    margin: auto;
    font-size: 16pt;
    @media all and (max-width: 600px) {
      width: 90%;
    }
  }
`;
const DropMessage = styled.p`
  display: flex;
  justify-content: center;
  padding: 15px 0;
`;

const Submit = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr;
  justify-items: center;
`;

const Select2 = styled.select`
  background-color: white;
  color: black;
  font-size: 15pt;
  border-radius: 5%;
`;
const Fieldset = styled.fieldset`
  width: 70%;
  font-size: 17pt;
  padding: 0;
  margin: 0 18%;
`;

export default function FormPost() {
  const [turmas, setTurmas] = useState([]);
  const [body, setBody] = useState({
    titulo: "",
    texto: "",
    IDTurma: 0,
    dataPostagem: "",
    dataVencimento: "",
    arquivo: "",
    tipoPostagem: 0,
    arquivada: false,
  });
  const [arquivo, setArquivo] = useState([]);
  const [arquivoEscolido, setArquivoEscolido] = useState(false);
  const navigate = useNavigate();
  const [tipoEnvio, setTipoEnvio] = useState("");
  const [alunos, setAlunos] = useState([{ value: "", label: "" }]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedValues: any) => {
    setSelectedOptions(selectedValues);
  };
  var today = new Date();
  var stringDate = today.toLocaleDateString("pt-BR");

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
  async function carregaTurmas(reg: string) {
    return await getTurmasFromProf(reg);
  }
  async function enviaAtividade(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let nomeArquivo;
    try {
      nomeArquivo = await postArquivo(arquivo[0]);
    } catch { }
    let tipoEnv = () => {
      if (tipoEnvio === "a") {
        return 0;
      }
      return body.IDTurma;
    };

    if (reg != null) {
      if (body.titulo.length > 0 && body.texto.length > 0) {
        const dadosAtividade = {
          tipoPostagem: body.tipoPostagem,
          titulo: body.titulo,
          texto: body.texto,
          IDTurma: tipoEnv(),
          dataPostagem: body.dataPostagem,
          dataVencimento: body.dataVencimento,
          arquivada: body.arquivada,
          arquivo: nomeArquivo,
          registro: parseInt(reg),
          IDalunos: concatMatriculas(),
        };
        postAtividade(dadosAtividade);
        navigate("/pageProf");
      }
    }
  }
  const pegarAlunosTurma = async () => {
    if (body.IDTurma !== 0) {
      const resp = await getAllAlunos(body.IDTurma);
      //setAlunos(resp.data)
      const obj: [{ value: string; label: string }] = [
        { value: "", label: "" },
      ];
      resp.data.forEach((aluno: any) => {
        obj.push({ value: aluno.IDaluno, label: aluno.nome });
      });
      setAlunos(obj);
      setTipoEnvio("a");
    } else {
      alert("Selecione uma turma");
    }
  };
  const concatMatriculas = () => {
    if (selectedOptions.length !== 0) {
      let r = "";
      selectedOptions.map((aluno: any) => {
        r += aluno.value + ",";
      });
      return r;
    }
    return "";
  };
  const reg = localStorage.getItem("registro");

  const cargo = localStorage.getItem("cargo");
  useEffect(() => {
    if (reg != null) {
      //recebido = true
      var resp = carregaTurmas(reg);
      resp.then((dado: any) => {
        setTurmas(dado.data);
      });
    }
  }, []);

  return (
    <>
      <Nav>
        <ListaFuncionalidades cargo={cargo} />
      </Nav>
      <ContainerForm>
        <form action="" method="post" onSubmit={enviaAtividade}>
          <Titulo>Nova Atividade</Titulo>
          <p>
            <InputContaineric1>
              <InputType
                id="nome"
                type="text"
                placeholder=" "
                required
                onChange={(event) =>
                  setBody({ ...body, titulo: event.target.value })
                }
              />
              <Placeholder htmlFor="nome">Título</Placeholder>
            </InputContaineric1>
          </p>
          <p>
            <InputContaineric1>
              <TextArea
                id="area"
                placeholder=" "
                required
                onChange={(event) =>
                  setBody({ ...body, texto: event.target.value })
                }
              />
              <Placeholder htmlFor="area">Descrição</Placeholder>
            </InputContaineric1>
          </p>

          <GridBotoes>
            <p className="turma">
              <label>Turma: </label>
              <Select2
                name="turma"
                id="turma"
                onChange={(event) =>
                  setBody({ ...body, IDTurma: parseInt(event.target.value) })
                }
                required
              >
                <option>Selecione uma</option>
                {turmas.map((turma: any) => (
                  <option value={turma.IDturma}>{turma.nomeTurma}</option>
                ))}
              </Select2>
            </p>
            <p>
              <label>Tipo: </label>
              <Select2
                name="tipoPost"
                id="tipoPost"
                onChange={(event) =>
                  setBody({
                    ...body,
                    tipoPostagem: parseInt(event.target.value),
                  })
                }
                required
              >
                <option>Selecione um</option>
                <option value={1}>Ensino Tecnico</option>
                <option value={2}>Ensino Medio</option>
                <option value={3}>Avisos</option>
              </Select2>
            </p>
            <Fieldset>
              <legend>Destinatário:</legend>

              <div>
                <input
                  type="radio"
                  id="Turma"
                  name="drone"
                  value="Turma"
                  onClick={() => {
                    setTipoEnvio("t");
                  }}
                />
                <label htmlFor="Turma">Turma</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="Alunos"
                  name="drone"
                  value="Alunos"
                  onClick={() => {
                    pegarAlunosTurma();
                  }}
                />
                <label htmlFor="Alunos">Escolher alunos</label>
              </div>
            </Fieldset>

            <Select
              className="selectAlunos"
              isMulti
              options={alunos}
              onChange={(e) => {
                handleChange(e);
              }}
            />

            <p className="dataPostagem">
              <label>Data da postagem</label>
              <InputType
                type="date"
                onChange={(event) =>
                  setBody({ ...body, dataPostagem: event.target.value })
                }
                required
              />
            </p>
            <p className="dataVencimento">
              <label>Data de vencimento</label>
              <InputType
                type="date"
                onChange={(event) =>
                  setBody({ ...body, dataVencimento: event.target.value })
                }
                required
              />
            </p>
          </GridBotoes>
          <div>
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
                <DropContainer {...getRootProps()} isDragActive={isDragActive}>
                  <input {...getInputProps()} />
                  {renderDragMessage(isDragActive)}
                </DropContainer>
              )}
            </Dropzone>
            {mostraArquivo()}
          </div>
          <Submit>
            <Button
              type="submit"
              onClick={() => {
                setBody({ ...body, arquivada: true });
              }}
            >
              Arquivar
            </Button>
            <Button
              type="submit"
              onClick={() => {
                setBody({ ...body, arquivada: false });
              }}
            >
              Publicar
            </Button>
          </Submit>
        </form>
      </ContainerForm>
    </>
  );
}
