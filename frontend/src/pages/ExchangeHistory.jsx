import { useState, useEffect } from 'react';

const ExchangeHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = [
        { id: 1, book: 'The Great Gatsby', exchangedWith: 'User 1' },
        { id: 2, book: '1984', exchangedWith: 'User 2' },
      ];
      setHistory(response);
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Histórico de Trocas</h2>
      <ul>
        {history.map(item => (
          <li key={item.id}>
            Trocado "{item.book}" com {item.exchangedWith}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExchangeHistory;
