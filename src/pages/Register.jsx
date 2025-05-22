import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/style.css";
import logo from "../assets/undraw_shopping_bags.svg";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email: "",
    celular: "",
    senha: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:5000/api/sellers", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.mensagem);
        navigate(result.redirect); // redireciona para tela de ativação
      } else {
        alert(result.erro || "Erro ao cadastrar.");
      }
    } catch (error) {
      // <-- esse catch estava dentro do if!
      console.error("Erro de conexão:", error);
      alert("Erro de conexão com o servidor.");
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
              <h1>Cadastre-se</h1>
            </div>
            <div className="login-button">
              <a href="/login" className="login-link">
                Entrar
              </a>
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <label htmlFor="cnpj">CNPJ</label>
              <input
                id="cnpj"
                name="cnpj"
                type="text"
                placeholder="00.000.000/0000-00"
                value={formData.cnpj}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <label htmlFor="celular">Celular</label>
              <input
                id="celular"
                name="celular"
                type="tel"
                placeholder="(xx) xxxx-xxxx"
                value={formData.celular}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                name="senha"
                type="password"
                placeholder="Digite sua Senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="continue-button">
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
