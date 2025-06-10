import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './Footer.scss';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box component="footer" className="footer-container">
      <Box className="footer-contact-rights-container">
        <Typography variant="body2">
          {t('footer.copy')} {/* e.g. "© 2025 Sharon Bello" */}
        </Typography>
        <Typography variant="body2">
          <Link href="mailto:sharonbellotech@gmail.com" underline="hover">
            {t('footer.contactEmail')} {/* e.g. "Gmail" */}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;