import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

function CreateRoomPage(props) {
  const {
    votesToSkip: initialVotesToSkip = 2,
    guestCanPause: initialGuestCanPause = true,
    update = false,
    roomCode,
    updateCallback,
  } = props;

  const [guestCanPause, setGuestCanPause] = useState(initialGuestCanPause);
  const [votesToSkip, setVotesToSkip] = useState(initialVotesToSkip);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = update ? "Update Room" : "Create Room";
  }, [update]);

  const handleVotesChanged = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPauseChanged = (e) => {
    setGuestCanPause(e.target.value === "true");
  };

  const handleRoomButtonPressed = () => {
    const apiEndpoint = update ? "/api/update-room" : "/api/create-room/";

    const requestOptions = {
      method: update ? "PATCH" : "POST", // Use "PATCH" for updates
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: roomCode, // Include the room code for updates
      }),
    };

    fetch(apiEndpoint, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const roomCode = data.code;
        if (updateCallback) {
          updateCallback(roomCode);
        }
        navigate(`/room/${roomCode}`);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {update ? "Update Room" : "Create Room"}
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
            required
            onChange={handleVotesChanged}
            type="number"
            value={votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
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
          {update ? "Update Room" : "Create Room"}
        </Button>
      </Grid>
      {update ? null : (
        <Grid item xs={12} align="center">
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to={roomCode ? `/room/${roomCode}` : "/"}
          >
            {roomCode ? "Leave Room" : "Back"}
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default CreateRoomPage;
