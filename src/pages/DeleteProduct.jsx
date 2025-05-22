import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/delete_product.css";

const DeleteProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );
    if (confirmDelete) {
      fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao excluir produto");
          alert("Produto excluído com sucesso!");
          navigate("/produtos");
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao excluir produto");
          navigate("/produtos");
        });
    } else {
      navigate("/produtos");
    }
  }, [id, navigate]);

  return null;
};

export default DeleteProduct;
