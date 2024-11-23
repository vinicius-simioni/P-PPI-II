import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    reputation: 0,
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId'); 
    const token = localStorage.getItem('token'); 

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/usuarios/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser({
          name: response.data.nome, 
          reputation: response.data.reputacao || 0, 
        });
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário', error);
      }
    };

    if (userId && token) {
      fetchUserData();
    } else {
      console.error('Usuário não encontrado ou token inválido.');
    }
  }, []); 

  return (
    <div className="text-center mt-8">
    </div>
  );
};

export default Profile;
