import React, { useState } from 'react'
import FormSignUp from './FormSignUp'
import FormLogin from './FormLogin'
import './Form.css'

const Form = () => {

  const [isSignUp, setIsSignUp] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div>
      <div className="form-collapse" >
        <div className="toggle-center">
          <button className="toggle" type="button" onClick={() => { setIsSignUp(true); setIsLogin(false) }}>CADASTRAR</button>
          <button className="toggle" type="button" onClick={() => { setIsLogin(true); setIsSignUp(false) }}>ENTRAR</button>
        </div>
        {isSignUp &&
          <FormSignUp />
        }
        {isLogin &&
          <FormLogin />
        }
      </div>
      <div className="form-not-collapse">
        <FormSignUp />
        <FormLogin />
      </div>
    </div>
  )
}

export default Form
