import React from "react";
import NavBar from "../components/NavBar.jsx";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Cadastro_usuario = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuario = { email, nome };
    fetch("http://localhost:3000/cadastro_usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Usuário cadastrado com sucesso:", data);
        alert("cadastrado com sucesso!");
        navigate("/tarefas");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário:", error);
      });
  };

  return (
    <div>
      <p>
        <NavBar />
        <Container className="mt-4">
          <h1>Cadastro de Usuários</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu nome"
                onChange={(e) => setNome(e.target.value)}
                value={nome}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Cadastrar
            </Button>
          </Form>
        </Container>
      </p>
    </div>
  );
};

export default Cadastro_usuario;
