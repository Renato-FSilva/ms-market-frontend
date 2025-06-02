import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" ou "error"

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.access_token);
        setMessage("Login realizado com sucesso!");
        setMessageType("success");

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        setMessage(result.erro || "Erro ao realizar login.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      setMessage("Erro de conexão com o servidor.");
      setMessageType("error");
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="continue-button-login">
            <button type="submit">Entrar</button>
          </div>
        </form>

        {message && (
          <p id="message" className={messageType === "success" ? "success" : "error"}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
