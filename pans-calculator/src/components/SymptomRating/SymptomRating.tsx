import React from 'react';
import { Box, Typography, Slider } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
  id, ratingBefore, ratingAfter, ratingCurrent, onChange, itemClass = ''
}) => {
  const { t } = useTranslation();
  const marks = [0, 1, 2, 3, 4, 5].map(v => ({ value: v, label: String(v) }));

  const handleSliderChange = (
    field: 'before' | 'after' | 'current',
    _e: Event,
    newValue: number | number[]
  ) => {
    if (typeof newValue === 'number') onChange(id, field, newValue as RatingValue);
  };

  return (
    <Box sx={{ mb: 2 }} dir={t('dir')}>
      <Grid container spacing={2} alignItems="center">
        {(['beforeFirstWeek', 'afterFirstWeek', 'last7Days'] as const).map((key, i) => {
          const value = key === 'beforeFirstWeek'
            ? ratingBefore
            : key === 'afterFirstWeek'
              ? ratingAfter
              : ratingCurrent;
          const field = key === 'beforeFirstWeek'
            ? 'before'
            : key === 'afterFirstWeek'
              ? 'after'
              : 'current';

          return (
            <Grid size={{ xs: 12, md: 4 }} className={itemClass} key={key}>
              <Typography variant="subtitle2" sx={{ mb: 0.5, textAlign: 'center', fontWeight: 'bold' }}>
                {t(`timelines.${key}`)}
              </Typography>
              <Slider
                value={value}
                onChange={(e, v) => handleSliderChange(field, e, v)}
                step={1} min={0} max={5} marks={marks}
                valueLabelDisplay="off"
                aria-label={`${id}-${field}`}
              />
              <Typography variant="caption" sx={{ mt: 0.5, display: 'block', textAlign: 'center' }}>
                {t(`ratingDescriptions.${value}`)}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SymptomRating;