import React from 'react';
import styled, { createGlobalStyle } from "styled-components";
import Rota from "./rotas"
import { BrowserRouter } from 'react-router-dom';

const CSSgeral = createGlobalStyle`
  body{
    background-color: rgb(12,12,12);
    color-scheme: light dark;
    margin: 0;
    padding: 0;
    color: white;
    font-size: calc(10px + 2vmin);
    line-height: 1.5;
    justify-items: center;
    text-align: center;
    //-ms-overflow-style: none; /* for Internet Explorer, Edge */
    //scrollbar-width: none; /* for Firefox */
    //overflow:scroll; 
  }
  html ::-webkit-scrollbar {
  width: 10px;
}
html ::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background: #3d3d3d;
}
html ::-webkit-scrollbar-track {
  background: #121212;
}
  main{
    ///width: min(70ch, 100%, - 4rem);
    margin-inline: auto;
  }
`

const MyElementos = styled.div `
  display: flex;
  width: 100%;
  height: 100%;
  //min-height: 100%;
  //min-width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //background-color:black;
`


function App() {
    return (
      <BrowserRouter>
      <CSSgeral/>
        <MyElementos>
          <Rota/>
        </MyElementos>
      </BrowserRouter>

    );
}

export default App;
