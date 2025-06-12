import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const statusOptions = ["a fazer", "fazendo", "pronto"];
const prioridadeOptions = ["baixa", "média", "alta"];

const Editar_Tarefa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tarefa, setTarefa] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/tarefas/${id}`)
      .then((res) => res.json())
      .then((data) => setTarefa(data))
      .catch((err) => console.error("Erro ao carregar tarefa:", err));
  }, [id]);

  const handleChange = (e) => {
    setTarefa({ ...tarefa, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Tarefa atualizada com sucesso!");
        navigate("/tarefas");
      })
      .catch(() => alert("Erro ao atualizar tarefa!"));
  };

  return (
    <div>
      <Container>
        <NavBar />
        <h5>Editar informações da tarefa</h5>
        {tarefa && (
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-center mt-4">
              <Col xs={12} md={6} className="d-flex flex-column align-items-center">
                <Form.Group className="mb-3" style={{ width: "100%" }}>
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    type="text"
                    name="descricao_tarefa"
                    placeholder="Altere a descrição"
                    value={tarefa.descricao_tarefa}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" style={{ width: "100%" }}>
                  <Form.Label>Setor</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome_setor"
                    placeholder="Altere o setor"
                    value={tarefa.nome_setor}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" style={{ width: "100%" }}>
                  <Form.Label>Prioridade</Form.Label>
                  <Form.Select
                    name="prioridade"
                    value={tarefa.prioridade}
                    onChange={handleChange}
                  >
                    {prioridadeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" style={{ width: "100%" }}>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status_tarefas"
                    value={tarefa.status_tarefas}
                    onChange={handleChange}
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Salvar alterações
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </div>
  );
};

export default Editar_Tarefa;