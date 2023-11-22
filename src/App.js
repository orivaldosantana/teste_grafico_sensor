import './App.css'
import React, { useEffect, useState } from 'react'
import SensorChart from './components/SensorChart'
import axios from 'axios'
 

const API_URL = 'http://localhost:3002'

function App() {
  const [temperatureData, setTemperatureData] = useState([])
  const [startTime, setStartTime] = useState('00:00:00')
  const [endTime, setEndTime] = useState('23:00:00')
  const [startDate, setStartDate] = useState('2023-11-17')
  const [endDate, setEndDate] = useState('2023-11-17')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/acessos?sensorId=1&dataInicio=${startDate}&dataFim=${endDate}&horaInicio=${startTime}&horaFim=${endTime}`
        )  
        setTemperatureData(response.data)
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
      }
    }
    fetchData()
  }, [startDate, endDate, startTime, endTime])

  return (
    <div className="App">
      <h1>Gráfico de Temperatura</h1>
      <SensorChart data={temperatureData} />
    </div>
  )
}

export default App
