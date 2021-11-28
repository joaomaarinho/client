import React, { useEffect, useState } from 'react';
import Cadastro from '../components/Perfil Cliente/Cadastro';
import Compras from '../components/Perfil Cliente/Compras';
import api from '../services/api';
import '../components/Perfil Cliente/Cadastro.css';

function Perfil() {
  const [pedidos, setPedidos] = useState([])
  const [usuario, setUsuario] = useState({})

  useEffect(() => {
    console.log("carregou")
    api(`pedidos/usuario_id`)
      .then(res => {
        console.log(res.data)
        setPedidos(res.data)
      })
      .catch(e => {
        console.log(e.response.data.message)
      })
    api(`usuarios/id`)
      .then(res => {
        console.log(res.data)
        setUsuario(res.data)
      })
      .catch(e => {
        console.log(e.response)

      })
  }, [])


  return (
    <div className="posicao">
      <Cadastro usuario={usuario} />
      <Compras pedidos={pedidos}/>
    </div>
  )
}

export default Perfil
