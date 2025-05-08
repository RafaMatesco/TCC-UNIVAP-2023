import styled from "styled-components";

const ContainerAtividade = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;

  border-radius: 5px;
  background-color: #84b6f4;
  text-align: center;
  color: black;

  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);

  width: 80%;
  height: 16vh;
  padding: 10px;
  padding-bottom: 20px; 

  cursor: pointer;

  transition: opacity 500ms;
  &:hover {
    opacity: 0.7;
  }
  
  @media all and (max-width: 600px) {
    width: 90%;
    margin-bottom:20px;
  }

`;

const ContainerAtividadeProx = styled(ContainerAtividade)`
#venc{
  color: red;
}
#text{
  color: black;
  background-color: #ffffff94;
  border-radius: 5px;
  padding: 2px;
}
`

const ContainerAtividadeToday = styled(ContainerAtividadeProx)
`
#venc{
  color: red;
  
}
#text{
  color: black;
  background-color: #ffffff94;
  border-radius: 5px;
  padding: 2px;
}
`

const GridData = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  height: 30px;
  font-size: 15pt;

  justify-items: end;

  @media all and (max-width: 600px) {
    font-size: 13pt;
  }
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
  .titulo {
    font-size: 26pt;
  }

  @media all and (max-width: 600px) {
    div {
    font-size: 14pt;
  }
  .titulo {
    font-size: 23pt;
  }
  }
`;

function addDays(date:any, days:any) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}


export default function Atividade(prop: { atividade: any; onClick: any }) {
  var today = new Date()
  var dateVenc = new Date(prop.atividade.dateVenc)
  today.setHours(0,0,0,0)
  var pertoDoVencimento = false 
  if(addDays(today, 5) >= addDays(dateVenc, 0)){
      pertoDoVencimento = true
  }
  console.log(prop.atividade.nomeTurma)
  if(dateVenc > today){
    if(pertoDoVencimento){
      return (
        <ContainerAtividadeProx onClick={prop.onClick}>
          <GridData>
            <div>
              Entrega até {prop.atividade.Datavencimento} <br/>  <small id="text">Entrega está próxima!</small>
            </div>
          </GridData>
          <GridAt>
            <div className="titulo">{prop.atividade.titulo}</div>
            {prop.atividade.nomeTurma !== "" && (<div>Turma: {prop.atividade.nomeTurma}</div>)}
            {prop.atividade.nomeTurma === "" && (<div>Postada para alguns alunos</div>)}
          </GridAt>
        </ContainerAtividadeProx>
      );  
    }else{
      return (
        <ContainerAtividadeProx onClick={prop.onClick}>
          <GridData>
            <div>
              Entrega até {prop.atividade.Datavencimento} <br/>  
            </div>
          </GridData>
          <GridAt>
            <div className="titulo">{prop.atividade.titulo}</div>
            {prop.atividade.nomeTurma !== "" && (<div>Turma: {prop.atividade.nomeTurma}</div>)}
            {prop.atividade.nomeTurma === "" && (<div>Postada para alguns alunos</div>)}
          </GridAt>
        </ContainerAtividadeProx>
      );  

    }
  }else if(dateVenc >= today){
    return (
      <ContainerAtividadeProx onClick={prop.onClick}>
        <GridData>
          <div>
            Entrega até {prop.atividade.Datavencimento} <br/>  <small id="text">Vence hoje!</small>
          </div>
        </GridData>
        <GridAt>
          <div className="titulo">{prop.atividade.titulo}</div>
          {prop.atividade.nomeTurma !== "" && (<div>Turma: {prop.atividade.nomeTurma}</div>)}
          {prop.atividade.nomeTurma === "" && (<div>Postada para alguns alunos</div>)}
        </GridAt>
      </ContainerAtividadeProx>
    );  

  }else{
    return(
      <ContainerAtividadeProx onClick={prop.onClick}>
        <GridData>
          <div>
            Entrega até {prop.atividade.Datavencimento} <br/>  <small id="text" style={{color:"red"}}>Atividade finalizada!</small>
          </div>
        </GridData>
        <GridAt>
          <div className="titulo">{prop.atividade.titulo}</div>
          {prop.atividade.nomeTurma !== "" && (<div>Turma: {prop.atividade.nomeTurma}</div>)}
          {prop.atividade.nomeTurma === "" && (<div>Postada para alguns alunos</div>)}
        </GridAt>
      </ContainerAtividadeProx>
    )
  }
  
}
