//Import Area
const { response } = require("express");
const express = require("express");
const uuid = require("uuid");
const cors = require("cors");
//Variables Area
const port = 3001;
const app = express();

app.use(express.json());
app.use(cors());

const users = [];

//Middleware

/*const myFirstmiddleware = (request, response, next) => {
  console.log("Fui chamado");

  next(); // Serve para continuar a aplication
};*/

//app.use(myFirstmiddleware);

//Rota de Leitura Metodo GET

app.get("/users", (request, response) => {
  return response.json(users);
});

//Rota de Criação Metodo POST

app.post("/users", (request, response) => {
  const { name, idade } = request.body;

  const user = { id: uuid.v4(), name, idade };

  users.push(user);

  return response.status(201).json(users);
});

//Rota deAtualização Metodo PUT

app.put("/users/:id", (request, response) => {
  const { id } = request.params;
  const { name, idade } = request.body;
  const updateUser = { id, name, idade };

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return response.status(404).json({ message: "User not found" });
  }

  users[index] = updateUser;

  return response.status(200).json(updateUser);
});

//Roda de Delete Metodo Delete

app.delete("/users/:id", (request, response) => {
  const { id } = request.params;

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return response.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  return response.status(200).json(users);
});

// Porta da Aplicação
app.listen(port, () => {
  console.log("🐱‍👤 Serve Started in port " + port);
});

/*
    Como exportar um arquivo

    module.exports = nome da funçaõ que vai ser exportada


    const var = requite('./nomde do arquivo')


*/
