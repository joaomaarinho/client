import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";
import { Button } from "../Button";
import './Navbar.css';
import { useHistory } from "react-router-dom";



class Navbar extends Component {
    
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }


    render() {
        return(
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
                </ul>
                {/* <Button>entrar</Button>
                <button className="collapse"  >entrar</button> */}
            </nav>            
        )
    }
}

export default Navbar