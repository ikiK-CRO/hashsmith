import './App.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App () {
  const [fData, setData] = useState({})
  const [fDataVal, setDataVal] = useState([])

  useEffect(() => {
    axios.get('/miners.json').then(res => {
      // Object.groupBy(res.data[19].values, ({ pdu }) => pdu);
      // console.log(res.data[19].values)
      res.data[19].values.forEach(e => {
        // console.log(e)

        switch (true) {
          case e.s === 10:
            e.color = 'green'
            break
          case e.s === 20:
            e.color = 'blue'
            break
          case e.s === 30:
            e.color = 'orange'
            break
          case e.s === 40:
            e.color = 'brown'
            break
          case e.s === 50:
            e.color = 'pink'
            break
          case e.s === 60:
            e.color = 'red'
            break
          default:
            e.color = 'gray'
        }

        // console.log(e)
      })
      setData(res.data[19])
      setDataVal(res.data[19].values)
    })
  }, [])

  function handleClick (data) {
    console.log(data)
    let TH5s = 'Hashrate u zadnjih 5s: ' + JSON.stringify(data.TH5s)
    let THAvg =
      '\nProsječan hashrate kroz zadnjih sat vremena: ' +
      JSON.stringify(data.THAvg)
    let tB = '\nTemperatura pločice minera: ' + JSON.stringify(data.tB)
    let freq = '\nFrekvencija: ' + JSON.stringify(data.freq)
    let w = '\nTrenutna snaga minera: ' + JSON.stringify(data.w)
    let s = '\nStanje minera: ' + JSON.stringify(data.s)
    let pdu = '\nGrupa: ' + JSON.stringify(data.pdu)
    let port = '\nRedni broj unutar grupe: ' + JSON.stringify(data.port)

    console.log(TH5s)
    alert(TH5s + THAvg + tB + freq + w + s + pdu + port)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='text-center'>{fData.name}</h1>
      </header>
      <div className='row'>
        <div className='column'>
          {fDataVal.map((item, index) =>
            item.pdu === 1 && item.port <= 13 ? (
              <button
                onClick={() => handleClick(item)}
                key={index}
                className='cell'
                style={{
                  backgroundColor: item.color
                }}
              >
                {JSON.stringify(item.port)}
              </button>
            ) : null
          )}
        </div>
        <div className='column'>
          {fDataVal.map((item, index) =>
            item.pdu === 2 && item.port <= 13 ? (
              <button
                onClick={() => handleClick(item)}
                key={index}
                className='cell'
                style={{
                  backgroundColor: item.color
                }}
              >
                {JSON.stringify(item.port)}
              </button>
            ) : null
          )}
        </div>
        <div className='column'>
          {fDataVal.map((item, index) =>
            item.pdu === 3 && item.port <= 13 ? (
              <button
                onClick={() => handleClick(item)}
                key={index}
                className='cell'
                style={{
                  backgroundColor: item.color
                }}
              >
                {JSON.stringify(item.port)}
              </button>
            ) : null
          )}
        </div>
      </div>

      <div className='row'>
        <div className='column'>
          {fDataVal.map((item, index) =>
            item.pdu === 4 ? (
              <button
                onClick={() => handleClick(item)}
                key={index}
                className='cell'
                style={{
                  backgroundColor: item.color
                }}
              >
                {JSON.stringify(item.port)}
              </button>
            ) : null
          )}
        </div>
        <div className='column'>
          {fDataVal.map((item, index) =>
            item.pdu === 5 ? (
              <button
                onClick={() => handleClick(item)}
                key={index}
                className='cell'
                style={{
                  backgroundColor: item.color
                }}
              >
                {JSON.stringify(item.port)}
              </button>
            ) : null
          )}
        </div>
        <div className='column'>
          {fDataVal.map((item, index) =>
            item.pdu === 6 ? (
              <button
                onClick={() => handleClick(item)}
                key={index}
                className='cell'
                style={{
                  backgroundColor: item.color
                }}
              >
                {JSON.stringify(item.port)}
              </button>
            ) : null
          )}
        </div>
      </div>
      <div className='row'>
        <div className='column'>
          {fDataVal.map((item, index) =>
            item.pdu === 7 ? (
              <button
                onClick={() => handleClick(item)}
                key={index}
                className='cell'
                style={{
                  backgroundColor: item.color
                }}
              >
                {JSON.stringify(item.port)}
              </button>
            ) : null
          )}
        </div>
        <div className='column'>
          {fDataVal.map((item, index) =>
            item.pdu === 8 ? (
              <button
                onClick={() => handleClick(item)}
                key={index}
                className='cell'
                style={{
                  backgroundColor: item.color
                }}
              >
                {JSON.stringify(item.port)}
              </button>
            ) : null
          )}
        </div>
        <div className='column'>
          {fDataVal.map((item, index) =>
            item.pdu === 9 ? (
              <button
                onClick={() => handleClick(item)}
                key={index}
                className='cell'
                style={{
                  backgroundColor: item.color
                }}
              >
                {JSON.stringify(item.port)}
              </button>
            ) : null
          )}
        </div>
      </div>
    </div>
  )
}

export default App
