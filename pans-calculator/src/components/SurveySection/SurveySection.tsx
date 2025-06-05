import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    LinearProgress,
} from '@mui/material';
import { RatingValue, SymptomGroup, SubSymptom } from '../../types/pansTypes';
import SymptomRating from '../SymptomRating/SymptomRating';

type SurveyItem = SymptomGroup | SubSymptom;

interface SurveySectionProps {
    title: string;
    items: SurveyItem[];
    onComplete: (answers: SurveyItem[]) => void;
}

const SurveySection: React.FC<SurveySectionProps> = ({ title, items, onComplete }) => {
    const [answers, setAnswers] = useState<SurveyItem[]>([...items]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mode, setMode] = useState<'survey' | 'review'>('survey');

    const total = items.length;

    const handleRatingChange = (id: string, field: 'before' | 'after' | 'current', value: RatingValue) => {
        setAnswers(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        ratingBefore: field === 'before' ? value : (item.ratingBefore as RatingValue),
                        ratingAfter: field === 'after' ? value : (item.ratingAfter as RatingValue),
                        ratingCurrent: field === 'current' ? value : (item.ratingCurrent as RatingValue),
                    } as SurveyItem
                    : item
            )
        );
    };

    const goNext = () => {
        if (currentIndex < total - 1) {
            setCurrentIndex(idx => idx + 1);
        } else {
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
                    <Typography variant="body2" color="textSecondary" align="left" sx={{ mb: 1 }}>
                        {`שאלה ${currentIndex + 1} מתוך ${total}`}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={Math.round(((currentIndex + 1) / total) * 100)}
                        sx={{ height: 8, borderRadius: 4, mb: 2 }}
                    />

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'right' }}>
                            {/* כאן נציג label (OCD) או sublabel (SubSymptom) */}
                            {(answers[currentIndex] as SymptomGroup).label ||
                                (answers[currentIndex] as SubSymptom).sublabel}
                        </Typography>
                        <SymptomRating
                            id={answers[currentIndex].id}
                            label={
                                (answers[currentIndex] as SymptomGroup).label ||
                                (answers[currentIndex] as SubSymptom).sublabel
                            }
                            ratingBefore={(answers[currentIndex] as any).ratingBefore}
                            ratingAfter={(answers[currentIndex] as any).ratingAfter}
                            ratingCurrent={(answers[currentIndex] as any).ratingCurrent}
                            onChange={handleRatingChange}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="text"
                            disabled={currentIndex === 0}
                            onClick={goBack}
                        >
                            חזור
                        </Button>
                        <Button variant="contained" onClick={goNext}>
                            {currentIndex < total - 1 ? 'הבא' : 'סיים סקירה'}
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Typography variant="body2" sx={{ mb: 2, textAlign: 'right' }}>
                        סקירת תשובות – ניתן לערוך כל תשובה לפני המעבר למדור הבא.
                    </Typography>
                    <Box component="div">
                        {answers.map((item, idx) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mb: 1,
                                    p: 1,
                                    bgcolor: '#F7F7FC',
                                    borderRadius: 1,
                                }}
                            >
                                <Button
                                    size="small"
                                    onClick={() => handleEdit(idx)}
                                    sx={{ minWidth: 32, mr: 1 }}
                                >
                                    ערוך
                                </Button>
                                <Typography variant="body2" sx={{ flex: 1, textAlign: 'right' }}>
                                    {/* מציג label או sublabel */}
                                    {(item as SymptomGroup).label || (item as SubSymptom).sublabel}
                                </Typography>
                                <Typography variant="body2" sx={{ width: 32, textAlign: 'center' }}>
                                    {(item as any).ratingCurrent}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

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
