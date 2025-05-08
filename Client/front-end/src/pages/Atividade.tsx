import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteAtividade, getAtividade, getAtividadesRealizasProf, putAtividade } from "../servico/atividades";

import styled from "styled-components";
import Atividade from "../components/Atividade/AtividadesRetornadas";
import ListaFuncionalidades from "../components/ListaFuncionalidades/ListaFuncionalidades";
import ModalRetorno from "../components/ModalAtividade/ModalRetorno";
import Nav from "../components/Nav/Nav";
import Sidebar from '../components/Sidebar/SidebarAtividades';



const BotaoSidebar = styled.p`
        position:fixed;
        margin-top: 5px;
        margin-left: 30px;
        cursor: pointer;
        color: black;
        transition: opacity 500ms;
        &:hover{
            opacity: 0.4;
        }
`
const Grid = styled.div `
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 10px;
  gap: 4%;

  width: 80%;
  height: 100%;
  //place-items:center;

  h3{
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align:start;
    padding-left: 9%;
  }

  @media screen and (max-width: 800px) {
    display: block;
  }
`





export default function FormPost(){
    const [retornosAtividades, setRetornosAtividades] = useState([])
    const [atividade, setAtividade] = useState([])
    const [sidebar, setSidebar] = useState(false)
    const [postagenSelecionada, setPostagenSelecionada] = useState(null)

    const navigate = useNavigate()
    const cargo = localStorage.getItem("cargo")


    const showSidebar = ()=>setSidebar(!sidebar)
    async function carregaRetorno(IDAtividade:string){
        return await getAtividadesRealizasProf(IDAtividade)
    }
    async function carregaAtividade(IDAtividade:string){
        return await getAtividade(IDAtividade)
    }
    const IDAtividade = localStorage.getItem("atividade")
    useEffect(()=>{
        if (IDAtividade != null) {
            var resp = carregaAtividade(IDAtividade)
            resp.then((dado:any)=>{
                setAtividade(dado.data)
            })

            resp = carregaRetorno(IDAtividade)
            resp.then((dado:any)=>{
                setRetornosAtividades(dado.data)
            })

        }
        
    },[])
    const exclui = async()=>{
        
        const resp = window.confirm("deseja excluir essa atividade ?")
        if(IDAtividade!=null&& resp){
            console.log("entrou")
            await deleteAtividade(parseInt(IDAtividade))
            navigate("/pageProf")
        }

    }
    
    const alterar = async()=>{
        navigate('/alteraAtividade')
    }
    
    const arquivar = async()=>{
        const resp = window.confirm("deseja arquivar/desarquivar essa atividade ?")
        
        if( resp){
            const body: any =atividade[0]
            if(body.arquivada ===0)
            {
                body.arquivada = 1
            }else{
                body.arquivada = 0
            }
            
            await putAtividade(body)
            navigate("/pageProf")
        }
    }
    const testaArquivaOuDesarquiva = ()=>{


    }
    const buttons = [{text:"Arquivar",func:arquivar},{text:"Alterar",func:alterar},{text:"Excluir",func:exclui}]

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
    const mostraAtividade = ()=>{
        if(Array.isArray(retornosAtividades)){
            return(
                retornosAtividades.map((atividade:any)=>(
                <Atividade onClick={()=>{setModal(atividade)}} atividade={atividade}></Atividade>
                ))
            )
        }else{
            return(<label>Não há retornos</label>)
        }
        
    }

    

    return(
        <>
            <Nav>
                <BotaoSidebar onClick={showSidebar}>Ações</BotaoSidebar>
                <ListaFuncionalidades cargo={cargo}/>
                {sidebar && <Sidebar active = {setSidebar} buttons={buttons}/>}
            </Nav>

            <Grid>
                    <h3><div>Devoluções</div> <div> Nenhuma devolução selecionada</div></h3>
                    {mostraAtividade()}
            </Grid>
            
            <ModalRetorno isOpen={testaModalOpen()} close={closeModal} retorno={postagenSelecionada}/>
            
              
        </>
        
    )
}