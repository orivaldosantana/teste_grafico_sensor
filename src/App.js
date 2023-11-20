import './App.css'
import React, { useEffect, useState } from 'react'
import FrequencyChart from './components/FrequencyChart'
import axios from 'axios'
import ss from 'simple-statistics'

const API_URL = 'http://localhost:3002'

function App() {
  const [frenquencyData, setFrequencyData] = useState([])
  const [startTime, setStartTime] = useState('03:00:00')
  const [endTime, setEndTime] = useState('12:00:00')
  const [startDate, setStartDate] = useState('2023-11-17')
  const [endDate, setEndDate] = useState('2023-11-17')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/acessos?sensorId=1&dataInicio=${startDate}&dataFim=${endDate}&horaInicio=${startTime}&horaFim=${endTime}`
        )
        const dataTemp = []
        // Código de rascunho para a pegar a mediana da temperatura em cada hora. Teste realizado para horas de 3 a 12
        for (let h = 3; h < 12; h++) {
          function filterDate(d) {
            let dd = new Date(d.createdAt)

            if (dd.getHours() === h) return true
            else return false
          }
          const fff = response.data.filter(filterDate)
          const tempMedian = ss.median(fff.map(x => x.value))
          console.log(tempMedian)
          dataTemp.push({ name: h, temp: tempMedian })
        }
        setFrequencyData(dataTemp)
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
      }
    }
    fetchData()
  }, [startDate, endDate, startTime, endTime])

  return (
    <div className="App">
      <h1>Gráfico de frequência</h1>
      <FrequencyChart data={frenquencyData} />
    </div>
  )
}

export default App
