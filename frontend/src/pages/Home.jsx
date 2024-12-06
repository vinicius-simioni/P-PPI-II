import { Link } from "react-router-dom";

const Home = () => (
  <div className="bg-white min-h-80 flex flex-col justify-center items-center text-gray-900">
    <div className="max-w-2xl px-6 py-12 text-center">
      <h1 className="text-4xl font-semibold mb-4">
        Troque Livros com Facilidade
      </h1>
      <p className="text-lg font-light mb-8">
        Conecte-se com leitores e compartilhe seus livros favoritos.
      </p>

      <div className="text-left space-y-4 mb-8">
        <p>📚 <b>Cadastre seus livros</b> para troca.</p>
        <p>🔍 <b>Encontre livros</b> de seu interesse.</p>
        <p>💬 <b>Converse diretamente</b> com outros leitores.</p>
        <p>⭐ <b>Avalie suas trocas</b> para garantir segurança.</p>
      </div>

      <Link
        to="/register"
        className="inline-block bg-blue-500 text-white py-2 px-6 rounded-md text-lg font-medium hover:bg-gray-700 transition-all"
      >
        Cadastre-se
      </Link>
    </div>
  </div>
);

export default Home;
