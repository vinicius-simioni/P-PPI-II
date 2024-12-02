import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({
    nome: '',
    cidade: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/usuarios/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({
          nome: response.data.nome,
          cidade: response.data.cidade || '',
        });
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário', error);
      }
    };

    if (token) {
      fetchUserData();
    } else {
      console.error('Token inválido ou não encontrado.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(
        `http://localhost:3000/api/usuarios`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Informações atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar as informações do usuário', error);
      setMessage('Erro ao atualizar as informações.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Atualizar Perfil</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={user.nome}
          onChange={(e) => setUser({ ...user, nome: e.target.value })}
          placeholder="Nome"
          required
          className="border p-2 w-full rounded-lg"
        />
        <input
          type="text"
          value={user.cidade}
          onChange={(e) => setUser({ ...user, cidade: e.target.value })}
          placeholder="Cidade"
          className="border p-2 w-full rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded-lg hover:bg-blue-700"
        >
          Atualizar
        </button>
        {message && <p className="text-center text-green-600 mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default Profile;
