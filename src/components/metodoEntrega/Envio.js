import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Contexto from '../../contexto';
import '../ProdutoCarrinho/ProdutoCarrinho.css';

function Envio() {

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [isBlur, setIsBlur] = useState(0);
  const [isAlerta, setIsAlerta] = useState(false);

  const {
    logradouro, setLogradouro,
    numero, setNumero,
    complemento, setComplemento,
    bairro, setBairro,
    cidade, setCidade,
    uf, setUf,
    cep, setCep,
    disableCheckout, setDisableCheckout } = useContext(Contexto)

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
  }, [isBlur]);

  useEffect(() => {
    habilitarCheckout()
  }, [cidade, numero])

  const habilitarCheckout = () => {
    console.log(cidade)
    if ((cidade === "São José dos Campos" && numero !== "") || (cidade === "Jacareí" && numero !== "")) {
      setDisableCheckout(false)
      setIsAlerta(false)
    } else {
      console.log("Não fazemos entregas para esse endereço")
      setIsAlerta(true)
      setDisableCheckout(true)
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
      .catch(() => {
        console.log("Cep Inválido")
        setCidade("Cidade")
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

  return (

    <form className="endereco-entrega">
      <div>
        <input className="entrega-cep" placeholder="cep" value={cep} onChange={e => mascararCep(e.target.value)}
          onFocus={() => setDisableCheckout(true)} onBlur={() => { setIsBlur(isBlur + 1); habilitarCheckout() }} />
      </div>
      <div>
        <input className="entrega-rua" placeholder="rua" value={logradouro} onChange={e => setLogradouro(e.target.value)}
          onFocus={() => setDisableCheckout(true)} onBlur={() => { habilitarCheckout() }} />
      </div>
      <div>
        <input className="entrega-numero" placeholder="numero" value={numero} onChange={e => setNumero(e.target.value)}
          onFocus={() => setDisableCheckout(true)} onBlur={() => { habilitarCheckout() }} />
      </div>
      <div>
        <input className="entrega-bairro" placeholder="bairro" value={bairro} onChange={e => setBairro(e.target.value)}
          onFocus={() => setDisableCheckout(true)} onBlur={() => { habilitarCheckout() }} />
      </div>
      <div>
        <div className="entrega-cidade">
          <select className="entrega-cidade-select" name="cidade" id="cidade" value={cidade} onChange={e => setCidade(e.target.value)}
            onFocus={() => setDisableCheckout(true)} onBlur={() => { habilitarCheckout() }}>
            <option>Cidade</option>
            {cidades.map(item =>
              <option key={item.id}>{item.nome}</option>
            )}
          </select>
        </div>
      </div>
      <div>
        <div className="entrega-estado">
          <select className="entrega-estado-select" name="estado" id="estado" value={uf} onChange={e => setUf(e.target.value)}
            onFocus={() => setDisableCheckout(true)} onBlur={() => { habilitarCheckout() }}>
            <option>Estado</option>
            {estados.map(item =>
              <option key={item.sigla}>{item.sigla}</option>
            )}
          </select>
        </div>
      </div>
      <div>
        <input className="entrega-complemento" placeholder="complemento" value={complemento} onChange={e => setComplemento(e.target.value)}
          onFocus={() => setDisableCheckout(true)} onBlur={() => { habilitarCheckout() }} />
      </div>

      {isAlerta &&
        <div>Não fazemos entregas para esse endereço</div>
      }

      {!isAlerta &&
        <div>Taxa de Entrega: R$ 5,00</div>
      }
    </form>

  )
}

export default Envio
