import { useState, useEffect } from 'react';
import axios from 'axios';

const MeusLivros = () => {
  const [livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({ titulo: '', autor: '' });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenSalvo = localStorage.getItem('token');
    if (tokenSalvo) {
      setToken(tokenSalvo)
    }
  }, []);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/livros');
        setLivros(response.data);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
      }
    };

    fetchLivros();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoLivro({ ...novoLivro, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (novoLivro.titulo && novoLivro.autor) {
      try {
        const response = await axios.post('http://localhost:3000/api/livros', novoLivro, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          const livroAdicionado = response.data;

          const livrosAtualizados = [...livros, livroAdicionado];
          setLivros(livrosAtualizados);

          setNovoLivro({ titulo: '', autor: '' });
          setMostrarModal(false);
        } else {
          alert('Erro ao salvar o livro. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar-se à API.');
      }
    } else {
      alert('Preencha todos os campos!');
    }
  };

  const handleDelete = async (index) => {
    //
  };

  return (
    <div className="min-h-fit p-6">
      <button
        onClick={() => setMostrarModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600"
      >
        Cadastrar Novo Livro
      </button>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Cadastrar Novo Livro</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="titulo" className="block font-medium mb-2">Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={novoLivro.titulo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Digite o título do livro"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="autor" className="block font-medium mb-2">Autor</label>
                <input
                  type="text"
                  name="autor"
                  value={novoLivro.autor}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Digite o nome do autor"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Adicionar Livro
                </button>
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)} // Fecha o modal
                  className="text-red-500 hover:underline"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-4">Livros Cadastrados</h2>
        {livros.length === 0 ? (
          <p className="text-gray-600">Nenhum livro cadastrado.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {livros.map((livro, index) => (
              <li key={index} className="bg-white p-6 rounded shadow flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{livro.titulo}</h3>
                  <p className="text-gray-600">Autor: {livro.autor}</p>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:underline ml-4"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default MeusLivros;
