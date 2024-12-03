import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sugestoes = () => {
  const [sugestoes, setSugestoes] = useState([]);
  const [interessesMutuos, setInteressesMutuos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSugestoes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/sugestoes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { matchArray, interessesMutuos } = response.data;

        setSugestoes(matchArray);
        setInteressesMutuos(interessesMutuos);
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSugestoes();
  }, []);

  if (loading) {
    return <p>Carregando sugestões...</p>;
  }

  if (sugestoes.length === 0) {
    return <p>Nenhuma sugestão de troca encontrada.</p>;
  }

  const iniciarChat = (id_usuario) => {
    navigate(`/chat/${id_usuario}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Sugestões de Troca</h2>
      <ul className="space-y-4">
        {sugestoes.map((sugestao, index) => (
          <li key={sugestao.id_livro} className="bg-white p-4 rounded shadow flex flex-col">
            <div>
              <p><strong>Título:</strong> {sugestao.titulo}</p>
              <p><strong>Proprietário:</strong> {sugestao.nome_proprietario} (Usuário {sugestao.id_proprietario})</p>
              {interessesMutuos[index] && interessesMutuos[index].length > 0 && (
                <div className="mt-2">
                  <strong>Interesses mútuos:</strong>
                  <ul className="list-disc list-inside">
                    {interessesMutuos[index].map((titulo, i) => (
                      <li key={i}>{titulo}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex mt-2">
              <button
                onClick={() => iniciarChat(sugestao.id_proprietario)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-2"
              >
                Iniciar Chat
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sugestoes;
