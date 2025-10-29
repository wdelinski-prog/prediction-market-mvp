
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="hero">
        <h1>Prediction Market MVP</h1>
        <p>Participe de previsões sem dinheiro real. Escolha, vote e acompanhe os resultados!</p>
      </header>

      <section className="cards">
        <div className="card">
          <h2>Previsão 1</h2>
          <p>O dólar vai subir até o fim do mês?</p>
          <button>Votar</button>
        </div>
        <div className="card">
          <h2>Previsão 2</h2>
          <p>O Brasil vai ganhar a próxima Copa?</p>
          <button>Votar</button>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Prediction Market MVP. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
