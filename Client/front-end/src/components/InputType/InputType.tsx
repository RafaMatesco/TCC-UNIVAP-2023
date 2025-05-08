import styled from "styled-components";

const InputType = styled.input`
  font-size: 14pt;
  background-color: white;
  border: 1px solid black;
  color: black;
  width: 100%;
  margin: 8px 0;
  padding: 12px 20px;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 10px;

  &[type="date"] {
    font-size: 17px;
    max-width: 60%;
  }
`;

export default InputType;
