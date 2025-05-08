import styled from "styled-components";

const ContainerAtividade = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 10% 50%;

  border-radius: 5px;
  background-color: #84b6f4;
  text-align: center;
  color: black;

  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);

  width: 30%;
  height: 20vh;
  padding: 10px;
  padding-bottom: 20px;

  text-align: center;
  cursor: pointer;

  transition: opacity 500ms;
  &:hover {
    opacity: 0.7;
  }
  border: 12px;

  @media screen and (max-width: 800px) {
    width: 90%;
    height: 15vh;
    margin-bottom: 15px;
  }
`;

const ContainerAtividadeProx = styled(ContainerAtividade)`
  #venc {
    color: red;
  }
  #text {
    color: black;
    background-color: #ffffff94;
    border-radius: 5px;
    padding: 2px;
  }
`;

const ContainerAtividadeToday = styled(ContainerAtividadeProx)`
  #venc {
    color: red;
  }
  #text {
    color: black;
    background-color: #ffffff94;
    border-radius: 5px;
    padding: 2px;
  }
`;

const GridData = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  height: 30px;
  font-size: 15pt;

  justify-items: end;
`;

const GridAt = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;

  padding-left: 20px;

  justify-items: start;

  div {
    font-size: 17pt;
  }
`;

function addDays(date: any, days: any) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default function AtividadeAluno(prop: {
  atividade: any;
  onClick: any;
  screen: any;
}) {
  var today = new Date();
  var dateVenc = new Date(prop.atividade.dateVenc);
  today.setHours(0, 0, 0, 0);
  var pertoDoVencimento = false;
  if (addDays(today, 5) >= addDays(dateVenc, 0)) {
    pertoDoVencimento = true;
  }
  if (prop.screen == -1) {
    return (
      <ContainerAtividadeProx onClick={prop.onClick}>
        <GridData>
          <div id="venc">
            Data de entrega: {prop.atividade.Datavencimento} <br />{" "}
            <small id="text">Atividade entregue!</small>
          </div>
        </GridData>
        <GridAt>
          <h4>{prop.atividade.titulo}</h4>
          <div>Professor: {prop.atividade.nomeProf}</div>
        </GridAt>
      </ContainerAtividadeProx>
    );
  }
  if (dateVenc > today) {
    if (pertoDoVencimento) {
      return (
        <ContainerAtividadeProx onClick={prop.onClick}>
          <GridData>
            <div id="venc">
              Data de entrega: {prop.atividade.Datavencimento} <br />{" "}
              <small id="text">Entrega está próxima!</small>
            </div>
          </GridData>
          <GridAt>
            <h4>{prop.atividade.titulo}</h4>
            <div>Professor: {prop.atividade.nomeProf}</div>
          </GridAt>
        </ContainerAtividadeProx>
      );
    } else {
      return (
        <ContainerAtividade onClick={prop.onClick}>
          <GridData>
            <div>Data de entrega: {prop.atividade.Datavencimento}</div>
          </GridData>
          <GridAt>
            <h4>{prop.atividade.titulo}</h4>
            <div>Professor: {prop.atividade.nomeProf}</div>
          </GridAt>
        </ContainerAtividade>
      );
    }
  } else if (dateVenc >= today) {
    return (
      <ContainerAtividadeToday onClick={prop.onClick}>
        <GridData>
          <div id="venc">
            Data de entrega: {prop.atividade.Datavencimento} <br />{" "}
            <small id="text">Vence hoje!</small>
          </div>
        </GridData>
        <GridAt>
          <h4>{prop.atividade.titulo}</h4>
          <div>Professor: {prop.atividade.nomeProf}</div>
        </GridAt>
      </ContainerAtividadeToday>
    );
  } else {
    if (prop.screen == -2) {
      return (
        <ContainerAtividadeProx onClick={prop.onClick}>
          <GridData>
            <div id="venc">
              Data de entrega: {prop.atividade.Datavencimento} <br />{" "}
              <small id="text" style={{ color: "red" }}>
                Prazo de entrega vencido!
              </small>
            </div>
          </GridData>
          <GridAt>
            <h4>{prop.atividade.titulo}</h4>
            <div>Professor: {prop.atividade.nomeProf}</div>
          </GridAt>
        </ContainerAtividadeProx>
      );
    } else {
      return <></>;
    }
  }
}
