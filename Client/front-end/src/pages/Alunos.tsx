import { useEffect, useState } from "react";
import Papa from "papaparse";
import styled from "styled-components";

import Button from "../components/Button/Button";
import InputType from "../components/InputType/InputType";
import ListaFuncionalidades from "../components/ListaFuncionalidades/ListaFuncionalidades";
import Nav from "../components/Nav/Nav";
import Titulo from "../components/Titulo/Titulo";
import { getAllAlunos, postAluno, postAlunos } from "../servico/aluno";
import { getAllTurmas } from "../servico/turmas";

const ContainerForm = styled.div`
  background-color: #84b6f4;
  width: 100%;
  margin: 2%;
  padding: 30px;
  border-radius: 15px;
  color: black;
  .titulo {
    text-align: center;
  }
  @media all and (max-width: 600px) {
    width: 80%;
  }
`;
const TextArea = styled.textarea`
  background-color: #19243b;
  color: rgb(255, 255, 255);
  width: 100%;
  margin: 8px 0;
  padding: 12px 20px;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 20px;
`;

const Select = styled.select`
  font-size: 18px;
  height: 40px;
  border-radius: 10px;
  background-color: white;
  color: black;
`;

const Placeholder = styled.label`
  color: #65657b;
  font-size: 20px;
  left: 15%;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;

  ${InputType}:focus ~ &,
   ${InputType}:not(:placeholder-shown) ~ & {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }

  ${InputType}:not(:placeholder-shown) ~ & {
    color: #808097;
  }

  ${InputType}:focus ~ & {
    color: rgba(255, 255, 255);
  }

  ${TextArea}:focus ~ &,
   ${TextArea}:not(:placeholder-shown) ~ & {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }

  ${TextArea}:not(:placeholder-shown) ~ & {
    color: #808097;
  }

  ${TextArea}:focus ~ & {
    color: rgba(255, 255, 255);
  }
`;

const InputContaineric1 = styled.div`
  height: 50px;
  position: relative;
  width: 100%;
  margin-top: 40px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-rows: 8vh 90%;
  width: 35vw;
  align-items: center;
  justify-items: center;
  @media all and (max-width: 600px) {
    display: block;
    width: 60vw;
  }
`;

const Content = styled.div`
  margin-right: 20px;
  input {
    width: 80%;
  }
`;
const FileInput = styled.div`
  input::file-selector-button {
    margin-left: 20%;
    height: 6vh;
    width: 6vw;
    font-size: 10pt;
    color: black;
    background-color: white;
    padding: 2%;
    border-radius: 5px;
    cursor: pointer;
    @media all and (max-width: 600px) {
      width: 20vw;
    }
  }
  input::file-selector-button:hover {
    opacity: 0.9;
  }
`;

const Fieldset = styled.fieldset`
  width: 70%;
  max-width: 100%;
  max-height: 100%;
  font-size: 17pt;
  margin-bottom: 30px;
  @media all and (max-width: 600px) {
    font-size: 9pt;
    width: 200px;
    display: grid;
  }
`;

export default function Alunos() {
  const cargo = localStorage.getItem("cargo");
  const [body, setBody] = useState({
    matricula: 0,
    nome: "",
    email: "",
    senha: "",
    IDturma: 0,
  });
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [radio, setRadio] = useState("");
  const [csvData, setCsvData] = useState<
    {
      matricula: number;
      nome: string;
      email: string;
      senha: string;
      IDturma: number;
    }[]
  >([]);

  const carregarTurmas = async () => {
    return await getAllTurmas();
  };
  const carregarAlunos = async () => {
    return await getAllAlunos();
  };
  useEffect(() => {
    var resp;
    if (cargo === "3") {
      resp = carregarTurmas();
      resp.then((dado: any) => {
        setTurmas(dado.data);
      });
      resp = carregarAlunos();
      resp.then((dado: any) => {
        setAlunos(dado.data);
      });
    }
  }, []);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (csvData.length > 0) {
      console.log(csvData);
      await postAlunos(csvData);
      alert("aluno cadastrado com suceso");
    } else if (body.IDturma !== 0 && body.matricula !== 0) {
      await postAluno(body);
      alert("aluno cadastrado com suceso");
    } else {
      alert("Digite os dados do aluno ");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          if (result.data && result.data.length > 0) {
            // A análise do CSV foi concluída com sucesso
            const transformedData = result.data.map((row: any) => ({
              matricula: Number(row.matricula),
              nome: row.nome,
              email: row.email,
              senha: row.senha,
              IDturma: Number(row.IDturma),
            }));
            setCsvData(transformedData);
          } else {
            // O CSV estava vazio ou não pôde ser analisado
            console.error("Não foi possível ler os dados do CSV.");
          }
        },
        header: true, // Se a primeira linha do CSV contiver cabeçalhos de coluna
        skipEmptyLines: true, // Ignorar linhas vazias
      });
    }
  };

  const secaoForm = () => {
    return (
      <form
        onSubmit={async (event) => {
          submit(event);
        }}
      >
        <Titulo className="titulo">Criar Aluno</Titulo>
        <div>
          <Content>
            <InputContaineric1>
              <InputType
                id="reg"
                type="number"
                placeholder=" "
                minLength={8}
                onChange={(event) =>
                  setBody({ ...body, matricula: Number(event.target.value) })
                }
              />
              <Placeholder htmlFor="reg" className="placeholder">
                Matricula
              </Placeholder>
            </InputContaineric1>
          </Content>
          <Content>
            <InputContaineric1>
              <InputType
                id="nome"
                type="text"
                placeholder=" "
                onChange={(event) =>
                  setBody({ ...body, nome: event.target.value })
                }
              />
              <Placeholder htmlFor="nome" className="placeholder">
                Nome
              </Placeholder>
            </InputContaineric1>
          </Content>
          <Content>
            <InputContaineric1>
              <InputType
                id="email"
                type="email"
                placeholder=" "
                onChange={(event) =>
                  setBody({ ...body, email: event.target.value })
                }
              />
              <Placeholder htmlFor="email" className="placeholder">
                email
              </Placeholder>
            </InputContaineric1>
          </Content>
          <Content className="turma">
            <p>
              <label>Turma: </label>
              <Select
                id="turma"
                onChange={(event) =>
                  setBody({ ...body, IDturma: Number(event.target.value) })
                }
              >
                <option value={0}>Selecione uma</option>
                {turmas.map((turma: any) => (
                  <option value={turma.IDturma}>{turma.nomeTurma}</option>
                ))}
              </Select>
            </p>
          </Content>
        </div>
        <Button type="submit">Cadastrar aluno</Button>
      </form>
    );
  };
  return (
    <>
      <Nav>
        <ListaFuncionalidades cargo={cargo} />
      </Nav>
      <GridContainer>
        <Fieldset>
          <legend>Opções de cadastro:</legend>

          <input
            type="radio"
            id="aluno"
            name="a"
            value="aluno"
            onChange={(event) => setRadio("aluno")}
          />
          <label htmlFor="aluno">Cadastro aluno</label>

          <input
            type="radio"
            id="alunos"
            name="a"
            value="alunos"
            onChange={(event) => setRadio("alunos")}
          />
          <label htmlFor="alunos">Importar alunos</label>
        </Fieldset>
        {radio === "aluno" && (
          <ContainerForm className="form">{secaoForm()}</ContainerForm>
        )}
        {radio === "alunos" && (
          <ContainerForm>
            <form
              onSubmit={async (event) => {
                submit(event);
              }}
            >
              <Titulo className="titulo">Importar alunos (.csv)</Titulo>
              <FileInput>
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                />
              </FileInput>
              <Button type="submit">Importar</Button>
            </form>
          </ContainerForm>
        )}
      </GridContainer>
    </>
  );
}
