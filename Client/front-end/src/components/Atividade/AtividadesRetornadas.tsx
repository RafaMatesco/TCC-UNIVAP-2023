import styled from "styled-components";

const ContainerAtividade = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 5px;
  background-color: #84b6f4;
  text-align: center;
  color: black;

  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);

  width: 30%;
  height: 14vh;
  padding: 10px;
  padding-bottom: 20px; 

  cursor: pointer;

  transition: opacity 500ms;
  &:hover {
    opacity: 0.7;
  }
`;

export default function Atividade(prop: { atividade: any; onClick: any }) {
  return (
    <>
      <ContainerAtividade onClick={prop.onClick}>
        <div>{prop.atividade.nomeAluno}</div>
        <p>{prop.atividade.dataRetornoFormatada}</p>
      </ContainerAtividade>
    </>
  );
}
