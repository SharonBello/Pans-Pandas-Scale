import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import './Footer.scss'

const Footer: React.FC = () => {
  return (
    <Box component="footer" className='footer-container'>
      <Typography className='scale-info-origin'>
        בהתבסס על הניסיון הקליני של ד"ר סוזן סוודו, ד"ר מירוסלאב קובצ'ביץ', ד"ר בת' לטימר וד"ר ג'יימס לקמן, בעזרתם של דיאנה פוהלמן, קית' מור והורים רבים נוספים.
      </Typography>
      <div className='footer-contact-rights-container'>
        <Typography>
          © 2025 Sharon Bello
        </Typography>
        <Typography>
          <Link href="mailto:sharonbellotech@gmail.com" underline="hover">
            Gmail
          </Link>
        </Typography>
      </div>
    </Box>
  );
};

export default Footer;
