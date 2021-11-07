
import './App.css';
import React from "react";
import Navbar from "./components/Navbar/Navbar"
import Home from './pages/Home'
import Entrega from "./pages/Entrega"
import Encomenda from "./pages/Encomenda"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/prontaentrega' component={Entrega} exact />
          <Route path='/encomenda' component={Encomenda} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/carrinho' render={() => <Cart />} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
