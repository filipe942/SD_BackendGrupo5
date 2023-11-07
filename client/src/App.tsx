import './App.css'
import NavBar from './components/NavBar'
import AddEvent from './pages/AddEvent';
import ViewEvents from './pages/ViewEvents';
import { Route, Routes } from "react-router-dom"

/* Github test */

function App() {
  return (
    <>
      <NavBar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<AddEvent/>}/>
          <Route path='/addEvent' element={<AddEvent/>}/>
          <Route path='/viewEvents' element={<ViewEvents/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
