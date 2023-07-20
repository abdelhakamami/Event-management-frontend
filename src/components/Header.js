import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Tabs,
  Toolbar,
  Typography,
  Tab,
  
  
} from "@mui/material";
import "./Header.css";
import { Link } from "react-router-dom";
import { authActions } from "../store";

const Header = () => {
  const dispath = useDispatch ();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <AppBar position="sticky" className="form-group mb-2" style={{ background: '#000' }} >
      <Toolbar>
        <Typography className="navbar__logo" variant="H4">
          {" "}
          Event
        </Typography>
        {isLoggedIn &&  (
          <Box display="flex" marginLeft="auto" >
            <Tabs
              value={value}
              onChange={(e, val) => setValue(val)}
              textColor="inherit"
            >
              <Tab LinkComponent={Link} to="/event" label="event" />
              <Tab LinkComponent={Link} to="add" label="add event"  />
              <Tab LinkComponent={Link} to="getAll" label="allUsers" />
              
              
              
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          { !isLoggedIn && <> <Button
            LinkComponent={Link}
            to="api/v1/login"
            variant="outlined"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning"
          >
            Login
          </Button>
          <Button
            LinkComponent={Link}
            to="api/v1/login"
            variant="outlined"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning"
            
          >
            Signup
          </Button></> }
          {isLoggedIn && (
            <Button
              onClick={()=>dispath(authActions.logout())}
              LinkComponent={Link}
              to="api/v1/login"
              variant="outlined"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
