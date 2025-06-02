import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas principais
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ativacao from "./pages/Activate";
import Home from "./pages/Home";
import "./App.css"


// Páginas de produtos
import CreateProduct from "./pages/CreateProduct";
import ListProducts from "./pages/ListProducts";
import EditProduct from "./pages/EditProduct";
import DeleteProduct from "./pages/DeleteProduct";
import Sale from "./pages/Sale";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas principais */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activate" element={<Ativacao />} />
        <Route path="/home" element={<Home />} />

        {/* Rotas de produtos */}
        <Route path="/produtos/cadastrar" element={<CreateProduct />} />
        <Route path="/produtos" element={<ListProducts />} />
        <Route path="/produtos/editar/:id" element={<EditProduct />} />
        <Route path="/produtos/excluir/:id" element={<DeleteProduct />} />
        <Route path="/vender" element={<Sale />} />
      </Routes>
    </Router>
  );
}

export default App;
