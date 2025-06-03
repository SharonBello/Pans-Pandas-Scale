import React from 'react';
import { SymptomGroup } from '../../types/pansTypes';
import SymptomRating from '../SymptomRating';
import { Box, Typography } from '@mui/material';

interface AssociatedSectionProps {
  items: SymptomGroup[];
  onItemChange: (id: string, value: number) => void;
}

const AssociatedSection: React.FC<AssociatedSectionProps> = ({ items, onItemChange }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        II. תסמינים נלווים
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
        * לאחר שסימנתם את כל הסימפטומים, נחבר את חמשת הערכים הגבוהים ביותר (0–5 כל אחד) ונקבל 0–25.
      </Typography>
    </Box>
  );
};

export default AssociatedSection;
