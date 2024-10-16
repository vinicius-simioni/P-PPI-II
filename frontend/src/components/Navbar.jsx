import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg flex justify-between items-center">
      <h1 className="text-xl font-bold">Circular Livros</h1>

      <ul className="flex items-center">

        {token ? (
          <div className="relative">
            <Link to="/dashboard">Dashboard</Link>
            {/* Dropdown Button */}
            <button
              className="hover:underline mx-3"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Menu ▼
            </button>



            {/* Dropdown Items */}
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
