import React from "react";
import styled from "styled-components";
import GridBox from "../components/GridBox/GridBox";

const ScreenArea = styled.div `
  width: 100%;
  height: 100%;
  align-self:  center;
  justify-self: center;
`;

const MyGrid = styled.div `
  background-color: #3d3d3d;
  display: grid;
  width: 50%;
  height: 50%;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top:10%;
  padding: 3%;
  
  color: white;
  font-size: 1.5vw;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  

  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap:10%;
  
  @media screen and (max-width: 800px){
    
  }

  img{
    border-radius: 10px;
    justify-self: center;
    max-width: 10vw;
  }
`;


export default function LandingPage(){
    return (
      <ScreenArea>
        <MyGrid>
            <GridBox href="/loginAluno">Aluno</GridBox>
            <img src="iconeInfo.png" alt="Icone quadro de avisos"></img>
            <GridBox href="/loginProf">Professor</GridBox>
            <div>Bem vindo ao quadro de avisos! <br/><br/> Escolha fazer o login como <b>Professor</b> ou <b>Aluno</b></div>
        </MyGrid>
      </ScreenArea>
    );
}