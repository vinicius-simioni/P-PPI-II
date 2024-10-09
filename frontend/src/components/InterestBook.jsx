import { useState } from 'react';

const InterestBook = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Interested in book:', title);
    setTitle('');
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Adicione um livro de interesse</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter book title"
          required
          className="border-2 p-2 w-1/2 text-gray-700 rounded-lg"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700">
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default InterestBook;
