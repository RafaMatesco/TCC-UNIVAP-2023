import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button/Button";
import ListaFuncionalidades from "../components/ListaFuncionalidades/ListaFuncionalidades";
import Nav from "../components/Nav/Nav";
import TextArea from "../components/TextArea/TextArea";
import Titulo from "../components/Titulo/Titulo";
import { getMesagemNotificacao, putMesagemNotificacao } from "../servico/equipeEducacional";



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

  position: relative;
  width: 100%;
  margin-top: 40px;
`;


const Content = styled.div`
    margin: 20px;
`
export default function MessagemNotificacao(){
    const [body, setBody] = useState({registro:"", texto:""})

    const reg = localStorage.getItem("registro")
    const cargo = localStorage.getItem("cargo")

    const navigate = useNavigate()
    const carregarMesagem =async (id:string) => {
        return await getMesagemNotificacao(id)
    }
    useEffect(()=>{
        if (reg != null) {

            var resp = carregarMesagem(reg)
            resp.then((dado:any)=>{
                setBody({registro:reg , texto: dado.data[0].mensagemNotificacao})
            })
        }

    },[])

    const submit = async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        await putMesagemNotificacao(body)
        navigate("/pageProf")
    }
    return(
        <>
        
        <Nav>
            <ListaFuncionalidades cargo={cargo}/>
        </Nav>
        <ContainerForm>
            <form onSubmit={async(event)=>{submit(event)}}>
                <Titulo className="titulo">Mensagem</Titulo>
                
                    <Content >
                        <InputContaineric1>
                        <TextArea
                            cols={110}
                            rows={10}
                            onChange={(event)=> setBody({...body, texto: event.target.value})}
                            value={body.texto}
                            required/>
                        </InputContaineric1>
                    </Content>
                    <Button type="submit">
                        alterar
                    </Button>
           </form>

        </ContainerForm>
        </>
    )
}