import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListaTrocasEnviadas = () => {
  const [trocas, setTrocas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrocas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/trocas-enviadas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        setTrocas(response.data);
      } catch (error) {
        console.error("Erro ao buscar as trocas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrocas();
  }, []);

  const iniciarChat = (id_usuario) => {
    navigate(`/chat/${id_usuario}`);
  };

  const avaliarUsuario = (idDestinatario) => {
    navigate(`/avaliacao/${idDestinatario}`);
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/trocas/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Atualizar o estado da troca após a alteração
      setTrocas((prevTrocas) =>
        prevTrocas.map((troca) =>
          troca.id === id ? { ...troca, status } : troca
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o status da troca:", error);
    }
  };

  if (loading) {
    return <p>Carregando trocas...</p>;
  }

  if (trocas.length === 0) {
    return <p>Nenhuma troca proposta até o momento.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Lista de Trocas</h2>
      <ul className="space-y-4">
        {trocas.map((troca) => (
          <li
            key={troca.usuario_remetente}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <p>
                <strong>Meu livro de interesse: </strong>
                {troca.titulo_interesse || "Desconhecido"}
              </p>
              <p>
                <strong>Proprietário do livro: </strong>
                {troca.nome_destinatario || "Desconhecido"}
              </p>
              <p>
                <strong>Meu livro proposto: </strong>
                {troca.titulo_proposto || "Desconhecido"}
              </p>
              <p>
                <strong>Data da Troca: </strong>
                {troca.data ? new Date(troca.data).toLocaleDateString() : "Data não disponível"}
              </p>
              <p>
                <strong>Proposta: </strong>
                {troca.texto_proposta || "Sem proposta"}
              </p>
            </div>
            <div className="mt-2">
              {/* Mostrar botão "Avaliar Usuário" se a troca for aceita e a data já tiver passado */}
              {troca.status === "aceita" && new Date(troca.data) < new Date() && (
                <button
                  onClick={() => avaliarUsuario(troca.id_destinatario)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Avaliar Usuário
                </button>
              )}
              <button
                onClick={() => iniciarChat(troca.id_destinatario)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-2"
              >
                Iniciar Chat
              </button>
              {troca.status === "pendente" && (
                <span className="text-yellow-500">Troca pendente</span>
              )}
              {troca.status === "aceita" && (
                <span className="text-green-500">Troca aceita</span>
              )}
              {troca.status === "recusada" && (
                <span className="text-red-500">Troca recusada</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaTrocasEnviadas;
