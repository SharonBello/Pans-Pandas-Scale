import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 1,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © 2025 ד"ר מר Sharon Bello — מפתח Scales. ליצירת קשר: 
        <Link href="mailto:sharon@example.com" underline="hover">
          sharon@example.com
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
