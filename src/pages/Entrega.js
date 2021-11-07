import ItemCard from '../components/ItemCard/ItemCard';
import api from "../services/api";
import React, { useEffect, useState } from 'react';


function Entrega() {

	const [produtos, setProdutos] = useState([]);
	const [visible, setVisible] = useState(false)
	const [mensagem, setMensagem] = useState("")

	useEffect(() => {
		api("produtos")
			.then(res => {
				console.log(res.data)
				setProdutos(res.data)
			})
	}, [])

	useEffect(() => {
		if (visible) {
			setTimeout(() => {
				setVisible(false);
			}, 2000);
		}
	}, [visible])

	return (
		<div className="all-elements">
			{produtos.map(item =>
				item.produtoEncerrado !== true && item.produtoAtivo &&
				<ItemCard item={item} setMensagem={setMensagem} setVisible={setVisible} />
			)}
			{visible &&
				<div className="snackbar">{mensagem}</div>
			}
		</div>
	)


}

export default Entrega