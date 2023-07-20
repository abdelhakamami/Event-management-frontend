import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react'
import img3 from '../assets/img3.jpg'

const Evenement = ({libelle , date , objectif , environnement, valeur , typeEvent , projet, cible , AppUserRole }) => {
  return ( 
    <div>
      <Card sx={{ width: "40%" , margin:'auto', mt:2, padding: 2, boxShadow: "5px 5px 10px #ccc", ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          }, }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {AppUserRole}
          </Avatar>
        }
        
        libelle={libelle}
        
      />
      <CardMedia
        component="img"
        height="194"
        image={img3}
        alt=""
      />
      <CardContent>
      <Typography variant="body2" color="text.secondary">
        <b>{libelle}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {objectif}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
        <Typography variant="body2" color="text.secondary">   
        {environnement}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {typeEvent}
        </Typography>
        
      </CardContent>
      
      
    </Card>
    </div>
  )
}

export default Evenement