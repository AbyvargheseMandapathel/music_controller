import React , {Component } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Link} from "react-router-dom"

export default class CreateRoomPage extends Component {
    constructor(props) {
      super(props);  
      this.state = {
        guestCanPause:true,
        votesToSkip:this.defaultVotes,
      };
      this.handleRoomButtonPresed = this.handleRoomButtonPresed.bind(this);
      this.handleVotesChanged = this.handleVotesChanged.bind(this);
      this.handleGuestCanPauseChanged = this.handleGuestCanPauseChanged.bind(this);
    }

    handleVotesChanged(e){
      this.setState({
        votesToSkip: e.target.value,
      });
    }

    handleGuestCanPauseChanged(e){
      this.setState({
        guestCanPause: e.target.value ==='true'?true:false,
      })
    }
    handleRoomButtonPresed() {
      console.log(this.state)
    }

    render() {
        return (<Grid container spacing={1}>
          <Grid item xs={12} align = 'center'>
            <Typography component='h4' variant='h4'>
              Create Room
            </Typography>
          </Grid>
          <Grid item xs={12} align = 'center'>
            <FormControl component='fieldset'>
              <FormHelperText>
                <div align = 'center'>
                  Guest Control of Playback State
                </div>
              </FormHelperText>
              <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChanged}>
                <FormControlLabel value = "true" 
                control = {<Radio color="primary"/>}
                label = "Play/Pause"
                labelPlacement = "bottom"
                />
                <FormControlLabel value = "false" 
                control = {<Radio color="secondary"/>}
                label = "No Control"
                labelPlacement = "bottom"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} align = 'center'>
            <FormControl>
              <TextField required= {true}
              onChange={this.handleVotesChanged}
               type="number"
                defaultValue={this.defaultVotes}
                inputProps={{
                  min:1,
                  style:{textAlign:"center",}
                
                }}
                ></TextField>
                <FormHelperText>
                  <div align = "center">Votes Required to Skip</div>
                </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} align = 'center'>
            <Button color="primary" variant="contained" onChange={this.handleRoomButtonPresed}>Create A Room</Button>
          </Grid>
          <Grid item xs={12} align = 'center'>
            <Button color="secondary" variant="contained" to="/" component={Link}>
              Back
              </Button>
          </Grid>
        </Grid>
        );
    }
}