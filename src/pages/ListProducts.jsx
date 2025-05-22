import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/list_products.css";

const ListProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="list-products-page">
      <header>
        <h1>Lista de Produtos</h1>
      </header>

      <main>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>R$ {product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.status}</td>
                  <td>
                    <Link to={`/produtos/editar/${product.id}`}>Editar</Link> |{" "}
                    <Link to={`/produtos/excluir/${product.id}`}>Excluir</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum produto cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      <footer>
        <p>© 2025 MS Market Management. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default ListProducts;
