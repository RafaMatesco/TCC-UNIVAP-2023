import styled from "styled-components";

const Box = styled.a `
  background-color: white;
  color: black;
  
  display: inline;
  height: 4vh;
  min-width: 15vw;

  margin:0;
  padding: 10%;
  justify-self: center;

  font-size: 30pt;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-decoration: none;

  border-radius: 6px;

  img{
    border-radius: 10px;
    justify-self: center;
    max-width: 3vw;
    max-height: 5vh;
  }

  transition: opacity 500ms;
  &:hover{
    opacity: 0.7;
  }

  @media screen and (max-width: 800px){
    font-size: 5vw;
    display:block;
    margin: 50px;
  }

`;

export default Box;