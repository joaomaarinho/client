import React, { useState, useEffect, useContext } from 'react';
import ProdutoCarrinho from './ProdutoCarrinho';
import Stripe from '../Stripe/stripe';
import ConfirmaEntrega from './ConfirmaEntrega';
import Contexto from '../../contexto';

function ConfirmaPedido() {

  const {
    produtos, setProdutos,
    total, setTotal,
    estado, setEstado } = useContext(Contexto)

  return (
    <div>
      <h1 className="cart-confirma-pedido">Confirme seu pedido</h1>
      <div>
        {produtos &&
          produtos.map(item =>
            <ProdutoCarrinho
              item={item}
              setProdutos={setProdutos}
              produtos={produtos}
              estado={estado}
              setEstado={setEstado}
              className="produto-cart"
            />
          )}
      </div>
      <div className="cart-valor">
        <div className="cart-subtotal">subtotal</div>
        <div className="cart-subtotal-preco">{Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(total)}</div>
      </div>

    </div>
  )
}

export default ConfirmaPedido
