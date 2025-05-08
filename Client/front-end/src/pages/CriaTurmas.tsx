import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button/Button";
import InputType from "../components/InputType/InputType";
import ListaFuncionalidades from "../components/ListaFuncionalidades/ListaFuncionalidades";
import Nav from "../components/Nav/Nav";
import Sidebar from "../components/Sidebar/SidebarProf";
import Titulo from "../components/Titulo/Titulo";
import { deleteTurma, getAllTurmas, postTurma, putTurma } from "../servico/turmas";

const ContainerForm = styled.div`
    background-color: #84b6f4;
    margin: 2%;
    padding: 30px;
    border-radius: 15px;
    color: black;
    .titulo{
        text-align: center;
    }
`
const InputContaineric1 = styled.div`
  height: 50px;
  position: relative;
  width: 100%;
  margin-top: 40px;
  
`;
const Content = styled.div`
    margin: 20px;
`
const TextArea = styled.textarea`
    background-color: #19243b; 
   color: rgb(255, 255, 255);
   width: 100%;   
   margin: 8px 0;  
   padding: 12px 20px;   
   display: inline-block; 
   box-sizing: border-box;
   border-radius: 10px;
`
const Placeholder = styled.label`
  color: #65657b;
  font-size: 20px;
  left: 20px;
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
`
const BotaoTurma = styled.p`
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
const GridContainer = styled.div`
    margin: 80px;
`
const GridBotoes = styled.div`
    display: grid;
    grid-template-areas:
    "alterar excluir";

    
    .alterar{
        margin: 20px;
        grid-area: alterar;
    }
    .excluir{
        margin: 20px;
        grid-area: excluir;
    }
`



export default function CriaTurmas(){
    const cargo= localStorage.getItem("cargo")
    const [turmas, setTurmas] = useState([])
    const [turmaSelecionada, setTurmaSelecionada] = useState(0)
    const [botao, setBotao] = useState(0)
    const [body, setBody] = useState({
        "IDturma": 0,
        "turma": ""
      })
    const [sidebar, setSidebar] = useState(false)
    let resp: any
    useEffect(()=>{
        var resp =  getAllTurmas()
        resp.then((dado:any)=>{
            setTurmas(dado.data)
        })
    },[])
    const botoes = ()=>{
        if(turmaSelecionada!==0){
            return(
                <GridBotoes>
                    <Button type="submit" className="alterar" onClick={()=>{setBotao(2)}} >alterar</Button>
                    <Button type="submit" className="excluir" onClick={()=>{setBotao(3)}} >excluir</Button>
                </GridBotoes>
            )
        }
        return(<Button type="submit" onClick={()=>{setBotao(1)}}>Cadastrar turma</Button>)
        
    }
    const testaIDvalido = ()=>{
        if(body.IDturma!==0){
            return body.IDturma
        }
        return ''
    }
    const alteraID = (event:React.ChangeEvent<HTMLInputElement>)=>{
        if(turmaSelecionada===0){
            setBody({...body, IDturma: Number(event.target.value)})
        }

    }
    const submit = async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
            if(botao ===1){
                try{
                    resp = await postTurma(body)
                }catch(error: any)
                {
                    console.log(error)
                }
                if(resp === 409){
                    alert("ID ja cadastrado")
                }else{
                    alert("turma cadastrada com suceso")
                }
            }else if(botao ===2){
                try{
                    resp = await putTurma(body)
                }catch(error: any)
                {
                    console.log(error)
                }
                alert("turma atualizada com suceso")
            }else{
                const confirmacao = window.confirm("deseja excluir essa turma?")
                if(confirmacao){
                    try{
                        resp = await deleteTurma(body.IDturma)
                    }catch(error: any)
                    {
    
                    }
                    if(resp ===409){
                        alert("turma relacionada a um professor. Exclua primeiro a relação")
                    }else{
                        alert("turma excluida com suceso")
                    }    
                }
            }
            window.location.reload()
      }
      const secaoCriaTurma = ()=>{
        return(
            <ContainerForm>
            <form onSubmit={async(event)=>{submit(event)}}>
                <Titulo className="titulo">Turma</Titulo>
                <GridContainer>
                    <Content className="turma">
                        <InputContaineric1> 
                        <label htmlFor="turma" className="placeholder">Nome da turma</label>
                            <InputType 
                                id="turma" 
                                type="text"
                                placeholder=" " 
                                value={body.turma}
                                required
                                onChange={(event)=> setBody({...body, turma: event.target.value})}
                                />
                                
                        </InputContaineric1>
                    </Content>
                    <Content className="idTurma">
                        <InputContaineric1> 
                        <label htmlFor="id" className="placeholder">ID da turma</label>
                            <InputType 
                                id="id" 
                                type="number"
                                inputMode="numeric" 
                                required
                                value={testaIDvalido()}
                                onChange={(event)=> alteraID(event)}
                                />
                                
                        </InputContaineric1>
                    </Content>
                </GridContainer>
                {botoes()}
            </form>
        </ContainerForm>
        )
        
    }
    const selecionaTurma = (IDturma: number, turma: string)=>{
        setBody({
            "IDturma": IDturma,
            "turma": turma
          })
        setTurmaSelecionada(IDturma)
    }


    const showSidebar = ()=>setSidebar(!sidebar)
    return (
        <>
            <Nav>
                <BotaoTurma onClick={showSidebar}>Turmas</BotaoTurma>
                <ListaFuncionalidades cargo={cargo}/>
                {sidebar && <Sidebar active = {setSidebar} turmas={turmas} filtro={selecionaTurma} tipo={0}/>}
            </Nav>
            {secaoCriaTurma()}

        </>
    );
}