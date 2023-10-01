
import './App.css'
import { Routes, Route,} from 'react-router-dom'
import Home from './pages/Home'
import FAQ from './pages/FAQ'


function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/faq' element={<FAQ />} />
      </Routes>

    </div>
  )
}

export default App
