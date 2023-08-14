import styled from "styled-components"

const ContainerPerfil = styled.div`
    display: grid;
    grid-template-areas:
    //adicionar foto depois
    "nome email"
    "matricula turma" ;


    .nome{
        grid-area:nome ;
    }
    .foto{
        grid-area:foto ;
    }
    .turma{
        grid-area: turma;
    }
    .email{
        grid-area: email;
    }
    .matricula{
        grid-area: matricula;
    }

`
export default function perfilAluno(body:{dados:any}){
    return(
        <ContainerPerfil>
            <p className="nome">{body.dados.nome}</p>
            <p className="email">email: {body.dados.email} </p>
            <p className="turma">turma : {body.dados.nomeTurma}</p>
            
            <p className="matricula">Matricula: {body.dados.IDaluno}</p>

        </ContainerPerfil>

    )
}