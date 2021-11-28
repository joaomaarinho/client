import React, { useState, useEffect } from 'react'
import './ItemCard.css'



function ItemCard(props) {

    const [qtdItem, setQtdItem] = useState(1)
   


    const adicionarAoCarrinho = () => {
        let prodCarrinho = [];
        prodCarrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
        let idEncontrado = false;
        prodCarrinho.forEach(prod => {
            if (prod.id === props.item.id) {
                prod.quantidade = qtdItem
                idEncontrado = true
            }
        })
        if (idEncontrado === false) {
            prodCarrinho.push({ id: props.item.id, quantidade: qtdItem, nome: props.item.nome, valorUnitario: props.item.preco, quantidadeTotal: props.item.quantidade, imagem: props.item.imagem })
        }
        sessionStorage.setItem("carrinho", JSON.stringify(prodCarrinho));

        let lista = JSON.parse(sessionStorage.getItem("carrinho"));
        console.log(lista)
        props.setMensagem("Produto adicionado ao carrinho")
        props.setVisible(true)
    }


    return (
        <div className="all-elements">
            <div className="container">
                <div className="item-name">
                    <div className="title">{props.item.nome.toUpperCase()}</div>
                </div>
                <div className="sec-content">
                    <div>
                        <div className="ItemCard-image"><img className="imaaage" src={props.item.imagem} alt="imagem"></img></div>
                    </div>
                    <div className="sec-col">
                        <div className="qtd">quantidade</div>
                        <div className="select">
                            <button className="add"
                                onClick={() => (qtdItem > 1) ? setQtdItem(qtdItem - 1) : setQtdItem(1)}>-</button>
                            <div className="add-remove">{props.item.quantidade > 0 ? qtdItem : 0}</div>
                            <button className="rem"
                                onClick={() => (qtdItem < props.item.quantidade) ? setQtdItem(qtdItem + 1) : setQtdItem(props.item.quantidade)}>+</button>
                        </div>
                        <div className="price">{Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(qtdItem * props.item.preco)}</div>
                        <div className="available">quantidade disponível: {props.item.quantidade}</div>
                        <button className="add-cart" onClick={() => adicionarAoCarrinho()}>adicionar ao carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ItemCard