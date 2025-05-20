import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./style.css";

export default function Ativacao() {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensagem("Conta ativada! Redirecionando para login...");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="container">
      <h2>Ativação de Conta</h2>
      {mensagem && <div className="alert success">{mensagem}</div>}

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Código de Ativação" required />
        <button type="submit">Ativar</button>
      </form>
    </div>
  );
}
