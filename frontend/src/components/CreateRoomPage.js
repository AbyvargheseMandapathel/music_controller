import React, { Component } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Link, useNavigate } from "react-router-dom";

export default function CreateRoomPage(props) {
  const [guestCanPause, setGuestCanPause] = React.useState(true);
  const [votesToSkip, setVotesToSkip] = React.useState(2);
  const navigate = useNavigate();

  const handleVotesChanged = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPauseChanged = (e) => {
    setGuestCanPause(e.target.value === "true");
  };

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };

    fetch("/api/create-room/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const roomCode = data.code;
        navigate(`/room/${roomCode}`); // Use navigate from React Router
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            value={guestCanPause ? "true" : "false"}
            onChange={handleGuestCanPauseChanged}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            onChange={handleVotesChanged}
            type="number"
            value={votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          ></TextField>
          <FormHelperText>
            <div align="center">Votes Required to Skip</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create A Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
