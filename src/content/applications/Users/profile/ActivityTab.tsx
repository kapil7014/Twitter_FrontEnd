import {
  Box,
  CardMedia,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  IconButton,
  Button,
  CardActions,
  Link
} from '@mui/material';
import { styled } from '@mui/material/styles';

import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import Text from 'src/components/Text';

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
     background: ${theme.colors.alpha.black[5]};
     padding: ${theme.spacing(3)};
`
);

function ActivityTab(tweets: any) {

  const checkJsonProperties = (entities: any, keyName: any): boolean => {
    if (entities && keyName) {
      if (entities.hasOwnProperty(keyName)) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }

  const getUserProfileDetails = (authorId: any) => {
    if (checkJsonProperties(tweets?.includes, "users")) {
      if (tweets?.includes?.users.length > 0) {
        let findUser = tweets?.includes?.users?.filter((user) => {
          return user.id == authorId;
        });

        return findUser[0];
      }
    }
  }

  const getMediaDetails = (mediaKey: any) => {
    if (checkJsonProperties(tweets?.includes, "media")) {
      if (tweets?.includes?.media.length > 0) {
        let findMedia = tweets?.includes?.media?.filter((media) => {
          return media.media_key == mediaKey;
        });

        return findMedia[0];
      }
    }
  }

  return (
    <Card style={{ marginBottom: "10px" }}>
      <CardHeader
        avatar={<Avatar src={getUserProfileDetails(tweets?.author_id)?.profile_image_url} />}
        action={
          <IconButton color="primary">
            <MoreHorizTwoToneIcon fontSize="medium" />
          </IconButton>
        }
        titleTypographyProps={{ variant: 'h4' }}
        subheaderTypographyProps={{ variant: 'subtitle2' }}
        title={getUserProfileDetails(tweets?.author_id)?.name}
        subheader={
          <>
            @{getUserProfileDetails(tweets?.author_id)?.username}
          </>
        }
      />
      <Box px={3} pb={2}>
        <Typography variant="h4" fontWeight="normal" dangerouslySetInnerHTML={{ __html: tweets?.text }} />
        {tweets?.entities && checkJsonProperties(tweets?.entities, 'hashtags') ? (
          tweets?.entities?.hashtags?.map((element: any, i: any) => (
            <Link key={i} href="#" underline="hover">
              #{element.tag}
            </Link>
          ))
        ) : (
          <></>
        )}
      </Box>
      {tweets?.entities && checkJsonProperties(tweets?.entities?.urls[0], 'media_key') ? (
        checkJsonProperties(tweets?.entities?.urls[0].media_key, 'type') && getMediaDetails(tweets?.entities?.urls[0].media_key).type === 'photo' ? (
          <CardMedia
            sx={{ minHeight: 280 }}
            image={getMediaDetails(tweets?.entities?.urls[0].media_key).url}
            title="Card Cover"
          />
        ) : (
          <CardMedia
            sx={{ minHeight: 280 }}
            image={getMediaDetails(tweets?.entities?.urls[0].media_key).preview_image_url}
            title="Card Cover"
          />
        )
      ) : (
        <></>
      )}
      <Divider />
      <CardActionsWrapper
        sx={{
          display: { xs: 'block', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Button startIcon={<ThumbUpAltTwoToneIcon />} variant="contained">
            Like
          </Button>
          <Button
            startIcon={<CommentTwoToneIcon />}
            variant="outlined"
            sx={{ mx: 2 }}
          >
            Comment
          </Button>
          <Button startIcon={<ShareTwoToneIcon />} variant="outlined">
            Share
          </Button>
        </Box>
        <Box sx={{ mt: { xs: 2, md: 0 } }}>
          <Typography variant="subtitle2" component="span">
            <Text color="black">
              <b>485</b>
            </Text>{' '}
            reactions •{' '}
            <Text color="black">
              <b>63</b>
            </Text>{' '}
            comments
          </Typography>
        </Box>
      </CardActionsWrapper>
    </Card>
  );
}

export default ActivityTab;
