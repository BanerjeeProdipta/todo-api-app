import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Task from './pages/Task';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div className="bg-gray-100 min-h-screen">
            <Task />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
