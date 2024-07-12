import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Clinic from './pages/Clinic';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Info from './pages/Info';
import Test from './pages/Test';

function App() {
  return (
    <main className="app transition-all ease-in">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clinic" element={<Clinic />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/info" element={<Info />} />
          <Route path="/test" element={<Test />} />

        </Routes>
      </Router>
    </main>
  )
}

export default App
