import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Clinic from './pages/Clinic';

function App() {
  return (
    <main className="app transition-all ease-in">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clinic" element={<Clinic />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
