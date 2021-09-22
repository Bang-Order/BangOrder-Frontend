import { Container, Grid, Button, TextField } from '@mui/material'
import React, { Component } from 'react'

export default class Registrasi extends Component {
  state = {
    email: '',
    password: '',
    confirm_password: ''
  }
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { email, password, confirm_password } = this.state
  //   firebaseAuthentication.createUserWithEmailAndPassword(email, password)
  // }
  render() {
    const { email, password, confirm_password } = this.state
    return (
      <Container>
        <Grid container style={{ justifyContent: 'center' }}>
          <Grid xs="4">
            <h3>Contactless Food Ordering with Scan QR Code</h3>
            <form onSubmit={this.handleSubmit}>
              <TextField fullWidth margin="dense" variant="filled" size="small" value={email} label="Nomor Telepon" required />
              <TextField fullWidth margin="dense" variant="filled" size="small" value={password} label="Password" required />
              <TextField fullWidth margin="dense" variant="filled" size="small" value={confirm_password} label="Confirmation Password" required />
              <Button type="submit" fullWidth margin="dense" variant="contained">Sign Up</Button>
            </form>
            <p>Already have an account? <a href="/login">Sign In</a></p>
          </Grid>
        </Grid>
      </Container>
    )
  }
}