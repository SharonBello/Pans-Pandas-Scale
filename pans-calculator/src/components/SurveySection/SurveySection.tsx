import React, { useState } from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RatingValue, SubSymptom, SymptomGroup } from '../../types/pansTypes';
import SymptomRating from '../SymptomRating/SymptomRating';

type SurveyItem = SymptomGroup | SubSymptom;

interface SurveySectionProps {
    title: string;
    items: SurveyItem[];
    onComplete: (answers: SurveyItem[]) => void;
}

const SurveySection: React.FC<SurveySectionProps> = ({ title, items, onComplete }) => {
    const { t } = useTranslation();
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
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                {t(title)}
            </Typography>

            {mode === 'survey' ? (
                <Box>
                    <Typography variant="body2" color="textSecondary" align="left" sx={{ mb: 1 }}>
                        {t('common.questionOf', { current: currentIndex + 1, total })}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={Math.round(((currentIndex + 1) / total) * 100)}
                        sx={{ height: 8, borderRadius: 4, mb: 2 }}
                    />

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'right' }}>
                            {
                                ('label' in answers[currentIndex])
                                    ? t(`questions.${answers[currentIndex].id}.label`)
                                    : t(`associated.${answers[currentIndex].id}.label`)
                            }
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
                        <Button variant="text" disabled={currentIndex === 0} onClick={goBack}>
                            {t('common.back')}
                        </Button>
                        <Button variant="contained" onClick={goNext}>
                            {currentIndex < total - 1 ? t('common.next') : t('common.finishReview')}
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Typography variant="body2" sx={{ mb: 2, textAlign: 'right' }}>
                        {t('common.reviewPrompt')}
                    </Typography>
                    <Box component="div">
                        {answers.map((item, idx) => (
                            <Box key={item.id}
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
                                <Button size="small" onClick={() => handleEdit(idx)}>
                                    {t('common.edit')}
                                </Button>
                                <Typography variant="body2" sx={{ flex: 1, textAlign: 'right' }}>
                                    {('label' in item)
                                        ? t(`questions.${item.id}.label`)
                                        : t(`associated.${item.id}.label`)}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, width: 120, justifyContent: 'space-between' }}>
                                    <Typography variant="caption">{(item as any).ratingBefore}</Typography>
                                    <Typography variant="caption">{(item as any).ratingAfter}</Typography>
                                    <Typography variant="caption">{(item as any).ratingCurrent}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Button variant="contained" onClick={handleFinish}>
                            {t('common.continueNextSection')}
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default SurveySection;
