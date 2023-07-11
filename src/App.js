import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Dashbord from "./pages/Dashbord/dashbord";

function App() {
  return (
    <div className="App bg-primary-content min-h-screen flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashbord" element={<Dashbord />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
