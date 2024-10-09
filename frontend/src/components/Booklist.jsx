import { useState, useEffect } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = [
        { id: 1, title: 'The Great Gatsby', owner: 'User 1' },
        { id: 2, title: '1984', owner: 'User 2' },
      ];
      setBooks(response);
    };

    fetchBooks();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Livros disponíveis</h2>
      <ul className="space-y-4">
        {books.map(book => (
          <li key={book.id} className="p-4 border-b-2 border-gray-300">
            <span className="font-semibold">{book.title}</span> - Dono: {book.owner}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
