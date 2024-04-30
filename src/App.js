import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import EditMeditations from './pages/DeleteMeditation';
import AddMeditation from './pages/AddMeditation';
import AnalysisPage from './pages/Analysis';


const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Delete Meditations</Link>
            </li>
            <li>
              <Link to="/add">Add New Meditation</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<EditMeditations />} />
          <Route path="/add" element={<AddMeditation />} />
          <Route path="/analysis" element={<AnalysisPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
