import React from 'react';
import Pedido from './Pedido';
import './Cadastro.css';

function Compras(props) {


  return (
    <>
      {props.pedidos.map(item =>
        <div className="usuario-compras">
          <div className="data-pedido">{item.dataPedido}</div>
          <div className="usuario-cadastro-pedidos">
            {item.itens.map(produto =>
              <Pedido produto={produto} />
            )}
          </div>
          <div className="valor-status">
            <div>R$ {item.valorTotal}</div>
            <div>{item.statusPedido || "nulo"}</div>
          </div>
        </div>
      )
      }
    </>
  )
}

export default Compras
