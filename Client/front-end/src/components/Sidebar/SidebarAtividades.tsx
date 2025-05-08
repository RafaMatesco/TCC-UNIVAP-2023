import { FaTimes } from 'react-icons/fa'
import styled from "styled-components"
import BotaoTurma from "../BotaoTurma/BotaoTurma"

 interface Props{
    sidebar: any
 }
const Container = styled.div<Props>`
    background-color: #84b6f4;
    position: fixed;
    height: 100%;
    top: 0px;
    left: 0px;
    width: 300px;
    left: ${(props)=> props.sidebar ? "0" : "-100%"};
    animation: showSidebar .4s;
    box-shadow:   2px 2px 54px #84b6f4, -2px -2px 54px #ffffff;
    
    svg{
        position: fixed;
        color: black;
        width: 30px;
        height: 30px;
        cursor: pointer;
        padding: 10px;
        margin-left:5%; 

        transition: color 500ms;
        &:hover{
            color: red;
        }
    }
    @keyframes showSidebar {
        from{
            opacity: 0;
            width: 0;
        }
        to{
            opacity: 1;
            width: 300px;
        }
    }

`
const Content = styled.div`
    margin-top: 50px;
`
export default function Sidebar(props:{active:any, buttons:any}){
    const closeSidebar = ()=>{
        props.active(false)
    }

    return (
        <Container sidebar = {props.active}>
            <FaTimes onClick={closeSidebar}/>
            
            <Content>
                {props.buttons.map((btn:any)=>(
                    <BotaoTurma onClick={()=>btn.func()} >{btn.text}</BotaoTurma>
                ))}
            </Content>

        </Container>
    )
}