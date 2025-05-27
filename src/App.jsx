import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Home from '../pages/Home'
import CreatePage from '../pages/CreatePage'

const App=()=>{
  return(
    <>

    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Home/>} />
      <Route path='/create-page' element={<CreatePage/>} />



    </Routes>
    
    
    
    </BrowserRouter>

    
    </>
  )
}

export default App  