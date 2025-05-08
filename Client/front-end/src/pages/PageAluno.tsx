import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import AtividadeAluno from "../components/Atividade/AtividadeAluno";
import ModalAtividade from "../components/ModalAtividade/ModalAtividade";
import Nav from "../components/Nav/Nav";
import Sidebar from "../components/Sidebar/SideBarAluno";
import {
  getAtividadesAluno,
  getAtividadesRealizasAluno,
  getAtividadesVencidasTurma,
} from "../servico/atividades";
import { getTurmaAluno } from "../servico/turmas";

const BotaoFiltro = styled.div`
  img {
    position: fixed;
    left: 15px;
    top: 10px;
    cursor: pointer;
    color: black;
    transition: opacity 500ms;
    &:hover {
      opacity: 0.4;
    }
    width: 4vw;
  }
`;
const MyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 30px;
  //gap: 3%;

  width: 80%;
  height: 100%;

  //place-items:center;

  @media screen and (max-width: 800px) {
    display: block;
  }
`;

const TextAT = styled.div`
  width: 100%;
  margin-right: 50vw;
  font-size: 25pt;
  text-align: right;
  z-index: 1;
  @media screen and (max-width: 800px) {
    font-size: 0pt;
  }
`;

const tipoPostagem = [
  { tipoAtiv: "Todos", idfiltro: 0 },
  { tipoAtiv: "Ensino Tecnico", idfiltro: 1 },
  { tipoAtiv: "Ensino Medio", idfiltro: 2 },
  { tipoAtiv: "Avisos", idfiltro: 3 },
];

export default function PageAluno() {
  var reg = localStorage.getItem("matricula");
  const [postagenSelecionada, setPostagenSelecionada] = useState(null);
  const [postagens, setPostagens] = useState([]);
  const [postagensRealizadas, setPostagensRealizadas] = useState([]);
  const [postagensFilter, setPostagensFilter] = useState(0);
  const [sidebar, setSidebar] = useState(false);
  const [postagensVencidas, setPostagensVencidas] = useState([]);

  async function carregaTurma(reg: string) {
    return await getTurmaAluno(reg);
  }
  async function carregaAtividades(IDturma: number, matricula: string | null) {
    return await getAtividadesAluno(IDturma, matricula);
  }
  async function carregaAtividadesRealizadas(reg: string) {
    return await getAtividadesRealizasAluno(reg);
  }
  async function carregaAtividadesVencidas(reg: number) {
    return await getAtividadesVencidasTurma(reg);
  }

  useEffect(() => {
    if (reg != null) {
      //recebido = true
      var resp = carregaTurma(reg);
      resp.then((dado: any) => {
        var resp2 = carregaAtividades(dado.data[0].IDturma, reg);
        resp2.then((dado2: any) => {
          setPostagens(dado2.data);
        });
        var resp3 = carregaAtividadesVencidas(dado.data[0].IDturma);
        resp3.then((dado3: any) => {
          setPostagensVencidas(dado3.data);
        });
      });
      resp = carregaAtividadesRealizadas(reg);
      resp.then((dado) => {
        setPostagensRealizadas(dado.data);
      });
    }
  }, []);

  let postagemFilter: never[];
  var ATisSelected = true;

  var p: any = [];
  if (postagensRealizadas) {
    postagensRealizadas.forEach((dev) => {
      postagens.forEach((post, i) => {
        if (post["IDpostagem"] == dev["IDpostagem"]) {
          postagens.splice(i, 1);
        }
      });
    });
  }

  const showSidebar = () => setSidebar(!sidebar);
  if (postagensFilter === 0) {
    postagemFilter = postagens;
  } else if (postagensFilter === -1) {
    postagemFilter = postagensRealizadas;
  } else if (postagensFilter === -2) {
    postagemFilter = postagensVencidas;
  } else {
    postagemFilter = postagens.filter(
      (atividade: any) => atividade.tipoPostagem === postagensFilter
    );
  }
  const setModal = (atividade: any) => {
    setPostagenSelecionada(atividade);
  };
  const closeModal = () => {
    setPostagenSelecionada(null);
  };
  const testaModalOpen = () => {
    if (postagenSelecionada != null) {
      return true;
    }
    return false;
  };

  const mostraPostagens = () => {
    if (postagemFilter) {
      return postagemFilter.map((atividade: any) => (
        <AtividadeAluno
          screen={postagensFilter}
          atividade={atividade}
          onClick={() => {
            setModal(atividade);
            ATisSelected = false;
          }}
        />
      ));
    }
  };
  return (
    <>
      <Nav>
        <BotaoFiltro onClick={showSidebar}>
          <img src="bars-solid.jpg" alt="" />
        </BotaoFiltro>
        <ul>
          <li>
            <Link to={"/perfilAluno"}>Perfil</Link>{" "}
          </li>
          <li>
            <Link to={"/PageAluno"}>Home</Link>
          </li>
          <li>
            <Link
              onClick={(event) => {
                localStorage.clear();
              }}
              to={"/"}
            >
              Sair da conta
            </Link>
          </li>
        </ul>
        {sidebar && (
          <Sidebar
            active={setSidebar}
            tiposAtividades={tipoPostagem}
            filtro={setPostagensFilter}
          />
        )}
      </Nav>

      {ATisSelected && (
        <TextAT style={{ color: "black" }}>
          Nenhuma atividade selecionada
        </TextAT>
      )}

      <MyContainer>{mostraPostagens()}</MyContainer>
      <div>
        <ModalAtividade
          isOpen={testaModalOpen()}
          close={closeModal}
          postagen={postagenSelecionada}
          screen={postagensFilter}
        />
      </div>
    </>
  );
}
