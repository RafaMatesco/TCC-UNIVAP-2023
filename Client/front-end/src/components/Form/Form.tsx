import styled from "styled-components";

const Form = styled.form`
  background-color: #3d3d3d;
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
        color: white;
        background-color: rgb(12, 12, 12); 
        border-radius: 10px;
        padding:10px;
        font-size: 20px;
        transition: opacity 500ms;
        margin-right:100%;
    }
    
    a:hover{
      opacity: 0.7;
    }
`;

export default Form;