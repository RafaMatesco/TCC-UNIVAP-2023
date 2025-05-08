import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button/Button";
import InputType from "../components/InputType/InputType";
import ListaFuncionalidades from "../components/ListaFuncionalidades/ListaFuncionalidades";
import Nav from "../components/Nav/Nav";
import { getProfessor, putSenha } from "../servico/equipeEducacional";

const Container = styled.div`
  background-color: #84b6f4;
  margin: 2%;
  padding: 30px;
  border-radius: 15px;
  color: black;
  width: 40%;
  min-height: 500px;
`;


const FormUpdate = styled.form`

    label{
        color: black;
        display: block;
        margin-top: 50px;
        border-bottom: solid white;
        font-size: 1em;
        font-family: Arial, Helvetica, sans-serif;
        cursor: pointer;
    }
    input[type=text], input[type=email]{
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 1em;
        background-color: white;
        color: black;
        outline: none;
        border-style: none;
        /* border-bottom: solid black; */
        box-shadow: 2px 2px 5px #adadad86;
        display: block;
        padding: 10px;
        border-radius: 5px;
    }
    button{
        font-size: 1em;
        color: black;
        padding: 10px;
        border-radius: 10px;
        background-color: white;
        display: block;
        margin-top: 30px;
        cursor: pointer;
        transition: linear 200ms;
    }
    button:hover{
        background-color: #84b6f4;
    }
    button:focus{
        background-color: #424242ba;
    }
    div{
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        width: 500px;
        margin: auto;
    }
    p{
        color: black;
        padding: 10px;
        border: solid black 2px;
        border-radius: 10px;
        display: inline-block;
        max-width: 250px;
        text-align: center;
    }

`

export default function PerfilProf() {
  var reg = localStorage.getItem("registro");
  const cargo = localStorage.getItem("cargo");
  const [body, setBody] = useState([]);
  const [senha, setSenha] = useState("")
  const [senha2, setSenha2] = useState("")

  const carregarProfessor =async (reg:string) => {
    return await getProfessor(reg)
  }
  useEffect(() => {
    if(reg!==null){
      const resp = carregarProfessor(reg)
      resp.then((dado:any)=>{
        setBody(dado.data[0])
    })
    }
  }, []);
  const SalvarDados = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(senha===senha2 && senha !==""){
        const registroRequest = localStorage.getItem("registro")
        if(registroRequest!=null){
            const bodyRequest ={
                registro:registroRequest , senha: senha
            }
            console.log(bodyRequest)
            putSenha(bodyRequest)
            alert("senha alterada")
            window.location.reload();
        }

       
    }
}
  const printForm = (body:any)=>{
    return(
          <FormUpdate onSubmit={(e)=>{SalvarDados(e)}} >

              <label htmlFor="nome">Nome: {body.nome}</label>

              <label htmlFor="registro">registro: {body.registro}</label>

              <label htmlFor="cargo">cargo: {body.nomeCargo}</label>
              
              <label htmlFor="senha">Nova senha:</label>
              <InputType name="senha" type="password" placeholder="nova senha" value={senha} onChange={(event)=> setSenha(event.target.value)}/>
              <InputType  type="password" placeholder="confirme a nova senha" value={senha2} onChange={(event)=> setSenha2(event.target.value)}/>
              <Button type="submit">Salvar</Button>

          </FormUpdate>
    )
  }
  return (
    <>
      <Nav>
        <ListaFuncionalidades cargo={cargo} />
      </Nav>
      <Container>
        {printForm(body)}
      </Container>
    </>
  );
}
