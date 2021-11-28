
import './Form.css'
import React, { useEffect, useState } from 'react';
import api from "../../services/api"
import axios from "axios";

function FormSignUp() {

  const [mensagem, setMensagem] = useState("")
  const [isAlerta, setIsAlerta] = useState(false)
  const [emailCadastro, setEmailCadastro] = useState("")
  const [senhaCadastro, setSenhaCadastro] = useState("")
  const [senhaCopia, setSenhaCopia] = useState("")
  const [dataNascimento, setDataNascimento] = useState("")
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [logradouro, setLogradouro] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [uf, setUf] = useState("")
  const [cep, setCep] = useState("")
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    obterEstados()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    obterCidades()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uf]);

  useEffect(() => {
    obterEnderecoPorCep()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cep]);

  useEffect(() => {
    compararSenha()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senhaCopia, senhaCadastro]);

  const cadastrar = async () => {

    let request = {

      email: emailCadastro,
      senha: senhaCadastro,
      nome,
      telefone,
      dataNascimento,
      usuarioTipo: "0",
      endereco: {
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        cep
      }
    }

    console.log(request);

    if ((
      request.email &&
      request.senha &&
      request.nome &&
      request.telefone &&
      request.endereco.cep &&
      request.endereco.logradouro &&
      request.endereco.numero &&
      request.endereco.bairro &&
      request.endereco.uf &&
      request.endereco.cidade
    )) {
      await api.post("usuarios", request)
        .then(r => {
          console.log(r.data)
          alert(r.data.message)
        })
        .catch(e => {
          console.log(e.response);
          alert(e.response.data.message);
        })
    } else {
      console.log("Preencha todos os campos")
      alert("Preencha todos os campos")
    }
  }

  const obterEnderecoPorCep = async () => {
    var valor = cep.replace(/\D/g, "")
    await axios("https://viacep.com.br/ws/" + valor + "/json")
      .then(r => {
        setLogradouro(r.data.logradouro)
        setBairro(r.data.bairro)
        setCidade(r.data.localidade)
        setUf(r.data.uf)
      })
  };

  const obterEstados = async () => {
    await axios("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(r => {
        var lista = r.data
        lista.sort((a, b) => a.sigla.localeCompare(b.sigla))
        setEstados(r.data)
      })
  }

  const obterCidades = async () => {
    await axios("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + uf + "/municipios")
      .then(r => {
        setCidades(r.data)
      })
  }

  const mascararTelefone = (telefone) => {
    var valor = telefone.replace(/\D/g, "")
    setTelefone(valor)
    if (valor < 10) {
      setTelefone(valor)
    }
    if (valor.length === 10) {
      setTelefone("(" + valor.substring(0, 2) + ") " + valor.substring(2, 6) + "-" + valor.substring(6,))
    }
    if (valor.length === 11) {
      setTelefone("(" + valor.substring(0, 2) + ") " + valor.substring(2, 7) + "-" + valor.substring(7,))
    }
  }

  const mascararCep = (cep) => {
    var valor = cep.replace(/\D/g, "")
    setCep(valor)
    if (valor.length < 8) {
      setCep(valor)
    }
    if (valor.length === 8) {
      setCep(valor.substring(0, 5) + "-" + valor.substring(5,))
    }
  }

  const compararSenha = () => {
    if (senhaCopia !== senhaCadastro && senhaCopia !== "" && senhaCadastro !== "") {

      setMensagem("As senhas não são iguais");
      setIsAlerta(true);

    }
    else {

      setIsAlerta(false);

    }
  }

  return (
    <div className="signup-all">
      <form className="form-cadastro" >        

        <div className="input">
          <input className="name-cadastro" placeholder="nome" value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div className="input inline">
          <input className="half" placeholder="dataNascimento" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
        </div>
        <div className="input inline sec">
          <input className="half" placeholder="telefone" value={telefone} onChange={e => mascararTelefone(e.target.value)} />
        </div>
        <h2>ENDEREÇO</h2>

        <div className="input">
          <input className="half" placeholder="cep" value={cep} onChange={e => mascararCep(e.target.value)} />
        </div>

        <div className="input">
          <input className="rua-cadastro" placeholder="logradouro" value={logradouro} onChange={e => setLogradouro(e.target.value)} />
        </div>

        <div className="input inline">
          <input className="num-cadastro" placeholder="numero" value={numero} onChange={e => setNumero(e.target.value)} />
        </div>

        <div className="input inline sec">
          <input className="comp-cadastro" placeholder="complemento" value={complemento} onChange={e => setComplemento(e.target.value)} />
        </div>

        <div className="input">
          <input className="bairro-cadastro" placeholder="bairro" value={bairro} onChange={e => setBairro(e.target.value)} />
        </div>

        <div className="input inline">
          <select className="half" name="cidade" id="cidade" value={cidade} onChange={e => setCidade(e.target.value)}>
            <option>Cidade</option>
            {cidades.map(item =>
              <option key={item.id}>{item.nome}</option>
            )}
          </select>
        </div>


        <div className="input inline sec">
          <select className="half" name="estado" id="estado" value={uf} onChange={e => setUf(e.target.value)}>
            <option>Estado</option>
            {estados.map(item =>
              <option key={item.sigla}>{item.sigla}</option>
            )}
          </select>
        </div>

        <h2>INFORMAÇÕES PARA LOGIN</h2>

        <div className="input">
          <input className="email-cadastro" placeholder="email" value={emailCadastro} onChange={e => setEmailCadastro(e.target.value)} />
        </div>

        <div className="input inline">
          <input className="half" type="password" placeholder="senha" value={senhaCadastro} onChange={e => setSenhaCadastro(e.target.value)} />
        </div>

        <div className="input inline sec">

          <input className="half" type="password" placeholder="senha" value={senhaCopia} onChange={e => setSenhaCopia(e.target.value)} />

        </div>

        {isAlerta && <div className="msg-fixed">{mensagem}</div>}

        <button className="btn-cadastro" type="button" onClick={() => cadastrar()}>CADASTRAR</button>
      </form>
    </div>
  )
}

export default FormSignUp
