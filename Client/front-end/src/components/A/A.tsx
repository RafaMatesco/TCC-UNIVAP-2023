import styled from "styled-components";

const A = styled.a`
        a{
          text-decoration: none;
          color: black;
          background-color: white;
          border-radius: 10px;
          padding:10px;
          font-size: 20px;
        }
        &{
          transition: opacity 500ms;
        }
        &:hover{
          opacity: 0.7;
        }
        cursor: pointer;
`;

export default A;