import React from 'react';
import { SymptomGroup } from '../../types/pansTypes';
import SymptomRating from '../SymptomRating';
import { Box, Typography } from '@mui/material';

interface FunctionalSectionProps {
  items: SymptomGroup[];
  onItemChange: (id: string, value: number) => void;
}

const FunctionalSection: React.FC<FunctionalSectionProps> = ({ items, onItemChange }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        III. פגיעה תפקודית
      </Typography>
      {items.map((symptom) => (
        <SymptomRating
          key={symptom.id}
          id={symptom.id}
          label={symptom.label}
          value={symptom.rating}
          onChange={onItemChange}
        />
      ))}
      <Typography variant="caption" color="textSecondary">
        * דירגו בין 0–5 (כשכל נקודה שוות ערך ל-10 בסולם המקורי) ⇒ ניקוד 0–50.
      </Typography>
    </Box>
  );
};

export default FunctionalSection;
