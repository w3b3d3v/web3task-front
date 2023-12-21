import { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItemButton,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { HiOutlineChevronDown, HiOutlineLockOpen } from "react-icons/hi";
import { useAccount, useDisconnect } from "wagmi";
import Link from "next/link";
import { User } from "@/models/user";
import { useWeb3Utils } from "@/hooks/Web3UtilsHook";
import { useTaskService } from "@/services/tasks-service";

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

function HeaderUserbox() {
  const [avatar, setAvatar] = useState("/static/images/avatars/1.jpg");
  const { hasMemberRole, hasLeaderRole } = useTaskService();
  const [isMember, setIsMember] = useState<boolean>(false);
  const [isLeader, setIsLeader] = useState<boolean>(false);
  
  const { shortenAddressFromUser } = useWeb3Utils();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

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
    if (!address) {
      return;
    }

    hasLeaderRole(address).then(result => {
      setIsLeader(result);
    })

    hasMemberRole(address).then(result => {
      setIsMember(result);
    })

  }, [hasLeaderRole, hasMemberRole, address])

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen} sx={{ ml: 1 }}>
        <MuiAvatar variant="rounded" {...stringAvatar(shortenAddressFromUser())} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription noWrap variant="body2">
              {isLeader ? "Leader" : isMember ? "Member" : "No Role"}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <HiOutlineChevronDown sx={{ ml: 1 }} />
        </Hidden>
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
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {isLeader ? "Leader" : isMember ? "Member" : "No Role"}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItemButton href="/users/profile" component={Link}>
            <ListItemText primary="Perfil" />
          </ListItemButton>
          {
            isLeader &&
            <ListItemButton href="/tasks/create-task" component={Link}>
              <ListItemText primary="Criar Tarefa" />
            </ListItemButton>
          }
          {
            isLeader &&
            <ListItemButton href="/settings" component={Link}>
              <ListItemText primary="Configurações" />
            </ListItemButton>
          }
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button onClick={handleDisconnect} color="primary" fullWidth>
            <HiOutlineLockOpen sx={{ mr: 1 }} />
            <Typography fontWeight={'bold'}> Sair</Typography>
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
