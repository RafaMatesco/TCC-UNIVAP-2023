import React from "react"
import styled from "styled-components"
import A from "../A/A"

const ContainerAtividade = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 18% 1fr 1fr;

    border-radius: 5px;
    background-color: #3d3d3d;
    text-align:center;
    color: white;

    min-width: 90%;
    max-width: 100%;
    min-height: 95%;
    max-height: 100%;

    padding: 10px;

    div{
        justify-self: center;
        align-self: center;
    }
    .delete{
        padding-top: 10px;
        justify-self: end;
    }
    
    //box-shadow:   2px 2px 54px rgb(62, 62, 179), -2px -2px 54px #ffffff;
    
`

export default function Atividade(prop:{atividade:any, onClick: any}){

    return(
        <>
            <ContainerAtividade onClick={prop.onClick}>
                <div></div> 
                <div className="delete"> <A>✏️Editar</A> <A>❌Excluir</A> </div>
                <div className="titulo" >{prop.atividade.titulo}</div>
                <div className="dataPostagem">postagem:{prop.atividade.DataPostagem}</div>
                <div className="nomeTurma">turma: {prop.atividade.nomeTurma}</div>
                <div className="dataVencimento">entrega:{prop.atividade.Datavencimento}</div>
            </ContainerAtividade>
        </>
    )
} 