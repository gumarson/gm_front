"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.error || 'Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Erro de conexão. Por favor, tente novamente.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-4 shadow-md">
        <h3 className="text-center text-2xl font-bold">Bem-vindo ao Meu Sistema v1.0</h3>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <input aria-label="Email" className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded px-4 py-2" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input aria-label="Senha" className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded px-4 py-2" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded transition duration-150 ease-in-out" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          <button className="mt-4 bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded transition duration-150 ease-in-out" onClick={() => router.push('/register')}>
            Criar Nova Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
