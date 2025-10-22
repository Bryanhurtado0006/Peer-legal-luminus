import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AllCases from './components/AllCases'
import JurisprudenceLibrary from './components/JurisprudenceLibrary'
import NewCase from './components/NewCase'
import AnalysisProcessing from './components/AnalysisProcessing'
import AnalysisResult from './components/AnalysisResult'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/casos" element={<AllCases />} />
      <Route path="/jurisprudencia" element={<JurisprudenceLibrary />} />
      <Route path="/casos/nuevo" element={<NewCase />} />
      <Route path="/casos/analisis/procesando" element={<AnalysisProcessing />} />
      <Route path="/casos/analisis/resultado" element={<AnalysisResult />} />
    </Routes>
  )
}

export default App