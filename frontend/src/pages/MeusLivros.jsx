import { useState, useEffect } from 'react';
import axios from 'axios';

const MeusLivros = () => {
  const [livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({ titulo: '', autor: '', status: 'D' });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editar, setEditar] = useState(false);
  const [livroAtual, setLivroAtual] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchLivros = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/livros-usuario', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLivros(response.data);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
      }
    };

    fetchLivros();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (editar && livroAtual) {
      setLivroAtual({ ...livroAtual, [name]: value });
    } else {
      setNovoLivro({ ...novoLivro, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (novoLivro.titulo && novoLivro.autor) {
      try {
        const response = await axios.post('http://localhost:3000/api/livros', novoLivro, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          const livroAdicionado = response.data;
          setLivros([...livros, livroAdicionado]);

          setNovoLivro({ titulo: '', autor: '', status: 'D' });
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (livroAtual.titulo && livroAtual.autor) {
      try {
        const response = await axios.put(`http://localhost:3000/api/livros/${livroAtual.id}`, livroAtual, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const livrosAtualizados = livros.map((livro) =>
            livro.id === livroAtual.id ? response.data : livro
          );
          setLivros(livrosAtualizados);
          setLivroAtual(null);
          setMostrarModal(false);
        } else {
          alert('Erro ao editar o livro. Tente novamente.');
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
    const token = localStorage.getItem('token');
    const livro = livros[index];

    try {
      const response = await axios.delete(`http://localhost:3000/api/livros/${livro.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        const livrosAtualizados = livros.filter((_, i) => i !== index);
        setLivros(livrosAtualizados);
      } else {
        alert('Erro ao deletar o livro. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar-se à API.');
    }
  };

  const openEditModal = (livro) => {
    setLivroAtual(livro);
    setNovoLivro({ titulo: livro.titulo, autor: livro.autor, status: livro.status });
    setMostrarModal(true);
    setEditar(true);
  };

  return (
    <div className="min-h-fit p-6">
      <button
        onClick={() => {
          setMostrarModal(true);
          setEditar(false);
          setNovoLivro({ titulo: '', autor: '', status: 'D' });
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600"
      >
        Cadastrar Novo Livro
      </button>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">{editar ? 'Editar Livro' : 'Cadastrar Novo Livro'}</h2>
            <form onSubmit={editar ? handleEditSubmit : handleSubmit}>
              <div className="mb-4">
                <label htmlFor="titulo" className="block font-medium mb-2">Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={editar ? livroAtual.titulo : novoLivro.titulo}
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
                  value={editar ? livroAtual.autor : novoLivro.autor}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Digite o nome do autor"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block font-medium mb-2">Status</label>
                <div className="flex items-center">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="status"
                      value="D"
                      checked={editar ? livroAtual.status === 'D' : novoLivro.status === 'D'}
                      onChange={handleChange}
                    />
                    Disponível
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value="I"
                      checked={editar ? livroAtual.status === 'I' : novoLivro.status === 'I'}
                      onChange={handleChange}
                    />
                    Interesse
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {editar ? 'Atualizar Livro' : 'Adicionar Livro'}
                </button>
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
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
              <li key={livro.id} className="bg-white p-6 rounded shadow flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{livro.titulo}</h3>
                  <p className="text-gray-600">Autor: {livro.autor}</p>
                  <p className="text-gray-600">Status: {livro.status === 'D' ? 'Disponível' : 'Interesse'}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => openEditModal(livro)}
                    className="text-blue-500 hover:underline ml-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:underline ml-4"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default MeusLivros;
