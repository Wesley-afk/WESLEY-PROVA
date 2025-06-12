import express from 'express';
import cors from 'cors';
import connection from './db.js';

const app = express();
app.use(cors());
app.use(express.json());
 
app.post('/cadastro_usuario', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
  }

  const query = 'INSERT INTO usuario (nome, email) VALUES (?, ?)';
  connection.query(query, [nome, email], (error, results) => {
    if (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  });
});


 
app.post('/cadastro_tarefa', (req, res) => {
    const { descricao_tarefa, nome_setor, prioridade } = req.body;
 
    if (!descricao_tarefa || !nome_setor || !prioridade) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const query = `
        INSERT INTO tarefas (descricao_tarefa, nome_setor, prioridade, status_tarefas)
        VALUES (?, ?, ?, 'a fazer')
    `;
    connection.query(
        query,
        [descricao_tarefa, nome_setor, prioridade],
        (error, results) => {
            if (error) {
                console.error("Erro ao cadastrar tarefa:", error);
                return res.status(500).json({ error: 'Erro ao cadastrar tarefa.' });
            }
            res.status(201).json({ message: 'Tarefa cadastrada com sucesso!' });
        }
    );
});


app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { descricao_tarefa, nome_setor, prioridade, status_tarefas } = req.body;

    if (!descricao_tarefa || !nome_setor || !prioridade || !status_tarefas) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const query = `
        UPDATE tarefas
        SET descricao_tarefa = ?, nome_setor = ?, prioridade = ?, status_tarefas = ?
        WHERE id_tarefa = ?
    `;
    connection.query(
        query,
        [descricao_tarefa, nome_setor, prioridade, status_tarefas, id],
        (error, results) => {
            if (error) {
                console.error("Erro ao atualizar tarefa:", error);
                return res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
            }
            res.json({ message: 'Tarefa atualizada com sucesso!' });
        }
    );
});

app.put('/tarefas/:id/status', (req, res) => {
    const { id } = req.params;
    const { status_tarefas } = req.body;

    if (!status_tarefas) {
        return res.status(400).json({ error: 'Status é obrigatório.' });
    }

    const query = 'UPDATE tarefas SET status_tarefas = ? WHERE id_tarefa = ?';
    connection.query(query, [status_tarefas, id], (error, results) => {
        if (error) {
            console.error("Erro ao atualizar status:", error);
            return res.status(500).json({ error: 'Erro ao atualizar status.' });
        }
        res.json({ message: 'Status atualizado com sucesso!' });
    });
});


app.get('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM tarefas WHERE id_tarefa = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error("Erro ao buscar tarefa:", error);
            return res.status(500).json({ error: 'Erro ao buscar tarefa.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }
        res.json(results[0]);
    });
});

app.get('/tarefas', (req, res) => {
    const query = 'SELECT * FROM tarefas';
    connection.query(query, (error, results) => {
        if (error) {
            console.error("Erro ao buscar tarefas:", error);
            return res.status(500).json({ error: 'Erro ao buscar tarefas.' });
        }
        res.json(results);
    });
});

app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tarefas WHERE id_tarefa = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error("Erro ao excluir tarefa:", error);
            return res.status(500).json({ error: 'Erro ao excluir tarefa.' });
        }
        res.json({ message: 'Tarefa excluída com sucesso!' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;