import React from 'react';
import './App.css';
import Contador from './components/contador';
import Mostraeesconde from './components/mostraeesconde';
import PopupTexto from './components/popupTexto';
import Login from './components/login';

function App() {
  return (
    <div className="p-5 mt-4 font-bold text-white bg-blue-500 rounded-lg shadow-lg">
      <section className="ex1">
        <h1>1. Teste do Componente Contador</h1>
        <Contador />
      </section>
      <section className="ex2">
        <h1>2. Teste do Componente Mostra e Esconde</h1>
        <Mostraeesconde />
      </section>
      <section className="ex3">
        <h1>3. Teste do Componente Popup Texto</h1>
        <PopupTexto />
      </section>
      <section className="ex4">
        <h1>4. Teste do Componente Login</h1>
        <Login />
      </section>
    </div>
  );
}

export default App;

