import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RatingValue, SymptomGroup } from '../../types/pansTypes';
import SymptomRating from '../SymptomRating/SymptomRating';

interface AssociatedSectionProps {
  items: SymptomGroup[];
  onItemChange: (
    id: string,
    field: 'before' | 'after' | 'current',
    value: RatingValue
  ) => void;
}

const AssociatedSectionWithTimeline: React.FC<AssociatedSectionProps> = ({
  items,
  onItemChange,
}) => {
  const { t } = useTranslation();
  const totalFields = items.length * 3;
  const filledCount = items.reduce((acc, item) => {
    let c = 0;
    if (item.ratingBefore > 0) c++;
    if (item.ratingAfter > 0) c++;
    if (item.ratingCurrent > 0) c++;
    return acc + c;
  }, 0);
  const progressPercent = Math.round((filledCount / totalFields) * 100);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {t('associatedSection.title')}
      </Typography>

      {/* פס התקדמות */}
      <Box sx={{ width: '100%', mb: 2 }}>
        <Typography variant="body2" color="textSecondary" align="left">
          {t('common.completedPercent', { percent: progressPercent })}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>

      {/* טבלה עם כל הסימפטומים ה־Associated וה־Sliders שלהם */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 'bold', width: '35%' }}>
              {t('associatedSection.column.topic')}
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', width: '20%' }}>
              {t('timelines.beforeFirstWeek')}
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', width: '20%' }}>
              {t('timelines.afterFirstWeek')}
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', width: '20%' }}>
              {t('timelines.last7Days')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{ textAlign: 'right' }}>
                <Typography variant="body2">{t(`associated.${item.id}.label`)}</Typography>
              </TableCell>

              <TableCell>
                <SymptomRating
                  id={`${item.id}_before`}
                  label=""
                  ratingBefore={item.ratingBefore}
                  ratingAfter={0}
                  ratingCurrent={0}
                  onChange={(id, field, value) => {
                    if (field === 'before') {
                      onItemChange(item.id, 'before', value);
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                <SymptomRating
                  id={`${item.id}_after`}
                  label=""
                  ratingBefore={0}
                  ratingAfter={item.ratingAfter}
                  ratingCurrent={0}
                  onChange={(id, field, value) => {
                    if (field === 'after') {
                      onItemChange(item.id, 'after', value);
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                <SymptomRating
                  id={`${item.id}_current`}
                  label=""
                  ratingBefore={0}
                  ratingAfter={0}
                  ratingCurrent={item.ratingCurrent}
                  onChange={(id, field, value) => {
                    if (field === 'current') {
                      onItemChange(item.id, 'current', value);
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AssociatedSectionWithTimeline;
