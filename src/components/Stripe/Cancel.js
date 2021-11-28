import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function Cancel({ history }) {
  return (
    <div>
      <h1>Falha no pagamento</h1>
      <p>Ocorreu um erro ao finalizar o pagamento</p>
      <div>
        <button className='button-apos-pagamento' onClick={() => history.push('/prontaentrega')}>Continue Comprando</button>
      </div>
    </div>
  )
}

export default withRouter(Cancel);
