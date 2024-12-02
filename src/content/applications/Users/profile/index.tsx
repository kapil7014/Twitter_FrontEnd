import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import Footer from 'src/components/Footer';
import { Grid, Container } from '@mui/material';

import RecentActivity from './RecentActivity';
import ActivityTab from './ActivityTab';
import TweetsService from "./Services/TweetsService";

function ManagementUserProfile() {
  const navigate = useNavigate();
  const [timelineTweetsList, setTimelineTweetsList] = useState<[]>();
  const [timelineTweetsData, setTimelineTweetsData] = useState<any>();

  const getReverseTimelineTweets = () => {
    const getTokenDetails = window.localStorage.getItem("_access_token");
    const userId = window.localStorage.getItem("_usr_id");
    if (getTokenDetails && userId) {
      TweetsService.getReverseTimelineTweets(userId, JSON.parse(getTokenDetails)?.access_token).then((response: any) => {
        if (response.status == 200 && response.data) {
          setTimelineTweetsList(response.data.data);
          setTimelineTweetsData(response.data);
        }
      }).catch((e: Error) => {
        console.log(e);
      });
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    getReverseTimelineTweets();
  }, []);

  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            {timelineTweetsList?.map((element: any, i: any) => (
              <ActivityTab key={i} {...element} {...timelineTweetsData} />
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;
