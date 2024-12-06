import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CadastroAvaliacao = () => {
  const { id } = useParams();
  const [nota, setNota] = useState(1);
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `http://localhost:3000/api/avaliacao/${id}`,
        {
          nota,
          comentario,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Avaliação criada:", response.data);
      setNota(1);
      setComentario("");
    } catch (error) {
      if (error.response) {
        console.error("Erro no servidor:", error.response.data);
        setErro(error.response.data.error || "Erro ao cadastrar avaliação.");
      } else if (error.request) {
        console.error("Erro na requisição:", error.request);
        setErro("Erro na requisição.");
      } else {
        console.error("Erro desconhecido:", error.message);
        setErro("Erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Avaliar Usuário</h2>
      {erro && <p className="text-red-500">{erro}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nota" className="block text-sm font-medium">Nota (1 a 5)</label>
          <input
            type="number"
            id="nota"
            value={nota}
            onChange={(e) => setNota(Number(e.target.value))}
            min="1"
            max="5"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="comentario" className="block text-sm font-medium">Comentário</label>
          <textarea
            id="comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Cadastrar Avaliação"}
        </button>
      </form>
    </div>
  );
};

export default CadastroAvaliacao;
