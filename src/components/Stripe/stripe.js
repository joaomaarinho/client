import React, { useState, useContext, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { fetchFromAPI } from '../../helpers';
import api from '../../services/api';
import Contexto from '../../contexto';
import '../ProdutoCarrinho/ProdutoCarrinho.css';

function Stripe(props) {
  // const [email, setEmail] = useState('');
  // const [nome, setNome] = useState('');
  const stripe = useStripe();

  const {
    email, setEmail,
    total, setTotal,
    logradouro, setLogradouro,
    numero, setNumero,
    complemento, setComplemento,
    bairro, setBairro,
    cidade, setCidade,
    uf, setUf,
    cep, setCep,
    disableCheckout, setDisableCheckout } = useContext(Contexto)


  // useEffect(() => {
  //   let token = localStorage.getItem('token')
  //   if (token) {
  //     api(`usuarios/id`)
  //       .then(res => {
  //         console.log(res.data)
  //         setEmail(res.data.email)
  //         setNome(res.data.nome)
  //       })
  //       .catch(e => {
  //         console.log(e.response)
  //         localStorage.clear()
  //         window.location.href = '/login'
  //       })
  //   }
  // }, [])

  const handleGuestCheckout = async (e) => {
    e.preventDefault();

    let cart = JSON.parse(sessionStorage.getItem("carrinho"));
    let line_items = cart.map(item => { //HELP
      return {//para cada produto adicionado ao carrinho
        quantity: item.quantidade,
        price_data: {
          currency: 'brl',
          unit_amount: item.valorUnitario * 100,
          product_data: { //o que o stripe vai mostrar pro cliente na hora do pagamento
            name: item.nome,
            images: [item.imagem],
          }
        }
      }
    })

    let itens = cart.map(item => {
      return {
        produtoId: item.id,
        quantidade: item.quantidade,
        preco: item.valorUnitario,
        nome: item.nome,
        imagem: item.imagem
      }
    })

    let dados = {
      // valorTotal: total,
      quantidadeTotal: 2, /*arrumar*/
      /*dataPedido: Date.now(),*/
      taxaEntrega: 5, /*arrumar*/
      endereco: { logradouro, numero, complemento, bairro, cidade, uf, cep },
      itens: itens
    }


    dados.pedidoNum = (Math.floor(100000 + Math.random() * 900000).toString()) + Date.now()

    const response = await fetchFromAPI('create-checkout-session', {
      body: {
        pedidoNum: dados.pedidoNum,
        line_items,
        customer_email: email,
        shipping_options: [
          {
            shipping_rate_data:
            {
              display_name: 'Frete',
              type: 'fixed_amount',
              fixed_amount: {
                amount: 500, //arrumar
                currency: 'brl',
              },
              delivery_estimate: {
                minimum: {
                  unit: 'day',
                  value: 5,
                },
                maximum: {
                  unit: 'day',
                  value: 7,
                },
              },
            }
          }
        ]
      },
    });



    console.log(response);
    const { sessionId, valorTotal } = response;

    dados.pagamentoId = sessionId
    dados.valorTotal = valorTotal / 100
    let pedidosResponse = await api.post('pedidos', dados);
    console.log(pedidosResponse);

    const { error } = await stripe.redirectToCheckout({
      sessionId
    });

    if (error) {
      console.log(error);
      //message to user informing the error
    }
  }



  return (
    <div onSubmit={handleGuestCheckout}>
      <form>
        <div>
          {/* <input type='email' onChange={e => setEmail(e.target.value)} placeholder='Email' value={email} className="nodam-input" /> */}
        </div>
        <div className='submit-purchase'>
          <button type='submit' className='button-submit-purchase fazer-pedido' disabled={disableCheckout}>Checkout</button>
        </div>
      </form>
    </div>
  )
}

export default Stripe
