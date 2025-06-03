import React from 'react';
import { Box, Typography, Slider } from '@mui/material';

interface SymptomRatingProps {
  id: string;
  label: string;
  value: number;
  onChange: (id: string, value: number) => void;
}

const SymptomRating: React.FC<SymptomRatingProps> = ({ id, label, value, onChange }) => {
  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      onChange(id, newValue);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" gutterBottom>
        {label}
      </Typography>
      <Slider
        aria-labelledby={`${id}-slider-label`}
        value={value}
        onChange={handleSliderChange}
        step={1}
        min={0}
        max={5}
        marks={[
          { value: 0, label: '0' },
          { value: 1, label: '1' },
          { value: 2, label: '2' },
          { value: 3, label: '3' },
          { value: 4, label: '4' },
          { value: 5, label: '5' },
        ]}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default SymptomRating;

export {};
