import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import { User } from "src/models/user";
import { useWeb3Utils } from "src/hooks/Web3UtilsHook";
import { useTaskService } from "src/services/tasks-service";

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

function stringToColor(string: string) {
  let hash = 0;
  let i;

  if (string != null) {
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  return "#FFFF00"
}

const MuiAvatar = styled(Avatar)(
  ({ theme }) => `
    width: 160px;
`
);

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name}`,
  };
}

function HeaderUserbox({ disconnect, account }) {
  const [avatar, setAvatar] = useState("/static/images/avatars/1.jpg");
  const { shortenAddressFromUser, userAddress, getUserRole } = useWeb3Utils();
  const { hasMemberRole, hasLeaderRole, getRoleName } = useTaskService();
  const [isMember, setIsMember] = useState<boolean>(false);
  const [roleName, setRoleName] = useState<string>("");

  const [isLeader, setIsLeader] = useState<boolean>(false);

  const user: User = {
    name: "",
    avatar: avatar,
    jobTitle: "Member",
    coverImg: "",
    description: "",
    location: "",
    social: "",
  };

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleDisconnect = (): void => {
    disconnect();
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem(userAddress()));
    if (storedUserData != null) {
      getRoleName(Number(storedUserData.role)).then(result => {
        setRoleName(result);
      })
    } else {
      setRoleName("Select a role to operate");
    }
  }, [])

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen} sx={{ ml: 1 }}>
        <Hidden smDown>
          <MuiAvatar variant="rounded" {...stringAvatar(shortenAddressFromUser())} />
          <UserBoxText>
            <UserBoxDescription noWrap variant="body1">
              {roleName === "" ? "Empty RoleName" : roleName}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <MuiAvatar variant="rounded" {...stringAvatar(shortenAddressFromUser())} />
          <UserBoxText>
            <UserBoxDescription variant="body1">
              {roleName === "" ? "Empty RoleName" : roleName}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button to="/users/profile" component={NavLink}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button to="/tasks/create-task" component={NavLink}>
            <ListItemText primary="Create Task" />
          </ListItem>
          <ListItem button to="/settings" component={NavLink}>
            <ListItemText primary="Admin" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button onClick={handleDisconnect} color="primary" fullWidth>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            <Typography fontWeight={'bold'}> Logout</Typography>
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
