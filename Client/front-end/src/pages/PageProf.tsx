import { useEffect, useState } from "react";
import styled from "styled-components";

import {
  getAtividadesArquivadas,
  getAtividadesProf,
} from "../servico/atividades";
import { getAllTurmas, getTurmasFromProf } from "../servico/turmas";

import { useNavigate } from "react-router-dom";
import Atividade from "../components/Atividade/Atividade";
import ListaFuncionalidades from "../components/ListaFuncionalidades/ListaFuncionalidades";
import Nav from "../components/Nav/Nav";
import Sidebar from "../components/Sidebar/SidebarProf";

const BotaoTurma = styled.div`
  position: fixed;
  width: 3%;
  left: 15px;
  top: 15px;
  cursor: pointer;
  color: black;
  transition: opacity 500ms;
  &:hover {
    opacity: 0.4;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 10px;
  margin-top: 1%;
  gap: 50px;

  justify-items: center;

  width: 80%;
  height: 100%;

  //place-items:center;

  @media all and (max-width: 600px) {
    display:block;
  }
`;

export default function PageProf() {
  const [turmas, setTurmas] = useState([]);
  const [turmaFilter, setTurmaFilter] = useState(0);
  const [atividades, setAtividades] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [atividadesArquivadas, setAtividadesArquivadas] = useState([]);
  const navigate = useNavigate();
  let atividadesFilter: never[];

  const showSidebar = () => setSidebar(!sidebar);

  async function carregaTurmas(reg: string) {
    return await getTurmasFromProf(reg);
  }
  async function carregaAtividades(reg: string) {
    return await getAtividadesProf(reg);
  }
  async function carregaAtividadesArquivadas(reg: string) {
    return await getAtividadesArquivadas(reg);
  }

  var reg = localStorage.getItem("registro");
  const cargo = localStorage.getItem("cargo");
  useEffect(() => {
    if (reg != null) {
      var resp;
      if (cargo === "3") {
        resp = getAllTurmas();
        resp.then((dado: any) => {
          setTurmas(dado.data);
        });
      } else {
        //recebido = true
        resp = carregaTurmas(reg);
        resp.then((dado: any) => {
          setTurmas(dado.data);
        });
      }
      resp = carregaAtividades(reg);
      resp.then((dado: any) => {
        setAtividades(dado.data);
      });
      resp = carregaAtividadesArquivadas(reg);
      resp.then((dado: any) => {
        setAtividadesArquivadas(dado.data);
      });
    }
  }, []);
  if (turmaFilter === 0) {
    atividadesFilter = atividades;
  } else if (turmaFilter === -1) {
    atividadesFilter = atividadesArquivadas;
  } else {
    atividadesFilter = atividades.filter(
      (atividade: any) => atividade.IDturma === turmaFilter
    );
  }

  const mostraPostagens = () => {
    if (atividadesFilter) {
      return atividadesFilter.map((atividade: any) => (
        <Atividade
          onClick={() => {
            localStorage.setItem("atividade", atividade.IDpostagem);
            navigate("/Atividade");
          }}
          atividade={atividade}
        />
      ));
    }
  };

  const titulo = () => {
    if (turmaFilter === 0) {
        return(
            <>Atividades ativas</>
        )
      } else if (turmaFilter === -1) {
        return(
            <>Atividades arquivadas</>
        )
      } else {
        return(
            <>Atividades de turma</>
        )
      }
  };
  return (
    <>
      <Nav>
        <BotaoTurma onClick={showSidebar}>
          <img src="bars-solid.jpg" width="90%" height="20%" alt="" />
        </BotaoTurma>
        <ListaFuncionalidades cargo={cargo} />
        {sidebar && (
          <Sidebar
            active={setSidebar}
            turmas={turmas}
            filtro={setTurmaFilter}
            tipo={1}
          />
        )}
      </Nav>
      <h3>{titulo()}</h3>
      <Grid>{mostraPostagens()}</Grid>
    </>
  );
}
