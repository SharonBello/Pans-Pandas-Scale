import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import './ScalePage.scss';
import CalculatorForm from '../../components/CalculatorForm';

const ScalePage: React.FC = () => {
  return (
    <Container maxWidth="md" className="scale-root">
      <Typography variant="h4" align="center" gutterBottom className="scale-title">
        מדד PANS/PANDAS
      </Typography>
      <Typography variant="body1" align="center" className="scale-explanation" gutterBottom>
        סמנו דירוג (0–5) עבור כל שדה, ולחצו “חשב ניקוד” בסוף.
      </Typography>
      <Box className="scale-form-box">
        <CalculatorForm />
      </Box>
    </Container>
  );
};

export default ScalePage;
