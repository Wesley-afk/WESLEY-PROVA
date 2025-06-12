import React, { useState } from "react";
import NavBar from "../components/NavBar.jsx";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom"; // Corrija aqui

const Cadastrar_Tarefa = () => {
  const [descricao_tarefa, setDescricao_tarefa] = useState("");
  const [nome_setor, setSetor] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const navigate = useNavigate(); // E aqui

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!descricao_tarefa || !nome_setor || !prioridade) {
      alert("Preencha todos os campos.");
      return;
    }

    const tarefaData = {
      descricao_tarefa,
      nome_setor,
      prioridade,
    };

    fetch("http://localhost:3000/cadastro_tarefa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarefaData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar tarefa");
        return res.json();
      })
      .then(() => {
        alert("Tarefa cadastrada com sucesso!");
        setDescricao_tarefa("");
        setSetor("");
        setPrioridade("");
        navigate("/tarefas");
      })
      .catch((err) => {
        console.error("Erro:", err);
        alert("Erro ao cadastrar tarefa");
      });
  };

  return (
    <div>
      <Container>
        <NavBar />

        <h3>Cadastro de tarefa</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Descrição da tarefa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descrição da tarefa"
              onChange={(e) => setDescricao_tarefa(e.target.value)}
              value={descricao_tarefa}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Setor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descrição do setor"
              onChange={(e) => setSetor(e.target.value)}
              value={nome_setor}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Prioridade</Form.Label>
            <Form.Select
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
            >
              <option value="">Selecione a prioridade</option>
              <option value="baixa">Baixa</option>
              <option value="média">Média</option>
              <option value="alta">Alta</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Cadastrar_Tarefa;