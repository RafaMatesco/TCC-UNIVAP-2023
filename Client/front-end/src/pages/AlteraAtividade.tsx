import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Dropzone from 'react-dropzone'

import { getTurmasFromProf } from "../servico/turmas";
import {postArquivo} from "../servico/arquivos"
import {getAtividade ,putAtividade } from "../servico/atividades"

import DropContainer from "../components/DropContainer/DropContainer"
import Nav from "../components/Nav/Nav";
import Button from "../components/Button/Button";
import Titulo from "../components/Titulo/Titulo";
import FileList from "../components/FileList/FileList";
import InputType from "../components/InputType/InputType";


const InputContaineric1 = styled.div`
  height: 50px;
  position: relative;
  width: 100%;
  margin-top: 40px;
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
const ContainerForm = styled.div`
    background-color: rgb(62, 62, 179);
    margin: 2%;
    padding: 30px;
    border-radius: 15px;
    color: white;
`
const Content = styled.div`
    margin: 20px;
`
const GridBotoes = styled.div`
    margin-top: 100px;
    display: grid;
    grid-template-areas: 
    "turma dataPostagem dataVencimento";
    .turma{
        grid-area: turma;
    }
    .dataPostagem{
       grid-area : dataPostagem;
    }
    .dataVencimento{
        grid-area: dataVencimento;
    }
    select{
        font-size: 20px;
    }
`
const DropMessage = styled.p`
    display: flex;
    justify-content: center;
    padding: 15px 0;

`
export default function FormPost(){
    const [turmas,setTurmas] = useState([])
    const [body, setBody] = useState({IDpostagem:0, tipoPostagem:0, titulo:"", texto:"",IDTurma:0,dataPostagem:"", dataVencimento:"",arquivo:"" })
    const [arquivo, setArquivo] = useState([])
    const [arquivoEscolido, setArquivoEscolido] = useState(false);
    const navigate = useNavigate()

    //setTipoPost({...tipoPost, tipoPost:"Ensino medio", id:1})
    
    const limpaArquivos = ()=>{
        setArquivoEscolido(false)
        setArquivo([])
    }
    const mostraArquivo = ()=>{
        if(arquivoEscolido){
            return <FileList file={arquivo[0]} limpaArquivos={limpaArquivos}></FileList>
        }
        return ""
    }
    const renderDragMessage = (isDragActive:boolean)=>{
        if(!isDragActive){
            return <DropMessage>Arraste um Arquivo aqui</DropMessage>
        }
        return <DropMessage>Solte o Arquivo aqui</DropMessage>
    }
    async function carregaTurmas(reg:string){
        return await getTurmasFromProf(reg)
    }
    async function enviaAtividade(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const nomeArquivo = await postArquivo(arquivo[0])
        console.log(nomeArquivo)
        if (reg != null){
            const dadosAtividade = {
                IDpostagem: body.IDpostagem,
                tipoPostagem: body.tipoPostagem,
                titulo:body.titulo,
                texto:body.texto,
                IDTurma:body.IDTurma,
                dataPostagem:body.dataPostagem,
                dataVencimento:body.dataVencimento,
                arquivo:nomeArquivo,
                registro:parseInt(reg)
            }
            putAtividade(dadosAtividade)
            navigate("/pageProf")
            
        }


    }

    
    var reg = localStorage.getItem("registro")
    useEffect(()=>{
        if (reg != null) {
            //recebido = true        
            var resp = carregaTurmas(reg)
            resp.then((dado:any)=>{
                setTurmas(dado.data)
            })           
        }

    },[])
    return(
        <>
            <Nav>
                <ul>
                    <li> <Link to={'/perfil'}>Perfil</Link> </li>
                    <li> <Link to={'/PageProf'}>Home</Link></li>
                </ul>
               
            </Nav>
            <ContainerForm>
                <form action="" method="post" onSubmit={enviaAtividade}>
                    <Titulo>Nova Atividade</Titulo>
                    <Content>
                        <InputContaineric1> 
                            <InputType 
                            id="nome" 
                            type="text"
                            placeholder=" " 
                            required
                            onChange={(event)=> setBody({...body, IDpostagem: parseInt(event.target.value)})}
                            />
                            <Placeholder htmlFor="nome" className="placeholder">ID postagem</Placeholder>
                        </InputContaineric1>
                        <InputContaineric1> 
                            <InputType 
                            id="nome" 
                            type="text"
                            placeholder=" " 
                            required
                            onChange={(event)=> setBody({...body, titulo: event.target.value})}
                            />
                            <Placeholder htmlFor="nome" className="placeholder">Titulo</Placeholder>
                        </InputContaineric1>
                    </Content>
                    <Content>
                        <InputContaineric1> 
                            <TextArea
                            cols={110} 
                            rows={10}
                            onChange={(event)=> setBody({...body, texto: event.target.value})}
                            required/> 
                            <Placeholder htmlFor="texto" className="placeholder">texto</Placeholder>
                        </InputContaineric1><br />
                    </Content>
                    <GridBotoes>
                        <Content className="turma">
                            <label >Turma: </label>
                            <select name="turma"
                                id="turma"   
                                onChange={(event)=> setBody({...body, IDTurma: parseInt(event.target.value)})}
                                required>
                                <option>Selecione uma</option>
                                {turmas.map((turma:any)=>(
                                <option value={turma.IDturma}>{turma.nomeTurma}</option> 
                                ))}
                            </select><br />
                            <label >Tipo: </label>
                            <select name="tipoPost"
                                id="tipoPost"   
                                onChange={(event)=> setBody({...body, tipoPostagem: parseInt(event.target.value)})}
                                required>
                                <option>Selecione um</option>
                                <option value={1}>Ensino Tecnico</option>
                                <option value={2}>Ensino Medio</option>
                                <option value={3}>Avisos</option>
                            </select>
                        </Content>
                        <Content className="dataPostagem">
                            <label>Data da postagem</label>
                            <InputType
                            type="date"
                            onChange={(event)=> setBody({...body, dataPostagem: event.target.value})}
                            required/>
                            
                        </Content>
                        <Content className="dataVencimento">
                            <label>Data de vencimento</label>
                            <InputType
                            type="date"
                            onChange={(event)=> setBody({...body, dataVencimento: event.target.value})}
                            />
                        </Content>
                    </GridBotoes>

                    <Content>
                        <Dropzone onDropAccepted={(files:any)=>{
                            setArquivo(files)
                            setArquivoEscolido(true)
                        }}>
                            {
                                ({getRootProps, getInputProps, isDragActive, isDragReject})=>(
                                    <DropContainer
                                    {...getRootProps()}
                                    isDragActive={isDragActive}>
                                        <input {...getInputProps()}/>
                                        {renderDragMessage(isDragActive)}
                                    </DropContainer>
                                )
                            }
                        </Dropzone>
                        {mostraArquivo()}
 
                        
                    </Content>
                    <Button type="submit">Publicar</Button>
                </form>
            </ContainerForm>
        </>
        
    )
}