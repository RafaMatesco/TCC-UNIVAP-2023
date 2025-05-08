import { useState } from "react"
import styled from "styled-components"
import { putAluno } from "../../servico/aluno"
import Button from "../Button/Button"
import InputType from "../InputType/InputType"

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

export default function FormPerfil(body:{dados:any}){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [senha2, setSenha2] = useState("")
    
    const SalvarDados = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(senha===senha2){
            let senhaRequest = ""
            if(senha!==""){senhaRequest =senha}
            const matriculaRequest = localStorage.getItem("matricula")
            if(matriculaRequest!=null){
                const bodyRequest ={
                    matricula:matriculaRequest , nome: body.dados.nome , email: email,senha:senhaRequest, IDturma: body.dados.IDturma
                }
                console.log(bodyRequest)
                putAluno(bodyRequest)
                window.location.reload();
            }

           
        }

    }


    return(
        <FormUpdate onSubmit={(e)=>{SalvarDados(e)}} >
            <label htmlFor="nome">Nome: {body.dados.nome}</label>

            <label htmlFor="email">E-mail: {body.dados.email}</label>
            <InputType name="newEmail" type="email" placeholder="novo email" value={email} onChange={(event)=> setEmail(event.target.value)}/>
            <label htmlFor="senha">Nova senha:</label>
            <InputType name="senha" type="password" placeholder="nova senha" value={senha} onChange={(event)=> setSenha(event.target.value)}/>
            <InputType  type="password" placeholder="confirme a nova senha" value={senha2} onChange={(event)=> setSenha2(event.target.value)}/>
            <Button type="submit">Salvar</Button>

            <div>
                <p>Turma: {body.dados.nomeTurma}</p>
                <p>Matrícula: {body.dados.IDaluno}</p>
            </div>

        </FormUpdate>
    )
}