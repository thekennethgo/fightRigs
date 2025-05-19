import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const fetchData = async () => {
    const response = await fetch('http://localhost:8080/api/bro')
    const data = await response.json()
    console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h1>Insert video pls</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
