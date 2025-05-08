import { Route, Routes } from 'react-router-dom';

import AlteraAtividade from "./pages/AlteraAtividade";
import Alunos from './pages/Alunos';
import Atividade from './pages/Atividade';
import CriaAtividade from "./pages/CriaAtividade";
import Turmas from "./pages/CriaTurmas";
import LandingPage from "./pages/LandingPage";
import MessagemNotificacao from './pages/MensagemNotificacao';
import PageAluno from "./pages/PageAluno";
import PageProf from "./pages/PageProf";
import PerfilAluno from "./pages/PerfilAluno";
import PerfilProf from './pages/PerfilProfessor';
import Professores from './pages/Professores';
import Relacoes from "./pages/Relacoes";
import LoginAluno from "./pages/loginAluno";
import LoginProf from "./pages/loginProf";


function rotas(){
    return(
        <Routes>
            <Route Component = { LandingPage }  path="/"></Route>
            
            <Route Component = { LoginAluno }  path="/loginAluno"></Route>
            <Route Component = { LoginProf }  path="/loginProf"></Route>

            <Route Component={ PageAluno } path="/pageAluno"></Route>
            <Route Component={ PageProf } path="/pageProf"></Route>

            <Route Component={ CriaAtividade } path="/criaAtividade"></Route>
            <Route Component={ Atividade } path="/Atividade"></Route>
            <Route Component={ PerfilAluno } path="/perfilAluno"/>
            <Route Component={PerfilProf} path='/perfilProfessor'></Route>

            <Route Component={ Turmas } path="/turmas"/>
            <Route Component={Relacoes} path="/relacoes"/>
            <Route Component={Professores} path="/equipeEducacional"/>
            <Route Component={Alunos} path="/alunos"/>
            <Route Component={AlteraAtividade} path="/alteraAtividade"/>
            <Route Component={MessagemNotificacao} path="/messagemNotificacao"/>
        </Routes>
    )
}
export default  rotas