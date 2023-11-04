import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

export default function RoomJoinPage(props) {
  const navigate = useNavigate(); // Use the useNavigate hook to get the navigation function

  const [roomCode, setRoomCode] = React.useState("");
  const [error, setError] = React.useState("");

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
  }

  const roomButtonPressed = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: roomCode }),
    };

    fetch('/api/join-room', requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomCode}`); // Use navigate to change the route
        } else {
          setError("Room not found");
        }
      });
  }

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={roomButtonPressed}
        >
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/"
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
