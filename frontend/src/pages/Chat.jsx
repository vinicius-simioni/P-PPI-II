import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState('');
  const [historico, setHistorico] = useState([]);
  const [chats, setChats] = useState([]);

  const token = localStorage.getItem('token');

  // Buscar histórico de mensagens do chat atual
  const carregarHistorico = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/mensagens/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistorico(response.data);
    } catch (error) {
      console.error('Erro ao carregar histórico de mensagens:', error);
    }
  };

  // Buscar lista de outros chats
  // const carregarChats = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/api/chats', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setChats(response.data);
  //   } catch (error) {
  //     console.error('Erro ao carregar chats:', error);
  //   }
  // };

  // Enviar mensagem
  const enviarMensagem = async () => {
    if (mensagem.trim() !== '') {
      try {
        await axios.post(
          'http://localhost:3000/api/mensagens',
          {
            texto: mensagem,
            id_receptor: id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMensagem('');
        carregarHistorico();
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    }
  };

  // Efeito para carregar dados ao montar o componente ou trocar de chat
  useEffect(() => {
    carregarHistorico();
    // carregarChats();
  }, [id]);

  return (
    <div className="flex h-screen">
      {/* Lista de outros chats (coluna à esquerda) */}
      <div className="w-1/4 border-r p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Seus Chats</h2>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`p-2 mb-2 rounded cursor-pointer ${chat.id.toString() === id ? 'bg-blue-200' : 'hover:bg-gray-200'
                }`}
              onClick={() => navigate(`/chat/${chat.id}`)}
            >
              {chat.nome} {/* Exibe o nome do usuário */}
            </li>
          ))}
        </ul>
      </div>

      {/* Janela de mensagens (coluna à direita) */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Histórico de mensagens */}
        <div className="flex-1 overflow-y-auto border p-4 mb-4">
          <h2 className="text-lg font-bold mb-4">Chat com {id}</h2>
          {historico.length > 0 ? (
            historico.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 ${msg.id_emissor.toString() === id
                    ? 'text-left'
                    : 'text-right text-blue-600'
                  }`}
              >
                <p>{msg.texto}</p>
                <small className="text-gray-500 text-sm">{msg.createdAt}</small>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma mensagem ainda.</p>
          )}
        </div>

        {/* Campo de envio de mensagem */}
        <div className="flex items-center">
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Digite sua mensagem"
            rows="3"
            className="flex-1 p-2 border rounded mr-2"
          />
          <button
            onClick={enviarMensagem}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
