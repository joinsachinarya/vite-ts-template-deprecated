import './App.css'
import A from "./components/A"
import B from "./components/B"
import P from "./components/P"
import Q from "./components/Q"
import R from "./components/R"

function App() {

  return (
    <>
    <div className='container'>
     <div className='left'>
      <div className='box'><A/></div>
      <div className='box'><B/></div>
     </div>
     <div className='right'>
      <div className='box'><P/></div>
      <div className='box special-comp'><Q/></div>
      <div className='box'><R/></div>
     </div>
    </div>
    </>
  )
}

export default App
