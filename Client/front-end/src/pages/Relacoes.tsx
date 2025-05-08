import { useState, useEffect } from "react";
import ListaFuncionalidades from "../components/ListaFuncionalidades/ListaFuncionalidades";
import Nav from "../components/Nav/Nav";
import{getEquipeEducacional} from "../servico/equipeEducacional"
import {getRelacoes, getAllTurmas, postRelacao, deleteRelacao} from"../servico/turmas"
import Sidebar from "../components/Sidebar/SidebarAdm";
import styled from "styled-components";
import Titulo from "../components/Titulo/Titulo";
import Relacao from "../components/Relacao/Relacao";
import Button from "../components/Button/Button";

const ContainerForm = styled.div`
    background-color: #84b6f4;
    margin-left: 20px;
    width: 80%;
    margin: 2%;
    padding: 30px;
    border-radius: 15px;
    color: black;
    .titulo{
        text-align: center;
    }
`

const Content = styled.div`
    margin-right: 20px;
    select{
        font-size: 18px;
        height: 40px;
    }
`
const BotaoEquipe = styled.p`
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

const ContainerPage = styled.div `
  width: 100%;
  height: 100%;
  
  display: grid;
  grid-template-areas: "relacoes form";
  grid-gap: 25px;   
    
  margin-top: 30px;


  @media screen and (max-width: 800px){
    display:block;
  }
  .relacoes{
    grid-area: relacoes;
  }
  .form{
    grid-area: form;
  }
`


const GridContainer = styled.div`
    display: grid;
    grid-template-areas: 
    "prof turma";
    .prof{
        grid-area: prof;
    }
    .turma{
       grid-area : turma;
    }
`

const Select = styled.select`
    background-color:white;
    color:black;
    border-radius: 5px;
    
    option{
        font-size: 15pt;
    }
`

export default function Relacoes(){
    const cargo = localStorage.getItem('cargo')
    const [equipeEducacional, setEquipeEducacional] = useState([])
    const [body, setBody]= useState({"registro":0, "IDturma":0})
    const [turmas, setTurmas] = useState([])
    const [relacoes ,setRelacoes] = useState([])
    const [filtroRelacoes, setFiltroRelacoes] = useState(0)
    const [delSelect, setDelSelect] = useState(0)
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = ()=>setSidebar(!sidebar)

    const carregarEquipe = async()=>{
        return await getEquipeEducacional()
    }
    const carregarRelacoes = async()=>{
        return await getRelacoes()
    }
    const carregarTurmas = async()=>{
        return await getAllTurmas()
    }
    useEffect(()=>{
        var resp: any = carregarEquipe()
        resp.then((dado:any)=>{
            setEquipeEducacional( dado.data.filter((professor: any)=>(professor.IDcargo !== 3))) 
        })
        resp = carregarRelacoes()
        resp.then((dado:any)=>{
            setRelacoes(dado.data)
        })   
        resp = carregarTurmas()
        resp.then((dado:any)=>{
            setTurmas(dado.data)
        })   

    },[])
    const selecionaProf = (ID:number)=>{
        setFiltroRelacoes(ID)
    }


    let relacoesFilter: never[]

    if(filtroRelacoes === 0){
        relacoesFilter = relacoes
    }else{
        relacoesFilter = relacoes.filter((relacao: any)=>(relacao.registro === filtroRelacoes))
    }
    const submitDel = async()=>{
        const confirmacao = window.confirm("deseja excluir essa turma?")
        if(confirmacao){
            await deleteRelacao(delSelect)
            alert("relação excluida com suceso")
        }
    }
    const selecionaDel = async(ID: number)=>{
        setDelSelect(ID)
    }

    const secaoRelacoes = ()=>{
        if(relacoesFilter){
            return(
                <>  
                <form onSubmit={()=>{submitDel()}}>
                    {relacoesFilter.map((relacao:any)=>(
                        <Relacao relacao={relacao} selecionaDelete={selecionaDel}/>
                    ))}
                </form>

                </>

            )
        }

    }
    const submit = async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        if(body.IDturma !==0 && body.registro!==0){
            await postRelacao(body)
            alert("relação cadastrada com suceso")
            window.location.reload()
        }else{
            alert("selecione uma turma e um professor")
        }
      }
    const secoaForm = ()=>
    {
        return(
            <ContainerForm>
            <form onSubmit={async(event)=>{submit(event)}}>
                <Titulo className="titulo">Criar Relação</Titulo>
                <GridContainer>
                    <Content className="prof">
                        <label>Professor: </label>
                        <Select 
                            id="turma" 
                            required
                            onChange={(event)=> setBody({...body, registro: Number(event.target.value)})}>
                                <option value={0}>Selecione um</option>
                                {equipeEducacional.map((professor:any)=>(
                                <option value={professor.registro}>{professor.nome}</option> ))}
                        </Select>

                    </Content>
                    <Content className="turma">
                        <label>Turma: </label>
                        <Select 
                            id="turma" 
                            required
                            onChange={(event)=> setBody({...body, IDturma: Number(event.target.value)})}>
                                <option value={0}>Selecione uma</option>
                                {turmas.map((turma:any)=>(
                                <option value={turma.IDturma}>{turma.nomeTurma}</option> ))}
                        </Select>

                    </Content>
                </GridContainer>
                <Button type="submit">Cadastrar Relação</Button>
            </form>
        </ContainerForm>
        )
    }
    
    return(
        <> 
            <Nav>
                <BotaoEquipe onClick={showSidebar}>Equipe</BotaoEquipe>
                <ListaFuncionalidades cargo={cargo}/>
                {sidebar && <Sidebar active = {setSidebar} equipeEducacional={equipeEducacional} filtro={selecionaProf}/>}
            </Nav>
            <ContainerPage>
                <div className="relacoes">
                    {secaoRelacoes()}
                </div>
                <div className="from">
                    {secoaForm()}
                </div>
               
            </ContainerPage>

        </>
    )
}