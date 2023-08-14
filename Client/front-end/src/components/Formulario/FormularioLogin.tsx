import React, {useState} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import InputType from "../InputType/InputType";
import Button from "../Button/Button";
import Form from "../Form/Form";

import {getLoginProf, getLoginAluno} from "../../servico/logins"



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
  color: #ffffff;
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
`;
const Titulo = styled.h3`
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: white;
`;

export default function FormularioLogin(props: {tipoLogin:string }){
    var titulo = "..."
    var submit = "/"
    var resp :any

    //muda o titulo do formulario e a rota de envio caso seja aluno ou professor
    if(props.tipoLogin === "matricula"){
        titulo = "Aluno";
        submit = "/PageAluno";
    }else if(props.tipoLogin === "Registro"){
        titulo = "Professor";
        submit = "/PageProf";
    }

    const [body, setBody] = useState({registro:"",senha:""})
    const navigate = useNavigate(); //variável para alteracão da rota

    return(
            <Form onSubmit={async (event)=>{
                event.preventDefault()
                if(props.tipoLogin === "matricula"){
                    resp = await getLoginAluno(body);//Envia dados pro back-end
                }else{
                    resp = await getLoginProf(body);//Envia dados pro back-end
                }
                if(resp.permicao || resp){ //testa se dados enviados estão corretos e redireciona a rota


                    localStorage.clear();
                    localStorage.setItem("registro", body.registro);
                    localStorage.setItem("senha", body.senha);
                    localStorage.setItem("cargo", resp.cargo);

                    navigate(submit, resp);

                }else{ //Se os dados enviados não estiverem corretos, o site envia o alerta avisando que algo está errado
                    alert("Usuário ou senha incorretos");
                }
            }}>
                <Titulo>Logar como {titulo}</Titulo>
                <InputContaineric1> 
                    <InputType 
                    id="nome" 
                    type="text"
                    placeholder=" " 
                    required
                    onChange={(event)=> setBody({...body, registro: event.target.value})}
                    />
                    <Cut></Cut>
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
                <Button type="submit">Login</Button> <br/> <br/> 
                <Link to={"/"}>Voltar</Link>
            </Form>
    )
}
