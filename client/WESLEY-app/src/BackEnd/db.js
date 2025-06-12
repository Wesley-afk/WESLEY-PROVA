import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  database: 'todolist'
});

connection.connect((error) => {
  if (error) {
    console.error('Erro ao se conectar ao banco de dados', err);
    return;
  }
  console.log('Conectado ao banco de dados com suceso');
});

export default connection;