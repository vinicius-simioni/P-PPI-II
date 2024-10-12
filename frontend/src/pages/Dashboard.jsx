import { useState } from 'react';

const Dashboard = () => {
  const [userName] = useState("Teste");

  return (
    <div className="min-h-fit">
      <header className="p-6">
        <h1 className="text-3xl font-semibold">Bem-vindo, {userName}!</h1>
      </header>

      <main className="p-6">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Livros Disponíveis</h2>
            <p className="text-gray-600">
              Navegue pelos livros disponíveis e encontre algo do seu interesse.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Meus Livros</h2>
            <p className="text-gray-600">
              Veja a lista de livros que você cadastrou na plataforma.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Sugestões de Troca</h2>
            <p className="text-gray-600">
              Receba sugestões de trocas baseadas nos seus interesses.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Chat</h2>
            <p className="text-gray-600">
              Converse com outros usuários para combinar trocas.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Sistema de Reputação</h2>
            <p className="text-gray-600">
              Verifique a reputação dos usuários antes de efetuar trocas.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Histórico de Trocas</h2>
            <p className="text-gray-600">
              Acompanhe as trocas realizadas no passado.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
