import { Button } from "../components/Button";
import ItemCard from '../components/ItemCard/ItemCard';
import Slogan from "../components/Slogan";
import api from "../services/api";
import React, { useEffect, useState } from 'react';


function Entrega() {

	const [produtos, setProdutos] = useState([]);

	useEffect(() => {
		api("produtos")
			.then(res => {
				console.log(res.data)
				setProdutos(res.data)
			})
	}, [])

	return (
		<div className="all-elements">
			{produtos.map(item =>
				<ItemCard item={item} />
			)}
		</div>
	)


}

export default Entrega