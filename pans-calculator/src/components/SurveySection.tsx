// src/components/SurveySection.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { RatingValue, SymptomGroup } from '../types/pansTypes';
import SymptomRating from './SymptomRating';

interface SurveySectionProps {
  title: string;
  items: SymptomGroup[];
  onComplete: (answers: SymptomGroup[]) => void;
}

const SurveySection: React.FC<SurveySectionProps> = ({ title, items, onComplete }) => {
  // local copy of items to update ratings step by step
  const [answers, setAnswers] = useState<SymptomGroup[]>([...items]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<'survey' | 'review'>('survey');

  const total = items.length;

  const handleRatingChange = (id: string, value: number) => {
    setAnswers(prev =>
      prev.map(item => (item.id === id ? { ...item, rating: value as RatingValue } : item))
    );
  };

  const goNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(idx => idx + 1);
    } else {
      // עברנו את השאלה האחרונה → מציגים מצב review
      setMode('review');
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(idx => idx - 1);
    }
  };

  const handleEdit = (index: number) => {
    setCurrentIndex(index);
    setMode('survey');
  };

  const handleFinish = () => {
    onComplete(answers);
  };

  return (
    <Box sx={{ mb: 4, direction: 'rtl' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      {mode === 'survey' ? (
        <Box>
          {/* Progress Bar או טקסט תיאור */}
          <Typography variant="body2" color="textSecondary" align="left" sx={{ mb: 1 }}>
            {`שאלה ${currentIndex + 1} מתוך ${total}`}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.round(((currentIndex + 1) / total) * 100)}
            sx={{ height: 8, borderRadius: 4, mb: 2 }}
          />

          {/* מציג שאלה אחת */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'right' }}>
              {answers[currentIndex].label}
            </Typography>
            <SymptomRating
              id={answers[currentIndex].id}
              label={`` /* כבר הצגנו את label מעל */}
              value={answers[currentIndex].rating}
              onChange={handleRatingChange}
            />
          </Box>

          {/* כפתורי ניווט */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="text"
              disabled={currentIndex === 0}
              onClick={goBack}
            >
              חזור
            </Button>
            <Button
              variant="contained"
              onClick={goNext}
            >
              {currentIndex < total - 1 ? 'הבא' : 'סיים סקירה'}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          {/* מצב Review: מציג טבלה של כל השאלות + דירוג + כפתור עריכה לכל שורה */}
          <Typography variant="body2" sx={{ mb: 2, textAlign: 'right' }}>
            סקירת תשובות – ניתן לערוך כל תשובה לפני המעבר למדור הבא.
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  עריכה
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  דירוג נבחר
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                  שאלה
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {answers.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEdit(idx)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{item.rating}</TableCell>
                  <TableCell sx={{ textAlign: 'right' }}>
                    <Typography variant="body2">{item.label}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="contained" onClick={handleFinish}>
              המשך למדור הבא
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SurveySection;
