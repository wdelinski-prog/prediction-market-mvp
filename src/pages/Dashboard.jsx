import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

const initialEvents = [
  { id: 1, question: 'Candidato X vencerá a eleição?', probability: 0.65 },
  { id: 2, question: 'Brasil ganhará a Copa do Mundo?', probability: 0.45 },
]

function Dashboard() {
  const { user } = useAuth()
  const [points, setPoints] = useState(1000)
  const [history, setHistory] = useState([])
  const [ranking, setRanking] = useState([
    { name: 'Usuário 1', points: 1200 },
    { name: 'Usuário 2', points: 1100 },
    { name: user?.email || 'Você', points },
  ])

  const handlePrediction = (event, prediction) => {
    if (points < 50) return alert('Pontos insuficientes')
    setPoints(prev => {
      const newPoints = prev - 50
      updateRanking(newPoints)
      return newPoints
    })
    setHistory(prev => [
      ...prev,
      {
        event: event.question,
        prediction,
        timestamp: new Date().toLocaleString(),
      },
    ])
  }

  const updateRanking = (newPoints) => {
    setRanking(prev => {
      const updated = prev.map(user =>
        user.name === (user?.email || 'Você') ? { ...user, points: newPoints } : user
      )
      return updated.sort((a, b) => b.points - a.points)
    })
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <p className="mb-2">Pontos disponíveis: {points}</p>

      <h3 className="font-semibold mt-4 mb-2">Eventos</h3>
      <ul className="space-y-2">
        {initialEvents.map(event => (
          <li key={event.id} className="border p-4 rounded bg-white">
            <strong>{event.question}</strong><br />
            Probabilidade estimada: {Math.round(event.probability * 100)}%<br />
            <button onClick={() => handlePrediction(event, 'Sim')} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Apostar Sim</button>
            <button onClick={() => handlePrediction(event, 'Não')} className="bg-red-500 text-white px-2 py-1 rounded">Apostar Não</button>
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mt-6 mb-2">Histórico de Apostas</h3>
      <ul className="space-y-1">
        {history.map((item, index) => (
          <li key={index} className="text-sm">
            {item.timestamp} - {item.event} → {item.prediction}
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mt-6 mb-2">Ranking</h3>
      <ol className="list-decimal pl-4">
        {ranking.map((user, index) => (
          <li key={index}>{user.name}: {user.points} pontos</li>
        ))}
      </ol>
    </div>
  )
}

export default Dashboard
