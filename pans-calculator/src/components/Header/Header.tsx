// src/components/Header/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import './Header.scss';
// אם ברצונכם להשתמש בלוגו SVG שייבאתם כ־ReactComponent, אפשר לייבא אותו כאן:
// import { ReactComponent as Logo } from '../../logo.svg';

const Header: React.FC = () => {
  return (
    <AppBar position="static" className="header-container">
      <Toolbar className="header-toolbar">
        {/* לוגו בצד שמאל (לא חובה, אך אם תרצו להחזירו, הסירו את ההערה) */}
        <Box className="header-left">
          {/*
          <IconButton edge="start" color="inherit" aria-label="logo" className="header-logo-button">
            <Logo className="header-logo" width={32} height={32} />
          </IconButton>
          */}
          <Typography variant="h6" component="div" className="header-title">
            מדד פאנס/פאנדס
          </Typography>
        </Box>

        {/* אם תרצו ליישר אלמנטים בצד ימין (כגון כפתורי תפריט), ניתן להוסיף אותם כאן */}
        <Box className="header-right">
          {/* דוגמא לכפתור ניווט או אייקון נוסף */}
          {/* <IconButton color="inherit" aria-label="settings">
            <SettingsIcon />
          </IconButton> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
