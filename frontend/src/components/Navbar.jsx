import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="bg-blue-500 text-white p-4 shadow-lg flex justify-between">
      <h1>Circular Livros</h1>
      <ul className="flex justify-end">
        <li className='mx-3'><Link to="/" className="hover:underline">Home</Link></li>
        {token ? (
          <>
            <li className='mx-3'><Link to="/profile" className="hover:underline">Perfil</Link></li>
            <li className='mx-3'><Link to="/history" className="hover:underline">Histórico de Trocas</Link></li>
            <li className='mx-3'><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
            <li className='mx-3'><Link to="/" onClick={handleLogout} className="hover:underline">Logout</Link></li>
          </>
        ) : (
          <li className='mx-3'><Link to="/login" className="hover:underline">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
