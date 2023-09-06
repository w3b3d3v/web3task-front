import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";

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
                            height: 20x;
                            width: 40px;
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
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation(['layouts-baselayout-header-menu']);

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
          <ListItem
            classes={{ root: "MuiListItem-indicators" }}
            button
            component={NavLink}
            to="/home-side/overview"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={t('menu.item1.label')}
            />
          </ListItem>
          <ListItem
            classes={{ root: "MuiListItem-indicators" }}
            button
            component={NavLink}
            to="/home-side/overview"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={t('menu.item2.label')}
            />
          </ListItem>
          <ListItem
            classes={{ root: "MuiListItem-indicators" }}
            button
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  {t('menu.item3.label')}
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <ExpandMoreTwoToneIcon fontSize="small" />
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </List>
      </ListWrapper>
      <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/">
          {t('menu.item3.subItens.subItem1.label')}
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/home-side/overview">
          {t('menu.item3.subItens.subItem2.label')}
        </MenuItem>
      </Menu>
    </>
  );
}

export default HeaderMenu;
