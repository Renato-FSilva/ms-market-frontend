import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/register.css";
import logo from "../assets/undraw_shopping_bags.svg";

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateCNPJ = (cnpj) =>
  /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);

const validatePassword = (senha) =>
  senha.length >= 6;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email: "",
    celular: "",
    senha: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    setServerMsg(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nome) newErrors.nome = "Nome obrigatório";
    if (!validateCNPJ(formData.cnpj)) newErrors.cnpj = "CNPJ inválido";
    if (!validateEmail(formData.email)) newErrors.email = "Email inválido";
    if (!formData.celular) newErrors.celular = "Celular obrigatório";
    if (!validatePassword(formData.senha)) newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMsg(null);

    if (!validate()) return;

    setLoading(true);
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
        setServerMsg({ type: "success", text: result.mensagem });
        setTimeout(() => navigate(result.redirect), 1500);
      } else {
        setServerMsg({ type: "error", text: result.erro || "Erro ao cadastrar." });
      }
    } catch (error) {
      setServerMsg({ type: "error", text: "Erro de conexão com o servidor." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-image">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="form">
        <form onSubmit={handleSubmit} aria-label="Formulário de cadastro">
          <div className="form-header">
            <div className="title">
              <h1>Cadastre-se</h1>
            </div>
            <div className="login-button-to-login">
              <a href="/login" className="login-link">
                Entrar
              </a>
            </div>
          </div>

          {serverMsg && (
            <div
              className={`server-msg ${serverMsg.type}`}
              role={serverMsg.type === "error" ? "alert" : "status"}
              style={{ marginBottom: 10 }}
            >
              {serverMsg.text}
            </div>
          )}

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
                aria-invalid={!!errors.nome}
                aria-describedby="erro-nome"
              />
              {errors.nome && <span id="erro-nome" className="error">{errors.nome}</span>}
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
                aria-invalid={!!errors.cnpj}
                aria-describedby="erro-cnpj"
              />
              {errors.cnpj && <span id="erro-cnpj" className="error">{errors.cnpj}</span>}
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
                aria-invalid={!!errors.email}
                aria-describedby="erro-email"
              />
              {errors.email && <span id="erro-email" className="error">{errors.email}</span>}
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
                aria-invalid={!!errors.celular}
                aria-describedby="erro-celular"
              />
              {errors.celular && <span id="erro-celular" className="error">{errors.celular}</span>}
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
                aria-invalid={!!errors.senha}
                aria-describedby="erro-senha"
              />
              {errors.senha && <span id="erro-senha" className="error">{errors.senha}</span>}
            </div>
          </div>

          <div className="continue-button">
            <button type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
// ...adicione estilos para .error e .server-msg no seu CSS...