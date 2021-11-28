import React from 'react';
import './Cadastro.css';

function Pedido(props) {
  return (
    <div className="pedido-direction">
      <div className="pedido-qtd">{props.produto.quantidade}<div className="unidade">(uni)</div></div>
      <div className="pedido-prod-nome">{props.produto.nome}</div>      
    </div>
  )
}

export default Pedido
