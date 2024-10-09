import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login with:', { email, senha });

    axios.post("http://localhost:3000/api/login", {
      email: email,
      senha: senha,
    })
      .then((response) => {
        console.log('Login bem-sucedido:', response.data);

        // guardar o token no localstorage
        const token = response.data.token;
        localStorage.setItem('token', token)

        // redirecionar para o dashboard
      })
      .catch((error) => {
        console.error('Erro no login:', error);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Password"
          required
          className="border p-2 w-full rounded-lg"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded-lg hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
