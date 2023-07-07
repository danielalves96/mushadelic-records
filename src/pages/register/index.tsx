import React, { useState, FormEvent } from 'react';
import { Button, Box, FormControl, Container, Typography } from '@mui/material';
import ImageUploader from '@/components/ImageUploader';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

interface FormData {
  email: string;
  username: string;
  password: string;
  passwordConfirm?: string;
  project_name: string;
  responsable_name: string;
  picture: string | null;
}

const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const [imageValue, setImageValue] = useState<string | null>(null);

  const handleImageChange = (dataUrl: string) => {
    setImageValue(dataUrl);
  };

  const [formData, setFormData] = useState<FormData>({
    email: ``,
    username: ``,
    password: ``,
    passwordConfirm: ``,
    project_name: ``,
    responsable_name: ``,
    picture: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isPasswordSecure = (password: string): boolean => {
    // Critérios de segurança da senha
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return (
      password.length >= minLength && hasUppercase && hasLowercase && hasNumber
    );
  };

  const INSERT_DATA = gql`
    mutation createDashboard($input: DashboardCreateInput!) {
      createDashboard(data: $input) {
        id
      }
    }
  `;

  const PUBLISH_DATA = gql`
    mutation publishDashboard($id: ID!) {
      publishDashboard(where: { id: $id }) {
        id
      }
    }
  `;

  const [createDashboard] = useMutation(INSERT_DATA);
  const [publishDashboard] = useMutation(PUBLISH_DATA);

  const handleSaveData = async (finalData: FormData) => {
    try {
      const { data } = await createDashboard({
        variables: {
          input: {
            ...finalData,
          },
        },
      });

      console.log(data.createDashboard.id);

      const id = data.createDashboard.id;

      try {
        const { data } = await publishDashboard({
          variables: {
            id: id,
          },
        });
        alert(`Conta criada com sucesso!`);
        router.push(`/contract`);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      alert(`As senhas não coincidem. Por favor, verifique novamente.`);
      return;
    }

    if (!isPasswordSecure(formData.password)) {
      alert(
        `A senha deve ter pelo menos 8 caracteres, incluir letras maiúsculas, letras minúsculas e números. Por favor, tente novamente.`,
      );
      return;
    }

    const { passwordConfirm, ...formDataWithoutConfirm } = formData;

    const formDataWithImage: FormData = {
      ...formDataWithoutConfirm,
      picture: imageValue,
    };

    console.log(formDataWithImage);
    handleSaveData(formDataWithImage);
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
            required
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
            required
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
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <div className="mb-2">
            <label>Confirm password</label>
          </div>
          <input
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            className="input"
            type="password"
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <div className="mb-2">
            <label>Project name</label>
          </div>
          <input
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
            className="input"
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <div className="mb-2">
            <label>Responsable full name</label>
          </div>
          <input
            name="responsable_name"
            value={formData.responsable_name}
            onChange={handleChange}
            className="input"
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <div className="mb-2">
            <label>Profile image</label>
          </div>
          <div>
            <ImageUploader onImageChange={handleImageChange} />
          </div>
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
