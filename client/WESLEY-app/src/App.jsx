import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cadastro_usuario from "./pages/Cadastro_usuario";
import Tarefas from "./pages/Tarefas.jsx";
import Cadastrar_Tarefa from "./pages/Cadastrar_Tarefa.jsx";
import Editar_Tarefa from "./pages/Editar.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Cadastro_usuario />} />
        <Route path="/tarefas" element={<Tarefas />} />
        <Route path="/cadastrar_tarefa" element={<Cadastrar_Tarefa/>} />
         <Route path="/editar_tarefa/:id" element={<Editar_Tarefa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
