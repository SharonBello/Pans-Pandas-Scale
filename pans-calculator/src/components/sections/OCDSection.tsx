import React from 'react';
import { SymptomGroup } from '../../types/pansTypes';
import SymptomRating from '../SymptomRating';
import { Box, Typography } from '@mui/material';

interface OCDSectionProps {
  items: SymptomGroup[];
  onItemChange: (id: string, value: number) => void;
}

const OCDSection: React.FC<OCDSectionProps> = ({ items, onItemChange }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        I. תסמיני ליבה טורדניים־כפייתיים (OCD)
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
        * בחרו דירוג לכל סימפטום. בסוף ניקח את הערך הגבוה ביותר ונכפיל ב־5.
      </Typography>
    </Box>
  );
};

export default OCDSection;
