import React from "react";
import styled from "styled-components";
import Box from "../components/GridBox/GridBox";

const ScreenArea = styled.div`
  width: 100%;
  height: 100%;
  align-self: center;
  justify-self: center;
`;

const MyGrid = styled.div`
  background-color: #84b6f4;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  width: 50vw;
  height: 50vh;
  border-radius: 6px;
  margin-top: 7%;
  padding: 2%;

  color: black;
  font-size: 1.5vw;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;

  img {
    border-radius: 10px;
    justify-self: center;
    max-width: 10vw;
  }

  @media all and (max-width: 600px) 
{
  display: block;
  width: 80vw;
  padding: 1%;
}
`;

const Links = styled(MyGrid)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;

  width: 100%;
  max-width: 100%;

  background-color: rgba(0,0,0,0);
  

  @media all and (max-width: 600px) 
{
  display: block;
  height: 10%;
  font-size: 13pt;
  margin-bottom: 20%;
}
`;

export default function LandingPage() {
  return (
    <>
      <MyGrid>
        <Links>
          <img src="iconeInfo.png" alt="Icone quadro de avisos"></img>
          <div>
            Bem vindo ao quadro de avisos! Escolha fazer o login como <b>Professor</b> ou <b>Aluno</b>
          </div>
        </Links>
        <Links>
          <Box href="/loginAluno">Aluno</Box>
          <Box href="/loginProf">Professor</Box>
        </Links>
      </MyGrid>
    </>
  );
}
