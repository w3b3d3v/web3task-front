import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(["color", "fill"])};           
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <ListWrapper
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItemButton
            classes={{ root: "MuiListItem-indicators" }}
            component={Link}
            href="/home-side/overview"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={'menu.item1.label'}
            />
          </ListItemButton>
          <ListItemButton
            classes={{ root: "MuiListItem-indicators" }}
            component={Link} 
            href="/home-side/overview"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  {'menu.item2.label'}
                </Box>
              }
            />
          </ListItemButton>
          <ListItemButton
            classes={{ root: "MuiListItem-indicators" }}
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  {'menu.item3.label'}
                  <Box display="flex" alignItems="center" pl={0.3}>
                  </Box>
                </Box>
              }
            />
          </ListItemButton>
        </List>
      </ListWrapper>
      <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        <MenuItem sx={{ px: 3 }} component={Link} href="/">
          {'menu.item3.subItens.subItem1.label'}
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={Link} href="/home-side/overview">
          {'menu.item3.subItens.subItem2.label'}
        </MenuItem>
      </Menu>
    </>
  );
}

export default HeaderMenu;
