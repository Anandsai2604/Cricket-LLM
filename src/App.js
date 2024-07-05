import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Front1 from './comp/front1';
import IPL from './comp/ipl';
import WorldCup from './comp/worldcup';
import Stats from './comp/Stats6';
import Navigation from './comp/Navigation';
import Rag from './comp/rag';
// import Front from './comp/front'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        <Navigation />
        <Routes>
          <Route path="/" element={<Front1 />} />
          <Route path="/ipl" element={<IPL />} />
          <Route path="/worldcup" element={<WorldCup />} />
          <Route path="/stats" element={<Stats />} />
          <Route path='/rag' element={<Rag/>}/>
          {/* <Route path='/front' element={<Front/>}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
