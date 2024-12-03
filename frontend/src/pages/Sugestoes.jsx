import { useState, useEffect } from "react";
import axios from "axios";

const Sugestoes = () => {
  const [sugestoes, setSugestoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSugestoes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/sugestoes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSugestoes(response.data);
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

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Sugestões de Troca</h2>
      <ul className="space-y-4">
        {sugestoes.map((sugestao) => (
          <li key={sugestao.id_livro} className="bg-white p-4 rounded shadow">
            <p><strong>Título:</strong> {sugestao.titulo}</p>
            <p><strong>Proprietário:</strong> {sugestao.nome_proprietario} (Usuário {sugestao.id_proprietario})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sugestoes;
