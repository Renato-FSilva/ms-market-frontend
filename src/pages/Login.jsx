import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./style.css";

export default function Login() {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você chamaria sua API Flask
    const sucesso = true;

    if (sucesso) {
      setMensagem("Login realizado com sucesso! Redirecionando...");
      setTimeout(() => navigate("/painel"), 2000);
    } else {
      setMensagem("E-mail ou senha inválidos!");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {mensagem && <div className="alert success">{mensagem}</div>}

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="E-mail" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>

      <div className="toggle-link">
        Não tem conta? <a href="/registro">Cadastre-se</a>
      </div>
    </div>
  );
}
