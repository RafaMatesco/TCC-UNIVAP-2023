import { useEffect, useState } from "react"
import styled from "styled-components"

const FormUpdate = styled.form`

    label{
        color: white;
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
        background-color: #121212;
        color: white;
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
        color: white;
        padding: 10px;
        border-radius: 10px;
        background-color: #121212;
        border-style: solid;
        border-color: black;
        display: block;
        margin-top: 30px;
        cursor: pointer;
        transition: linear 200ms;
    }
    button:hover{
        background-color: #cccccc9d;
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
        color:white;
        padding: 10px;
        border: solid black 2px;
        border-radius: 10px;
        display: inline-block;
        max-width: 250px;
        text-align: center;
    }

`

export default function FormPerfil(body:{dados:any}){
    const [dados, setDados] = useState([])
    
    const SalvarDados = (e:any) => {
        //update no banco de dados
    }


    return(
        <FormUpdate>
            <label htmlFor="nome">Nome: {body.dados.nome}</label>

            <label htmlFor="email">E-mail: {body.dados.email}</label>
            <input type="email" name="email" id="email" placeholder="Alterar Email" />
            <button onClick={SalvarDados}>Salvar</button>

            <div>
                <p>Turma: {body.dados.nomeTurma}</p>
                <p>Matrícula: {body.dados.IDaluno}</p>
            </div>

        </FormUpdate>
    )
}