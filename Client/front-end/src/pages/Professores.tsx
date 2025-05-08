import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button/Button";
import InputType from "../components/InputType/InputType";
import ListaFuncionalidades from "../components/ListaFuncionalidades/ListaFuncionalidades";
import Nav from "../components/Nav/Nav";
import Placeholder from "../components/Placeholder/Placeholder";
import Titulo from "../components/Titulo/Titulo";
import { getCargo } from "../servico/cargos";
import { postEquipeEducacional } from "../servico/equipeEducacional";
const ContainerForm = styled.div`
  background-color: #84b6f4;
  width: 30vw;
  height: auto;
  margin: 1%;
  padding: 30px;
  padding-left: 5vw;
  padding-right: 5vw;
  border-radius: 15px;
  color: black;
  @media all and (max-width: 600px) {
    width: 80vw;
  }
`;
const InputContaineric1 = styled.div`
  height: 50px;
  position: relative;
  width: 70%;
  margin-top: 30px;
  margin: auto;
`;
const Submit = styled.div`
  justify-items: center;
  margin: 2vw;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  //grid-template-rows: 30% 30% 30%;
  `

const Select2 = styled.select`
  background-color: white;
  color: black;
  font-size: 15pt;
  border-radius: 5%;
`;
export default function Professores(){
    const [body , setBody] = useState({
        registro: 0,
        nome: "",
        senha: "",
        IDcargo: 0
      })
    const [cargos, setCargos] = useState([])
    const carregarCargos =async () => {
        return await getCargo()
    }
    useEffect(()=>{
        const resp = carregarCargos()
        resp.then((dado: any) => {
            setCargos(dado);
          })
    }, [])
    const cargo = localStorage.getItem("cargo");

    const optionsCargos  = ()=>{
        return cargos.map((cargo:any)=>(
            <option value={cargo.idcargo}>{cargo.nomeCargo}</option>
        ))
    }
    const submit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        var resp: any
        try{
            resp = await postEquipeEducacional(body)
        }catch(error: any)
        {
            //console.log(error)
        }
        //console.log(resp)
        if(resp === 409){
            alert("registro ja cadastrado")
        }else{
            alert("Educador cadastrado com suceso")
        }



    }
    return(
        <>
            <Nav>
                <ListaFuncionalidades cargo={cargo} />
            </Nav>
            <ContainerForm>
            <form onSubmit={(e)=>{submit(e)}}>
                <Titulo>Cadastrar Equipe Educacional</Titulo>
                <p>
                    <InputContaineric1>
                    <InputType
                        id="nome"
                        type="number"
                        placeholder=" "
                        required
                        onChange={(event) =>
                        setBody({ ...body, registro: Number.parseInt( event.target.value) })
                        }
                    />
                    <Placeholder htmlFor="nome">Registro</Placeholder>
                    </InputContaineric1>
                </p>
                <p>
                    <InputContaineric1>
                    <InputType
                        id="nome"
                        type="text"
                        placeholder=" "
                        required
                        onChange={(event) =>
                        setBody({ ...body, nome: event.target.value })
                        }
                    />
                    <Placeholder htmlFor="nome">Nome</Placeholder>
                    </InputContaineric1>
                </p>
                <p>
                    <InputContaineric1>
                    <InputType
                        id="area"
                        placeholder=" "
                        required
                        onChange={(event) =>
                        setBody({ ...body, senha: event.target.value })
                        }
                    />
                    <Placeholder htmlFor="area">Senha</Placeholder>
                    </InputContaineric1>
                </p>
                    <label>Cargo:</label>
                    <Select2
                    name="tipoPost"
                    id="tipoPost"
                    onChange={(event) =>
                    setBody({
                        ...body,
                        IDcargo: parseInt(event.target.value),
                    })
                    }
                    required>
                    <option>Selecione um</option>
                    {optionsCargos()}
                </Select2>

                <Submit>
                    <Button
                    type="submit"
                    >
                    Cadastrar
                    </Button>
                </Submit>
                </form>
        </ContainerForm>
        </>
    )
}