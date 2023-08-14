import  { useState } from 'react'
import styled from 'styled-components'

import {FaTimes} from 'react-icons/fa'
import Titulo from '../Titulo/Titulo'
import Button from '../Button/Button'
import{postAtividadeRealizada} from"../../servico/atividades"
import Dropzone from 'react-dropzone'
import FileList from '../FileList/FileList'
import DropContainer from '../DropContainer/DropContainer'
import TextArea from '../TextArea/TextArea'


 
const BackGroundModal = styled.div`
    color:white;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(0,0,0,0.7);
    backdrop-filter: blur(5px);
    z-index: 1000;
`
const Modal = styled.div`
    background-color: #3d3d3d;
    position:fixed ;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 80%;
    height: 80%;
    border-radius: 60px 10px;
    text-align: center;
    svg{
        position: fixed;
        color: white;
        top: 5%;
        left: 5%;
        cursor: pointer;
        padding: 10px;

        transition: color 500ms;
        &:hover{
            color: red;
        }
    }
`
const Container = styled.div`
    display: grid;
    grid-template-areas: "c1 c2" ;
    margin: 20px;
    .nomeProf{
        grid-area: c1;
    }
    .texto{
        grid-area: c1;
    }
    .dataPostagem{
        grid-area: c2;
    }
    .dataVencimento{
        grid-area: c2;
    }
    .arquivo{
        grid-area: c1;
        cursor: pointer;
    }
    .dropZone{
        grid-area:c1;
        margin: 5px;
    }
    .textArea{
        grid-area:c2;
        margin: 5px;
    }
`
const Iframe = styled.iframe`
    display: none;
`
const DropMessage = styled.p`
    display: flex;
    justify-content: center;
    padding: 15px 0;

`

export default function ModalAtividade(props:{ isOpen:boolean, close: any, postagen: any}) {
    console.log(props.postagen)
    const urlDownload = "http://localhost:8080/arquivos?arquivo="
    const [download, setDownload] = useState("")
    const [count, setCount] = useState(0)
    const [arquivo, setArquivo] = useState([])
    const [arquivoEscolido, setArquivoEscolido] = useState(false);
    const reg = localStorage.getItem("registro")
    const [body, setBody] = useState({IDpostagem:0,IDaluno:0,texto:"", arquivo:""})
    const testaArquivo = (caminho: string)=>{
        if(caminho != "undefined"){
            return(<p className='arquivo' onClick={()=>{
                if(count>0){
                    
                }
                setDownload(urlDownload+caminho )
                setCount(c=>c+1)
                }}> {caminho.substring(33)}</p>
            )
        }
        return (<p className='arquivo'>"Nao possui arquivo"</p>)
    }
    const closeModal = (close: any)=>{
        close()
        setDownload("" )
    }
    const limpaArquivos = ()=>{
        setArquivoEscolido(false)
        setArquivo([])
    }
    const marcarFeitaDesfeita = ()=>{

        
        postAtividadeRealizada({
            IDatividade: props.postagen.IDpostagem,
            matricula: Number(reg)
          })
          window.location.reload()
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
    if(props.isOpen){
        return(
            <BackGroundModal>
                <Modal>

                    <FaTimes onClick={()=>{
                        closeModal(props.close)
                    }}></FaTimes>

                    <Titulo>{props.postagen.titulo}</Titulo>
                    <Container>
                        <p className='nomeProf'>Professor: {props.postagen.nomeProf}</p>
                        <p className='dataPostagem'>postado: {props.postagen.DataPostagem}</p>
                        
                    </Container>
                    <Container>
                        <p className='texto'>{props.postagen.texto}</p>
                        <p className='dataVencimento'>entrega: {props.postagen.Datavencimento}</p>
                    </Container>
                    <Container>
                        <label className='arquivo'>arquivo:</label>
                        {testaArquivo(props.postagen.caminhoArquivo)}
                        {download && <Iframe src={download+'&c='+count} />}
                    </Container>
                    <hr/>
                    <form>
                        <label>
                            
                        </label>
                        <Container >
                            <div className='dropZone'>
                                <Dropzone  onDropAccepted={(files:any)=>{
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
                            </div>
                            
                            <div className='textArea'>
                                <label> 
                                    descricao da resposta:
                                </label>                                        
                                <TextArea 
                                cols={30} 
                                rows={4}
                                onChange={(event)=> setBody({...body, texto: event.target.value})}
                                required/>        
                            </div>
                        </Container>


                        <Button >Devolver</Button>
                    </form>
                    
                </Modal>
            </BackGroundModal>
        )
    }
    return null

}
