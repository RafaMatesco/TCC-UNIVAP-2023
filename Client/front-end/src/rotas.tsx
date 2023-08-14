import { Route,Routes} from 'react-router-dom'

import LandingPage from "./pages/LandingPage";
import LoginAluno from "./pages/loginAluno";
import LoginProf from "./pages/loginProf";
import PageAluno from "./pages/PageAluno";
import PageProf from "./pages/PageProf";
import CriaAtividade from "./pages/CriaAtividade";
import PerfilAluno from "./pages/PerfilAluno";
import AlteraAtividade from "./pages/AlteraAtividade";
import Turmas from "./pages/CriaTurmas"
import Relacoes from"./pages/Relacoes"
import Professores from './pages/Professores';
import PerfilProf from './pages/PerfilProfessor';
import Alunos from './pages/Alunos';


function rotas(){
    return(
        <Routes>
            <Route Component = { LandingPage }  path="/"></Route>
            
            <Route Component = { LoginAluno }  path="/loginAluno"></Route>
            <Route Component = { LoginProf }  path="/loginProf"></Route>

            <Route Component={ PageAluno } path="/pageAluno"></Route>
            <Route Component={ PageProf } path="/pageProf"></Route>

            <Route Component={ CriaAtividade } path="/criaAtividade"></Route>
            <Route Component={ AlteraAtividade } path="/alteraAtividade"></Route>
            <Route Component={ PerfilAluno } path="/perfilAluno"/>
            <Route Component={PerfilProf} path='/perfilProfessor'></Route>

            <Route Component={ Turmas } path="/turmas"/>
            <Route Component={Relacoes} path="/relacoes"/>
            <Route Component={Professores} path="/equipeEducacional"/>
            <Route Component={Alunos} path="/alunos"/>
        </Routes>
    )
}
export default  rotas