import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import styles from "./index.module.scss";

interface UserProfileProps {
  userDisplayName: string;
  userEmail: string;
  userAvatar: string;
  onSignOut: () => void;
}

const UserProfile = ({
  userDisplayName,
  userEmail,
  userAvatar,
  onSignOut,
}: UserProfileProps) => {
  const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(null);

  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorProfile(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setAnchorProfile(null);
  };

  return (
    <>
      <div className={styles.profile} onClick={handleOpenProfileMenu}>
        <Avatar variant="rounded" src={userAvatar}></Avatar>
        <div className={styles.information}>
          <Typography className={styles.name}>{userDisplayName}</Typography>
          <Typography className={styles.role}>{userEmail}</Typography>
        </div>
      </div>
      <Menu
        open={Boolean(anchorProfile)}
        onClose={handleCloseProfileMenu}
        anchorEl={anchorProfile}
      >
        <Paper sx={{ width: 320, maxWidth: "100%" }} elevation={0}>
          <MenuList dense={true}>
            <MenuItem>
              <ListItemIcon>
                <PersonOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Account</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={onSignOut}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Sign Out</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
    </>
  );
};

export { UserProfile, UserProfileProps };
