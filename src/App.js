import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Front from './front';
import newLogo from './th.png'; // Ensure this path is correct

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={newLogo} className="App-logo" alt="logo" />
      </header>
      <Router>
        <Switch>
          <Route path="/front">
            <Front />
          </Route>
          {/* Add more routes here as needed */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
