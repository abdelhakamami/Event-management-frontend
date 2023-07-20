import Auth from './components/Auth';
import { useSelector } from 'react-redux';
import React from "react";
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import EventDetail from './components/EventDetail';
import AddEvent from './components/AddEvent';
import AllUsers from './components/gestionUtilisateur/AllUsers';
import CreateUser from './components/gestionUtilisateur/CreateUser';
import Evenements from './components/Evenements';
import UserEvent from './components/UserEvent';
function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <React.Fragment>
    <header>
      <Header />
    </header>
    
    <main>
        
        <Routes>
        
          <Route path="api/v1/login" element={<Auth />} />
          <Route path="/event" element={<Evenements/>} />
          <Route path="/add" element={<AddEvent/>} />
          <Route path="/event/add" element={<AddEvent/>} />
          <Route path="/getAll" element={<AllUsers/>} />
          <Route path="/add-User" element={<CreateUser />}  />
          <Route path="/edit-User/:id" element={<CreateUser />}  />
          <Route path="/UserEvent" element={<UserEvent />}  />
          
          
        </Routes>
      </main>
  </React.Fragment>
);
}

export default App;
