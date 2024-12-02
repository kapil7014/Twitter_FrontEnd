import { useEffect, useRef, useState } from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  Popover,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import UserDetailService from "../../Services/UserDetailService";
import IUserDetailModel from '../../Services/IUserDetailModel';


const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const navigate = useNavigate();

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<IUserDetailModel>();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const getTwitterAuthUser = () => {
    const getTokenDetails = window.localStorage.getItem("_access_token");
    if (getTokenDetails) {
      UserDetailService.getTwitterAuthUser(JSON.parse(getTokenDetails)?.access_token).then((response: any) => {
        if (response.status == 200 && response.data) {
          if (!window.localStorage.getItem("_usr_id"))
            window.localStorage.setItem("_usr_id", response.data.data.id);

          setUser(response.data.data);
        }
      }).catch((e: Error) => {
        console.log(e);
      });
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    getTwitterAuthUser();
  }, []);

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={user?.name} src={user?.profile_image_url} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user?.username}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={user?.name} src={user?.profile_image_url} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user?.username}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth component={RouterLink}
            to="/">
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
