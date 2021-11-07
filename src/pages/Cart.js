import React, { useState, useEffect } from 'react';
import api from "../services/api";
import ProdutoCarrinho from '../components/ProdutoCarrinho/ProdutoCarrinho';


function Cart() {

  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);
  const [estado, setEstado] = useState(0);

  useEffect(() => {
    let lista = JSON.parse(localStorage.getItem("carrinho"));
    console.log(lista)
    setProdutos(lista)
  }, [])


  useEffect(() => {
    console.log(produtos)
    let valorTotal = 0;
    produtos.forEach(item => {
      console.log(typeof (item.valorProduto))
      if (typeof (item.valorProduto) === "number")
        valorTotal = valorTotal + item.valorProduto
    })
    console.log("O valor total é:", valorTotal)
    setTotal(valorTotal)
  }, [estado])


  return (
    <div className="cart-container">
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

export default Cart
