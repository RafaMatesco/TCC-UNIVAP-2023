import styled from "styled-components";

const ButtonModal = styled.button`
  background-color: white;    

  width: 30%;
  padding: 15px;   

  cursor: pointer; 
  border: none;     
  border-radius: 10px;

  text-align: center;
  font-size: 30px;
  color: black;
  
  transition: opacity 500ms;
  &:hover{
    opacity: 0.8; 
  }
  
  `;

  export default ButtonModal;