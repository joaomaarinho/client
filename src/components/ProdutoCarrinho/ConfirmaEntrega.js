import React, { useState } from 'react';
import Envio from '../metodoEntrega/Envio';
import Retirada from '../metodoEntrega/Retirada';
import Stripe from '../Stripe/stripe';

function ConfirmaEntrega() {

  const [envio, setEnvio] = useState(false);
  const [retirada, setRetirada] = useState(false);

  return (
    <div className="seleciona-entrega">
      <button className="fazer-pedido envio" onClick={() => { setEnvio(true); setRetirada(false) }}>ENVIO</button>
      <button className="fazer-pedido retirada" onClick={() => { setRetirada(true); setEnvio(false) }}>RETIRADA</button>
      {envio &&
        <div className="endereco-entrega">
          <Envio />
          <Stripe />
        </div>
      }
      {retirada &&
        <>
          <Retirada />
          <Stripe />
        </>
      }
    </div>
  )
}

export default ConfirmaEntrega
