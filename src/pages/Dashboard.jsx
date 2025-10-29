import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const mockEvents = [
  { id: 1, question: 'Candidato X vencerá a eleição?', probability: 0.65 },
  { id: 2, question: 'Brasil ganhará a Copa do Mundo?', probability: 0.45 },
];

function Dashboard() {
  const { user, logout } = useAuth();
  const [points, setPoints] = useState(1000);
  const [history, setHistory] = useState([]);
  const [ranking, setRanking] = useState([
    { name: 'Usuário 1', points: 1200 },
    { name: 'Usuário 2', points: 1100 },
    { name: 'Você', points },
  ]);

  const handlePrediction = (event, prediction) => {
    setPoints(prev => {
      const newPoints = prev - 50;
      updateRanking(newPoints);
      return newPoints;
    });
    setHistory(prev => [
      ...prev,
      {
        event: event.question,
        prediction,
        timestamp: new Date().toLocaleString(),
      },
    ]);
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
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Bem-vindo, {user?.email}</h2>
      <button onClick={logout} className="mb-4 bg-red-500 text-white px-4 py-2">Sair</button>
      <p>Pontos disponíveis: {points}</p>

      <h3 className="mt-4 font-semibold">Eventos</h3>
      <ul className="space-y-2">
        {mockEvents.map(event => (
          <li key={event.id} className="border p-2">
            <strong>{event.question}</strong><br />
            Probabilidade estimada: {Math.round(event.probability * 100)}%<br />
            <button onClick={() => handlePrediction(event, 'Sim')} className="mr-2 bg-blue-500 text-white px-2 py-1">Sim</button>
            <button onClick={() => handlePrediction(event, 'Não')} className="bg-gray-500 text-white px-2 py-1">Não</button>
          </li>
        ))}
      </ul>

      <h3 className="mt-4 font-semibold">Histórico de Apostas</h3>
      <ul className="space-y-1">
        {history.map((item, index) => (
          <li key={index}>
            {item.event} - {item.prediction} ({item.timestamp})
          </li>
        ))}
      </ul>

      <h3 className="mt-4 font-semibold">Ranking</h3>
      <ol>
        {ranking.map((user, index) => (
          <li key={index}>{user.name}: {user.points} pontos</li>
        ))}
      </ol>
    </div>
  );
}

export default Dashboard;
