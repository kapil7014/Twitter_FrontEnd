import { Button, Container, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import AuthService from "../AuthService/AuthService";

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const gotoTwitterLoginPage = () => {
  AuthService.authTwitterLogin().then((response: any) => {
    window.location.href = response.data.loginUrl;
  }).catch((e: Error) => {
    console.log(e);
  });
};

function Hero() {
  const navigate = useNavigate();

  const getTwitterAccessToken = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (code) {
      AuthService.getTwitterAccessToken(code).then((response: any) => {
        if (response.status == 200 && response.data) {
          window.localStorage.setItem("_access_token", JSON.stringify(response.data));
          navigate('/management/tweets/home');
        }
      }).catch((e: Error) => {
        console.log(e);
      });
    }
  };

  useEffect(() => {
    getTwitterAccessToken();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            Sign in with Twitter
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            Twitter Login
          </TypographyH2>
          <Button
            startIcon={<TwitterIcon />}
            onClick={gotoTwitterLoginPage}
            size="large"
            variant="contained"
          >
            Twitter
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
