import styled from "styled-components";

const Button = styled.button`
  background-color: white;    

  width: 60%;
  padding: 15px;   
  margin: 10px 0px; 

  border: none;   
  cursor: pointer;   
  border-radius: 5px;
  
  font-size: 20px;
  color: black;
  
  transition: opacity 500ms;
  &:hover{
    opacity: 0.8; 
  }
  @media all and (max-width: 600px) {
    width: 100%;
    margin-left: 10px;
  }
  
  `;

  export default Button;