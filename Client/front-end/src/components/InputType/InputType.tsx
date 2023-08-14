import styled from "styled-components";

const InputType = styled.input`
   background-color: rgb(12, 12, 12); 
   color: rgb(255, 255, 255);
   width: 100%;   
   margin: 8px 0;  
   padding: 12px 20px;   
   display: inline-block; 
   box-sizing: border-box;
   border-radius: 10px;

   &[type=date]{
      font-size: 17px
   }
`;

export default InputType;