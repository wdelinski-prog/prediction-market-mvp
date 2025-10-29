
import React, { useState } from 'react';
import './App.css';

function App() {
  const [userPoints, setUserPoints] = useState(1000);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [events] = useState([
    { id: 1, question: 'Candidato X vencerá a eleição?', probability: 0.65 },
    { id: 2, question: 'Brasil ganhará a Copa do Mundo?', probability: 0.45 },
  ]);
  const [history, setHistory] = useState([]);
  const [ranking, setRanking] = useState([
    { name: 'Usuário 1', points: 1200 },
    { name: 'Usuário 2', points: 1100 },
    { name: 'Você', points: userPoints },
  ]);

  const handlePrediction = () => {
    if (!selectedEvent || !prediction) return;
    alert(`Você apostou "${prediction}" no evento "${selectedEvent.question}".`);
    setUserPoints(prev => {
      const newPoints = prev - 50;
      updateRanking(newPoints);
      return newPoints;
    });
    setHistory(prev => [
      ...prev,
      {
        event: selectedEvent.question,
        prediction,
        timestamp: new Date().toLocaleString(),
      },
    ]);
    setSelectedEvent(null);
    setPrediction('');
  };

  const updateRanking = (newPoints) => {
    setRanking(prev => {
      const updated = prev.map(user =>
        user.name === 'Você' ? { ...user, points: newPoints } : user
      );
      return updated.sort((a, b) => b.points - a.points);
    });
  };

  return (
    <div className="App">
      <h1>Prediction Market MVP</h1>
      <p>Pontos disponíveis: {userPoints}</p>

      <h2>Eventos</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <strong>{event.question}</strong> <br />
            Probabilidade estimada: {Math.round(event.probability * 100)}% <br />
            <button onClick={() => setSelectedEvent(event)}>Fazer previsão</button>
          </li>
        ))}
      </ul>

      {selectedEvent && (
        <div className="prediction-box">
          <h3>Previsão para: {selectedEvent.question}</h3>
          <label>
            Escolha sua previsão:
            <select value={prediction} onChange={e => setPrediction(e.target.value)}>
              <option value="">Selecione</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </label>
          <button onClick={handlePrediction}>Confirmar previsão (-50 pontos)</button>
        </div>
      )}

      <h2>Histórico de Apostas</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            <strong>{item.event}</strong> - Previsão: {item.prediction} ({item.timestamp})
          </li>
        ))}
      </ul>

      <h2>Ranking</h2>
      <ol>
        {ranking.map((user, index) => (
          <li key={index}>
            {user.name}: {user.points} pontos
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
