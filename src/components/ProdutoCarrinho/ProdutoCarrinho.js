import React, { useState, useEffect } from 'react';
import './ProdutoCarrinho.css';

function ProdutoCarrinho(props) {

  const [qtdItem, setQtdItem] = useState(props.item.quantidade)
  const [valorProduto, setValorProduto] = useState(props.item.preco)

  // console.log(props.item)

  useEffect(() => {
    setValorProduto(props.item.valorUnitario * qtdItem)    
  }, [qtdItem])

  useEffect(() => {
    let lista = props.produtos
    lista.forEach(item => {
      if(item.id === props.item.id) {
        item.valorProduto = valorProduto
      }
    })
    console.log(lista)
    props.setProdutos(lista)
    props.setEstado(props.estado + 1)
  }, [valorProduto])

  const removerDoCarrinho = () => {
    let prodCarrinho = [];
    prodCarrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

    // console.log(prodCarrinho)
    for (let index = 0; index < prodCarrinho.length; index++) {
      if (prodCarrinho[index].id === props.item.id) {
        prodCarrinho.splice(index, 1)
      }
    };

    sessionStorage.setItem("carrinho", JSON.stringify(prodCarrinho));

    let lista = JSON.parse(sessionStorage.getItem("carrinho"));
    // console.log(lista)
    window.location.reload()
  }

  return (
    <div className="carrinho-container">
      <div className="primeira-linha">
        <div className="carrinho-nome-produto">{props.item.nome.toUpperCase()}</div>
        <div className="carrinho-valor-produto">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(valorProduto)}
        </div>
      </div>
      <div className="segunda-linha">
        <button className="add"
          onClick={() => (qtdItem > 1) ? setQtdItem(qtdItem - 1) : setQtdItem(1)}>-</button>
        <div className="add-remove">{qtdItem}</div>
        <button className="rem"
          onClick={() => (qtdItem < props.item.quantidadeTotal) ? setQtdItem(qtdItem + 1) : qtdItem}>+</button>
        <button onClick="" className="remover" onClick={() => removerDoCarrinho()}>remover</button>
      </div>
    </div>
  )
}

export default ProdutoCarrinho
