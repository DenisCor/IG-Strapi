import React from 'react';
import Home from './pages/Home';
import Create from './pages/Create';
import Nav from './components/Nav';
import SinglePost from './pages/SinglePost';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/create' exact component={Create} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/:id' exact component={SinglePost} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
