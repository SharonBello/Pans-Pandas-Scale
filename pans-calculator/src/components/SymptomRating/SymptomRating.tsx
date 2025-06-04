import React from 'react';
import { Box, Typography, Slider } from '@mui/material';
import Grid from '@mui/material/Grid';
import { RatingValue } from '../../types/pansTypes';
import './SymptomRating.scss'

const ratingDescriptions: Record<RatingValue, string> = {
  0: '0 – אין עדות לסימפטום; אין פעילות כלל.',
  1: '1 – מינימלית (10): סימפטום ו/או התנהגות שמעט מזכירים את הסימפטום…',
  2: '2 – קלה (20): סימפטום ו/או התנהגות בולטת יותר…',
  3: '3 – בינונית (30): סימפטום ו/או התנהגות משמעותית…',
  4: '4 – חמורה (40): סימפטום ו/או התנהגות חמורים מאוד…',
  5: '5 – קיצונית (50): סימפטום ו/או התנהגות קיצונית…',
};

interface SymptomRatingProps {
  id: string;
  label: string;
  ratingBefore: RatingValue;
  ratingAfter: RatingValue;
  ratingCurrent: RatingValue;
  onChange: (id: string, field: 'before' | 'after' | 'current', value: RatingValue) => void;
  itemClass?: string;
}

const SymptomRating: React.FC<SymptomRatingProps> = ({
  id,
  ratingBefore,
  ratingAfter,
  ratingCurrent,
  onChange,
  itemClass = '',
}) => {
  const marks = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ];

  const handleSliderChange = (
    field: 'before' | 'after' | 'current',
    _event: Event,
    newValue: number | number[]
  ) => {
    if (typeof newValue === 'number') {
      onChange(id, field, newValue as RatingValue);
    }
  };

  return (
    <Box sx={{ direction: 'rtl', mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        {/* ===== טווח: שבוע לפני הופעה ראשונה ===== */}
        <Grid size={{ xs: 12, md: 4 }} className={itemClass}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, textAlign: 'center', fontWeight: 'bold' }} >
            שבוע לפני הופעה ראשונה
          </Typography>
          <Slider
            value={ratingBefore}
            onChange={(e, val) => handleSliderChange('before', e, val)}
            step={1}
            min={0}
            max={5}
            marks={marks}
            valueLabelDisplay="off"
            aria-label={`${id}-before`}
          />
          <Typography variant="caption" sx={{ mt: 0.5, display: 'block', textAlign: 'center' }} >
            {ratingDescriptions[ratingBefore]}
          </Typography>
        </Grid>

        {/* ===== טווח: שבוע אחרי הופעה ראשונה ===== */}
        <Grid size={{ xs: 12, md: 4 }} className={itemClass}>
          <Typography variant="caption" sx={{ mt: 0.5, display: 'block', textAlign: 'center' }} >
            שבוע אחרי הופעה ראשונה
          </Typography>
          <Slider
            value={ratingAfter}
            onChange={(e, val) => handleSliderChange('after', e, val)}
            step={1}
            min={0}
            max={5}
            marks={marks}
            valueLabelDisplay="off"
            aria-label={`${id}-after`}
          />
          <Typography variant="caption" sx={{ mt: 0.5, display: 'block', textAlign: 'center' }} >
            {ratingDescriptions[ratingAfter]}
          </Typography>
        </Grid>

        {/* ===== טווח: 7 ימים אחרונים ===== */}
        <Grid size={{ xs: 12, md: 4 }} className={itemClass}>
          <Typography variant="caption" sx={{ mt: 0.5, display: 'block', textAlign: 'center' }} >
            7 ימים אחרונים
          </Typography>
          <Slider
            value={ratingCurrent}
            onChange={(e, val) => handleSliderChange('current', e, val)}
            step={1}
            min={0}
            max={5}
            marks={marks}
            valueLabelDisplay="off"
            aria-label={`${id}-current`}
          />
          <Typography variant="caption" sx={{ mt: 0.5, display: 'block', textAlign: 'center' }} >
            {ratingDescriptions[ratingCurrent]}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SymptomRating;