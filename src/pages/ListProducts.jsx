import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/list_products.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar os produtos:", error);
      alert("Erro ao carregar os produtos");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
        alert("Produto excluído com sucesso!");
      } else {
        alert("Erro ao excluir o produto.");
      }
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
      alert("Erro ao excluir o produto.");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="product-list-page">
      <header>
        <h1>Lista de Produtos</h1>
      </header>

      <main>
        <div className="content-products">
          <table id="productsTable">
            <thead>
              <tr>
                <th>id</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Status</th>
                <th>Imagem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7">Nenhum produto encontrado.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.status}</td>
                    <td>
                      <img
                        src={product.image_url}
                        alt={product.name}
                        width="70"
                      />
                    </td>
                    <td>
                      <Link to={`/edit_product/${product.id}`} className="btn-edit">
                        Editar
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="btn-delete"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      <footer>
        <p>© 2025 MS Market Management. Todos os direitos reservados.</p>
        <p>Contato: contato@msmarket.com | (11) 99999-9999</p>
      </footer>
    </div>
  );
};

export default ProductList;
