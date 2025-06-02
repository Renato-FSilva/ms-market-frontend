import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home">
      <header>
        <h1>MS MARKET MANAGEMENT</h1>
      </header>

      <main>
        <div className="content">
          <p className="TextoHome">Bem-vindo ao sistema de gerenciamento do seu mercado.</p>
          <p className="TextoHome">Use o menu abaixo para acessar as funcionalidades:</p>

          <div className="product-actions">
            <Link to="/produtos/cadastrar" className="btn">
              Cadastrar Produto
            </Link>
            <Link to="/produtos" className="btn">
              Listar Produtos
            </Link>
            <Link to="/vender" className="btn">
              Efetuar Venda
            </Link>
          </div>
        </div>
      </main>

      <footer>
        <p>© 2025 MS Market Management. Todos os direitos reservados.</p>
        <p>Contato: contato@msmarket.com | (11) 99999-9999</p>
      </footer>
    </div>
  );
};

export default Home;
