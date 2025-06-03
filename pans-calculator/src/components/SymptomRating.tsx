import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { RatingValue } from '../types/pansTypes';

interface SymptomRatingProps {
  id: string;
  label: string;
  value: RatingValue;
  onChange: (id: string, value: RatingValue) => void;
}

const SymptomRating: React.FC<SymptomRatingProps> = ({ id, label, value, onChange }) => {
  // כל הערכים האפשריים 0–5
  const ratingOptions: RatingValue[] = [0, 1, 2, 3, 4, 5];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10) as RatingValue;
    onChange(id, newValue);
  };

  return (
    <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row
        aria-label={label}
        name={id}
        value={value.toString()}
        onChange={handleChange}
      >
        {ratingOptions.map((opt) => (
          <FormControlLabel
            key={opt}
            value={opt.toString()}
            control={<Radio size="small" />}
            label={opt.toString()}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SymptomRating;
