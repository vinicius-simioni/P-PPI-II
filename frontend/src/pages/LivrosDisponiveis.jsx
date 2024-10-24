import { useState, useEffect } from 'react';
import axios from 'axios';

const LivrosDisponiveis = () => {
  const [livros, setLivros] = useState([]);
  const [tituloBusca, setTituloBusca] = useState('');
  const [autorBusca, setAutorBusca] = useState('');
  const [cidadeBusca, setCidadeBusca] = useState('');

  useEffect(() => {
  //   const fetchLivros = async () => {
  //     const token = localStorage.getItem('token');

  //     try {
  //       const response = await axios.get('http://localhost:3000/api/livros', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setLivros(response.data);
  //     } catch (error) {
  //       console.error('Erro ao buscar os livros:', error);
  //     }
  //   };

  //   fetchLivros();
  }, []);


  const handleSearch = async () => {
    const token = localStorage.getItem('token');

    console.log(tituloBusca, autorBusca, cidadeBusca)
  
    try {
      const response = await axios.get('http://localhost:3000/api/livros-busca', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        params: {
          titulo: tituloBusca || '',  
          autor: autorBusca || '',
          cidade: cidadeBusca || ''
        },
      });
      setLivros(response.data);  
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };  

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="min-h-fit p-6">

      <div className="mb-6">
        <input
          type="text"
          placeholder="Título"
          value={tituloBusca}
          onChange={(e) => setTituloBusca(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Autor"
          value={autorBusca}
          onChange={(e) => setAutorBusca(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Cidade"
          value={cidadeBusca}
          onChange={(e) => setCidadeBusca(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      {livros.length === 0 ? (
        <p className="text-gray-600">Nenhum livro encontrado.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {livros.map((livro, index) => (
            <li key={index} className="bg-white p-6 rounded shadow flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{livro.titulo}</h3>
                <p className="text-gray-600">Autor: {livro.autor}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LivrosDisponiveis;
