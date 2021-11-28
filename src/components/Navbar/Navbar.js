import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";
import './Navbar.css';

import api from '../../services/api';


class Navbar extends Component {

  state = {
    clicked: false,
    isLogged: false,
    logout: function () {
      localStorage.clear()
      window.location.href = '/'
    }
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      api(`usuarios/id`)
        .then(res => {
          console.log(res.data)
          this.setState({isLogged : true})
        })
        .catch(e => {
          console.log(e.response)
          localStorage.clear()
          this.setState({isLogged : false})
          window.location.href = '/login'
        })
    }
  }

  render() {
    return (
      <nav className="navbarItems">
        <a className="navbar-logo" href="/"><h1 className="navbar-logo">doces grace's</h1></a>
        <div className="menu-icon" onClick={this.handleClick}>
          <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            )
          })}
          {!this.state.isLogged &&
            <li>
              <a className="nav-links-mobile" href="/login">entrar</a>
            </li>
          }
          {this.state.isLogged &&
            <li key="logout">
              <button className="nav-links-mobile sair" onClick={() => this.state.logout()}>Sair</button>
              <a className="nav-links" href="/perfil">meus pedidos</a>
            </li>
          }
        </ul>
        {/* <Button>entrar</Button>
                <button className="collapse"  >entrar</button> */}
      </nav >
    )
  }
}

export default Navbar