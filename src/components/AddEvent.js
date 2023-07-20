import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from './service/UserService';
import axios from 'axios';


const AddEvent = () => {
  
  const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
  const navigate = useNavigate();
  const id = +localStorage.getItem("userId");
  
  const [inputs, setInputs] = useState({
    libelle: "",
    date: "",
    objectif: "",
    environnement: "",
    typeEvent: "",
    

  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await api
      .post("http://localhost:8080/api/v1/addEvent" , {
        libelle: inputs.libelle,
        date: inputs.date,
        objectif: inputs.objectif,
        environnement: inputs.environnement,
        typeEvent: inputs.typeEvent,
        user: localStorage.getItem("userId"),
        
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/event"));
  };
  return (
    <div><form onSubmit={handleSubmit} >
    <Box
      border={3}
      borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
      borderRadius={10}
      boxShadow="10px 10px 20px #ccc"
      padding={3}
      margin={"auto"}
      marginTop={3}
      display="flex"
      flexDirection={"column"}
      width={"80%"}
    >
      <Typography
        
        fontWeight={"bold"}
        padding={3}
        color="grey"
        variant="h2"
        textAlign={"center"}
      >
        Post Your Event
      </Typography>
      <InputLabel  sx={labelStyles}>
        Libelle
      </InputLabel>
      <TextField
        
        name="libelle"
        onChange={handleChange}
        value={inputs.libelle}
        margin="auto"
        variant="outlined"
      />
      <InputLabel sx={labelStyles}>
        Date
      </InputLabel>
      <TextField
        
        name="date"
        onChange={handleChange}
        value={inputs.date}
        margin="auto"
        variant="outlined"
      />
      <InputLabel  sx={labelStyles}>
        objectif
      </InputLabel>
      <TextField
        
        name="objectif"
        onChange={handleChange}
        value={inputs.objectif}
        margin="auto"
        variant="outlined"
      />
      <InputLabel  sx={labelStyles}>
        environnement
      </InputLabel>
      <TextField
        
        name="environnement"
        onChange={handleChange}
        value={inputs.environnement}
        margin="auto"
        variant="outlined"
      />
      
      <InputLabel  sx={labelStyles}>
        type event
      </InputLabel>
      <TextField
        
        name="typeEvent"
        onChange={handleChange}
        value={inputs.typeEvent}
        margin="auto"
        variant="outlined"
      />
      <Button
        sx={{ mt: 2, borderRadius: 4 }}
        variant="contained"
        color="warning"
        type="submit"
      >
        Submit
      </Button>
    </Box>
  </form></div>
  )
}

export default AddEvent