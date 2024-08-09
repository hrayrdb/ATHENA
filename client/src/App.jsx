import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Old from './pages/Old';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Info from './pages/Info';
import Clinic from './pages/Clinic';
import Home from './pages/Home';

function App() {
  return (
    <main className="app transition-all ease-in">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/old" element={<Old />} />
          <Route path="/clinic" element={<Clinic />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
