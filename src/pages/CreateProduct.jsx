import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/create_product.css";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    image_url: "",
    status: "Ativo",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar produto");

      alert("Produto cadastrado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar produto");
    }
  };

  return (
    <div className="create-product-page">
      <header>
        <h1>Cadastrar Produto</h1>
      </header>

      <main>
        <section className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Preço:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantidade:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image_url">Imagem (URL):</label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">
              Cadastrar Produto
            </button>
          </form>
        </section>
      </main>

      <footer>
        <p>© 2025 MS Market Management. Todos os direitos reservados.</p>
        <p>Contato: contato@msmarket.com | (11) 99999-9999</p>
      </footer>
    </div>
  );
};

export default CreateProduct;
