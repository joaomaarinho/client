import React, { useEffect, useState } from 'react';
import ConfirmaPedido from '../components/ProdutoCarrinho/ConfirmaPedido';
import ConfirmaEntrega from '../components/ProdutoCarrinho/ConfirmaEntrega';
import Contexto from '../contexto';
import Stripe from '../components/Stripe/stripe';
import api from '../services/api';

function Cart() {

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [logradouro, setLogradouro] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [uf, setUf] = useState("")
  const [cep, setCep] = useState("")

  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);
  const [estado, setEstado] = useState(0);
  const [disableCheckout, setDisableCheckout] = useState(true)
  const [isEntrega, setIsEntrega] = useState(false)
  const [hideButton, setHideButton] = useState(false)
  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    let lista = JSON.parse(sessionStorage.getItem("carrinho"));
    console.log(lista)
    setProdutos(lista)
  }, [])

  useEffect(() => {
    console.log(produtos)
    let valorTotal = 0;
    if (produtos) {
      produtos.forEach(item => {
        console.log(typeof (item.valorProduto))
        if (typeof (item.valorProduto) === "number")
          valorTotal = valorTotal + item.valorProduto
      })
      console.log("O valor total é:", valorTotal)
      setTotal(valorTotal)
      setDisableButton(false)
    } else {
      setDisableButton(true)
    }
  }, [estado, produtos])

  const checarLogin = () => {
    let token = localStorage.getItem('token')
    if (token && produtos.length) {
      api(`usuarios/id`)
        .then(res => {
          console.log(res.data)
          setEmail(res.data.email)
          setNome(res.data.nome)
          if (res.data.endereco !== null) {
            setLogradouro(res.data.endereco.logradouro)
            setNumero(res.data.endereco.numero)
            setComplemento(res.data.endereco.complemento)
            setBairro(res.data.endereco.bairro)
            setCidade(res.data.endereco.cidade)
            setUf(res.data.endereco.uf)
            setCep(res.data.endereco.cep)
          }
          setIsEntrega(true)
          setHideButton(true)
        })
        .catch(e => {
          console.log(e.response)
          localStorage.clear()
          window.location.href = '/login'
        })
    } else {
      localStorage.clear()
      window.location.href = '/login'
    }
  }

  return (
    <Contexto.Provider value={{
      email, setEmail,
      logradouro, setLogradouro,
      numero, setNumero,
      complemento, setComplemento,
      bairro, setBairro,
      cidade, setCidade,
      uf, setUf,
      cep, setCep,
      produtos, setProdutos,
      total, setTotal,
      estado, setEstado,
      disableCheckout, setDisableCheckout
    }}>
      <div className="cart-container">
        <ConfirmaPedido />
        {!hideButton &&
          <button className="fazer-pedido" onClick={() => checarLogin()} disabled={disableButton}>próximo passo</button>
        }
        {isEntrega &&
          <div>
            <ConfirmaEntrega />
          </div>
        }
      </div>
    </Contexto.Provider>
  )
}

export default Cart
