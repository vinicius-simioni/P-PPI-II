import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sugestoes = () => {
  const [sugestoes, setSugestoes] = useState([]);
  const [interessesMutuos, setInteressesMutuos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar o modal
  const [selectedUser, setSelectedUser] = useState(null); // Usuário selecionado para troca
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

  const iniciarChat = (id_usuario) => {
    navigate(`/chat/${id_usuario}`);
  };

  // Este useEffect será chamado sempre que selectedUser mudar
  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);

  const proporTroca = (sugestao) => {
    setSelectedUser(sugestao);
    setModalOpen(true); // Abre o modal
  };

  const fecharModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Capturar e processar os dados do formulário
    console.log("Proposta enviada.");
    fecharModal();
  };

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
        {sugestoes.map((sugestao, index) => (
          <li key={sugestao.id_livro} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <p><strong>Título:</strong> {sugestao.titulo}</p>
              <p><strong>Proprietário:</strong> {sugestao.nome_proprietario} (Id {sugestao.id_proprietario})</p>
              {interessesMutuos[index] && interessesMutuos[index].length > 0 && (
                <div className="mt-2">
                  <strong>Interessado em:</strong>
                  <div className="list-inside">
                    {interessesMutuos[index].map((livro, i) => (
                      <p key={livro.id}><strong>Título:</strong> {livro.titulo}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-2">
              <button
                onClick={() => iniciarChat(sugestao.id_proprietario)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-2"
              >
                Iniciar Chat
              </button>
              <button
                onClick={() => proporTroca(sugestao)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-2"
              >
                Propor uma troca
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">Propor Troca</h3>
            {selectedUser && (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Campos Ocultos */}
                <input
                  type="hidden"
                  name="idLivroInteresse"
                  value={selectedUser.id_livro}
                />
                <input
                  type="hidden"
                  name="idDestinatario"
                  value={selectedUser.id_proprietario}
                />

                {/* Campo Proprietário */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Destinatário
                  </label>
                  <input
                    type="text"
                    value={selectedUser.nome_proprietario}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
                  />
                </div>

                {/* Campo Título do Livro */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Título do meu livro de interesse
                  </label>
                  <input
                    type="text"
                    value={selectedUser.titulo}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
                  />
                </div>

                {/* Campo Livro Proposto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Título do livro que proponho para ele
                  </label>
                  <select
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                    required
                  >
                    <option value="">Selecione um livro</option>
                    {interessesMutuos
                      .find((_, index) => sugestoes[index]?.id_livro === selectedUser?.id_livro)
                      ?.map((livro) => (
                        <option key={livro.id} value={livro.id}>
                          {livro.titulo}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Campo Data da Troca */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Data da Troca
                  </label>
                  <input
                    type="date"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                    required
                  />
                </div>

                {/* Campo Proposta de Troca */}
                <div>
                  <label htmlFor="proposta" className="block text-sm font-medium text-gray-700">
                    Proposta de Troca
                  </label>
                  <textarea
                    id="proposta"
                    rows="4"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Descreva sua proposta de troca."
                    required
                  ></textarea>
                </div>

                {/* Botões */}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={fecharModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Enviar Proposta
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sugestoes;
