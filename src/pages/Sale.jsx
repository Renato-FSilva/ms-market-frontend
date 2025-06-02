import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/sale.css";

const Sale = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        product_id: "",
        quantity: ""
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
        const response = await fetch("http://localhost:5000/api/sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao efetuar venda");
      }

      alert("Venda efetuada com sucesso!");
      navigate("/home");
    } catch (error) {
        console.error(error);
        alert("Erro ao efetuar venda");
    }
    };

    return (
        <div className="sale-page">
            <header>
                <h1>Efetuar Venda</h1>
            </header>

            <main>
                <section className="form-section">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="product_id">ID do Produto:</label>
                            <input
                                type="text"
                                id="product_id"
                                name="product_id"
                                value={formData.product_id}
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
                            <label htmlFor="salePrice">Preço de Venda:</label>
                            <input
                                type="number"
                                id="salePrice"
                                name="salePrice"
                                value={formData.salePrice}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit">Efetuar Venda</button>
                        <button className="submit" type="submit" onClick={handleSubmit}>
                            Efetuar Venda
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
}

export default Sale;