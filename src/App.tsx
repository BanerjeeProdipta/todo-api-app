import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Task from './pages/Task';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Task />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
