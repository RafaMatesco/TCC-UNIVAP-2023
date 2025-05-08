import styled from "styled-components";
import Button from "../Button/Button";

const ContainerRelacao = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    border-radius: 10px;
    background-color: #84b6f4;
    text-align:center;
    color: black;
    width:80%;
    padding: 20px;
    margin: 20px;

    @media all and (max-width: 600px) {
        display: block;
    }

    div{
        justify-self: center;

    }

`

export default function Relacao(props: {relacao:any, selecionaDelete:any}){
    const selectDelete  =()=>{
        props.selecionaDelete(props.relacao.IDrelacao)
    }
    return(
        <ContainerRelacao>
            <div>
                Turma:{props.relacao.nomeTurma}
            </div>
            <div>
                Professor:{props.relacao.nomeadm}
            </div>
            
            <Button type="submit" onClick={selectDelete}>Excluir</Button>

                
        </ContainerRelacao>
    )

}