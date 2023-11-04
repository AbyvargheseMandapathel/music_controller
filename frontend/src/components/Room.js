import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Room() {
  const { roomCode } = useParams();
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

  return (
    <div>
      <h3>{roomCode}</h3>
      <p>Votes: {roomDetails.votesToSkip}</p>
      <p>Guest: {roomDetails.guestCanPause ? "Yes" : "No"}</p>
      <p>Host: {roomDetails.isHost ? "Yes" : "No"}</p>
    </div>
  );
}

export default Room;
