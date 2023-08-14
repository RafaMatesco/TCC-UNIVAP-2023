import { useEffect, useState } from "react"
import styled from "styled-components"

import { getTurmasFromProf, getAllTurmas } from "../servico/turmas"
import { getAtividadesProf, getAtividadesArquivadas } from "../servico/atividades"

import Sidebar from '../components/Sidebar/SidebarProf'
import Atividade from "../components/Atividade/Atividade"
import Nav from "../components/Nav/Nav"
import ListaFuncionalidades from "../components/ListaFuncionalidades/ListaFuncionalidades"


const BotaoTurma = styled.p`
        position:fixed;
        margin-top: 5px;
        margin-left: 30px;
        cursor: pointer;
        color: white;
        transition: opacity 500ms;
        &:hover{
            opacity: 0.4;
        }
`


const Grid = styled.div `
  display: grid;
  width: 95vw;
  height: 100%;

  //background-color: grey;

  grid-template-columns: 1fr 1fr; 
  grid-template-rows: auto;
  gap: 30px; 
    
  margin-top: 10px;

  justify-items: center;
  align-items: center;
  @media screen and (max-width: 800px){
    display:block;
  }
`

export default function PageProf(){
    const [turmas, setTurmas] = useState([])
    const [turmaFilter, setTurmaFilter] = useState(0)
    const [atividades, setAtividades] = useState([])
    const [sidebar, setSidebar] = useState(false)
    const [atividadesArquivadas, setAtividadesArquivadas ] = useState([])

    let atividadesFilter: never[]

    const showSidebar = ()=>setSidebar(!sidebar)


    async function carregaTurmas(reg:string){
        return await getTurmasFromProf(reg)
    }
    async function carregaAtividades(reg:string){
        return await getAtividadesProf(reg)
    }
    async function carregaAtividadesArquivadas(reg:string){
        return await getAtividadesArquivadas(reg)
    }

    var reg = localStorage.getItem("registro")
    const cargo = localStorage.getItem("cargo")
    useEffect(()=>{
        if (reg != null) {
            var resp
            if(cargo ==="3"){
                resp =  getAllTurmas()
                resp.then((dado:any)=>{
                    setTurmas(dado.data)
                })
            }else{
            
                    //recebido = true        
                    resp = carregaTurmas(reg)
                    resp.then((dado:any)=>{
                        setTurmas(dado.data)
                    })
    
                    
            
            }
            resp = carregaAtividades(reg)
            resp.then((dado:any)=>{
                setAtividades(dado.data)                
            })
            resp = carregaAtividadesArquivadas(reg)
            resp.then((dado:any)=>{
                setAtividadesArquivadas(dado.data)                
            })
        }

    },[])

    if(turmaFilter === 0){
        atividadesFilter = atividades
    }else if(turmaFilter ===-1){
        atividadesFilter = atividadesArquivadas
    }else{
        atividadesFilter = atividades.filter((atividade: any)=>(atividade.IDturma === turmaFilter))
    }
    
    const mostraPostagens = ()=>{
        if(atividadesFilter){
            return(
                atividadesFilter.map((atividade:any)=>(
                    <Atividade onClick={()=>{}} atividade={atividade}/>
                ))
            )
        }

    }
    return (
        <> 
            <Nav>
                <BotaoTurma onClick={showSidebar}><img src="bars-solid.jpg" width="60vw" height="60vh" alt="" /></BotaoTurma>
                <ListaFuncionalidades cargo={cargo}/>
                {sidebar && <Sidebar active = {setSidebar} turmas={turmas} filtro={setTurmaFilter} tipo={1}/>}
            </Nav>
                <Grid>{
                        mostraPostagens()
                }</Grid>
        </>
       
    );
}