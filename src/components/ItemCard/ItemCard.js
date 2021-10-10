import React, { useState } from 'react'
import './ItemCard.css'



function ItemCard(props) {

    const [ qtdItem, setQtdItem ] = useState(1)
    

    return (
        <div className="all-elements">
            <div className="container">
                <div className="item-name">
                    <div className="title">{props.item.descricao}</div>
                </div>
                <div className="sec-content">
                    <div>
                        <div className="ItemCard-image"><img className="imaaage" src="https://media.istockphoto.com/photos/honey-cookie-chocolate-covered-picture-id1299331777?s=612x612"></img></div>
                    </div>
                    <div className="sec-col">
                        <div className="qtd">quantidade</div>
                        <div className="select">
                            <button className="add"
                            onClick={() => (qtdItem > 1) ? setQtdItem(qtdItem-1) : setQtdItem(1)}>-</button>
                            <div className="add-remove">{qtdItem}</div>
                            <button className="rem"
                            onClick={() => (qtdItem < props.item.quantidade) ? setQtdItem(qtdItem+1) : setQtdItem(props.item.quantidade)}>+</button>
                        </div>
                        <div className="price">R$ {qtdItem * props.item.preco}</div>
                        <div className="available">quantidade disponível: {props.item.quantidade}</div>
                        <button className="add-cart">adicionar ao carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ItemCard