import React from 'react';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <main className="text-center p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-500">
          Добро пожаловать!
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Это ваше новое React-приложение, созданное с помощью TypeScript и Tailwind CSS.
        </p>
        <div className="bg-gray-900/70 rounded-lg p-4 border border-gray-600">
          <p className="text-lg text-gray-400">
            Начните редактировать <code className="bg-gray-700 text-teal-300 rounded-md px-2 py-1 font-mono text-base">App.tsx</code> и сохраните, чтобы увидеть изменения.
          </p>
        </div>
      </main>
      <footer className="absolute bottom-4 text-gray-500 text-sm">
        <p>Сгенерировано с любовью к чистому коду.</p>
      </footer>
    </div>
  );
};

export default App;
