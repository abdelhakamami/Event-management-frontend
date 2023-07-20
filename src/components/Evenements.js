import axios from "axios";
import React, { useEffect, useState } from "react";
import img3 from '../assets/img3.jpg'
import Evenement from "./Evenement";
import api from "./service/UserService";

const Evenements = () => {
  const [eventss, setEvents] = useState();
  const sendRequest = async () => {
    const res = await api
      .get("http://localhost:8080/api/v1/getallevent")
      .catch((err) => console.log(err))
      
    const data = await res.data;
    
    
    return data;
  };
  useEffect(() => {
    sendRequest()
    .then((data) => setEvents(data)) 
     
  }, []);
  console.log(eventss);
  
  
  

  return (
    <div>
      {eventss &&
        eventss.map((ev, index) => (
          <Evenement
            libelle ={ev.libelle}
            objectif={ev.objectif}
            date={ev.date}
            environnement={ev.environnement}
            typeEvent={ev.typeEvent}
            image={img3}
          />
        ))}{" "}
    </div>
  );
};

export default Evenements;
