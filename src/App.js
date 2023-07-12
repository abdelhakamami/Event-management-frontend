import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Reclamation from './pages/Reclamation/Reclamation';
import Addreclamation from './pages/AddReclamation/Addreclamation';
import Feedback from './pages/Feedback/Feedback';
import AddFeedback from './pages/AddFeedback/AddFeedback';


function App() {
  return (
    <div className="App bg-primary-content min-h-screen flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/reclamation' element={<Reclamation />}></Route>
          <Route path='/feedback' element={<Feedback />}></Route>
          <Route path='/addreclamation' element={<Addreclamation />}></Route>
          <Route path='/addfeedback' element={<AddFeedback />}></Route>



        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
