import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./style.css";

export default function Registro() {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Suponha que o registro foi bem-sucedido
    setMensagem("Cadastro realizado! Redirecionando para login...");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>
      {mensagem && <div className="alert success">{mensagem}</div>}

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" required />
        <input type="email" placeholder="E-mail" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">Registrar</button>
      </form>

      <div className="toggle-link">
        Já tem conta? <a href="/">Entrar</a>
      </div>
    </div>
  );
}
