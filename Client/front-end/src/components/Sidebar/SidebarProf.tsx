import React from "react"
import styled from "styled-components"
import {FaTimes} from 'react-icons/fa'
import BotaoTurma from "../BotaoTurma/BotaoTurma"

 interface Props{
    sidebar: any
 }
const Container = styled.div<Props>`
    background-color: #84b6f4;
    color: black;
    position: fixed;
    height: 100%;
    top: 0px;
    left: 0px;
    width: 300px;
    left: ${(props)=> props.sidebar ? "0" : "-100%"};
    animation: showSidebar .4s;
    box-shadow:   2px 2px 54px #84b6f4, -2px -2px 54px #ffffff; 
    
    svg{
        position: fixed;
        color: black;
        width: 30px;
        height: 30px;
        cursor: pointer;
        padding: 10px;
        margin-left:5%; 

        transition: color 500ms;
        &:hover{
            color: red;
        }
    }
    @keyframes showSidebar {
        from{
            opacity: 0;
            width: 0;
        }
        to{
            opacity: 1;
            width: 300px;
        }
    }

`
const Content = styled.div`
    margin-top: 50px;
`
export default function Sidebar(props:{active:any, turmas:any, filtro:any, tipo: number}){
    const closeSidebar = ()=>{
        props.active(false)
    }
    const filtro = (idTurma:number, turma: string)=>{
        if(props.tipo===1){
            props.filtro(idTurma)
        }else{
            props.filtro(idTurma, turma)
        }
        
    }
    const tipo = ()=>{
        if(props.tipo===1){
            return(
            <>
                <BotaoTurma onClick={()=>(filtro(0, ""))} >Todos</BotaoTurma>
                <BotaoTurma onClick={()=>(filtro(-1,""))}>Arquivadas</BotaoTurma>
            </>

            )
        }
        return(
            <BotaoTurma onClick={()=>(filtro(0, ""))} >nenhum</BotaoTurma>
        )

    }

    return (
        <Container sidebar = {props.active}>
            <FaTimes onClick={closeSidebar}/>
            
            <Content>
                {tipo()}
                {props.turmas.map((turma:any)=>(
                    <BotaoTurma onClick={()=>(filtro(turma.IDturma , turma.nomeTurma))} >{turma.nomeTurma}</BotaoTurma>
                ))}
            </Content>

        </Container>
    )
}