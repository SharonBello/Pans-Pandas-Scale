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
import { RatingValue, SymptomGroup } from '../../types/pansTypes';
import SymptomRating from '../SymptomRating';

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
    <Box sx={{ mb: 4, direction: 'rtl' }}>
      <Typography variant="h6" gutterBottom>
        II. תסמינים נלווים (0–5 בכל טווח זמן)
      </Typography>

      {/* פס התקדמות */}
      <Box sx={{ width: '100%', mb: 2 }}>
        <Typography variant="body2" color="textSecondary" align="left">
          {`${progressPercent}% הושלם`}
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
              תחום
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', width: '20%' }}>
              שבוע לפני הופעה ראשונה
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', width: '20%' }}>
              שבוע אחרי הופעה ראשונה
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', width: '20%' }}>
              7 ימים אחרונים
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{ textAlign: 'right' }}>
                <Typography variant="body2">{item.label}</Typography>
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
