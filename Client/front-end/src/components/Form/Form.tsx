import styled from "styled-components";

const Form = styled.form`
  background-color: #84b6f4;
  border-radius: 20px;
  box-sizing: border-box;
  height: 500px;
  padding: 20px;
  width: 400px;  
  margin-left: auto;
  margin-right: auto;
  margin-top:10%;
  
  a{
        text-decoration: none;
        color: black;
        background-color: white; 
        border-radius: 10%;
        padding:10px;
        font-size: 20px;
        transition: opacity 500ms;
        margin-right:80%;
    }
    
    a:hover{
      opacity: 0.7;
    }
`;

export default Form;