import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import styled from "styled-components";
import { getAluno } from "../servico/aluno";
import PerfilAluno from "../components/PerfilAluno/PerfilAluno";
import FormPerfil from "../components/FormPerfil/FormPerfil";


const Container = styled.div`
    background-color: #3d3d3d;
    margin: 2%;
    padding: 30px;
    border-radius: 15px;
    color: black;
    width: 40%;
    min-height: 500px;

`


export default function Perfil(){
    var reg = localStorage.getItem("registro")
    const [body, setBody] = useState([])


    useEffect(  ()  => {
        if (reg != null) {
            var resp = getAluno(reg)
            resp.then((dado:any)=>{
                setBody(dado[0])
            })
        }
    },[])
    return(
        <>
            <Nav>
                <ul>
                    <li> <Link to={'/pageAluno'}>Home</Link> </li>
                    <li> <Link to={"/"}>Sair</Link> </li>
                </ul>
            </Nav>
            <Container>
                {/* <PerfilAluno dados={body} /> */}
                
                <FormPerfil dados={body}/>
            </Container>
        </>
    )
}

