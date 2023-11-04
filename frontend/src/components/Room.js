import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";

function Room() {
  const { roomCode } = useParams();
  const navigate = useNavigate(); // Use the useNavigate hook to navigate

  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });

  useEffect(() => {
    getRoomDetails();
  }, []);

  const getRoomDetails = () => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        setRoomDetails({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  };

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch('/api/leave-room', requestOptions)
      .then(() => {
        navigate('/'); // Use navigate to go to the home page
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4">Code: {roomCode}</Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h5">Votes: {roomDetails.votesToSkip}</Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h5">
          Guest: {roomDetails.guestCanPause ? "Yes" : "No"}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h5">
          Host: {roomDetails.isHost ? "Yes" : "No"}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}

export default Room;
