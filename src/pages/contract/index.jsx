import { useSession, signIn, signOut } from 'next-auth/react';

import * as React from 'react';
import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import styles from './styles.module.scss';
import { LoginDocument } from '@/generated/graphql';
import { useQuery } from 'urql';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import Link from 'next/link';

export default function Component() {
  const { data: session } = useSession();
  const [createSign, setCreateSign] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAssinarContrato = () => {
    // Lógica da função para assinar o contrato
    handleClose();
    alert('Contrato assinado!');
  };

  const [result] = useQuery({
    query: LoginDocument,
    variables: { username: session?.user?.name },
    requestPolicy: `cache-and-network`,
  });

  const { data } = result;

  const signatureCanvasRef = useRef();

  const handleSaveSignature = () => {
    const dataUrl = signatureCanvasRef?.current?.toDataURL();
    console.log(dataUrl); // Aqui você pode usar o valor da assinatura em formato de imagem (data:img)
  };

  const handleClearSignature = () => {
    signatureCanvasRef?.current?.clear();
  };

  if (session) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="success">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <b>Mushadelic Records</b>
            </Typography>

            <Button color="inherit" onClick={() => signOut()}>
              <>Logout</>
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl">
          <Box
            sx={{
              width: `100%`,
              backgroundColor: `#333`,
              borderRadius: 4,
              marginTop: 4,
              marginBottom: 4,
              padding: 4,
            }}
          >
            <div>
              <Avatar
                alt={data?.dashboard?.project_name}
                src="https://res.cloudinary.com/technical-intelligence/image/upload/v1675350807/avatars-ehaINiEPHFO0VdbJ-6Rg0qA-t500x500_j3aqwl.jpg"
                sx={{ width: 150, height: 150 }}
              />
              <Typography variant="h4" component="h1" color="#fff">
                <b>{data?.dashboard?.project_name}</b>
              </Typography>
              <br />
              <Typography variant="subtitle1" component="h2" color="#fff">
                <b>Manager:</b> {data?.dashboard?.responsable_name}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="h2" color="#fff">
                <b>E-mail: </b> {data?.dashboard?.email}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="h2" color="#fff">
                <b>Signature: </b>
              </Typography>
              {!createSign && (
                <div>
                  {!data?.dashboard?.signature && (
                    <Typography
                      variant="subtitle2"
                      color="#fff"
                    >{`You don't have a signature yet, click below and create one.`}</Typography>
                  )}
                </div>
              )}
              {createSign && (
                <div>
                  {!data?.dashboard?.signature && (
                    <Typography
                      variant="subtitle2"
                      color="#fff"
                    >{`Create your signature below, you will not be able to change it after confirming.`}</Typography>
                  )}
                  <br />
                </div>
              )}
              {!createSign && (
                <div>
                  {data?.dashboard?.signature && (
                    <Typography
                      variant="subtitle2"
                      color="#fff"
                    >{`You have already confirmed your subscription, it is no longer possible to change it.`}</Typography>
                  )}
                  <br />
                </div>
              )}

              {createSign && (
                <div>
                  <SignatureCanvas
                    ref={signatureCanvasRef}
                    canvasProps={{
                      width: 500,
                      height: 200,
                      backgroundColor: `#fff`,
                      className: `signature-canvas`,
                      style: { backgroundColor: `white` },
                    }}
                  />
                  <Box
                    sx={{
                      display: `flex`,
                      gap: 2,
                      marginTop: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleSaveSignature}
                    >
                      Salvar Assinatura
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleClearSignature}
                    >
                      Limpar Assinatura
                    </Button>
                  </Box>
                </div>
              )}

              {!createSign && (
                <div>
                  {data?.dashboard?.signature ? (
                    <Box
                      sx={{
                        width: `fit-content`,
                        backgroundColor: `white`,
                        borderRadius: 2,
                        padding: 2,
                      }}
                    >
                      <img
                        src={data?.dashboard?.signature}
                        alt="signature"
                        width={200}
                      />
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => setCreateSign(true)}
                    >
                      Create signature
                    </Button>
                  )}
                </div>
              )}

              <br />
              <br />

              <Typography variant="subtitle1" component="h2" color="#fff">
                <b>Contract: </b>
              </Typography>

              {!data?.dashboard?.signature && (
                <>
                  <Typography
                    variant="subtitle2"
                    color="#fff"
                  >{`Create your signature first to see the contract.`}</Typography>
                  <br />
                </>
              )}

              {data?.dashboard?.is_signed_contract ? (
                <Button variant="contained" color="success">
                  <Link href={`/contract-view?id=${data?.dashboard?.username}`}>
                    <a target="_blank">Open signed contract</a>
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  disabled={!data?.dashboard?.signature}
                  onClick={handleOpen}
                >
                  Read and sign the contract
                </Button>
              )}
            </div>
          </Box>
        </Container>

        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              width: `90%`,
              margin: `auto`,
              backgroundColor: `white`,
              padding: 4,
              marginTop: `3%`,
              borderRadius: 2,
            }}
          >
            <div>
              <iframe
                src="contract.html"
                width="100%"
                height="600px"
                title="PDF Viewer"
              />
              <Button
                sx={{ marginTop: 2 }}
                variant="contained"
                color="primary"
                onClick={handleAssinarContrato}
              >
                Sign contract
              </Button>
            </div>
          </Box>
        </Modal>
      </Box>
    );
  }
  return (
    <>
      <Container className={styles.loginContainer}>
        <Button variant="contained" color="success" onClick={() => signIn()}>
          Login
        </Button>
      </Container>
    </>
  );
}
