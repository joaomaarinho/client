import React, { useState } from 'react';
import './Contato.css';
import api from '../../services/api';
import CircularProgress from '@material-ui/core/CircularProgress';

function Contato() {

  let [assunto, setAssunto] = useState("")
  let [nome, setNome] = useState("")
  let [email, setEmail] = useState("")
  let [telefone, setTelefone] = useState("")
  let [mensagem, setMensagem] = useState("")
  const [isLoading, setIsloading] = useState(false)

  const enviarMensagem = async (e) => {
    e.preventDefault()
    let dados = {
      nome,
      email,
      assunto,
      telefone,
      mensagem
    }
    console.log(dados)
    await api.post(`encomendas`, dados)
      .then(res => {
        console.log(res)
        alert(res.data.message)
        // history.push('/')
      })
      .catch(e => {
        console.log(e.response.data.message)
        alert(e.response.data.message)
      })
      .finally(() => {
        setIsloading(false)
      })
  }

  if (isLoading) {
    return (
      <div className="contato-input carregando">
        <div className="contato-mensagem-enviando">ENVIANDO EMAIL, AGUARDE...</div>
        <CircularProgress size={100} />
      </div>
    )
  }

  return (
    <div>
      {!isLoading &&
        <>
          <div className="contato-titulo">SOLICITAÇÃO DE ORÇAMENTO</div>
          <form className="contato">
            <div className="contato-input">
              <input placeholder="assunto" value={assunto} onChange={(e) => setAssunto(e.target.value)} />
              <input placeholder="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              <input placeholder="email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
              <input placeholder="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
              <input className="contato-input-mensagem" placeholder="mensagem" value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
            </div>
            <button className="contato-botao" onClick={e => { setIsloading(true); enviarMensagem(e) }}>ENVIAR</button>
            <div className="contato-titulo">OU SOLICITE ORÇAMENTO DIRETAMENTO PELO WHATSAPP</div>
            <a className="whatsapp" href="https://api.whatsapp.com/send?phone=+5512992321114">
              <i className="fab fa-whatsapp-square fa-4x"></i>
            </a>
          </form>
        </>
      }
    </div>
  )
}

export default Contato
