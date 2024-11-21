import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import ExchangeHistory from './pages/ExchangeHistory.jsx';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MeusLivros from './pages/MeusLivros.jsx';
import LivrosDisponiveis from './pages/LivrosDisponiveis.jsx';
import Chat from './pages/Chat.jsx';

const App = () => (
  <Router>
    <Navbar />
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/meus-livros" element={<MeusLivros />} />
        <Route path="/livros-disponiveis" element={<LivrosDisponiveis />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<ExchangeHistory />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </div>
  </Router>
);

export default App;
