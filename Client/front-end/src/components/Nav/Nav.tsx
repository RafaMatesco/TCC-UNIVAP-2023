import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #84b6f4;
  margin: 0;
  margin-bottom: 1%;
  padding: 0;
  min-width: 100%;
  height: 8vh;

  @media all and (max-width: 600px) {
    height: 30%;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: right;
    height: 100%;
  }
  li {
    display: inline-block;
    padding-top: 1%;
    height: 100%;
  }
  a {
    text-decoration: none;
    color: black;
    padding-left: 1vw;
    padding-right: 1vw;
    margin-left: 0.5vw;
    margin-right: 0.5vw;
    transition: opacity 500ms;
    border-radius: 10px;
    background-color: #ffffff35;
  }

  a:hover {
    opacity: 0.8;
    background-color: #ffffffb6;
  }
  p:hover {
    opacity: 0.8;
    background-color: #ffffffb6;
  }

`;
export default Nav;
