import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-fit">

      <main className="p-6">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Livros Disponíveis"
            description="Navegue pelos livros disponíveis e encontre algo do seu interesse."
            route="/livros-disponiveis"
          />
          <DashboardCard
            title="Meus Livros"
            description="Veja a lista de livros que você cadastrou na plataforma."
            route="/meus-livros"
          />
          <DashboardCard
            title="Sugestões de Troca"
            description="Receba sugestões de trocas baseadas nos seus interesses."
            route="/sugestoes"
          />
          <DashboardCard
            title="Chat"
            description="Converse com outros usuários para combinar trocas."
            route="/chat"
          />
          <DashboardCard
            title="Trocas Recebidas"
            description="Acompanhe as propostas de troca recebidas."
            route="/trocas-recebidas"
          />
          <DashboardCard
            title="Trocas Enviadas"
            description="Acompanhe as propostas de troca enviadas."
            route="/trocas-enviadas"
          />
        </section>
      </main>
    </div>
  );
};

const DashboardCard = ({ title, description, route }) => (
  <Link to={route}>
    <div className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow cursor-pointer h-32">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  </Link>
);

export default Dashboard;
