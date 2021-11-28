
import './App.css';
import React from "react";
import Navbar from "./components/Navbar/Navbar"
import Home from './pages/Home'
import Entrega from "./pages/Entrega"
import Encomenda from "./pages/Encomenda"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Success from './components/Stripe/Success';
import Cancel from './components/Stripe/Cancel';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Perfil from './pages/Perfil';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="all-content-align">
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/prontaentrega' component={Entrega} exact />
            <Route path='/encomenda' component={Encomenda} exact />
            <Route path='/login' component={Login} exact />
            <Route path='/carrinho' render={() => <Cart />} exact />
            <PrivateRoute path='/success/:session_id/:pedido_num' component={Success} exact />
            <PrivateRoute path='/canceled' component={Cancel} exact />
            <PrivateRoute path='/perfil' component={Perfil} exact />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
