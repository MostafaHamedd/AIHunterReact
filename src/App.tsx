import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import JobAnalyzer from './pages/JobAnalyzer'
import ResumeEditor from './pages/ResumeEditor'
import Applications from './pages/Applications'
import ApplicationDetail from './pages/ApplicationDetail'
import Documents from './pages/Documents'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/analyze" element={<JobAnalyzer />} />
          <Route path="/editor" element={<ResumeEditor />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/:id" element={<ApplicationDetail />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

