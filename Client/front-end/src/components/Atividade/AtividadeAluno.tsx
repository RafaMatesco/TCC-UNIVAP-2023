import React from "react"
import styled from "styled-components"

const ContainerAtividade = styled.div`
    display: grid;
    grid-template-columns: 50% 20% 20%;
    grid-template-rows: 1fr;
    gap: 5%;

    border-radius: 5px;
    background-color: #3d3d3d;
    color: white;
    width: 60%;
    height: 200px;
    padding: 20px;
    padding-bottom: 3%;
    
    text-align:center;
    cursor: pointer;
    //box-shadow:   2px 2px 54px rgb(62, 62, 179), -2px -2px 54px #ffffff;

    transition: opacity 500ms;
    &:hover{
        opacity: 0.7;
    }

   
`
    

export default function AtividadeAluno(prop:{atividade:any, onClick: any}){

    return(
        <ContainerAtividade onClick={prop.onClick}>
            <h2>{prop.atividade.titulo}</h2>
            <h4>Postada em {prop.atividade.DataPostagem}</h4>
            <h4>Entrega até {prop.atividade.Datavencimento}</h4>
        </ContainerAtividade>
    )
} 