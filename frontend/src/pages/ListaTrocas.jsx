import { useState, useEffect } from "react";
import axios from "axios";

const ListaTrocas = () => {
  const [trocas, setTrocas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrocas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/trocas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTrocas(response.data); // Supondo que a resposta seja uma lista de trocas

        console.log(response.data)
      } catch (error) {
        console.error("Erro ao buscar as trocas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrocas();
  }, []);

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
            key={troca.id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <p>
                <strong>Proprietário do Livro de Interesse:</strong> 
                {troca.usuarioDestinatario ? troca.usuarioDestinatario.nome : 'Desconhecido'}
              </p>
              <p>
                <strong>Livro de Interesse:</strong> 
                {troca.livroInteresse ? troca.livroInteresse.titulo : 'Desconhecido'}
              </p>
              <p>
                <strong>Proprietário do Livro Proposto:</strong> 
                {troca.usuarioRemetente ? troca.usuarioRemetente.nome : 'Desconhecido'}
              </p>
              <p>
                <strong>Livro Proposto:</strong> 
                {troca.livroProposto ? troca.livroProposto.titulo : 'Desconhecido'}
              </p>
              <p>
                <strong>Data da Troca:</strong> 
                {troca.data ? new Date(troca.data).toLocaleDateString() : 'Data não disponível'}
              </p>
              <p>
                <strong>Proposta:</strong> 
                {troca.texto_proposta || 'Sem proposta'}
              </p>
            </div>
            <div className="mt-2">
              {/* Adicione outros botões ou ações que desejar, como aceitar a troca */}
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-2">
                Aceitar
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-2">
                Recusar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaTrocas;
