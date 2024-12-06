import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Detectar cliques fora do dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg flex justify-between items-center">
      <h1 className="text-xl font-bold">Circular Livros</h1>

      <ul className="flex items-center">
        {token ? (
          <div className="relative" ref={dropdownRef}>
            <Link to="/dashboard">Dashboard</Link>
            <button
              className="hover:underline mx-3"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Menu ▼
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/profile">Perfil</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-red-500 text-red-700">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <>
            <li className="mx-3">
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li className="mx-3">
              <Link to="/login" className="hover:underline">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};


export default Navbar;
