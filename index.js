const { response } = require("express");
const express = require("express");
const cors = require("cors");

const uuid = require("uuid");

const port = 3001;

const app = express();

app.use(express.json());
app.use(cors());
/*Variavel Local  */

const pedidos = [];

/* Rotas */

app.get("/order", (request, response) => {
  if (pedidos.length <= 0) {
    return response.status(200).json({ message: "Sem Pedidos Feitos" });
  }
  return response.status(200).json({ message: "Pedidos Realizados", pedidos });
});

app.post("/order", (request, response) => {
  const { order, clientName, price, statuss } = request.body;

  const pedido = { id: uuid.v4(), order, clientName, price, statuss };

  pedidos.push(pedido);

  return response.status(200).json({ mesagem: "Pedido confirmado", pedidos });
});

app.put("/order/:id", (request, response) => {
  const { id } = request.params;

  const { order, clientName, price, statuss } = request.body;

  const attPedido = { id, order, clientName, price, statuss };

  const index = pedidos.findIndex((pedido) => pedido.id === id);

  if (index < 0) {
    return response.status(400).json({ message: "Pedido not found" });
  }

  pedidos[index] = attPedido;

  return response
    .status(200)
    .json({ message: "Pedido Alterado com sucesso", attPedido });
});

app.delete("/order/:id", (request, response) => {
  const { id } = request.params;

  const index = pedidos.findIndex((pedido) => pedido.id === id);

  pedidos.splice(index, 1);

  return response
    .status(200)
    .json({ mesagem: "Pedido Removido com sucesso", pedidos });
});
/* Servidor */

app.listen(port, () => {
  console.log(" 👌 listening on port 👌 " + port);
});
