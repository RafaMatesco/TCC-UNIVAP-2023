import styled from "styled-components";

const Button = styled.button`
  background-color: rgb(12, 12, 12);    

  width: 100%;
  padding: 15px;   
  margin: 10px 0px; 
  margin-top: 40px;

  border: none;   
  cursor: pointer;   
  border-radius: 10px;
  
  font-size: 20px;
  color: white;
  
  transition: opacity 500ms;
  &:hover{
    opacity: 0.8; 
  }
  
  `;

  export default Button;