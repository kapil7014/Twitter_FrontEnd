import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled,
} from '@mui/material';

import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import {
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
);
const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function RecentActivity() {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Tweets Activity" />
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <StarTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Tweets</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Total #Tags
              </Typography>
              <Typography variant="h2">654</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Box>
          <Typography px={2} py={2} variant="h4">Top 10 Popular #Tags</Typography>
          <Divider />
          <Box>
            <ListWrapper disablePadding>
              <ListItem
                sx={{
                  color: `${theme.colors.primary.main}`,
                  '&:hover': { color: `${theme.colors.primary.dark}` }
                }}
                button
              >
                <ListItemText primary="#HTML" />
              </ListItem>
              <Divider />
              <ListItem
                sx={{
                  color: `${theme.colors.primary.main}`,
                  '&:hover': { color: `${theme.colors.primary.dark}` }
                }}
                button
              >
                <ListItemText primary="#software_development" />
              </ListItem>
              <Divider />
              <ListItem
                sx={{
                  color: `${theme.colors.primary.main}`,
                  '&:hover': { color: `${theme.colors.primary.dark}` }
                }}
                button
              >
                <ListItemText primary="#TrendingInfuencers" />
              </ListItem>
              <Divider />
              <ListItem
                sx={{
                  color: `${theme.colors.primary.main}`,
                  '&:hover': { color: `${theme.colors.primary.dark}` }
                }}
                button
              >
                <ListItemText primary="#investorsWatch2022" />
              </ListItem>
            </ListWrapper>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default RecentActivity;
