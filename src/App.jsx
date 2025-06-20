// import {BrowserRouter,Routes,Route} from 'react-router-dom'

// import Home from '../pages/Home'
// import CreatePage from '../pages/CreatePage'
// import CreateShiftDuty from '../pages/CreateShiftDuty'





// const App=()=>{
//   return(
//     <>

//     <BrowserRouter>
//     <Routes>
//       <Route path='/' element={ <Home/>} />
//       <Route path='/create-page' element={<CreatePage/>} />

//       <Route path='/create-duty' element={<CreateShiftDuty/>} />



//     </Routes>
    
    
    
//     </BrowserRouter>

    
//     </>
//   )
// }

// export default App  

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import CreatePage from '../pages/CreatePage';
import CreateShiftDuty from '../pages/CreateShiftDuty';
import LoginPage from '../pages/LoginPage';

const App = () => {
  return (
    <div className="min-h-screen overflow-y-scroll bg-gray-50">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>} />         
          <Route path="/" element={<Home />} />
          <Route path="/create-page" element={<CreatePage />} />
          <Route path="/create-duty" element={<CreateShiftDuty />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
