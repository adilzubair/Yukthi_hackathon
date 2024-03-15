import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Note "Routes" instead of "Switch"
import LoginPage from './pages/login'; // Make sure the path matches the file name and location

function App() {
  return (
    <Router>
      <Routes> {/* "Routes" replaces "Switch" in react-router-dom v6+ */}
        <Route exact path="/" element={<LoginPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
