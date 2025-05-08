import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FormPerfil from "../components/FormPerfil/FormPerfil";
import Nav from "../components/Nav/Nav";
import { getAluno } from "../servico/aluno";


const Container = styled.div`
    background-color: #84b6f4;
    margin: 2%;
    padding: 30px;
    border-radius: 15px;
    color: black;
    width: 40%;
    min-height: 500px;

`


export default function Perfil(){
    var reg = localStorage.getItem("matricula")
    const [body, setBody] = useState([])

    const carregarAluno =async (matricula:string) => {
        return await getAluno(matricula)
    }

    useEffect(  ()  => {
        if (reg != null) {
            var resp = carregarAluno(reg)
            resp.then((dado:any)=>{
                console.log(reg)
                setBody(dado[0])
            })
        }
    },[])
    return(
        <>
            <Nav>
            <ul>
          <li>
            <Link to={"/perfilAluno"}>Perfil</Link>{" "}
          </li>
          <li>
            <Link to={"/PageAluno"}>Home</Link>
          </li>
          <li>
            <Link
              onClick={(event) => {
                localStorage.clear();
              }}
              to={"/"}
            >
              Sair da conta
            </Link>
          </li>
        </ul>
            </Nav>
            <Container>
                {/* <PerfilAluno dados={body} /> */}
                
                <FormPerfil dados={body}/>
    
            </Container>
        </>
    )
}

