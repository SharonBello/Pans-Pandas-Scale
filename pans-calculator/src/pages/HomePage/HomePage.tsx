import React, { useState } from "react";
import { Box, Typography, Button, Container, Modal, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import { useTranslation } from "react-i18next";
import "./HomePage.scss";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <Box className="homepage-root">
      <Box className="homepage-hero">
        <Container maxWidth="md" className="hero-content">
          <Typography variant="h2" className="hero-title">
            {t("home.title")}
          </Typography>
          <Typography variant="h6" className="hero-subtitle">
            {t("home.subtitle")}
          </Typography>
          <Box className="hero-buttons">
            <Button component={RouterLink} to="/scale" variant="contained" className="hero-button" size="large">
              {t("home.startButton")}
            </Button>
            <IconButton color="inherit" onClick={() => setOpenInfo(true)} aria-label={t("home.infoAria")}>
              <InfoIcon fontSize="large" />
            </IconButton>
          </Box>
          <Typography className="hero-clinical-credit hero-subtitle" sx={{ mt: 2, color: '#fff', textAlign: 'center', marginTop: '40px' }}>
            {t('home.clinicalCredit')}
          </Typography>
        </Container>
        <Modal open={openInfo} onClose={() => setOpenInfo(false)}>
          <Box className="info-modal">
            <Typography variant="h5" className="modal-title" gutterBottom>
              {t("home.modal.title")}
            </Typography>
            {(Array.isArray(t("home.modal.steps", { returnObjects: true }))
              ? (t("home.modal.steps", { returnObjects: true }) as string[])
              : []).map((line: string, i: number) => (
                <Typography key={i} variant="body1" className="modal-text">
                  {line}
                </Typography>
              ))}
            <Button variant="outlined" onClick={() => setOpenInfo(false)} className="modal-close">
              {t("home.modal.closeButton")}
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default HomePage;
