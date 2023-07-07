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
import { useQuery as URQL } from 'urql';
import { gql, useMutation } from '@apollo/client';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import Link from 'next/link';

export default function Component() {
  const { data: session } = useSession();
  const [createSign, setCreateSign] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [contractData, setContractData] = React.useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAssinarContrato = async () => {
    const newData = {
      is_signed_contract: true,
    };

    try {
      const { data } = await updateDashboard({
        variables: {
          id: contractData.id,
          input: {
            ...newData,
          },
        },
      });

      try {
        const { data } = await publishDashboard({
          variables: {
            id: contractData.id,
          },
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }

    handleClose();
    alert('Contrato assinado!');
  };

  const [result] = URQL({
    query: LoginDocument,
    variables: { username: session?.user?.name },
    requestPolicy: `cache-and-network`,
  });

  const { data } = result;

  React.useEffect(() => {
    setContractData(data?.dashboard);
  }, [data]);

  const signatureCanvasRef = useRef();

  const handleSaveSignature = async () => {
    const dataUrl = signatureCanvasRef?.current?.toDataURL();

    const newData = {
      signature: dataUrl,
    };

    try {
      const { data } = await updateDashboard({
        variables: {
          id: contractData.id,
          input: {
            ...newData,
          },
        },
      });

      try {
        const { data } = await publishDashboard({
          variables: {
            id: contractData.id,
          },
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSignature = () => {
    signatureCanvasRef?.current?.clear();
  };

  const UPDATE_APP_DATA = gql`
    mutation updateDashboard($input: DashboardUpdateInput!, $id: ID!) {
      updateDashboard(data: $input, where: { id: $id }) {
        id
      }
    }
  `;

  const PUBLISH_APP_DATA = gql`
    mutation publishDashboard($id: ID!) {
      publishDashboard(where: { id: $id }) {
        id
      }
    }
  `;

  const [updateDashboard] = useMutation(UPDATE_APP_DATA);
  const [publishDashboard] = useMutation(PUBLISH_APP_DATA);

  if (session) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="success">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <b>Mushadelic Records</b>
            </Typography>

            <Button
              color="success"
              variant="contained"
              onClick={() => signOut()}
            >
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
                alt={contractData?.project_name}
                src={contractData?.picture}
                sx={{ width: 150, height: 150 }}
              />
              <Typography variant="h4" component="h1" color="#fff">
                <b>{contractData?.project_name}</b>
              </Typography>
              <br />
              <Typography variant="subtitle1" component="h2" color="#fff">
                <b>Manager:</b> {contractData?.responsable_name}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="h2" color="#fff">
                <b>E-mail: </b> {contractData?.email}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="h2" color="#fff">
                <b>Signature: </b>
              </Typography>
              {!createSign && (
                <div>
                  {!contractData?.signature && (
                    <Typography
                      variant="subtitle2"
                      color="#fff"
                    >{`You don't have a signature yet, click below and create one.`}</Typography>
                  )}
                </div>
              )}
              {createSign && (
                <div>
                  {!contractData?.signature && (
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
                  {contractData?.signature && (
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
                      Save signature
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleClearSignature}
                    >
                      Clear signature
                    </Button>
                  </Box>
                </div>
              )}

              {!createSign && (
                <div>
                  {contractData?.signature ? (
                    <Box
                      sx={{
                        width: `fit-content`,
                        backgroundColor: `white`,
                        borderRadius: 2,
                        padding: 2,
                      }}
                    >
                      <img
                        src={contractData?.signature}
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

              {!contractData?.signature && (
                <>
                  <Typography
                    variant="subtitle2"
                    color="#fff"
                  >{`Create your signature first to see the contract.`}</Typography>
                  <br />
                </>
              )}

              {contractData?.is_signed_contract ? (
                <Button variant="contained" color="success">
                  <Link href={`/contract-view?id=${contractData?.username}`}>
                    <a target="_blank">Open signed contract</a>
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  disabled={!contractData?.signature}
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
                src="/public/contract.html"
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
        <Box
          alignItems="center"
          display="flex"
          justifyContent="center"
          className="mt-6"
        >
          <img width="220" src="/images/logo.png" alt="logo" />
        </Box>
        <div className={styles.loginButtons}>
          <Button variant="contained" color="success" onClick={() => signIn()}>
            Login
          </Button>
          <Link href="/register" passHref>
            <Button variant="contained" color="primary">
              Register
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
