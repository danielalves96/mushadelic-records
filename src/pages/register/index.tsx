import React, { useState, FormEvent } from 'react';
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Container,
  Typography,
} from '@mui/material';
import Image from 'next/image';

interface FormData {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  projectName: string;
  responsableName: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: ``,
    username: ``,
    password: ``,
    passwordConfirm: ``,
    projectName: ``,
    responsableName: ``,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <Container>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        className="mt-6"
      >
        <img width="150" src="/images/logo.png" alt="logo" />
      </Box>
      <Typography
        variant="h3"
        color="white"
        align="center"
        className="mt-6 mb-3"
      >
        REGISTER TO SIGN THE CONTRACT
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" variant="outlined">
          <div className="mb-2">
            <label>Email</label>
          </div>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <div className="mb-2">
            <label>Username</label>
          </div>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input"
          />
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <div className="mb-2">
            <label>Password</label>
          </div>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            type="password"
          />
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <div className="mb-2">
            <label>Confirm password</label>
          </div>
          <input
            name="password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            className="input"
            type="password"
          />
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <div className="mb-2">
            <label>Project name</label>
          </div>
          <input
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="input"
          />
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <div className="mb-2">
            <label>Responsable full name</label>
          </div>
          <input
            name="responsableName"
            value={formData.responsableName}
            onChange={handleChange}
            className="input"
          />
        </FormControl>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button type="submit" variant="contained" color="success">
            Register
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default RegistrationForm;
