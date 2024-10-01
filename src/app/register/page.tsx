"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUserCreation = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    console.log('Form data:', { username, name, email, password });

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', { // Ensure this matches the API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, name, email, password }),
      });

      console.log('API response:', response);

      if (response.ok) {
        router.push('/login');
      } else {
        const data = await response.json();
        console.error('Error response data:', data);
        setError(data.error || 'Erro na criação da conta. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('User creation error:', error);
      setError('Erro de conexão. Por favor, tente novamente.');
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-4 shadow-md">
        <h3 className="text-center text-2xl font-bold">Crie uma nova conta</h3>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className="flex flex-col gap-4" onSubmit={handleUserCreation}>
            <input
              aria-label="Nome de usuário"
              className="border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded px-4 py-2 bg-gray-700 text-white"
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              aria-label="Nome"
              className="border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded px-4 py-2 bg-gray-700 text-white"
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              aria-label="Email"
              className="border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded px-4 py-2 bg-gray-700 text-white"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              aria-label="Senha"
              className="border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded px-4 py-2 bg-gray-700 text-white"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition duration-150 ease-in-out"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>
          <button
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded transition duration-150 ease-in-out"
            onClick={() => router.push('/login')}
          >
            Voltar para Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
