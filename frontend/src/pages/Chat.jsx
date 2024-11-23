import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState('');
  const [historico, setHistorico] = useState([]);
  const [chats, setChats] = useState([]);

  const token = localStorage.getItem('token');

  // Refs para histórico de mensagens e campo de texto
  const historicoRef = useRef(null);
  const mensagemRef = useRef(null);

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
  const carregarChats = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/chats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(response.data);
    } catch (error) {
      console.error('Erro ao carregar chats:', error);
    }
  };

  // Scrollar para o final do histórico
  useEffect(() => {
    if (historicoRef.current) {
      historicoRef.current.scrollTop = historicoRef.current.scrollHeight;
    }
  }, [historico]);

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
        setMensagem(''); // Limpa a mensagem
        carregarHistorico(); // Atualiza o histórico de mensagens
        // Focar novamente no campo de texto após o envio
        if (mensagemRef.current) {
          mensagemRef.current.focus();
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    }
  };

  // Enviar mensagem com "Enter"
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { // "Enter" sem "Shift"
      event.preventDefault(); // Previne a quebra de linha
      enviarMensagem();
    }
  };

  // Carregar dados ao montar o componente ou trocar de chat
  useEffect(() => {
    carregarHistorico();
    carregarChats();

    // Atualizar o histórico de mensagens e de chats a cada 2 segundos
    const intervalo = setInterval(() => {
      carregarHistorico();
      carregarChats();
    }, 2000);

    // Limpar o intervalo ao desmontar o componente
    return () => clearInterval(intervalo);

  }, [id]);

  return (
    <div className="flex h-[90vh] mx-auto max-w-7xl">
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
      <div className="flex-1 p-4 flex flex-col max-w-3xl">
        {/* Histórico de mensagens */}
        <div
          ref={historicoRef} // Adicionando referência aqui
          className="flex-1 overflow-y-auto border p-4 mb-4"
        >
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
                <p className="break-words">{msg.texto}</p>
                <small className="text-gray-500 text-sm">{msg.createdAt}</small>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma mensagem ainda.</p>
          )}
        </div>

        {/* Campo de envio de mensagem */}
        <div className="flex items-center">
          <input
            ref={mensagemRef}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={handleKeyDown} // Adicionando o evento de tecla
            placeholder="Digite sua mensagem"
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
