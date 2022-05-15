import React, { Component } from 'react';
import { signUp } from '../utilities/users-service';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default class SignUpForm extends Component {
  // class field syntax
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // We don't want to send the confirm or error properties
      // Let's make a copy of this.state (we never want to directly modify the state obj)
      const formData = {...this.state};
      delete formData.error;
      delete formData.confirm;
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // An error occurred
      this.setState({error: 'Sign Up Failed - Try Again'});
    }
  };

  handleChange = (evt) => {
    // Unlike setters in function components,
    // this.setState MERGES the provided object, it does
    // NOT replace it
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  // Must override the render method
  // The render method take the place of a function component
  // That is, it will ultimately return its UI as JSX
  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <Grid item xs={12}>
      <form onSubmit={this.handleSubmit} autoComplete="off" >
        <TextField
          id="outlined-name"
          label="Name"
          type="text" 
          name="name" 
          value={this.state.name} 
          onChange={this.handleChange}
          required={true}
          fullWidth={true}
          margin="normal"
        />
        <TextField
          id="outlined-name"
          label="Email"
          type="email"
          name="email"
          value={this.state.email} 
          onChange={this.handleChange}
          required={true}
          fullWidth={true}
          margin="normal"
          />
        <TextField
          id="outlined-name"
          label="Password"
          type="password" 
          name="password" 
          value={this.state.password}
          onChange={this.handleChange} 
          required={true}
          fullWidth={true}
          margin="normal"
        />
        <TextField
          id="outlined-name"
          label="Confirm Password"
          type="password" 
          name="confrim" 
          value={this.state.confirm}
          onChange={this.handleChange} 
          required={true}
          fullWidth={true}
          margin="normal"
        />
        <Button type='submit' disabled={disable} variant="contained">SIGN UP</Button>
      </form>
      </Grid>
 
    );
  }
}