import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
function Auth() {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    pwd: "",
  });

  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:8080/api/v1/${type}`, {
        name: inputs.name,
        email: inputs.email,
        pwd: inputs.pwd,
      })
      .catch((err) => console.log(err));
    console.log(res);
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/event"))
        
    } else {
      sendRequest()
      .then((data) => localStorage.setItem("userId", data.id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/event"))
        
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="80px 80px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={20}
          borderRadius={5}
        >
          <Typography variant="h3" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
              type={"name"}
            />
          )}{" "}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            placeholder="Email"
            margin="normal"
            type={"email"}
          />
          <TextField
            name="pwd"
            onChange={handleChange}
            value={inputs.pwd}
            placeholder="Password"
            margin="normal"
            type={"password"}
          />
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
            variant="contained"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            change {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Auth;
