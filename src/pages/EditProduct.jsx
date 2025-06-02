import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/edit_product.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    status: "Ativo",
    image_url: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Erro ao carregar produto:", err));
  }, [id]);

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
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao atualizar produto");

      alert("Produto atualizado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar produto");
    }
  };

  return (
    <div className="edit-product-page">
      <header>
        <h1>Editar Produto</h1>
      </header>

      <main>
        <section className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Preço:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Quantidade:</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Imagem (URL):</label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">
              Atualizar Produto
            </button>
          </form>
        </section>
      </main>

      <footer>
        <p>© 2025 MS Market Management. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default EditProduct;
