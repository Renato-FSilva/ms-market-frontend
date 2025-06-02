import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/activate.css";
import logo from "../assets/undraw_shopping_bags.svg";

const Activate = () => {
  const navigate = useNavigate();
  const [celular, setCelular] = useState("");
  const [codigo, setCodigo] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/sellers/activate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ celular, codigo }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Conta ativada com sucesso!");
        setMessageColor("green");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(result.erro || "Erro ao ativar a conta.");
        setMessageColor("red");
      }
    } catch {
      setMessage("Erro na conexão com o servidor.");
      setMessageColor("red");
    }
  };

  return (
    <div className="container">
      <div className="form-image">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <div className="title">
              <h1>Ativar Conta</h1>
            </div>

          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="celular">Celular</label>
              <input
                id="celular"
                name="celular"
                type="tel"
                placeholder="(xx) xxxxx-xxxx"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <label htmlFor="codigo">Código de Ativação</label>
              <input
                id="codigo"
                name="codigo"
                type="text"
                placeholder="Digite o código recebido"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="continue-button">
            <button type="submit">Ativar</button>
          </div>
          <p style={{ color: messageColor }}>{message}</p>
        </form>
      </div>
    </div>
  );
};

export default Activate;
