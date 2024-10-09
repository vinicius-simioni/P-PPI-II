import BookList from '../components/BookList.jsx';
import InterestBook from '../components/InterestBook.jsx';

const Home = () => (
  <div className="text-center">
    <h1 className="text-4xl font-bold mb-6 text-gray-800">Plataforma para troca de livros</h1>
    <InterestBook />
    <BookList />
  </div>
);

export default Home;
