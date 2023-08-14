import styled from "styled-components";

const GridBox = styled.a `
  background-color: rgb(12, 12, 12);
  color: white;
  
  display: inline;
  height: 5vh;
  min-width: 15vw;

  padding: 10%;
  justify-self: center;

  font-size: 2.5vw;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-decoration: none;

  border-radius: 10px;

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

export default GridBox;