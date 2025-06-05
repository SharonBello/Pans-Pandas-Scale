import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Modal,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import './HomePage.scss';

const HomePage: React.FC = () => {
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpen = () => setOpenInfo(true);
  const handleClose = () => setOpenInfo(false);

  return (
    <Box className="homepage-root">
      {/* Hero Section */}
      <Box className="homepage-hero">
        <Container maxWidth="md" className="hero-content">
          <Typography variant="h2" className="hero-title">
            מחשבון מדד פאנס/פאנדס
          </Typography>
          <Typography variant="h6" className="hero-subtitle">
            חשבו את המדד במהירות ובקלות
          </Typography>

          <Box className="hero-buttons">
            <Button
              component={RouterLink}
              to="/scale"
              variant="contained"
              className="hero-button"
              size="large"
            >
              התחל מדד
            </Button>
            <IconButton
              color="inherit"
              className="info-button"
              onClick={handleOpen}
              aria-label="מידע"
            >
              <InfoIcon fontSize="large" />
            </IconButton>
          </Box>
        </Container>

        {/* Modal עם הסברים קצרים */}
        <Modal open={openInfo} onClose={handleClose}>
          <Box className="info-modal">
            <Typography variant="h5" gutterBottom className="modal-title">
              איך מחושב המדד?
            </Typography>
            <Typography variant="body1" className="modal-text">
              1. סמנו דירוג (0–5) עבור תסמיני OCD.<br />
              2. סמנו דירוג (0–5) עבור תסמינים נלווים (14 פריטים), קחו את חמשת הערכים הגבוהים וסכמו ⇒ 0–25.<br />
              3. סמנו דירוג (0–5) לפגיעה תפקודית והכפילו ב־10 ⇒ 0–50.<br />
              4. בסיום לחצו “חשב ניקוד” ותועברו לעמוד התוצאות.
            </Typography>
            <Button variant="outlined" onClick={handleClose} className="modal-close">
              סגור
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default HomePage;