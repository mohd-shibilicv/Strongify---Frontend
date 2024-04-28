import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import useBackendAPI from './components/CustomHooks/useBackendAPI'

function App() {
  const [count, setCount] = useState(0)
  const url = 'http://127.0.0.1:8000/api/passwords/'
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0MjY5MjIyLCJpYXQiOjE3MTQyMjYwMjIsImp0aSI6IjYyM2NhZjcwMWQ2NjQ2MjI4M2JjYzY2Mzg1OWFhODE4IiwidXNlcl9pZCI6MX0.zBG4OKb_D_iDtQSr5u1ASKmu6m-8F9baZy6DnwnF0uw'
  const { response, error, isLoading } = useBackendAPI(url, 'GET', null, authToken);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <Button className="border border-black rounded-xl" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
    </>
  )
}

export default App
