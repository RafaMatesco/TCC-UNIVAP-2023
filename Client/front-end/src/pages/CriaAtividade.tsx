import { useEffect, useState } from "react";
import styled from "styled-components";
import InputType from "../components/InputType/InputType";
import Nav from "../components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import { getTurmasFromProf, getAllTurmas } from "../servico/turmas";
import Button from "../components/Button/Button";
import Titulo from "../components/Titulo/Titulo";
import Dropzone from 'react-dropzone'
import DropContainer from "../components/DropContainer/DropContainer"
import FileList from "../components/FileList/FileList";
import {postArquivo} from "../servico/arquivos"
import {postAtividade} from "../servico/atividades"
import ListaFuncionalidades from "../components/ListaFuncionalidades/ListaFuncionalidades";
import Placeholder from "../components/Placeholder/Placeholder";
import TextArea from "../components/TextArea/TextArea";


const InputContaineric1 = styled.div`
  height: 50px;
  position: relative;
  width: 100%;
  margin-top: 40px;
`;

const ContainerForm = styled.div`
    background-color: #3d3d3d;
    margin: 1%;
    padding: 30px;
    border-radius: 15px;
    color: white;
`
const Content = styled.div`
    margin: 20px;
`
const GridBotoes = styled.div`
    margin-top: 4%;
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
    const [body, setBody] = useState({titulo:"", texto:"",IDTurma:0,dataPostagem:"", dataVencimento:"",arquivo:"", tipoPostagem:0,arquivada:false  })
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
        if(localStorage.getItem("cargo") ==="3" ){
            return await getAllTurmas()
        }
        return await getTurmasFromProf(reg)
    }
    async function enviaAtividade(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let nomeArquivo
        try{
            nomeArquivo = await postArquivo(arquivo[0])
        }catch{
        }
        
        
        if (reg != null){
            const dadosAtividade = {
                tipoPostagem: body.tipoPostagem,
                titulo:body.titulo,
                texto:body.texto,
                IDTurma:body.IDTurma,
                dataPostagem:body.dataPostagem,
                dataVencimento:body.dataVencimento,
                arquivada:body.arquivada,
                arquivo:nomeArquivo,
                registro:parseInt(reg)
            }
            postAtividade(dadosAtividade)
            navigate("/pageProf")
            
        }


    }

    
    const reg = localStorage.getItem("registro")
    
    const cargo = localStorage.getItem("cargo")
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
                <ListaFuncionalidades cargo={cargo}/>
               
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
                            onChange={(event)=> setBody({...body, titulo: event.target.value})}
                            />
                            <Placeholder htmlFor="nome" className="placeholder">Título</Placeholder>
                        </InputContaineric1>
                    </Content>
                    <Content>
                        <InputContaineric1> 
                            <TextArea
                            cols={80} 
                            rows={5}
                            onChange={(event)=> setBody({...body, texto: event.target.value})}
                            required/> 
                            <Placeholder htmlFor="texto" className="placeholder">Descrição</Placeholder>
                        </InputContaineric1>
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
                    <GridBotoes>
                        
                        <Button type="submit" onClick={()=>{setBody({...body, arquivada: true})}} className="turma">Arquivar</Button>

                        <Button type="submit" onClick={()=>{setBody({...body, arquivada: false})}} className="dataVencimento">Publicar</Button>

                    </GridBotoes>
                    
                </form>
            </ContainerForm>
        </>
        
    )
}