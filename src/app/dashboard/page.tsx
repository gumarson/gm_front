import React from 'react';

const DashboardPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h3 className="text-center">Dashboard</h3>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
          <p>This is a protected page accessible after login.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
