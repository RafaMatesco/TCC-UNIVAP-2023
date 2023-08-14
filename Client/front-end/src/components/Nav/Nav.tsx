import React from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
        background-color: #3d3d3d;
        margin: 0;
        margin-bottom: 1%; 
        padding: 0;
        min-width:100%;
        height: 10vh;
        
        ul{
            list-style-type: none;
            margin: 0;
            padding: 0;
            text-align: right;
        }
        li{
            display: inline-block;
            padding: 10px; 
            padding-top: 1%;
        }
        a{ 
            text-decoration: none; 
            color: white;
            padding-left: 15px;
            padding-right: 15px;    
            transition: opacity 500ms;
        }
        
        a:hover{
            opacity: 0.3;
        }
        p{
            padding-left: 2%;
            margin-top: 1%;
        }
    `
export default Nav