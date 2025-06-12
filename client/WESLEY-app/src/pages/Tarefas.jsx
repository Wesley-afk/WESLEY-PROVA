import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import Card from "../components/Card.jsx";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const statusOptions = ["a fazer", "fazendo", "pronto"];

const Tarefas = () => {
  const [tarefas, setTarefas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/tarefas")
      .then((res) => res.json())
      .then((data) => setTarefas(data))
      .catch((err) => {
        console.error("Erro ao buscar tarefas:", err);
        setTarefas([]);
      });
  }, []);

  const handleStatusChange = (id_tarefa, novoStatus) => {
    fetch(`http://localhost:3000/tarefas/${id_tarefa}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status_tarefas: novoStatus }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar status");
        setTarefas((tarefasAntigas) =>
          tarefasAntigas.map((t) =>
            t.id_tarefa === id_tarefa ? { ...t, status_tarefas: novoStatus } : t
          )
        );
        alert("Status atualizado com sucesso!");
      })
      .catch((err) => {
        alert("Erro ao atualizar status");
        console.error(err);
      });
  };

  const handleDelete = (id_tarefa) => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      fetch(`http://localhost:3000/tarefas/${id_tarefa}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao excluir tarefa");
          setTarefas((tarefasAntigas) =>
            tarefasAntigas.filter((t) => t.id_tarefa !== id_tarefa)
          );
          alert("Tarefa excluída com sucesso!");
        })
        .catch((err) => {
          alert("Erro ao excluir tarefa");
          console.error(err);
        });
    }
  };

  return (
    <div>
      <Container>
        <NavBar />
        <section style={{ marginTop: "5vh" }}>
          <h1>Suas tarefas aqui</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {tarefas.length > 0 ? (
              tarefas.map((tarefa) => (
                <Card
                  key={tarefa.id_tarefa}
                  titulo={tarefa.descricao_tarefa}
                  desc={
                    <>
                      <div>Setor: {tarefa.nome_setor}</div>
                      <div>Prioridade: {tarefa.prioridade}</div>
                      <div style={{ marginTop: 8 }}>
                        <Form.Label>Status:</Form.Label>
                        <Form.Select
                          size="sm"
                          style={{
                            width: "auto",
                            display: "inline-block",
                            marginLeft: 8,
                          }}
                          value={tarefa.status_tarefas}
                          onChange={(e) =>
                            handleStatusChange(tarefa.id_tarefa, e.target.value)
                          }
                        >
                          {statusOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt.charAt(0).toUpperCase() + opt.slice(1)}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    </>
                  }
                  but={
                    <>
                      <Button
                        variant="success"
                        onClick={() =>
                          navigate(`/editar_tarefa/${tarefa.id_tarefa}`)
                        }
                        style={{ marginRight: 8 }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(tarefa.id_tarefa)}
                      >
                        Excluir
                      </Button>
                    </>
                  }
                />
              ))
            ) : (
              <p>Sem tarefa cadastrada ainda</p>
            )}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Tarefas;