import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { useAuth } from './context/AuthContext.jsx'

function App() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <nav className="bg-white shadow p-4 flex justify-between">
        <div>
          <Link to="/" className="mr-4 font-bold">Prediction Market</Link>
          {user && <Link to="/dashboard" className="mr-4">Dashboard</Link>}
        </div>
        <div>
          {user ? (
            <>
              <span className="mr-2">{user.email}</span>
              <button onClick={logout} className="bg-red-500 text-white px-2 py-1 rounded">Sair</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-2">Entrar</Link>
              <Link to="/register">Cadastrar</Link>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
