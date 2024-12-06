import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PerfilPublico = () => {
  const { id } = useParams(); // Para pegar o id do usuário da URL
  const [usuario, setUsuario] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/perfil/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsuario(response.data.usuario);
        setAvaliacoes(response.data.avaliacoes);
    } catch (error) {
        if (error.response) {
          console.error("Erro na resposta da API:", error.response);
          console.error("Status da resposta:", error.response.status);
          console.error("Dados da resposta:", error.response.data);
        } else if (error.request) {
          console.error("Erro na requisição:", error.request);
        } else {
          console.error("Erro desconhecido:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [id]);


  if (loading) {
    return <p>Carregando perfil...</p>;
  }

  if (!usuario) {
    return <p>Perfil não encontrado.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Perfil de {usuario.nome}</h2>
      <div className="mb-6">
        <p>
          <strong>Nome: </strong>
          {usuario.nome}
        </p>
        <p>
          <strong>Cidade: </strong>
          {usuario.cidade || "Não informada"}
        </p>
        <p>
          <strong>Email: </strong>
          {usuario.email}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Avaliações</h3>
        {avaliacoes.length > 0 ? (
          <ul className="space-y-4">
            {avaliacoes.map((avaliacao) => (
              <li
                key={avaliacao.id}
                className="bg-white p-4 rounded shadow-md flex flex-col space-y-2"
              >
                <div>
                  <strong>Nota: </strong>
                  {avaliacao.nota}
                </div>
                <div>
                  <strong>Comentário: </strong>
                  {avaliacao.comentario || "Sem comentário"}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Este usuário ainda não possui avaliações.</p>
        )}
      </div>
    </div>
  );
};

export default PerfilPublico;
