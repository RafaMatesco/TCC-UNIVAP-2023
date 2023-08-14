import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import styled from "styled-components";

import A from "../components/A/A"
import { getTurmaAluno } from "../servico/turmas";
import {getAtividadesAluno, getAtividadesRealizasAluno} from "../servico/atividades"
import Nav from "../components/Nav/Nav";
import Atividade from "../components/Atividade/Atividade";
import Sidebar from "../components/Sidebar/SideBarAluno";
import ModalAtividade from "../components/ModalAtividade/ModalAtividade";
import { FaTimes } from "react-icons/fa";
import AtividadeAluno from "../components/Atividade/AtividadeAluno";

const BotaoFiltro = styled.p`
        position:fixed;
        cursor: pointer;
        color: white;
        &:hover{
            opacity: 0.4;
        }
`
const MyContainer = styled.div `
  display: grid;
  width: 80%;
  height: 100%;

  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 10px;   
    
  margin-top: 30px;

  justify-items: center;
  align-items: center;
  @media screen and (max-width: 800px){
    display:block;
  }
`

const tipoPostagem = [{tipoAtiv:"Todos", idfiltro:0},{tipoAtiv:"Ensino Tecnico", idfiltro:1},{tipoAtiv:"Ensino Medio", idfiltro:2},{tipoAtiv:"Avisos", idfiltro:3} ]

export default function PageAluno(){
    var reg = localStorage.getItem("registro")
    const [postagenSelecionada, setPostagenSelecionada] = useState(null)
    const [postagens, setPostagens] = useState([])
    const [postagensRealizadas, setPostagensRealizadas] = useState([])
    const [postagensFilter, setPostagensFilter] = useState(0)
    const [sidebar, setSidebar] = useState(false)

    async function carregaTurma(reg:string){
        return await getTurmaAluno(reg)
    }
    async function carregaAtividades(IDturma: number){
        return await getAtividadesAluno(IDturma)
    }
    async function carregaAtividadesRealizadas(reg: string){
        return await getAtividadesRealizasAluno(reg)
    }

    useEffect(  ()  => {
        if (reg != null) {
            //recebido = true    
            var resp =  carregaTurma(reg)
            resp.then((dado:any)=>{
                var resp2 = carregaAtividades(dado.data[0].IDturma)
                resp2.then((dado2:any)=>{
                    setPostagens(dado2.data)          
                })
            })
            resp = carregaAtividadesRealizadas(reg)
            resp.then((dado)=>{
                setPostagensRealizadas(dado.data)
            })
        }
    },[])

    let postagemFilter: never[];

    
   
    const showSidebar = ()=>setSidebar(!sidebar)
    if(postagensFilter === 0){
        postagemFilter = postagens
    }else if(postagensFilter===-1){
        postagemFilter = postagensRealizadas
    }else{
        postagemFilter = postagens.filter((atividade: any)=>(atividade.tipoPostagem === postagensFilter))
    }
    const setModal = (atividade:any)=>{
        setPostagenSelecionada(atividade)
    }
    const closeModal = ()=>{
        setPostagenSelecionada(null)
    }
    const testaModalOpen= ()=>{
        if(postagenSelecionada != null){
            return true
        }
        return false
    }
    const mostraPostagens = ()=>{
        if(postagemFilter){
            return(
                postagemFilter.map((atividade:any)=>(
                    <AtividadeAluno onClick={()=>{setModal(atividade)}} atividade={atividade}/>
                ))
            )
        }
    }
    return (
        <> 

            <Nav>
                <BotaoFiltro onClick={showSidebar}><img src="bars-solid.jpg" width="60vw" height="60vh" alt="" /></BotaoFiltro>
                <ul>
                    <li> <Link to={'/perfilAluno'}>Perfil</Link> </li>
                    <li><Link to={"/"}>Sair</Link></li>
                </ul>
                {sidebar && <Sidebar active = {setSidebar} tiposAtividades={tipoPostagem} filtro={setPostagensFilter}/>}
            </Nav>

            <MyContainer>
            {
                mostraPostagens()
            }
            </MyContainer>
            
                <ModalAtividade isOpen={testaModalOpen()} close={closeModal} postagen={postagenSelecionada}/>
            
        </>
    );
}