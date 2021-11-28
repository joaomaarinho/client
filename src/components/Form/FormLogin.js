
import React, { useState } from 'react';
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import './Form.css'

function FormLogin() {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const history = useHistory();


  const logar = () => {
    let dados = {
      email,
      senha
    }
    api.post('login', dados)
      .then(res => {
        console.log(res)
        localStorage.setItem("token", res.data.token)
        // history.push('/')
        window.location.href = "/"
      })
      .catch(e => {
        console.log(e.response.data)
        alert(e.response.data.message)
      })
  }

  return (
    <div className="signup-all">

      <form className="form-login">
        <i className="fas fa-user-circle"></i>
        <div className="input">
          <input className="email-login" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <input className="senha-login" placeholder="senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
        </div>
        <button className="btn-login" type="button" onClick={() => logar()}>ENTRAR</button>
      </form>

    </div>
  )

}

export default FormLogin;