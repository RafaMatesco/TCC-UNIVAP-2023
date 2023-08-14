import styled from "styled-components";
import Button from "../Button/Button";

const ContainerRelacao = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    border-radius: 10px;
    background-color: #3d3d3d;
    text-align:center;
    color: white;
    width:80%;
    padding: 20px;
    margin: 20px;


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