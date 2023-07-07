import React, { useState, FormEvent } from 'react';
import { Button, Box, FormControl, Container, Typography } from '@mui/material';
import ImageUploader from '@/components/ImageUploader';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Head from 'next/head';

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
  const [usernameError, setUsernameError] = useState<string>(``);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);

  const handleImageChange = (dataUrl: string) => {
    setImageValue(dataUrl);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
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

    if (name === `username`) {
      const trimmedValue = value.trim(); // Remove espaços em branco no início e no final

      if (trimmedValue.includes(` `)) {
        // Se houver espaços em branco após remoção
        setUsernameError(`Não é permitido inserir espaços no username.`);
      } else {
        setUsernameError(``);
      }
    }

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

  const isEmailValid = (email: string): boolean => {
    // Expressão regular para validar o formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
        Swal.fire({
          icon: `success`,
          title: `Nice!`,
          text: `
          Account successfully created!`,
        });
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
      Swal.fire({
        icon: `error`,
        title: `Oops...`,
        text: `Passwords do not match. Please check again.`,
      });
      return;
    }

    if (!isPasswordSecure(formData.password)) {
      Swal.fire({
        icon: `error`,
        title: `Oops...`,
        text: `Password must be at least 8 characters long, include uppercase letters, lowercase letters and numbers. Please try again.`,
      });
      return;
    }

    if (!isEmailValid(formData.email)) {
      Swal.fire({
        icon: `error`,
        title: `Oops...`,
        text: `Please enter a valid email.`,
      });
      return;
    }

    if (formData.username.includes(` `)) {
      Swal.fire({
        icon: `error`,
        title: `Oops...`,
        text: `Your username is not valid as it contains spaces. Choose another before continue.`,
      });

      return;
    }

    const { passwordConfirm, ...formDataWithoutConfirm } = formData;

    const formDataWithImage: FormData = {
      ...formDataWithoutConfirm,
      picture: imageValue,
    };

    handleSaveData(formDataWithImage);
  };

  return (
    <Container maxWidth="md">
      <Head>
        <title>Register | Mushadelic Records</title>
        <meta name="description" content="Brazilian Psytrance Label" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        className="mt-6"
      >
        <img width="150" src="/images/logo.png" alt="logo" />
      </Box>
      <Typography
        variant="h4"
        color="white"
        align="center"
        className="mt-6 mb-3"
      >
        REGISTER TO SIGN THE CONTRACT
      </Typography>
      <form onSubmit={handleSubmit} className="mb-6">
        <FormControl fullWidth margin="normal" variant="outlined">
          <div className="mb-2">
            <label>E-mail</label>
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
          {usernameError && (
            <p style={{ color: `red`, fontSize: 12, marginTop: 8 }}>
              {usernameError}
            </p>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <div className="mb-2">
            <label>Password</label>
          </div>
          <div className="input-wrapper">
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              type={showPassword ? `text` : `password`}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={handleTogglePassword}
            >
              {showPassword ? (
                <AiFillEyeInvisible color="#9ef300" size={18} />
              ) : (
                <AiFillEye color="#9ef300" size={18} />
              )}
            </button>
          </div>
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <div className="mb-2">
            <label>Confirm Password</label>
          </div>
          <div className="input-wrapper">
            <input
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              className="input"
              type={showPasswordConfirm ? `text` : `password`}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={handleTogglePasswordConfirm}
            >
              {showPasswordConfirm ? (
                <AiFillEyeInvisible color="#9ef300" size={18} />
              ) : (
                <AiFillEye color="#9ef300" size={18} />
              )}
            </button>
          </div>
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <div className="mb-2">
            <label>Project Name</label>
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
            <label>Responsable Fullname</label>
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
            <label>Profile Image</label>
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
