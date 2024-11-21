import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const { id } = useParams(); // Pegar o ID do usuário da URL
  const [mensagem, setMensagem] = useState('');

  const enviarMensagem = async () => {
    const texto = mensagem;

    if (texto) {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.post(
          'http://localhost:3000/api/mensagens', 
          {
            texto,              
            id_receptor: id,    
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Mensagem enviada:', response.data);
        setMensagem(''); 
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    }
  };

  return (
    <div>
      <h1>Chat com o usuário {id}</h1>
      <textarea
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Digite sua mensagem"
        rows="5"
        className="w-full p-2 border rounded mb-4"
      />
      <button 
        onClick={enviarMensagem}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Enviar
      </button>
    </div>
  );
};

export default Chat;
