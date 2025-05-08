import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../Button/Button";
import Form from "../Form/Form";
import InputType from "../InputType/InputType";

import { getLoginAluno, getLoginProf } from "../../servico/logins";

const InputContaineric1 = styled.div`
  height: 50px;
  position: relative;
  width: 100%;
  margin-top: 40px;
`;
const InputContaineric2 = styled.div`
  height: 50px;
  position: relative;
  width: 100%;
  margin-top: 30px;
`;
const Cut = styled.div`
  background-color: rgba(14, 14, 14, 0);
  border-radius: 10px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;

  ${InputType}:focus ~ &,
  ${InputType}:not(:placeholder-shown) ~ & {transform: translateY(8px);}
`;
const Placeholder = styled.label`
  color: black;
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
        color: black;
    }
`;
const Titulo = styled.p`
    font-size: 25pt;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: black;
`;



export default function FormularioLogin(props: {tipoLogin:string }){
    var titulo = "..."
    var submit = "/"
    var resp :any

    const [body, setBody] = useState({registro:"",senha:""})
    const navigate = useNavigate(); //variável para alteracão da rota

    const checkLogin = async ()=> {
        if(props.tipoLogin === "matricula"){
            titulo = "Aluno"
            submit = "/PageAluno"
            const matriculaStorage = localStorage.getItem("matricula")
            const senhaAlunoStorage = localStorage.getItem("senhaAluno")
            if(matriculaStorage != null && senhaAlunoStorage != null){
                resp = await getLoginAluno({registro: matriculaStorage, senha: senhaAlunoStorage});//puxa os dados do back-end
                navigate(submit, resp)
            }  
        }else{
            titulo = "Professor"
            submit = "/PageProf"
            const registroStorage = localStorage.getItem("registro")
            const senhaProfStorage = localStorage.getItem("senhaProf")
            if(registroStorage != null && senhaProfStorage != null){
                resp = await getLoginProf({registro: registroStorage, senha: senhaProfStorage});//puxa os dados do back-end
                navigate(submit, resp)
            }
        }
    }
    checkLogin()

    return(
            <Form onSubmit={async (event)=>{
                event.preventDefault()
                if(props.tipoLogin === "matricula"){
                    resp = await getLoginAluno(body);//puxa os dados do back-end   
                }else{
                    resp = await getLoginProf(body);//puxa os dados do back-end
                }

                if(resp.permicao || resp){
                    //testa se dados enviados estão corretos e redireciona a rota
                    if(props.tipoLogin === "matricula"){
                        localStorage.setItem("matricula", body.registro)
                        localStorage.setItem("senhaAluno", body.senha)
                    }else if(props.tipoLogin === "Registro"){
                        localStorage.setItem("registro", body.registro)
                        localStorage.setItem("senhaProf", body.senha)
                        localStorage.setItem("cargo", resp.cargo)
                    }

                    navigate(submit, resp);

                }else{ //Se os dados enviados não estiverem corretos, o site envia o alerta avisando que algo está errado
                    alert("Usuário ou senha incorretos");
                }
            }}>
                <Titulo><b>{titulo}</b></Titulo>
                <InputContaineric1>
                    <Cut></Cut>
                    <InputType
                    id="nome"
                    type="text"
                    placeholder=" "
                    required
                    onChange={(event)=> setBody({...body, registro: event.target.value})}
                    />
                    <Placeholder htmlFor="nome" className="placeholder">{props.tipoLogin}</Placeholder>
                </InputContaineric1>

                <InputContaineric2> 
                    <Cut></Cut>
                    <InputType
                    id="senha" 
                    type="password"
                    placeholder=" "
                    required
                    onChange={(event)=> setBody({...body, senha: event.target.value})}/>
                    <Placeholder htmlFor="senha" className="placeholder">Senha</Placeholder>
                </InputContaineric2>
                <Button type="submit">Entrar</Button> <br/> <br/> 
                <Link to={"/"}>Voltar</Link>
            </Form>
    )
}