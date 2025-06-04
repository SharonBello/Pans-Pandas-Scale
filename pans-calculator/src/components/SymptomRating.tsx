import React from 'react';
import { Box, Typography, Slider, Grid } from '@mui/material';
import { RatingValue } from '../types/pansTypes';

interface SymptomRatingProps {
  id: string;
  label: string;
  ratingBefore: RatingValue;
  ratingAfter: RatingValue;
  ratingCurrent: RatingValue;
  onChange: (id: string, field: 'before' | 'after' | 'current', value: RatingValue) => void;
}

const ratingDescriptions: Record<RatingValue, string> = {
  0: '0 – אין עדות לסימפטום; אין פעילות כלל.',
  1: '1 – מינימלית (10): סימפטום ו/או התנהגות שמעט מזכירים את הסימפטום, מלווה בקושי קל בתחילת התופעה או התנהגות קלה שאינה מפריעה מהותית.',
  2: '2 – קלה (20): סימפטום ו/או התנהגות בולטת יותר, אך עדיין לא מפריעה בתפקוד היומי; הקושי מורגש בלמידה או בלימוד, או בקושי קל בהתנהלות שגרתית.',
  3: '3 – בינונית (30): סימפטום ו/או התנהגות משמעותית, גורמת לשינוי בתפקוד – קושי משמעותי בלימודים או בהתנהגות חברתית, נסיגה חלקית מפעילויות.',
  4: '4 – חמורה (40): סימפטום ו/או התנהגות חמורים מאוד – אי יכולת לתפקד באופן רגיל בבית או בבית הספר, הימנעות מלאה מפעילויות, שינוי מהותי בהתנהגות החברתית.',
  5: '5 – קיצונית (50): סימפטום ו/או התנהגות קיצונית – חוסר יכולת כמעט מוחלט לבצע פעולות יומיומיות, מצוקה קשה, צורך בסיוע צמוד בכל התחומים.',
};

const SymptomRating: React.FC<SymptomRatingProps> = ({
  id,
  label,
  ratingBefore,
  ratingAfter,
  ratingCurrent,
  onChange,
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
    <Box sx={{ mb: 4, direction: 'rtl' }}>
      {/* תווית הסימפטום */}
      <Typography variant="body1" sx={{ mb: 1, textAlign: 'right' }}>
        {label}
      </Typography>

      <Grid container spacing={2} alignItems="center">
        {/* ====== טווח: שבוע לפני הופעה ראשונה ====== */}
        <Grid container spacing={2} alignItems="center">
          <Typography
            variant="subtitle2"
            display="block"
            sx={{ mb: 0.5, textAlign: 'center', fontWeight: 'bold' }}
          >
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
          <Typography
            variant="caption"
            sx={{ mt: 0.5, display: 'block', textAlign: 'center' }}
          >
            {ratingDescriptions[ratingBefore]}
          </Typography>
        </Grid>

        {/* ====== טווח: שבוע אחרי הופעה ראשונה ====== */}
        <Grid spacing={2}>
          <Typography
            variant="subtitle2"
            display="block"
            sx={{ mb: 0.5, textAlign: 'center', fontWeight: 'bold' }}
          >
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
          <Typography
            variant="caption"
            sx={{ mt: 0.5, display: 'block', textAlign: 'center' }}
          >
            {ratingDescriptions[ratingAfter]}
          </Typography>
        </Grid>

        {/* ====== טווח: 7 ימים אחרונים ====== */}
        <Grid spacing={2}>
          <Typography
            variant="subtitle2"
            display="block"
            sx={{ mb: 0.5, textAlign: 'center', fontWeight: 'bold' }}
          >
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
          <Typography
            variant="caption"
            sx={{ mt: 0.5, display: 'block', textAlign: 'center' }}
          >
            {ratingDescriptions[ratingCurrent]}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SymptomRating;
export {};
