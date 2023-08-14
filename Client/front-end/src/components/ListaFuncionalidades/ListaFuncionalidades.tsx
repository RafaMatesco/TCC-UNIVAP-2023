import { Link } from "react-router-dom"


const verificaCargo = (cargo: string | null)=>{
    if(cargo ==="3"){
        return(
            <>
                {/* <li> <Link to={'/equipeEducaciona'}>Professores</Link></li> */}
                <li> <Link to={'/turmas'}>Turmas</Link> </li>
                <li> <Link to={'/Relacoes'}>Relações</Link></li>
                <li> <Link to={'/alunos'}>Alunos</Link></li>                
            </>

        )
    }
} 
const ListaFuncionalidades = (props: {cargo: string | null})=>{
    return(
        <ul>
        {verificaCargo(props.cargo)}
        <li> <Link to={'/criaAtividade'}>Nova Atividade</Link> </li>
        
        <li> <Link to={'/perfilProfessor'}>Perfil</Link> </li>
        <li> <Link to={'/pageProf'}>Home</Link></li>
        <li> <Link to={"/"}>Sair</Link> </li>
        
    </ul>
    )    
}

export default ListaFuncionalidades