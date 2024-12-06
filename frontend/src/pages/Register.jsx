import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cidade, setCidade] = useState('');
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/api/register", {
      nome: nome,
      email: email,
      senha: senha,
      cidade: cidade
    })
      .then((response) => {
        console.log('Login bem-sucedido:', response.data);

        // guardar o token no localstorage
        const token = response.data.token;
        localStorage.setItem('token', token)

        // redirecionar para o dashboard
        navigate('/dashboard')
      })
      .catch((error) => {
        console.error('Erro no cadastro:', error.response?.data || error.message);
        
        setError(error.response?.data?.error || 'Ocorreu um erro inesperado. Tente novamente.');
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Cadastre-se</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
          className="border p-2 w-full rounded-lg"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="border p-2 w-full rounded-lg"
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
          className="border p-2 w-full rounded-lg"
        />

        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          placeholder="Cidade"
          required
          className="border p-2 w-full rounded-lg"
        />


        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded-lg hover:bg-blue-700">
          Cadastrar
        </button>

      </form>
    </div>
  );
};

export default Login;
