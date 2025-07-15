import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import './Footer.scss'

const Footer: React.FC = () => {
  return (
    <Box className='footer-container'>
        <Typography>
          <Link href="mailto:sharonbellotech@gmail.com" underline="hover">
            Contact
          </Link>
        </Typography>
        <Typography>
          Sharon Bello © 
        </Typography>
    </Box>
  );
};

export default Footer;
