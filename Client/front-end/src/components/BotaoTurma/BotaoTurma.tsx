import styled from "styled-components"
import Button from "../Button/Button"

const ButtonTurma = styled(Button)`
    background-color: #121212;

    width: 80%;
    margin: 5px;

    font-size: 30px;
    text-align: left;
    
    &:hover{
        opacity: 0.7; 
    }
`

export default ButtonTurma