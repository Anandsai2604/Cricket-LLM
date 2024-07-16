import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Front1 from './comp/front1';
import IPL from './comp/ipl';
import WorldCup from './comp/worldcup';
import Stats from './comp/Stats6';
import LoginRegister from './comp/loginRegister'; 
import Navigation from './comp/Navigation';
import PrivateRoutes from './comp/PrivateRoutes'; 
import Front from './comp/front';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/loginRegister" element={<LoginRegister />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/front1/:userId" element={<Front1 />} />
            <Route path="/ipl" element={<IPL />} />
            <Route path="/worldcup" element={<WorldCup />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/front/:userId" element={<Front />} />
          </Route>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
