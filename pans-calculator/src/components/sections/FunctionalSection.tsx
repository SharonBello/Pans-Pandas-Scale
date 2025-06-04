import React from 'react';
import { Box, Typography, Radio, RadioGroup, Table, TableHead, TableRow, TableCell, TableBody, FormControlLabel, } from '@mui/material';
import { SymptomGroup } from '../../types/pansTypes';
import './Sections.scss';

interface FunctionalSectionProps {
  items: SymptomGroup[];
  onItemChange: (id: string, value: number) => void;
}

const levelDescriptions: Record<number, string> = {
  0: 'אין פגיעה: תפקוד רגיל (לימודים, בית, חברים).',
  1: 'מינימלית (10): הפרעות בתפקוד יומיומי מינימליות; התנהלות עצמאית.',
  2: 'קלה (20): קושי קל בלמידה, שינוי קל בהתנהגות או חוסר עניין בפעילות.',
  3: 'בינונית (30): קושי משמעותי בלימודים, שינוי משמעותי בהתנהגות החברתית, נסיגה חלקית מחברים ופעילויות.',
  4: 'חמורה (40): אי יכולת לשוב ללימודים, הימנעות מלאה ממשימות יומיומיות, שינוי מהותי בהתנהגות החברתית.',
  5: 'קיצונית (50): פגיעה תפקודית קיצונית, חוסר יכולת כמעט מוחלט לבצע פעולות יומיומיות, מצוקה קשה, צורך בסיוע צמוד בכל התחומים.',
};

const FunctionalSection: React.FC<FunctionalSectionProps> = ({ items, onItemChange }) => {
  // נניח שתמיד יש פריט אחד ב־items
  const symptom = items[0];

  return (
    <Box sx={{ mb: 4, direction: 'rtl' }}>
      <RadioGroup
        name={symptom.id}
        value={symptom.ratingCurrent.toString()}
        onChange={(e) => onItemChange(symptom.id, parseInt(e.target.value, 10))}
        sx={{ width: '100%' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {/* כדי שהתוכן יקרא RTL, מימין לשמאל נשים תחילה את 'תיאור רמה' */}
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                תיאור רמה
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                דרגה
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                בחירה
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(levelDescriptions).map(([key, desc]) => (
              <TableRow key={key}>
                {/* תיאור הרמה תמיד מיושר לימין */}
                <TableCell sx={{ textAlign: 'right' }}>
                  <Typography variant="body2">{desc}</Typography>
                </TableCell>
                {/* דרגה במרכז */}
                <TableCell align="center">{key}</TableCell>
                {/* כפתור רדיו לשמאל */}
                <TableCell align="center">
                  <FormControlLabel
                    value={key}          // ערך המחרוזת ('0', '1', …)
                    control={<Radio size="small" />}
                    label=""
                    sx={{ '& .MuiFormControlLabel-label': { display: 'none' } }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </RadioGroup>

      <Typography
        variant="caption"
        color="textSecondary"
        display="block"
        sx={{ mt: 1, textAlign: 'right' }}
      >
        * בחרו שורה אחת המתאימה לרמת הפגיעה התפקודית (0–5).
      </Typography>
    </Box>
  );
};

export default FunctionalSection;
