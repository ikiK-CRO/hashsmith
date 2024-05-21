import './App.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from './Modal'

function App () {
  const [fData, setData] = useState({})
  const [fDataVal, setDataVal] = useState([])

  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')

  const openModal = data => {
    setModalOpen(true)
    // console.log(data)

    let TH5s =
      'Hashrate u zadnjih 5s: ' +
      (data.TH5s ? JSON.stringify(data.TH5s) : 'No data')
    let THAvg =
      '\nProsječan hashrate kroz zadnjih sat vremena: ' +
      (data.THAvg ? JSON.stringify(data.THAvg) : 'No data')

    let tB =
      '\nTemperatura pločice minera: ' +
      (data.tB ? JSON.stringify(data.tB) : 'No data')
    let freq =
      '\nFrekvencija: ' + (data.freq ? JSON.stringify(data.freq) : 'No data')
    let w =
      '\nTrenutna snaga minera: ' +
      (data.w ? JSON.stringify(data.w) : 'No data')
    let s = '\nStanje minera: ' + (data.s ? JSON.stringify(data.s) : 'No data')
    let pdu = '\nGrupa: ' + (data.pdu ? JSON.stringify(data.pdu) : 'No data')
    let port =
      '\nRedni broj unutar grupe: ' +
      (data.port ? JSON.stringify(data.port) : 'No data')

    setModalContent(TH5s + THAvg + tB + freq + w + s + pdu + port)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalContent('')
  }

  useEffect(() => {
    axios.get('/miners.json').then(res => {
      res.data[19].values.forEach(e => {
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
      })

      setData(res.data[19])

      // premještanje prazne date za prve tri kucice da bih dobio slobonda mjesta nakon rednog broja 4
      let dataF = Object.values(
        Object.groupBy(res.data[19].values, ({ pdu }) => pdu)
      )
      let ar = [0, 1, 2]
      ar.forEach(e => {
        const dataMain = Object.values(
          Object.groupBy(res.data[19].values, ({ pdu }) => pdu)
        )[e]
        const mytest = dataMain.slice(-5)
        dataMain.length = dataMain.length - 5
        dataMain.splice.apply(dataMain, [4, 0].concat(mytest))
        dataF[e] = dataMain
      })
      
      setDataVal(dataF)
    })
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='text-center'>{fData.name}</h1>
      </header>
      <div className='grid'>
        {fDataVal.map((item, index) => (
          <div className='cell'>
            {item.map((item2, index2) =>
              item2.s ? (
                <button
                  onClick={() => openModal(item2)}
                  key={index2}
                  className='cell2'
                  style={{
                    backgroundColor: item2.color
                  }}
                >
                  {JSON.stringify(item2.port)}
                </button>
              ) : (
                <span></span>
              )
            )}
          </div>
        ))}
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h2>Miner Info</h2>
        <p>{modalContent}</p>
      </Modal>
      <script>console.log(true)</script>
    </div>
  )
}

export default App
