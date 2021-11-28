import React from 'react';
import './Cadastro.css';

function Cadastro(props) {
  return (
    <div className="usuario-cadastro dados">
      <div className="usuario-cadastro-dado">{props.usuario.nome}</div>
      <div className="usuario-cadastro-dado">{props.usuario.email}</div>
      <div className="usuario-cadastro-dado">{props.usuario.telefone}</div>
      <div className="usuario-cadastro-dado">{props.usuario.dataNascimento}</div>
      {props.usuario.endereco &&
        <div className="usuario-cadastro-dado">
          <div>{props.usuario.endereco.logradouro}</div>
          <div>{props.usuario.endereco.numero}</div>
          <div>{props.usuario.endereco.complemento}</div>
          <div>{props.usuario.endereco.bairro}</div>
          <div>{props.usuario.endereco.cidade}</div>
          <div>{props.usuario.endereco.uf}</div>
        </div>
      }

    </div>
  )
}

export default Cadastro;
