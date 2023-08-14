import styled from "styled-components";
import ListaFuncionalidades from "../components/ListaFuncionalidades/ListaFuncionalidades";
import Nav from "../components/Nav/Nav";
import Titulo from "../components/Titulo/Titulo";
import { useEffect, useState } from "react";
import InputType from "../components/InputType/InputType";
import Button from "../components/Button/Button";
import { getAllTurmas } from "../servico/turmas";
import { postAluno, getAllAlunos } from "../servico/aluno";

const ContainerForm = styled.div`
    background-color: #3d3d3d;
    margin-left: 20px;
    width: 80%;
    margin: 2%;
    padding: 30px;
    border-radius: 15px;
    color: white;
    .titulo{
        text-align: center;
    }
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
   font-size: 20px;
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
`;


const InputContaineric1 = styled.div`
  height: 50px;
  position: relative;
  width: 100%;
  margin-top: 40px;
`;
const GridContainer = styled.div`
    display: grid;
    grid-template-areas: 
    "alunos form";
    .alunos{
        grid-area: alunos;
    }
    .form{
       grid-area : form;
    }
`

const Content = styled.div`
    margin-right: 20px;
    select{
        font-size: 18px;
        height: 40px;
    }
`




export default function Alunos(){
    const cargo = localStorage.getItem('cargo')
    const [body, setBody] = useState({ matricula: 0, nome: "", email: "", senha: "", IDturma: 0})
    const [turmas, setTurmas ] = useState([])
    const [alunos, setAlunos] = useState([])
    const [matricula, setMatricula] = useState("")
    
    const carregarTurmas = async()=>{
        return await getAllTurmas()
    }
    const carregarAlunos =async () => {
        return await getAllAlunos()
    }
    useEffect(()=>{
        var resp
        if(cargo ==="3"){
            resp =  carregarTurmas()
            resp.then((dado:any)=>{
                setTurmas(dado.data)
            })
            resp =  carregarAlunos()
            resp.then((dado:any)=>{
                setAlunos(dado.data)
            })
        }
    },[])
    const submit = async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        if(body.IDturma !==0 && body.matricula!==0){
            await postAluno(body)
            alert("aluno cadastrado com suceso")
            //window.location.reload()
        }else{
            alert("teste")
        }
    }
    const secaoForm = ()=>{
   
        return(
            <form onSubmit={async(event)=>{submit(event)}}>
                    <Titulo className="titulo">Criar Aluno</Titulo>
                    <GridContainer>
                        <Content>
                            <InputContaineric1> 
                                <InputType 
                                id="nome" 
                                type="number"
                                placeholder=" " 
                                required
                                onChange={(event)=> setBody({...body, matricula: Number(event.target.value)})}
                                />
                                <Placeholder htmlFor="nome" className="placeholder">Matricula</Placeholder>
                            </InputContaineric1>
                        </Content>
                        <Content>
                            <InputContaineric1> 
                                <InputType 
                                id="nome" 
                                type="text"
                                placeholder=" " 
                                required
                                onChange={(event)=> setBody({...body, nome: event.target.value})}
                                />
                                <Placeholder htmlFor="nome" className="placeholder">Nome</Placeholder>
                            </InputContaineric1>
                        </Content>
                        <Content>
                            <InputContaineric1> 
                                <InputType 
                                id="nome" 
                                type="text"
                                placeholder=" " 
                                required
                                onChange={(event)=> setBody({...body, email: event.target.value})}
                                />
                                <Placeholder htmlFor="nome" className="placeholder">email</Placeholder>
                            </InputContaineric1>
                        </Content>
                        <Content>
                            <InputContaineric1> 
                                <InputType 
                                id="nome" 
                                type="text"
                                placeholder=" " 
                                required
                                onChange={(event)=> setBody({...body, senha: event.target.value})}
                                />
                                <Placeholder htmlFor="nome" className="placeholder">Senha</Placeholder>
                            </InputContaineric1>
                        </Content>
                        <Content className="turma">
                            <label>Turma:</label>
                            <select 
                                id="turma" 
                                required
                                onChange={(event)=> setBody({...body, IDturma: Number(event.target.value)})}>
                                    <option value={0}>Selecione uma</option>
                                    {turmas.map((turma:any)=>(
                                    <option value={turma.IDturma}>{turma.nomeTurma}</option> ))}
                            </select>

                        </Content>
                    </GridContainer>
                    <Button type="submit">Cadastrar aluno</Button>
                </form>
        )
    }


    const secaoAlun0 = ()=>{
        
        return(
            <Content>
            <InputContaineric1> 
                <InputType 
                id="matricula" 
                type="text"
                placeholder=" " 
                required
                onChange={(event)=> setMatricula( event.target.value)}
                />
                <Placeholder htmlFor="nome" className="placeholder">email</Placeholder>
            </InputContaineric1>
        </Content>
        )
    }
    return(
        <>
            <Nav>
                <ListaFuncionalidades cargo={cargo}/>
            </Nav>
            <GridContainer>

                <ContainerForm className="form">
                    {secaoForm()}
                </ContainerForm>
            </GridContainer>
        </>
    )
}