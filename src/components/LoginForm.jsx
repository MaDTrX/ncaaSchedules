import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as usersService from '../utilities/users-service';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch (err) {
        console.log(err)
      setError('Log In Failed - Try Again');
    }
  }

  return (
      <Grid item xs={12}>
        <form onSubmit={handleSubmit} autoComplete="off" >
          <TextField
            id="outlined-name"
            label="Email"
            type="text"
            name="email"
            value={credentials.email} 
            onChange={handleChange}
            required={true}
            fullWidth={true}
            margin="normal"
            />
          <TextField
            id="outlined-name"
            label="Password"
            type="password" 
            name="password" 
            value={credentials.password} 
            onChange={handleChange} 
            required={true}
            fullWidth={true}
            margin="normal"
          />
           <Button type='submit' variant="contained">LOGIN</Button>
        </form>
      </Grid>
  );
}