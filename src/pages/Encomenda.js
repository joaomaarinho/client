import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import axios from "axios";
import pag1 from '../assets/cardapio/pag1.png'
import pag2 from '../assets/cardapio/pag2.png'
import pag3 from '../assets/cardapio/pag3.png'
import pag4 from '../assets/cardapio/pag4.png'
import pag5 from '../assets/cardapio/pag5.png'
import '../components/cardapio/Cardapio.css'
import Contato from '../components/Contact/Contato';

export default function Encomenda() {
  return(
    <div className="cardapio-flex">
      <Contato />
      {/* <img className="cardapio" src={pag1}></img> */}
      <img className="cardapio" src={pag2}></img>
      <img className="cardapio" src={pag3}></img>
      <img className="cardapio" src={pag4}></img>
      <img className="cardapio" src={pag5}></img>
    </div>
  )
}

