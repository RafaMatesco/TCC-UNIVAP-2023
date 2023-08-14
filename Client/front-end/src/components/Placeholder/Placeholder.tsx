import styled from "styled-components";
import InputType from "../InputType/InputType";
import TextArea from "../TextArea/TextArea";

const Placeholder = styled.label`
  color: #65657b;
  font-size: 20px;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;

   ${InputType}:focus ~ &,
   ${InputType}:not(:placeholder-shown) ~ & {
        transform: translateY(-30px) translateX(10px) scale(0.75);
    }
    
    ${InputType}:not(:placeholder-shown) ~ & {
        color: #808097;
    }
        
    ${InputType}:focus ~ & {
        color: rgba(255, 255, 255);
    }

    ${TextArea}:focus ~ &,
   ${TextArea}:not(:placeholder-shown) ~ & {
        transform: translateY(-30px) translateX(10px) scale(0.75);
    }
    
    ${TextArea}:not(:placeholder-shown) ~ & {
        color: #808097;
    }
        
    ${TextArea}:focus ~ & {
        color: rgba(255, 255, 255);
    }
`;

export default Placeholder