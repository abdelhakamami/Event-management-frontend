import axios from 'axios';
import React, { useEffect, useState } from 'react'
import api from './service/UserService';
import Evenement from './Evenement';
import { useParams } from 'react-router-dom';

const UserEvent = () => {
    const [user, setUser] = useState();
    
    const {id} = useParams(+localStorage.getItem("userId"));
    const sendRequest = async () => {
        const res = await api
          .get("http://localhost:8080/api/v1/retrieveEventById/" +id)
          .catch((err) => console.log(err));
        const data = await res.data;
        const ids = data.id;
        localStorage.setItem('eventIds', JSON.stringify(ids));
        return data;
        
      };
      useEffect(() => {
        sendRequest().then((data) => setUser(data));
      }, []);
      console.log(user);

  return (
    <div> {user &&
        user.map((ev, index) => (
          <Evenement
            libelle={ev.user.appUserRole}
            objectif={ev.objectif}
            date={ev.date}
            environnement={ev.environnement}
            typeEvent={ev.typeEvent}
          />
        ))}{" "}</div>
  )
}

export default UserEvent