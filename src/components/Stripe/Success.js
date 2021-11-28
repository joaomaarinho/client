import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { paymentServer } from '../../helpers';
import { useParams } from 'react-router';
import api from '../../services/api';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Success.css'

function Success({ history }) {
  //funcao para limpar o carrinho quando a compra for finalizada
  const { session_id, pedido_num } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    sessionStorage.clear()
    obterStatus()
  }, [])

  const obterStatus = async () => {
    try {
      console.log(session_id, pedido_num)
      let session = await paymentServer(`pagamento/${session_id}`)
      console.log(session.data.pagamentoStatus)
      let pedido = await api(`pedidos/${pedido_num}`)
      console.log(pedido.data)
      await api(`pedidos/${pedido_num}/novopedido`)
      if (pedido.data.statusPedido === "Aguardando Pagamento") {
        let registrarStatus = await api.patch(`pedidos/${pedido_num}/pagamento`, { statusPagamento: session.data.pagamentoStatus })
        console.log(registrarStatus.data)
      }
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  if (isLoading) {
    return (
      <div className="processando">
        <h1>PROCESSANDO PAGAMENTO, AGUARDE...</h1>
        <CircularProgress size={100} />
      </div>
    )
  }

  return (
    <div className="success-card">
      <h1>Obrigado pelo pedido</h1>
      <h2>Estamos processando o pedido e enviaremos um email em breve</h2>
      <div>
        <button className='button-apos-pagamento fazer-pedido' onClick={() => history.push('/prontaentrega')}>Continue Comprando</button>
      </div>
    </div>
  )
}

export default withRouter(Success);
