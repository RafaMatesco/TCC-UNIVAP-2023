import { useEffect, useState } from "react";
import Dropzone from 'react-dropzone';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { postArquivo } from "../servico/arquivos";
import { getAtividade, putAtividade } from "../servico/atividades";
import { getAllTurmas, getTurmasFromProf } from "../servico/turmas";

import Button from "../components/Button/Button";
import DropContainer from "../components/DropContainer/DropContainer";
import FileList from "../components/FileList/FileList";
import InputType from "../components/InputType/InputType";
import ListaFuncionalidades from "../components/ListaFuncionalidades/ListaFuncionalidades";
import Nav from "../components/Nav/Nav";
import Placeholder from "../components/Placeholder/Placeholder";
import TextArea from "../components/TextArea/TextArea";
import Titulo from "../components/Titulo/Titulo";


const InputContaineric1 = styled.div`
  height: 50px;
  position: relative;
  width: 100%;
  margin-top: 40px;
`;


const ContainerForm = styled.div`
    background-color: #84b6f4;
    margin: 2%;
    padding: 30px;
    border-radius: 15px;
    color: black;
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
    const [body, setBody] = useState({IDpostagem:0, tipoPostagem:0, titulo:"", texto:"",IDturma:0,dataPostagem:"", dataVencimento:"",caminhoArquivo
    :"",dataPostagemFormatada:"",dataVencimentoFormatada:"",registro:0  })
    const [arquivo, setArquivo] = useState([])
    const [arquivoEscolido, setArquivoEscolido] = useState(false);
    const navigate = useNavigate()
    const cargo = localStorage.getItem("cargo")
    console.log(body)
    
    const limpaArquivos = ()=>{
        setArquivoEscolido(false)
        setArquivo([])
    }
    const mostraArquivo = ()=>{
        if(body.caminhoArquivo!=="undefined"){console.log("entro"); return <FileList file={body.caminhoArquivo.substring(33)} limpaArquivos={limpaArquivos}></FileList>}
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
    async function carregaAtividade(ID:string){
        return await getAtividade(ID)
    }
    async function enviaAtividade(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const arq: any = arquivo[0]
        if(arquivoEscolido ){
            const nomeArquivo = await postArquivo(arquivo[0])
            setBody({...body, caminhoArquivo:nomeArquivo})
        }
        
        putAtividade(body)
        navigate("/pageProf")
            

    }
    const mostraOpitionsTurma = ()=>{
        return(
                
            turmas.map((turma:any)=>{
                if(turma.IDturma!==body.IDturma){

                    return <option value={turma.IDturma}>{turma.nomeTurma}</option>
                }
                return <option value={turma.IDturma} selected>{turma.nomeTurma}</option>
            }))
    }
    
    const mostraOpitionsTipo = ()=>{
        const tipos = [{value:1, text:"Ensino Tecnico"},{value:2, text:"Ensino Medio"},{value:3, text:"Avisos"}]
        return(
                
            tipos.map((tipo:any)=>{
               // console.log(turma.IDturma+ "====> "+ body.IDturma)
                if(tipo.value!==body.tipoPostagem){

                    return <option value={tipo.value}>{tipo.text}</option>
                }
                return <option value={tipo.value} selected>{tipo.text}</option>
            }))
    }
    const reg = localStorage.getItem("registro")
    const IDatividade = localStorage.getItem("atividade")
    useEffect(()=>{
        if (reg !== null && IDatividade !==null) {
            //recebido = true
            var resp = carregaTurmas(reg)
            resp.then((dado:any)=>{
                setTurmas(dado.data)
            })
            resp = carregaAtividade(IDatividade)
            resp.then((dado:any)=>{
                setBody(dado.data[0])

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
                    <Titulo>Alterar tividade</Titulo>
                    <Content>
                        <InputContaineric1>
                            <InputType
                            id="nome"
                            type="text"
                            placeholder=" "
                            required
                            value={body.titulo}
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
                            value={body.texto}
                            required/>
                            <Placeholder htmlFor="texto" className="placeholder">texto</Placeholder>
                        </InputContaineric1><br />
                    </Content>
                    <GridBotoes>
                        <Content className="turma">
                            <label >Turma: </label>
                            <select name="turma"
                                id="turma"
                                onChange={(event)=> setBody({...body, IDturma: parseInt(event.target.value)})}
                                required
                                >
                                <option>Selecione uma</option>
                                {mostraOpitionsTurma()}
                            </select><br />
                            <label >Tipo: </label>
                            <select name="tipoPost"
                                id="tipoPost"
                                onChange={(event)=> setBody({...body, tipoPostagem: parseInt(event.target.value)})}
                                required>
                                <option>Selecione um</option>
                                {mostraOpitionsTipo()}

                            </select>
                        </Content>
                        <Content className="dataPostagem">
                            <label>Data da postagem</label>
                            <InputType
                            type="date"
                            value={body.dataPostagemFormatada}
                            onChange={(event)=> setBody({...body, dataPostagem: event.target.value})}
                            required/>
                            
                        </Content>
                        <Content className="dataVencimento">
                            <label>Data de vencimento</label>
                            <InputType
                            type="date"
                            value={body.dataVencimentoFormatada}
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
                    <Button type="submit">Alterar</Button>
                </form>
            </ContainerForm>
        </>
    )
}